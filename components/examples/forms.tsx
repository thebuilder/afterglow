import { AlignLeftIcon, BoldIcon, ItalicIcon } from "lucide-react";

import type { ExampleMap } from "@/lib/example";
import { Checkbox } from "@/registry/terminal/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/terminal/ui/input-otp";
import { Label } from "@/registry/terminal/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/terminal/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/terminal/ui/select";
import { Slider } from "@/registry/terminal/ui/slider";
import { Switch } from "@/registry/terminal/ui/switch";
import { Toggle } from "@/registry/terminal/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/terminal/ui/toggle-group";

export const formExamples: ExampleMap = {
  checkbox: [
    {
      name: "Default",
      description:
        "Square, sharp, and filled with the beam when it is on: the one state change worth making unmissable in a form.",
      node: (
        <div className="grid gap-3">
          <div className="flex items-center gap-2.5">
            <Checkbox defaultChecked id="ex-cb-1" />
            <Label htmlFor="ex-cb-1">Mount read-write</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox id="ex-cb-2" />
            <Label htmlFor="ex-cb-2">Skip consistency pass</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox disabled id="ex-cb-3" />
            <Label htmlFor="ex-cb-3">Rebuild index</Label>
          </div>
        </div>
      ),
    },
  ],

  "radio-group": [
    {
      name: "Default",
      description:
        "The one round shape in the set. A terminal has always drawn radios with parentheses and checkboxes with brackets, so the convention and the aesthetic agree here.",
      node: (
        <RadioGroup defaultValue="fast">
          <div className="flex items-center gap-2.5">
            <RadioGroupItem id="ex-r-1" value="fast" />
            <Label htmlFor="ex-r-1">Fast mount</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <RadioGroupItem id="ex-r-2" value="checked" />
            <Label htmlFor="ex-r-2">Mount with check</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <RadioGroupItem id="ex-r-3" value="readonly" />
            <Label htmlFor="ex-r-3">Read-only</Label>
          </div>
        </RadioGroup>
      ),
    },
  ],

  switch: [
    {
      name: "Sizes",
      description:
        "A rocker, not a pill. The pill is the one shape this system cannot borrow: a rounded switch on a page of hairline rectangles is the single element that gives the theme away.",
      node: (
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Switch defaultChecked id="ex-sw-1" />
            <Label htmlFor="ex-sw-1">Beacon</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="ex-sw-2" />
            <Label htmlFor="ex-sw-2">Verbose log</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked id="ex-sw-3" size="sm" />
            <Label htmlFor="ex-sw-3">Small</Label>
          </div>
        </div>
      ),
    },
  ],

  select: [
    {
      name: "Default",
      node: (
        <Select defaultValue="/core">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Pick a volume" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mounted</SelectLabel>
              <SelectItem value="/core">/core</SelectItem>
              <SelectItem value="/archive">/archive</SelectItem>
              <SelectItem value="/scratch">/scratch</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Unavailable</SelectLabel>
              <SelectItem disabled value="/spool">
                /spool
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
  ],

  slider: [
    {
      name: "Single and range",
      node: (
        <div className="grid w-full max-w-sm gap-8">
          <div className="grid gap-3">
            <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Beam</span>
              <span className="text-amber tabular-nums">72</span>
            </div>
            <Slider defaultValue={[72]} max={100} step={1} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Window</span>
              <span className="text-amber tabular-nums">20 to 80</span>
            </div>
            <Slider defaultValue={[20, 80]} max={100} step={1} />
          </div>
        </div>
      ),
    },
  ],

  "input-otp": [
    {
      name: "Six digits",
      description:
        "The caret is drawn rather than inherited: the field behind these cells is a single invisible input and has none to lend them.",
      node: (
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      ),
    },
  ],

  toggle: [
    {
      name: "Variants",
      node: (
        <div className="flex items-center gap-3">
          <Toggle aria-label="Bold" defaultPressed>
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Italic">
            <ItalicIcon />
          </Toggle>
          <Toggle aria-label="Align" variant="outline">
            <AlignLeftIcon />
            Align
          </Toggle>
        </div>
      ),
    },
  ],

  "toggle-group": [
    {
      name: "Joined",
      description:
        "The rules between items are a one-pixel gap in the group's own background, the same trick the segmented tabs use.",
      node: (
        <div className="grid gap-4">
          <ToggleGroup defaultValue={["manifest"]}>
            <ToggleGroupItem value="manifest">Manifest</ToggleGroupItem>
            <ToggleGroupItem value="hex">Hex</ToggleGroupItem>
            <ToggleGroupItem value="meta">Meta</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup defaultValue={["bold"]} multiple>
            <ToggleGroupItem aria-label="Bold" value="bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Italic" value="italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Align" value="align">
              <AlignLeftIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      ),
    },
  ],
};
