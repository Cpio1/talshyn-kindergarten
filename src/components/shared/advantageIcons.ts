import { Clock, Languages, Sparkles, Users, Utensils, type LucideIcon } from "lucide-react";

/** One icon and tint per advantage card, in the order of `t.advantages.items`. */
export const advantageStyles: { icon: LucideIcon; tint: string; chip: string }[] = [
  { icon: Languages, tint: "bg-leaf-wash", chip: "bg-forest text-white" },
  { icon: Users, tint: "bg-sun-wash", chip: "bg-sun text-ink" },
  { icon: Utensils, tint: "bg-peach-wash", chip: "bg-white text-forest" },
  { icon: Sparkles, tint: "bg-leaf-wash", chip: "bg-leaf text-white" },
  { icon: Clock, tint: "bg-sun-wash", chip: "bg-forest text-white" },
];
