const INLINE_LINK = /\[([^\]]+)\]\([^)]+\)/gu;
const INLINE_CODE = /`([^`]+)`/gu;

export function stripInlineMarkdown(text: string): string {
  return text.replace(INLINE_LINK, "$1").replace(INLINE_CODE, "$1");
}
