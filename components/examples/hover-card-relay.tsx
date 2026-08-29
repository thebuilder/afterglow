import { ActivityIcon, RadioTowerIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/terminal/ui/hover-card";

export function HoverCardRelay() {
  return (
    <p className="font-mono text-sm text-muted-foreground">
      Downlink routed through{" "}
      <HoverCard>
        <HoverCardTrigger
          className="border-phosphor-dim border-b border-dotted text-phosphor-bright outline-none focus-visible:border-solid"
          href="#relay-r7"
        >
          relay/r7
        </HoverCardTrigger>
        <HoverCardContent align="start" id="relay-r7">
          <div className="flex items-start gap-3">
            <RadioTowerIcon className="mt-0.5 size-5 text-phosphor" />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-phosphor-bright uppercase tracking-terminal">
                Relay R7
              </p>
              <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                North array. Carrier locked on 14.230 MHz.
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-phosphor text-xs">
                <ActivityIcon className="size-3.5" />
                76 dB, nominal
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      .
    </p>
  );
}
