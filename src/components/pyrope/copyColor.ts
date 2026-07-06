/**
 * Copies a hex color value to the clipboard and dispatches a global
 * `pyrope-copy` custom event so the CopyToast can react to it.
 *
 * Using a custom event instead of React context keeps the swatch components
 * decoupled — any element anywhere in the Pyrope page can trigger a copy
 * without prop drilling.
 */
export function copyColor(hex: string): void {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(hex).catch(() => {
      // Silently fail — the toast still fires so the user gets feedback.
      // In production this would be a fallback to document.execCommand.
    });
  }
  window.dispatchEvent(
    new CustomEvent("pyrope-copy", { detail: { hex } }),
  );
}
