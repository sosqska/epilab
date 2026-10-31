"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { getDictionary } from "@/i18n";
import { isContactDemo, sendContactMessage, type ContactPayload } from "@/lib/submit";
import { focusFirstError, isEmail, isPhone, type Errors } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { CheckboxField, FormAlert, SelectField, TextArea, TextField } from "./Field";

const t = getDictionary();
const f = t.contact.form;
const v = t.validation;

type Values = ContactPayload & { consent: boolean; website: string };
type Key = keyof Values;

const initial: Values = { name: "", email: "", phone: "", topic: f.topics[0], message: "", consent: false, website: "" };

function validate(values: Values): Errors<Key> {
  const errors: Errors<Key> = {};
  if (values.name.trim().length < 2) errors.name = v.name;
  if (!values.email.trim() && !values.phone.trim()) errors.email = v.emailOrPhone;
  if (values.email.trim() && !isEmail(values.email)) errors.email = v.email;
  if (values.phone.trim() && !isPhone(values.phone)) errors.phone = v.phone;
  if (values.message.trim().length < 10) errors.message = v.message;
  if (!values.consent) errors.consent = v.consent;
  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<Key>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = <K extends Key>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, errors update live as the user fixes them.
    if (submitted) setErrors(validate(next));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => focusFirstError(formRef.current));
      return;
    }
    if (values.website) return; // honeypot: bots fill hidden fields

    setStatus("sending");
    try {
      const { name, email, phone, topic, message } = values;
      await sendContactMessage({ name, email, phone, topic, message });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="animate-rise flex flex-col items-center py-12 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-blush text-rose-ink">
          <CircleCheck className="size-8" strokeWidth={1.25} aria-hidden />
        </span>
        <h3 className="mt-6 text-4xl">{f.successTitle}</h3>
        <p className="mt-3 max-w-sm">{f.successText}</p>
        {isContactDemo && <p className="mt-4 max-w-sm text-xs text-muted">{f.demo}</p>}
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setSubmitted(false);
            setStatus("idle");
          }}
        >
          {f.again}
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <FormAlert tone="error" title={f.errorTitle}>
          {f.errorText}
        </FormAlert>
      )}
      {submitted && errorCount > 0 && (
        <p className="sr-only" role="alert">
          {v.summary}
        </p>
      )}

      <TextField
        id="name"
        label={f.name}
        required
        autoComplete="given-name"
        value={values.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="email"
          type="email"
          label={f.email}
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          id="phone"
          type="tel"
          label={f.phone}
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
      </div>
      <SelectField id="topic" label={f.topic} options={f.topics} value={values.topic} onChange={(e) => set("topic", e.target.value)} />
      <TextArea
        id="message"
        label={f.message}
        required
        placeholder={f.messagePlaceholder}
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
        error={errors.message}
      />

      {/* Honeypot, hidden from people and assistive tech */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <CheckboxField id="consent" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} error={errors.consent}>
        {f.consent}{" "}
        <Link href="/polityka-prywatnosci" className="text-rose-ink underline underline-offset-2">
          {f.consentLink}
        </Link>
        .<span className="text-rose-ink"> *</span>
      </CheckboxField>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{f.text}</p>
        <Button type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {status === "sending" ? f.sending : f.submit}
        </Button>
      </div>
    </form>
  );
}
