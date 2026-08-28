import { Eyebrow } from "@/registry/terminal/components/eyebrow";

export function EyebrowWithAndWithoutACaret() {
  return (
    <div className="grid gap-4">
      <Eyebrow>Section label</Eyebrow>
      <Eyebrow caret>Awaiting input</Eyebrow>
    </div>
  );
}
