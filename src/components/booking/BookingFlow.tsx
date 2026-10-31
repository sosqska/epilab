"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, CircleCheck, Clock, LoaderCircle } from "lucide-react";
import { contact } from "@/content/site";
import { formatDuration, formatPrice, priceList, trialSession } from "@/content/pricing";
import { getDictionary } from "@/i18n";
import { bookingWindowDays, fromISODate, getSlots, startOfToday, toISODate } from "@/lib/availability";
import { isBookingDemo, submitBooking } from "@/lib/submit";
import { focusFirstError, isEmail, isPhone, type Errors } from "@/lib/validation";
import { cn } from "@/lib/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { InstagramIcon } from "@/components/ui/icons";
import { CheckboxField, FormAlert, TextArea, TextField } from "@/components/forms/Field";

const t = getDictionary();
const b = t.booking;
const v = t.validation;

type Service = { key: string; minutes: number; title: string; price: string; note?: string };

const services: Service[] = [
  {
    key: "trial",
    minutes: trialSession.minutes,
    title: b.service.trial,
    price: t.common.free,
    note: `${b.service.trialDesc} (${formatPrice(trialSession.electrodeFee)})`,
  },
  ...priceList.map(({ minutes, price }) => ({
    key: `m${minutes}`,
    minutes,
    title: b.service.regular,
    price: formatPrice(price),
  })),
];

type Details = { name: string; phone: string; email: string; notes: string; firstVisit: boolean; consent: boolean };
type DetailKey = keyof Details;

const emptyDetails: Details = { name: "", phone: "", email: "", notes: "", firstVisit: false, consent: false };

function validateDetails(d: Details): Errors<DetailKey> {
  const e: Errors<DetailKey> = {};
  if (d.name.trim().length < 2) e.name = v.name;
  if (!d.phone.trim()) e.phone = v.required;
  else if (!isPhone(d.phone)) e.phone = v.phone;
  if (d.email.trim() && !isEmail(d.email)) e.email = v.email;
  if (!d.consent) e.consent = v.consent;
  return e;
}

