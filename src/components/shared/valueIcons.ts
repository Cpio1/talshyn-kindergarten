import { BookOpen, HeartHandshake, Palette, Sprout, type LucideIcon } from "lucide-react";

/** Icon + tint per value card, in the order of `t.about.values`. */
export const valueStyles: { icon: LucideIcon; tint: string; chip: string; shape: string }[] = [
  { icon: HeartHandshake, tint: "bg-peach-wash", chip: "bg-white text-forest", shape: "rounded-[2rem_2rem_2rem_0.75rem]" },
  { icon: Palette, tint: "bg-sun-wash", chip: "bg-sun text-ink", shape: "rounded-[0.75rem_2rem_2rem_2rem]" },
  { icon: BookOpen, tint: "bg-leaf-wash", chip: "bg-forest text-white", shape: "rounded-[2rem_0.75rem_2rem_2rem]" },
  { icon: Sprout, tint: "bg-white", chip: "bg-leaf text-white", shape: "rounded-[2rem_2rem_0.75rem_2rem]" },
];
