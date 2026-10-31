import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border bg-white/80 px-4 py-3.5 text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:border-rose-dark focus:shadow-[0_0_0_4px_rgb(201_157_148/0.2)] focus:outline-none";

function controlClass(error?: string) {
  return cn(control, error ? "border-[#b4533f]" : "border-line hover:border-rose/60");
}

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm text-ink">
        {label}
        {required && <span className="text-rose-ink"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#a2442f]">
          <CircleAlert className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

type Common = { id: string; label: string; error?: string; hint?: string; wrapperClassName?: string };

export function TextField({ id, label, error, hint, wrapperClassName, required, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describedBy(id, error, hint)}
        className={controlClass(error)}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({ id, label, error, hint, wrapperClassName, required, ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <textarea
        id={id}
        name={id}
        rows={5}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), "resize-y")}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  wrapperClassName,
  required,
  options,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <select
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2384544e' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  children,
  error,
  className,
  ...props
}: { id: string; children: ReactNode; error?: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <div className="flex gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-[1.1rem] shrink-0 cursor-pointer accent-rose-dark"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 ml-[1.85rem] flex items-center gap-1.5 text-sm text-[#a2442f]">
          <CircleAlert className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function FormAlert({ tone, title, children }: { tone: "error" | "info"; title?: string; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-5 py-4 text-sm",
        tone === "error" ? "border-[#e4b8ad] bg-[#fbeeea] text-[#7d3424]" : "border-line bg-cream text-body",
      )}
    >
      {title && <p className="mb-1 font-medium">{title}</p>}
      {children}
    </div>
  );
}
