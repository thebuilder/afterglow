"use client";

import { ChevronRightIcon, RotateCcwIcon, ShuffleIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { CopyButton } from "@/components/docs/copy-button";
import { Button } from "@/registry/terminal/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/terminal/ui/select";

const OPTIONS = {
  flow: [
    { label: "Compact, 1em", value: "1em" },
    { label: "Regular, 1.25em", value: "1.25em" },
    { label: "Airy, 1.75em", value: "1.75em" },
  ],
  leading: [
    { label: "Tight, 1.5", value: "1.5" },
    { label: "Regular, 1.75", value: "1.75" },
    { label: "Loose, 2", value: "2" },
  ],
  measure: [
    { label: "60ch", value: "60ch" },
    { label: "70ch", value: "70ch" },
    { label: "80ch", value: "80ch" },
    { label: "90ch", value: "90ch" },
  ],
  size: [
    { label: "14px", value: "14px" },
    { label: "15px", value: "15px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
  ],
} as const;

type Setting = keyof typeof OPTIONS;
type Settings = Record<Setting, string>;

const DEFAULTS: Settings = {
  flow: "1.25em",
  leading: "1.75",
  measure: "80ch",
  size: "16px",
};

const INSTALL_COMMAND = "npx shadcn@latest add @afterglow/theme";
const USAGE = '<article className="typeset">{content}</article>';

function Control({
  label,
  name,
  onChange,
  value,
}: {
  label: string;
  name: Setting;
  onChange: (name: Setting, value: string) => void;
  value: string;
}) {
  const labelId = `typeset-${name}-label`;
  const handleValueChange = useCallback(
    (next: string | null) => {
      if (next) {
        onChange(name, next);
      }
    },
    [name, onChange]
  );

  return (
    <div className="grid min-w-32 gap-2 lg:min-w-0">
      <span
        className="font-bold font-mono text-3xs text-muted-foreground uppercase tracking-terminal-xl"
        id={labelId}
      >
        {label}
      </span>
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger aria-labelledby={labelId} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {OPTIONS[name].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function TypesetSpecimen() {
  return (
    <>
      <h1>Field notes from the phosphor terminal</h1>
      <p>
        Afterglow typesets rendered HTML with the same palette and font stacks
        as its components. Wrap content in <code>typeset</code> and the theme
        handles the rhythm.
      </p>
      <p>
        The class works for documentation, release notes, and markdown you do
        not control. Inline <a href="#signal-path">links</a>,{" "}
        <strong>strong text</strong>, and <mark>marked passages</mark> share the
        terminal language.
      </p>
      <h2 id="signal-path">Signal path</h2>
      <ul>
        <li>Headings use the theme's monospace stack.</li>
        <li>Body copy keeps the sans-serif stack for long reading.</li>
        <li>Code, keys, rules, and tables reuse existing semantic tokens.</li>
      </ul>
      <blockquote>
        A useful typeset should make unknown HTML readable before anyone adds
        component-specific classes.
      </blockquote>
      <h3>Configuration</h3>
      <pre>
        <code>
          {
            ".release-notes {\n  --typeset-measure: 70ch;\n  --typeset-flow: 1.5em;\n}"
          }
        </code>
      </pre>
      <table>
        <caption>Current terminal channels</caption>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Status</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Core</td>
            <td>Online</td>
            <td>18 ms</td>
          </tr>
          <tr>
            <td>Archive</td>
            <td>Indexing</td>
            <td>42 ms</td>
          </tr>
        </tbody>
      </table>
      <h4>Apply it anywhere</h4>
      <p>
        The four variables inherit, so a page can set one rhythm while a nested
        chat transcript uses another.
      </p>
      <hr />
      <h2>Operational notes</h2>
      <p>
        A typeset can sit inside a narrow activity feed or fill a documentation
        column. The surrounding layout controls the available width, while the
        measure keeps long lines readable.
      </p>
      <ol>
        <li>Install the theme once through the Afterglow registry.</li>
        <li>Wrap rendered content with the typeset class.</li>
        <li>Override only the rhythm variables that the context needs.</li>
      </ol>
      <h3>Inherited settings</h3>
      <p>
        Set variables on a parent when several content regions should share the
        same rhythm. A nested region can still override one value without
        repeating the others.
      </p>
      <dl>
        <dt>Measure</dt>
        <dd>The longest allowed line before text wraps.</dd>
        <dt>Leading</dt>
        <dd>The distance between baselines within a text block.</dd>
        <dt>Flow</dt>
        <dd>The vertical distance between separate content blocks.</dd>
      </dl>
      <details>
        <summary>Why use inherited variables?</summary>
        <p>
          They let the same rendered markup adapt to a page, panel, or message
          without adding classes to every child element.
        </p>
      </details>
    </>
  );
}

export function TypesetBuilder() {
  const [settings, setSettings] = useState(DEFAULTS);
  const css = useMemo(
    () =>
      `.typeset-custom {\n  --typeset-size: ${settings.size};\n  --typeset-leading: ${settings.leading};\n  --typeset-flow: ${settings.flow};\n  --typeset-measure: ${settings.measure};\n}`,
    [settings]
  );

  const update = useCallback((name: Setting, value: string) => {
    setSettings((current) => ({ ...current, [name]: value }));
  }, []);

  const shuffle = useCallback(() => {
    setSettings(
      Object.fromEntries(
        Object.entries(OPTIONS).map(([name, options]) => [
          name,
          options[Math.floor(Math.random() * options.length)].value,
        ])
      ) as Settings
    );
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  return (
    <div className="grid min-h-0 gap-5 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[13rem_minmax(0,1fr)_18rem]">
      <Card className="self-start lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Typeset controls</CardTitle>
          <CardDescription>
            Tune the reading width and vertical rhythm.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 overflow-x-auto lg:grid">
          <Control
            label="Measure"
            name="measure"
            onChange={update}
            value={settings.measure}
          />
          <Control
            label="Size"
            name="size"
            onChange={update}
            value={settings.size}
          />
          <Control
            label="Leading"
            name="leading"
            onChange={update}
            value={settings.leading}
          />
          <Control
            label="Flow"
            name="flow"
            onChange={update}
            value={settings.flow}
          />
        </CardContent>
        <div className="flex gap-2 border-line border-t px-5 pt-4">
          <Button className="flex-1" onClick={shuffle} size="sm">
            <ShuffleIcon />
            Shuffle
          </Button>
          <Button
            aria-label="Reset typeset controls"
            onClick={reset}
            size="icon-sm"
            variant="outline"
          >
            <RotateCcwIcon />
          </Button>
        </div>
      </Card>

      <div className="grid min-w-0 gap-5">
        <div className="min-h-[36rem] overflow-x-auto border border-line bg-panel-sunken px-5 py-8 sm:px-10 lg:px-14">
          <article
            className="typeset mx-auto"
            style={
              {
                "--typeset-flow": settings.flow,
                "--typeset-leading": settings.leading,
                "--typeset-measure": settings.measure,
                "--typeset-size": settings.size,
              } as React.CSSProperties
            }
          >
            <TypesetSpecimen />
          </article>
        </div>

        <div className="border border-line bg-panel-sunken">
          <div className="flex items-center justify-between gap-4 border-line border-b px-3 py-2">
            <span className="font-mono text-2xs text-muted-foreground tracking-terminal-xs">
              Custom values
            </span>
            <CopyButton label="Copy custom typeset CSS" text={css} />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-phosphor text-xs leading-relaxed">
            <code>{css}</code>
          </pre>
        </div>
      </div>

      <aside
        aria-label="Typeset setup"
        className="lg:col-start-2 xl:col-start-auto"
      >
        <Card className="xl:sticky xl:top-20">
          <CardHeader>
            <CardTitle>Use this typeset</CardTitle>
            <CardDescription>
              The class ships with the theme. Existing Afterglow projects
              already have it after rebuilding the registry item.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <section className="grid gap-2">
              <h2 className="font-bold font-mono text-3xs text-muted-foreground uppercase tracking-terminal-xl">
                01 Install
              </h2>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border border-line bg-panel-sunken p-2">
                <code className="min-w-0 break-all whitespace-pre-wrap font-mono text-phosphor-bright text-xs leading-5">
                  {INSTALL_COMMAND}
                </code>
                <CopyButton
                  label="Copy theme install command"
                  text={INSTALL_COMMAND}
                />
              </div>
            </section>

            <section className="grid gap-2">
              <h2 className="font-bold font-mono text-3xs text-muted-foreground uppercase tracking-terminal-xl">
                02 Wrap content
              </h2>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border border-line bg-panel-sunken p-2">
                <code className="min-w-0 break-all whitespace-pre-wrap font-mono text-phosphor-bright text-xs leading-5">
                  {USAGE}
                </code>
                <CopyButton label="Copy typeset markup" text={USAGE} />
              </div>
            </section>

            <section className="grid gap-2">
              <h2 className="font-bold font-mono text-3xs text-muted-foreground uppercase tracking-terminal-xl">
                03 Tune
              </h2>
              <dl className="grid gap-2 font-mono text-xs">
                {Object.entries(DEFAULTS).map(([name, value]) => (
                  <div
                    className="flex items-baseline justify-between gap-3 border-line border-b pb-2"
                    key={name}
                  >
                    <dt className="text-muted-foreground">--typeset-{name}</dt>
                    <dd className="text-phosphor-bright">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <Button
              nativeButton={false}
              render={<Link href="/docs/theming" />}
              variant="outline"
            >
              Theme guide
              <ChevronRightIcon />
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
