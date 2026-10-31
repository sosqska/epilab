/**
 * Copies text synchronously inside the click handler. execCommand is used first because it completes
 * before the page loses focus to the Instagram app (navigator.clipboard is async and can be cut off);
 * the async API runs as a backup.
 */
export function copyText(text: string): boolean {
  let ok = false;
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    // 16px avoids iOS zooming into the field; it is off-screen and invisible anyway.
    Object.assign(area.style, { position: "fixed", top: "0", left: "-9999px", opacity: "0", fontSize: "16px" });
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    ok = document.execCommand("copy");
    area.remove();
  } catch {
    ok = false;
  }
  navigator.clipboard?.writeText(text).catch(() => {});
  return ok;
}
