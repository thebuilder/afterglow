const INLINE_LINK = /\[([^\]]+)\]\([^)]+\)/g;
const INLINE_CODE = /`([^`]+)`/g;

export function stripInlineMarkdown(text: string): string {
  return text.replace(INLINE_LINK, "$1").replace(INLINE_CODE, "$1");
}
