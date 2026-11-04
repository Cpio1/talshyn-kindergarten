import type { ClassKey, MealKey } from "@/data/site";

/**
 * Hand-drawn icon set in the site's palette. Using one drawing style for classes,
 * meals and groups keeps the page coherent (emoji render differently on each OS).
 */
const F = "#345C49"; // forest
const L = "#56836B"; // leaf
const S = "#E8B85E"; // sun
const M = "#FFF9ED"; // milk
const P = "#EFA98A"; // warm accent, used sparingly

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const classIcons: Record<ClassKey, (p: IconProps) => React.JSX.Element> = {
  chess: (p) => (
    <Svg {...p}>
      <circle cx="32" cy="15" r="9" fill={F} />
      <path d="M24 26h16l-2.5 3.5c0 7 1.5 12 5.5 17H21c4-5 5.5-10 5.5-17L24 26Z" fill={F} />
      <rect x="15" y="46" width="34" height="9" rx="4.5" fill={S} />
      <circle cx="29" cy="12" r="2.4" fill={M} opacity=".8" />
    </Svg>
  ),
  music: (p) => (
    <Svg {...p}>
      <path d="M24 44V15l26-6v29" stroke={F} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 23l26-6" stroke={F} strokeWidth="4.5" />
      <ellipse cx="16.5" cy="45" rx="8.5" ry="7" fill={S} />
      <ellipse cx="42.5" cy="39" rx="8.5" ry="7" fill={L} />
    </Svg>
  ),
  dance: (p) => (
    <Svg {...p}>
      <circle cx="33" cy="11" r="6.5" fill={F} />
      <path d="M33 19c-2 6-3 10-2 15" stroke={F} strokeWidth="5" strokeLinecap="round" />
      <path d="M32 22C24 22 18 18 13 11M33 22c6 1 12-2 18-8" stroke={F} strokeWidth="4" strokeLinecap="round" />
      <path d="M31 31c-7 3-12 9-14 15 10 3 22 3 30-1-2-6-8-12-16-14Z" fill={S} />
      <path d="M26 46c-1 5-2 8-5 12M37 46c1 4 3 8 6 11" stroke={F} strokeWidth="4" strokeLinecap="round" />
    </Svg>
  ),
  speech: (p) => (
    <Svg {...p}>
      <path d="M8 26C8 15 18 8 31 8s23 7 23 18-10 18-23 18c-2 0-4 0-6-.5L14 53l1.5-13C11 36 8 31 8 26Z" fill={L} />
      <path d="M21 26c5 6 15 6 20 0Z" fill={S} />
      <path d="M22 27c5 2 13 2 18 0" stroke={M} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  ),
  karate: (p) => (
    <Svg {...p}>
      <path d="M21 8h22l9 12-8 7-3-4v31H23V23l-3 4-8-7 9-12Z" fill={M} stroke={F} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 8l6 11 6-11" stroke={F} strokeWidth="3" strokeLinejoin="round" />
      <rect x="21" y="30" width="22" height="7" fill={F} />
      <path d="M30 37l-6 15M34 37l6 15" stroke={F} strokeWidth="5" strokeLinecap="round" />
    </Svg>
  ),
  robotics: (p) => (
    <Svg {...p}>
      <path d="M32 6v9" stroke={F} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="6.5" r="3.5" fill={S} />
      <rect x="12" y="15" width="40" height="30" rx="11" fill={L} />
      <circle cx="24" cy="29" r="5.5" fill={M} />
      <circle cx="40" cy="29" r="5.5" fill={M} />
      <circle cx="24" cy="29" r="2.3" fill={F} />
      <circle cx="40" cy="29" r="2.3" fill={F} />
      <rect x="25" y="38" width="14" height="3" rx="1.5" fill={M} />
      <rect x="5" y="24" width="7" height="12" rx="3.5" fill={F} />
      <rect x="52" y="24" width="7" height="12" rx="3.5" fill={F} />
      <path d="M22 45v6M42 45v6" stroke={F} strokeWidth="4" />
      <rect x="16" y="51" width="32" height="6" rx="3" fill={S} />
    </Svg>
  ),
};

export function ClassIcon({ name, className }: IconProps & { name: ClassKey }) {
  const Icon = classIcons[name];
  return <Icon className={className} />;
}

