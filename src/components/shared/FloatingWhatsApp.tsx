"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./Illustrations";
import { useLanguage } from "./Providers";

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  return (
    <motion.a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.a11y.whatsapp} (${t.a11y.newTab})`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 z-40 grid h-13 w-13 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_12px_28px_-10px_rgb(31_157_85_/_0.7)] md:bottom-6 md:right-6 md:h-14 md:w-14"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1f9d55]/35 [animation-duration:2.8s]" />
      <WhatsAppIcon className="h-6.5 w-6.5 md:h-7 md:w-7" />
    </motion.a>
  );
}
