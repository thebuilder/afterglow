"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { setSiteGlass, useSiteGlass } from "@/components/docs/site-glass";
import { PHOSPHORS } from "@/lib/phosphor";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/terminal/ui/dropdown-menu";

const emptySubscribe = () => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function PhosphorMenu() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const { setTheme, theme } = useTheme();
  const glass = useSiteGlass();
  const selected = mounted ? theme : "green";
  const active =
    PHOSPHORS.find((phosphor) => phosphor.value === selected) ?? PHOSPHORS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Display: ${active.label} phosphor`}
        className="grid size-9 shrink-0 place-items-center border border-line bg-panel-sunken outline-none transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
      >
        <span
          aria-hidden="true"
          className="size-3.5 shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: active.color, color: active.color }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Phosphor preset</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={setTheme} value={selected}>
            {PHOSPHORS.map((phosphor) => (
              <DropdownMenuRadioItem
                className="capitalize"
                key={phosphor.value}
                value={phosphor.value}
              >
                <span
                  aria-hidden="true"
                  className="size-3 shadow-[0_0_7px_currentColor]"
                  style={{
                    backgroundColor: phosphor.color,
                    color: phosphor.color,
                  }}
                />
                {phosphor.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Glass</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={glass}
            onCheckedChange={setSiteGlass}
          >
            Scanlines
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
