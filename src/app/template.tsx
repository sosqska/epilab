import type { ReactNode } from "react";

/** Re-mounted on every navigation, so each page fades in gently. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
