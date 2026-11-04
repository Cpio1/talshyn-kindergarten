import type { ImageAsset } from "@/lib/media";

export type GalleryTile = { image: ImageAsset; index: number; ratio: number };
export type GalleryRow = { tiles: GalleryTile[]; ratioSum: number };

function toRow(tiles: GalleryTile[]): GalleryRow {
  return { tiles, ratioSum: tiles.reduce((sum, tile) => sum + tile.ratio, 0) };
}

function toTiles(images: ImageAsset[], offset: number): GalleryTile[] {
  return images.map((image, i) => ({ image, index: offset + i, ratio: image.width / image.height }));
}

/**
 * Justified rows: a row closes once its photos' combined aspect ratio reaches `target`.
 * Each tile keeps its photo's own ratio, so nothing is cropped whatever its orientation,
 * and photos stay in number order. A too-short last row joins the one before it.
 */
export function justifiedRows(images: ImageAsset[], target: number, offset = 0): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let current: GalleryTile[] = [];
  for (const tile of toTiles(images, offset)) {
    current.push(tile);
    if (toRow(current).ratioSum >= target) {
      rows.push(toRow(current));
      current = [];
    }
  }
  if (current.length) {
    const last = toRow(current);
    const previous = rows.at(-1);
    if (last.ratioSum < 2 && previous) rows[rows.length - 1] = toRow([...previous.tiles, ...current]);
    else rows.push(last);
  }
  return rows;
}

/** Rows of two photos for the phone layout; an odd last photo takes the full width. */
export function pairedRows(images: ImageAsset[]): GalleryRow[] {
  const tiles = toTiles(images, 0);
  const rows: GalleryRow[] = [];
  for (let i = 0; i < tiles.length; i += 2) rows.push(toRow(tiles.slice(i, i + 2)));
  return rows;
}
