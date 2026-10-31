import type { ReactNode } from "react";
import type { ImageKey } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Sprig } from "@/components/ui/Botanical";
import { Photo } from "@/components/ui/Photo";
import { ScriptNote } from "@/components/ui/ScriptNote";

/** Opening band for inner pages: text-only (centered) or split with an editorial photo. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  imagePosition,
  note,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image?: ImageKey;
  imageAlt?: string;
  imagePosition?: string;
  note?: string;
  children?: ReactNode;
}) {
  if (!image) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-blush/70 to-ivory py-20 md:py-28">
        <Sprig className="pointer-events-none absolute top-10 -left-4 w-28 -rotate-[24deg] text-blush-deep md:left-[8%] md:w-36" />
        <Sprig className="pointer-events-none absolute -right-2 bottom-4 w-24 rotate-[160deg] text-blush-deep md:right-[9%] md:w-32" />
        <Container className="relative text-center">
          <Eyebrow className="animate-rise mb-5">{eyebrow}</Eyebrow>
          <h1 className="animate-rise mx-auto max-w-3xl text-[clamp(2.3rem,10vw,3rem)] [animation-delay:80ms] md:text-6xl lg:text-7xl">{title}</h1>
          <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg [animation-delay:160ms]">{lead}</p>
          {children && <div className="animate-rise mt-9 [animation-delay:240ms]">{children}</div>}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush/80 via-cream to-ivory">
      <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative">
          <Eyebrow className="animate-rise mb-5">{eyebrow}</Eyebrow>
          <h1 className="animate-rise text-[clamp(2.3rem,10vw,3rem)] [animation-delay:80ms] md:text-6xl lg:text-7xl">{title}</h1>
          <p className="animate-rise mt-6 max-w-xl text-lg [animation-delay:160ms]">{lead}</p>
          {children && <div className="animate-rise mt-9 [animation-delay:240ms]">{children}</div>}
        </div>
        <div className="animate-rise relative mx-auto w-full max-w-md [animation-delay:200ms] lg:max-w-none">
          <Photo image={image} alt={imageAlt} priority position={imagePosition} className="aspect-[4/5] lg:aspect-[5/6]" />
          {note && (
            <ScriptNote className="absolute -bottom-6 -left-4 -rotate-6 rounded-2xl bg-ivory/90 px-5 py-3 shadow-soft backdrop-blur sm:-left-10">
              {note}
            </ScriptNote>
          )}
        </div>
      </Container>
    </section>
  );
}
