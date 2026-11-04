/**
 * The site's decorative vocabulary: a willow branch («тал»), daisies, leaves,
 * suns and waves. Purely visual, so everything is aria-hidden.
 */
type Props = { className?: string };

/** The signature motif: a long drooping willow twig with slim leaves. */
export function WillowBranch({ className }: Props) {
  const leaves = [
    [26, 18, 34],
    [44, 44, -30],
    [52, 72, 30],
    [70, 96, -34],
    [78, 126, 26],
    [94, 150, -30],
    [100, 180, 22],
    [114, 204, -26],
    [118, 234, 16],
  ];
  return (
    <svg viewBox="0 0 170 290" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2C40 60 62 108 84 150c18 36 32 78 36 132"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {leaves.map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 0C10-9 27-10 40 0 27 8 10 8 0 0Z"
          fill="currentColor"
          opacity={i % 2 ? 0.72 : 1}
          transform={`translate(${x} ${y}) rotate(${(r as number) + (r > 0 ? 18 : 170)})`}
        />
      ))}
    </svg>
  );
}

export function Daisy({ className, petal = "#FFFFFF", heart = "#E8B85E" }: Props & { petal?: string; heart?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="32" cy="14" rx="8" ry="12.5" fill={petal} transform={`rotate(${a} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="9" fill={heart} />
    </svg>
  );
}

export function Leaf({ className }: Props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M6 42C4 22 16 6 42 6c1 24-12 39-36 36Z" fill="currentColor" />
      <path d="M6 42 30 18" stroke="#FFF9ED" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** A sun with short, soft rays. The ring is what spins in the nutrition section. */
export function SunRays({ className }: Props) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {rays.map((a) => (
        <rect key={a} x="56.5" y="4" width="7" height="20" rx="3.5" fill="currentColor" transform={`rotate(${a} 60 60)`} />
      ))}
    </svg>
  );
}

export function SoftLine({ className }: Props) {
  return (
    <svg viewBox="0 0 150 14" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 9c18-8 30-8 48 0s30 6 48-1 30-6 48 1"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** A soft wave that joins two section backgrounds. */
export function Wave({ className, flip = false }: Props & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M0 42c180-44 360-44 540-12s360 44 540 10 270-38 360-20v50H0Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Drawn scene shown in place of a photo while none has been supplied.
 * It is plainly an illustration, so it can never be mistaken for the real kindergarten.
 */
export function GardenScene({ className }: Props) {
  return (
    <svg
      viewBox="0 0 600 640"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <rect width="600" height="640" fill="#FBEECF" />
      <circle cx="446" cy="150" r="66" fill="#E8B85E" />
      <path d="M0 420c110-70 230-84 340-44s190 30 260-8v272H0Z" fill="#A9C4A6" />
      <path d="M0 500c130-54 260-50 370-18s170 22 230-6v164H0Z" fill="#56836B" />
      <path d="M0 576c150-36 300-30 600 2v62H0Z" fill="#345C49" />
      {/* willow */}
      <path d="M196 500c8-74 2-140-10-214" stroke="#345C49" strokeWidth="16" strokeLinecap="round" fill="none" />
      <ellipse cx="186" cy="240" rx="128" ry="104" fill="#56836B" />
      <ellipse cx="146" cy="224" rx="70" ry="58" fill="#6F9A80" />
      {[78, 112, 148, 186, 224, 262, 296].map((x, i) => (
        <path
          key={x}
          d={`M${x} 270c-6 44-4 ${70 + (i % 3) * 18} 4 ${118 + (i % 3) * 28}`}
          stroke="#345C49"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {/* a little house */}
      <rect x="372" y="396" width="132" height="104" rx="12" fill="#FFF9ED" />
      <path d="M356 404 438 334l82 70Z" fill="#E8B85E" />
      <rect x="420" y="440" width="36" height="60" rx="18" fill="#345C49" />
      <circle cx="396" cy="432" r="11" fill="#A9C4A6" />
      <circle cx="480" cy="432" r="11" fill="#A9C4A6" />
      {/* daisies */}
      {[
        [84, 556, 1],
        [278, 540, 0.8],
        [540, 560, 1.1],
        [340, 594, 0.7],
      ].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cy="-12" rx="6" ry="10" fill="#FFF9ED" transform={`rotate(${a})`} />
          ))}
          <circle r="6.5" fill="#E8B85E" />
        </g>
      ))}
    </svg>
  );
}
