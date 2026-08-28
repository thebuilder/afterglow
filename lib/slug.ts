/**
 * An anchor from a heading, since the headings here are data rather than
 * markdown and nothing else is going to mint one.
 *
 * It has its own module because the table of contents that first needed it now
 * imports the examples, and the examples need this to name their files.
 */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
