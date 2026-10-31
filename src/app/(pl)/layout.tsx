import type { ReactNode } from "react";
import { LocaleShell } from "@/components/layout/LocaleShell";

export default function PolishLayout({ children }: { children: ReactNode }) {
  return <LocaleShell locale="pl">{children}</LocaleShell>;
}