const mealIcons: Record<MealKey, (p: IconProps) => React.JSX.Element> = {
  // sunrise over a cup
  breakfast: (p) => (
    <Svg {...p}>
      <path d="M20 21a12 12 0 0 1 24 0Z" fill={S} />
      <path d="M32 3v4M14 12l3 3M50 12l-3 3" stroke={S} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M13 26h36v11a15 15 0 0 1-15 15h-6a15 15 0 0 1-15-15V26Z" fill={L} />
      <path d="M49 29h3a6 6 0 0 1 0 12h-4" stroke={L} strokeWidth="4" />
      <rect x="11" y="55" width="40" height="4.5" rx="2.2" fill={F} />
    </Svg>
  ),
  // apple
  snack: (p) => (
    <Svg {...p}>
      <path d="M32 21c-5-4-20-4-22 11-2 13 8 26 15 26 3 0 4-2 7-2s4 2 7 2c7 0 17-13 15-26-2-15-17-15-22-11Z" fill={P} />
      <path d="M32 21c0-5 1-9 4-13" stroke={F} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 14c3-6 9-8 15-7-1 6-8 10-15 7Z" fill={L} />
    </Svg>
  ),
  // steaming bowl
  lunch: (p) => (
    <Svg {...p}>
      <path d="M23 7c-3 4 3 6 0 11M33 5c-3 4 3 7 0 13M43 7c-3 4 3 6 0 11" stroke={L} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M6 26h52c0 15-9 26-26 26S6 41 6 26Z" fill={S} />
      <path d="M12 33c8 3 32 3 40 0" stroke={M} strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
      <rect x="20" y="52" width="24" height="6" rx="3" fill={F} />
    </Svg>
  ),
  // cookie and glass of milk
  afternoon: (p) => (
    <Svg {...p}>
      <path d="M36 12h20l-3 44a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3l-3-44Z" fill={M} stroke={L} strokeWidth="3" />
      <path d="M37.3 26h17.400L53 56a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3Z" fill={L} opacity=".35" />
      <circle cx="22" cy="40" r="17" fill={S} />
      <circle cx="16" cy="35" r="2.8" fill={F} />
      <circle cx="26" cy="33" r="2.3" fill={F} />
      <circle cx="28" cy="44" r="2.8" fill={F} />
      <circle cx="18" cy="47" r="2.3" fill={F} />
    </Svg>
  ),
  // crescent moon over a plate
  dinner: (p) => (
    <Svg {...p}>
      <path d="M41 4c-8 1-14 7-14 14 0 8 8 14 17 12-3-1-8-5-8-13 0-6 2-10 5-13Z" fill={S} />
      <circle cx="17" cy="12" r="2.2" fill={S} />
      <circle cx="53" cy="20" r="1.8" fill={S} />
      <ellipse cx="32" cy="46" rx="28" ry="13" fill={L} />
      <ellipse cx="32" cy="44" rx="18" ry="7.5" fill={M} />
    </Svg>
  ),
};

export function MealIcon({ name, className }: IconProps & { name: MealKey }) {
  const Icon = mealIcons[name];
  return <Icon className={className} />;
}

/** Three stages of a growing plant. They mark the groups without implying any age split. */
export function GroupArt({ index, className }: IconProps & { index: number }) {
  if (index === 0) {
    return (
      <Svg className={className}>
        <path d="M32 58V30" stroke={F} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 34C30 20 18 14 7 16c0 13 12 22 25 18Z" fill={L} />
        <path d="M32 28c1-12 12-18 25-17 0 13-12 22-25 17Z" fill={S} />
        <path d="M16 58h32" stroke={F} strokeWidth="4" strokeLinecap="round" />
      </Svg>
    );
  }
  if (index === 1) {
    return (
      <Svg className={className}>
        <path d="M32 60V30" stroke={F} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 50c-3-8-11-11-19-9 1 8 10 13 19 9ZM32 45c3-8 11-11 19-9-1 8-10 13-19 9Z" fill={L} />
        {[0, 51, 103, 154, 206, 257, 309].map((a) => (
          <ellipse key={a} cx="32" cy="9" rx="6" ry="8.5" fill={S} transform={`rotate(${a} 32 19)`} />
        ))}
        <circle cx="32" cy="19" r="7" fill={F} />
      </Svg>
    );
  }
  return (
    <Svg className={className}>
      <path d="M32 60V30M32 44l-9-8M32 38l8-7" stroke={F} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="19" cy="27" r="13" fill={L} />
      <circle cx="45" cy="26" r="13" fill={L} />
      <circle cx="32" cy="17" r="15" fill="#7BA488" />
      <circle cx="40" cy="14" r="3" fill={S} />
      <circle cx="22" cy="24" r="2.5" fill={S} />
      <circle cx="46" cy="29" r="2.5" fill={S} />
      <path d="M18 60h28" stroke={F} strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
