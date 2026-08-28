import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Screen } from "@/registry/terminal/components/screen";

export function ScreenDefault() {
  return (
    <Screen className="grid w-full place-items-center gap-2 px-6 py-10">
      <Eyebrow caret>Standby</Eyebrow>
      <p className="font-mono text-lg text-phosphor-bright">NO SIGNAL</p>
    </Screen>
  );
}
