export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Accepts Polish and international numbers: 9–13 digits, optional +, spaces, dashes and brackets. */
export function isPhone(value: string) {
  return /^\+?\d{9,13}$/.test(value.replace(/[\s\-()]/g, ""));
}

export type Errors<T extends string> = Partial<Record<T, string>>;

/** Moves focus to the first invalid field, in DOM order, after a failed submit. */
export function focusFirstError(form: HTMLFormElement | null) {
  form?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
}
