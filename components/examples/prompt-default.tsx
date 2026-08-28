import { Prompt } from "@/registry/terminal/components/prompt";

export function PromptDefault() {
  return <Prompt className="w-full" placeholder="mount /spool --force" />;
}
