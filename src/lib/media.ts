import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Discovers media in `public/images` at build time, so that dropping a new
 * `image12.jpg` into the folder is all it takes to extend the gallery.
 * Only ever imported from Server Components.
 */
const IMAGE_EXT = ["webp", "png", "jpg", "jpeg"];

export type LogoAsset = { src: string; width: number; height: number };

export type SiteMedia = {
  logo: LogoAsset | null;
  mainPage: string | null;
  aboutMedia:
    | { kind: "image"; src: string }
    | { kind: "video"; sources: { src: string; type: string }[]; poster: string | null }
    | null;
  gallery: string[];
};

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

function listFiles(): string[] {
  try {
    return fs
      .readdirSync(IMAGES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function extOf(file: string) {
  return path.extname(file).slice(1).toLowerCase();
}

function baseOf(file: string) {
  return path.basename(file, path.extname(file)).toLowerCase();
}

function url(file: string) {
  return `/images/${encodeURIComponent(file)}`;
}

function findByBase(files: string[], base: string, extensions: string[]) {
  for (const ext of extensions) {
    const match = files.find((f) => baseOf(f) === base && extOf(f) === ext);
    if (match) return match;
  }
  return null;
}

function readLogo(files: string[]): LogoAsset | null {
  const file = findByBase(files, "logo", ["png", "webp", "jpg", "jpeg"]);
  if (!file) return null;
  try {
    const { width, height } = imageSize(fs.readFileSync(path.join(IMAGES_DIR, file)));
    if (!width || !height) return null;
    return { src: url(file), width, height };
  } catch {
    return null;
  }
}

export function getSiteMedia(): SiteMedia {
  const files = listFiles();

  const mainPage = findByBase(files, "main-page", IMAGE_EXT);

  const mp4 = findByBase(files, "main-page2", ["mp4"]);
  const webm = findByBase(files, "main-page2", ["webm"]);
  const aboutImage = findByBase(files, "main-page2", IMAGE_EXT);
  const poster = findByBase(files, "main-page2-poster", IMAGE_EXT);

  let aboutMedia: SiteMedia["aboutMedia"] = null;
  if (mp4 || webm) {
    const sources = [
      ...(webm ? [{ src: url(webm), type: "video/webm" }] : []),
      ...(mp4 ? [{ src: url(mp4), type: "video/mp4" }] : []),
    ];
    const posterFile = poster ?? aboutImage;
    aboutMedia = { kind: "video", sources, poster: posterFile ? url(posterFile) : null };
  } else if (aboutImage) {
    aboutMedia = { kind: "image", src: url(aboutImage) };
  }

  const gallery = files
    .map((file) => ({ file, match: /^image(\d+)$/.exec(baseOf(file)) }))
    .filter((f) => f.match && IMAGE_EXT.includes(extOf(f.file)))
    .sort((a, b) => Number(a.match![1]) - Number(b.match![1]))
    .map((f) => url(f.file));

  return { logo: readLogo(files), mainPage: mainPage ? url(mainPage) : null, aboutMedia, gallery };
}
