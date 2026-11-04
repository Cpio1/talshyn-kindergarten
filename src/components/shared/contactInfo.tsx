import { Clock, House, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "./Illustrations";
import type { Dictionary } from "@/data/translations";

export function contactRows(t: Dictionary) {
  return [
    { icon: House, label: t.contacts.labels.name, value: t.contacts.name },
    { icon: MapPin, label: t.contacts.labels.address, value: t.contacts.address },
    { icon: Phone, label: t.contacts.labels.phone, value: site.phone.display, href: site.phone.href },
    { icon: Clock, label: t.contacts.labels.hours, value: t.contacts.hours },
    {
      icon: InstagramIcon,
      label: t.contacts.labels.instagram,
      value: site.instagram.handle,
      href: site.instagram.url,
      external: true,
    },
  ];
}