const dateFormatter = new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "numeric", month: "long" });
const monthFormatter = new Intl.DateTimeFormat("pl-PL", { month: "long", year: "numeric" });

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [serviceKey, setServiceKey] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Errors<DetailKey>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [month, setMonth] = useState(() => {
    const d = startOfToday();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstRender = useRef(true);

  const service = services.find((s) => s.key === serviceKey) ?? null;

  // /rezerwacja/?usluga=trial preselects a service (links from the price list).
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("usluga");
    const key = preset === "trial" ? "trial" : preset ? `m${preset}` : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of the URL after hydration
    if (key && services.some((s) => s.key === key)) setServiceKey(key);
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  const slots = useMemo(() => (date && service ? getSlots(date, service.minutes) : []), [date, service]);

  const setDetail = <K extends DetailKey>(key: K, value: Details[K]) => {
    const next = { ...details, [key]: value };
    setDetails(next);
    if (Object.keys(errors).length) setErrors(validateDetails(next));
  };

  function next() {
    setStepError(null);
    if (step === 0 && !service) return setStepError(b.service.title);
    if (step === 1 && (!date || !time)) return setStepError(!date ? b.date.pickDayFirst : b.date.timeTitle);
    if (step === 2) {
      const found = validateDetails(details);
      setErrors(found);
      if (Object.keys(found).length) {
        requestAnimationFrame(() => focusFirstError(formRef.current));
        return;
      }
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStepError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  async function confirm() {
    if (!service || !date || !time) return;
    setStatus("sending");
    try {
      await submitBooking({
        service: service.key === "trial" ? b.service.trial : `${b.service.regular} ${formatDuration(service.minutes)}`,
        durationMinutes: service.minutes,
        priceLabel: service.price,
        areas,
        date,
        time,
        name: details.name.trim(),
        phone: details.phone.trim(),
        email: details.email.trim(),
        notes: details.notes.trim(),
        firstVisit: details.firstVisit,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStep(0);
    setServiceKey(null);
    setAreas([]);
    setDate(null);
    setTime(null);
    setDetails(emptyDetails);
    setErrors({});
    setStatus("idle");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 3) next();
    else void confirm();
  }

  const dateLabel = date ? dateFormatter.format(fromISODate(date)) : null;

  if (status === "success") {
    return (
      <div ref={rootRef} className="scroll-mt-28">
        <div role="status" className="animate-rise mx-auto max-w-2xl rounded-[2rem] border border-line bg-white/80 p-8 text-center shadow-soft md:p-14">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-blush text-rose-ink">
            <CircleCheck className="size-10" strokeWidth={1} aria-hidden />
          </span>
          <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-4xl outline-none md:text-5xl">
            {b.success.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md">{b.success.text}</p>
          <dl className="mx-auto mt-8 grid max-w-md gap-3 rounded-2xl bg-cream p-6 text-left text-sm">
            <SummaryRow label={b.summary.service} value={service ? `${service.title} · ${formatDuration(service.minutes)}` : ""} />
            <SummaryRow label={b.summary.date} value={`${dateLabel}, ${time}`} />
            <SummaryRow label={b.summary.price} value={service?.price ?? ""} />
          </dl>
          {isBookingDemo && <p className="mx-auto mt-6 max-w-md text-xs text-muted">{b.success.demo}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={reset}>
              {b.success.another}
            </Button>
            <ButtonLink href="/" variant="ghost" icon="arrow">
              {b.success.home}
            </ButtonLink>
          </div>
          <ScriptNote className="mt-8 -rotate-3">{b.success.note}</ScriptNote>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-28">
      {isBookingDemo && (
        <div className="mb-8">
          <FormAlert tone="info">
            {b.demoNotice}{" "}
            <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-rose-ink underline underline-offset-2">
              <InstagramIcon className="size-3.5" />
              Instagram
            </a>
          </FormAlert>
        </div>
      )}

      {/* Stepper */}
      <ol className="mb-8 grid grid-cols-4 gap-2">
        {b.steps.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-2">
            <span className={cn("h-1 rounded-full transition-colors duration-500", i <= step ? "bg-rose-dark" : "bg-line")} />
            <span className={cn("flex items-center gap-1.5 text-xs sm:text-sm", i === step ? "text-ink" : "text-muted")}>
              {i < step ? <Check className="size-3.5 text-rose-dark" strokeWidth={2} aria-hidden /> : <span className="font-serif">{i + 1}.</span>}
              <span className={cn(i !== step && "hidden sm:inline")}>{label}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-line bg-white/75 p-6 shadow-soft sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {b.stepLabel} {step + 1} {b.of} {b.steps.length}
          </p>

          {step === 0 && (
            <div className="animate-rise">
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-4xl outline-none">
                {b.service.title}
              </h2>
              <fieldset className="mt-8">
                <legend className="sr-only">{b.service.title}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const checked = s.key === serviceKey;
                    return (
                      <label
                        key={s.key}
                        className={cn(
                          "relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-ink has-[:focus-visible]:ring-offset-2",
                          checked ? "border-rose-dark bg-blush/60" : "border-line bg-ivory/60 hover:border-rose/60",
                          s.key === "trial" && "sm:col-span-2",
                        )}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={s.key}
                          checked={checked}
                          onChange={() => {
                            setServiceKey(s.key);
                            setTime(null);
                            setStepError(null);
                          }}
                          className="sr-only"
                        />
                        <span>
                          <span className="block font-serif text-2xl text-ink">{formatDuration(s.minutes)}</span>
                          <span className="block text-sm">{s.title}</span>
                          {s.note && <span className="mt-0.5 block text-xs text-muted">{s.note}</span>}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-serif text-xl text-rose-ink">{s.price}</span>
                          <span
                            className={cn(
                              "flex size-5 items-center justify-center rounded-full border transition-colors",
                              checked ? "border-rose-dark bg-rose-dark text-white" : "border-rose/60",
                            )}
                            aria-hidden
                          >
                            {checked && <Check className="size-3" strokeWidth={2.5} />}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-10">
                <legend className="text-sm text-ink">{b.service.areas}</legend>
                <p className="mt-1 text-xs text-muted">{b.service.areasHint}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.service.areaOptions.map((area) => {
                    const on = areas.includes(area);
                    return (
                      <label
                        key={area}
                        className={cn(
                          "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-ink",
                          on ? "border-rose-dark bg-rose-dark text-white" : "border-line bg-ivory/60 hover:border-rose",
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() => setAreas((prev) => (on ? prev.filter((a) => a !== area) : [...prev, area]))}
                        />
                        {area}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && service && (
            <div className="animate-rise">
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-4xl outline-none">
                {b.date.title}
              </h2>
              <div className="mt-8 grid gap-10 xl:grid-cols-[1.15fr_1fr]">
                <Calendar
                  month={month}
                  onMonthChange={setMonth}
                  selected={date}
                  minutes={service.minutes}
                  onSelect={(iso) => {
                    setDate(iso);
                    setTime(null);
                    setStepError(null);
                  }}
                />
                <div>
                  <h3 className="flex items-center gap-2 font-sans text-sm font-medium text-ink">
                    <Clock className="size-4 text-rose-dark" strokeWidth={1.5} aria-hidden />
                    {b.date.timeTitle}
                  </h3>
                  {dateLabel && <p className="mt-1 text-sm text-muted first-letter:uppercase">{dateLabel}</p>}
                  <div className="mt-4" aria-live="polite">
                    {!date ? (
                      <p className="rounded-2xl bg-cream p-5 text-sm text-muted">{b.date.pickDayFirst}</p>
                    ) : slots.length === 0 ? (
                      <p className="rounded-2xl bg-cream p-5 text-sm text-muted">{b.date.noSlots}</p>
                    ) : (
                      <div role="group" aria-label={b.date.timeTitle} className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-3">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            aria-pressed={slot === time}
                            onClick={() => {
                              setTime(slot);
                              setStepError(null);
                            }}
                            className={cn(
                              "rounded-xl border py-2.5 text-sm tabular-nums transition-colors",
                              slot === time ? "border-rose-dark bg-rose-dark text-white" : "border-line bg-ivory/60 hover:border-rose-dark",
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-rise">
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-4xl outline-none">
                {b.details.title}
              </h2>
              {Object.keys(errors).length > 0 && (
                <p className="sr-only" role="alert">
                  {v.summary}
                </p>
              )}
              <div className="mt-8 space-y-5">
                <TextField
                  id="b-name"
                  label={b.details.name}
                  required
                  autoComplete="name"
                  value={details.name}
                  onChange={(e) => setDetail("name", e.target.value)}
                  error={errors.name}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="b-phone"
                    type="tel"
                    inputMode="tel"
                    label={b.details.phone}
                    required
                    autoComplete="tel"
                    value={details.phone}
                    onChange={(e) => setDetail("phone", e.target.value)}
                    error={errors.phone}
                  />
                  <TextField
                    id="b-email"
                    type="email"
                    label={b.details.email}
                    autoComplete="email"
                    value={details.email}
                    onChange={(e) => setDetail("email", e.target.value)}
                    error={errors.email}
                  />
                </div>
                <TextArea
                  id="b-notes"
                  label={b.details.notes}
                  rows={3}
                  placeholder={b.details.notesPlaceholder}
                  value={details.notes}
                  onChange={(e) => setDetail("notes", e.target.value)}
                />
                <CheckboxField id="b-first" checked={details.firstVisit} onChange={(e) => setDetail("firstVisit", e.target.checked)}>
                  {b.details.firstVisit}
                </CheckboxField>
                <CheckboxField id="b-consent" checked={details.consent} onChange={(e) => setDetail("consent", e.target.checked)} error={errors.consent}>
                  {b.details.consent}{" "}
                  <Link href="/polityka-prywatnosci" className="text-rose-ink underline underline-offset-2">
                    {b.details.consentLink}
                  </Link>
                  .<span className="text-rose-ink"> *</span>
                </CheckboxField>
              </div>
            </div>
          )}

          {step === 3 && service && (
            <div className="animate-rise">
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-4xl outline-none">
                {b.summary.title}
              </h2>
              {status === "error" && (
                <div className="mt-6">
                  <FormAlert tone="error" title={b.error.title}>
                    {b.error.text}
                  </FormAlert>
                </div>
              )}
              <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
                <ReviewRow label={b.summary.service} onEdit={() => setStep(0)} editLabel={b.summary.edit}>
                  {service.title} · {formatDuration(service.minutes)}
                  {areas.length > 0 && <span className="block text-sm text-muted">{areas.join(", ")}</span>}
                </ReviewRow>
                <ReviewRow label={b.summary.date} onEdit={() => setStep(1)} editLabel={b.summary.edit}>
                  <span className="first-letter:uppercase">{dateLabel}</span>, {time}
                </ReviewRow>
                <ReviewRow label={b.summary.client} onEdit={() => setStep(2)} editLabel={b.summary.edit}>
                  {details.name}
                  <span className="block text-sm text-muted">
                    {details.phone}
                    {details.email && ` · ${details.email}`}
                  </span>
                  {details.notes && <span className="mt-1 block text-sm text-muted italic">„{details.notes}”</span>}
                </ReviewRow>
                <ReviewRow label={b.summary.price}>
                  <span className="font-serif text-2xl text-rose-ink">{service.price}</span>
                  {service.note && <span className="block text-sm text-muted">{service.note}</span>}
                </ReviewRow>
              </dl>
              <p className="mt-5 text-sm text-muted">{b.summary.policy}</p>
            </div>
          )}

          {stepError && (
            <p role="alert" className="mt-6 text-sm text-[#a2442f]">
              {stepError}
            </p>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={back} disabled={status === "sending"}>
                <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
                {b.back}
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  {b.sending}
                </>
              ) : step < 3 ? (
                <>
                  {b.next}
                  <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
                </>
              ) : status === "error" ? (
                b.error.retry
              ) : (
                b.confirm
              )}
            </Button>
          </div>
        </form>

        {/* Running summary */}
        <aside className="self-start rounded-[2rem] bg-blush p-7 lg:sticky lg:top-28" aria-label={b.summary.yourBooking}>
          <h2 className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-rose-ink">
            <CalendarDays className="size-4" strokeWidth={1.5} aria-hidden />
            {b.summary.yourBooking}
          </h2>
          {service ? (
            <dl className="mt-5 space-y-4 text-sm">
              <SummaryRow label={b.summary.service} value={`${service.title} · ${formatDuration(service.minutes)}`} />
              {areas.length > 0 && <SummaryRow label={b.summary.areas} value={areas.join(", ")} />}
              {date && <SummaryRow label={b.summary.date} value={`${dateLabel}${time ? `, ${time}` : ""}`} />}
              <div className="border-t border-white/70 pt-4">
                <SummaryRow label={b.summary.price} value={service.price} large />
              </div>
            </dl>
          ) : (
            <p className="mt-5 text-sm text-muted">{b.summary.empty}</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-right text-ink first-letter:uppercase", large && "font-serif text-2xl text-rose-ink")}>{value}</dd>
    </div>
  );
}

function ReviewRow({
  label,
  children,
  onEdit,
  editLabel,
}: {
  label: string;
  children: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-5">
      <div>
        <dt className="text-xs uppercase tracking-[0.18em] text-muted">{label}</dt>
        <dd className="mt-1 text-ink">{children}</dd>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="shrink-0 text-sm text-rose-ink underline-offset-4 hover:underline">
          {editLabel}
          <span className="sr-only">: {label}</span>
        </button>
      )}
    </div>
  );
}

function Calendar({
  month,
  onMonthChange,
  selected,
  minutes,
  onSelect,
}: {
  month: Date;
  onMonthChange: (d: Date) => void;
  selected: string | null;
  minutes: number;
  onSelect: (iso: string) => void;
}) {
  const today = startOfToday();
  const lastDay = new Date(today);
  lastDay.setDate(lastDay.getDate() + bookingWindowDays);

  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const leading = (firstOfMonth.getDay() + 6) % 7; // Monday-first grid
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const canPrev = firstOfMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= lastDay;

  const cells = Array.from({ length: leading + daysInMonth }, (_, i) => {
    if (i < leading) return null;
    const d = new Date(month.getFullYear(), month.getMonth(), i - leading + 1);
    const iso = toISODate(d);
    return { d, iso, available: getSlots(iso, minutes).length > 0, isToday: iso === toISODate(today) };
  });

  const shift = (delta: number) => onMonthChange(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-serif text-2xl text-ink first-letter:uppercase" aria-live="polite">
          {monthFormatter.format(month)}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={!canPrev}
            aria-label={b.date.prevMonth}
            className="flex size-9 items-center justify-center rounded-full border border-line text-rose-ink transition-colors hover:border-rose-dark disabled:opacity-30"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={!canNext}
            aria-label={b.date.nextMonth}
            className="flex size-9 items-center justify-center rounded-full border border-line text-rose-ink transition-colors hover:border-rose-dark disabled:opacity-30"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center" role="group" aria-label={b.date.title}>
        {b.date.weekdays.map((w) => (
          <span key={w} className="pb-2 text-xs text-muted" aria-hidden>
            {w}
          </span>
        ))}
        {cells.map((cell, i) =>
          cell ? (
            <button
              key={cell.iso}
              type="button"
              disabled={!cell.available}
              aria-pressed={cell.iso === selected}
              aria-label={`${dateFormatter.format(cell.d)}${cell.available ? "" : ` — ${b.date.legendUnavailable}`}`}
              onClick={() => onSelect(cell.iso)}
              className={cn(
                "relative aspect-square rounded-full text-sm tabular-nums transition-colors",
                cell.iso === selected
                  ? "bg-rose-dark text-white"
                  : cell.available
                    ? "text-ink hover:bg-blush"
                    : "cursor-not-allowed text-muted/50",
                cell.isToday && cell.iso !== selected && "ring-1 ring-rose/60",
              )}
            >
              {cell.d.getDate()}
              {cell.available && cell.iso !== selected && (
                <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-rose" aria-hidden />
              )}
            </button>
          ) : (
            <span key={`pad-${i}`} aria-hidden />
          ),
        )}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-rose" aria-hidden />
          {b.date.legendAvailable}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-line" aria-hidden />
          {b.date.legendUnavailable}
        </span>
      </div>
    </div>
  );
}
