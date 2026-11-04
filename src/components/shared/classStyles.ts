import type { ClassKey } from "@/data/site";

/** Colour + silhouette per class card; shared by both compositions. */
export const classStyles: Record<ClassKey, { card: string; icon: string; shape: string; dot: string }> = {
  chess: {
    card: "bg-white",
    icon: "bg-leaf-wash",
    shape: "rounded-[2rem_2rem_2rem_0.75rem]",
    dot: "bg-leaf",
  },
  music: {
    card: "bg-sun-wash",
    icon: "bg-white",
    shape: "rounded-[2.5rem]",
    dot: "bg-sun",
  },
  dance: {
    card: "bg-white",
    icon: "bg-peach-wash",
    shape: "rounded-[0.75rem_2rem_2rem_2rem]",
    dot: "bg-[#EFA98A]",
  },
  speech: {
    card: "bg-leaf-wash",
    icon: "bg-white",
    shape: "rounded-[2rem_0.75rem_2rem_2rem]",
    dot: "bg-forest",
  },
  karate: {
    card: "bg-white",
    icon: "bg-sun-wash",
    shape: "rounded-[2rem_2rem_0.75rem_2rem]",
    dot: "bg-sun",
  },
  robotics: {
    card: "bg-peach-wash",
    icon: "bg-white",
    shape: "rounded-[2.5rem_1.25rem_2.5rem_1.25rem]",
    dot: "bg-leaf",
  },
};
