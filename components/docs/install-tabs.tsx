import Link from "next/link";

import { Step, Steps } from "@/components/docs/steps";
import { installArgs, RUNNERS } from "@/lib/registry";
import type { RegistryItem } from "@/lib/registry";
import type { Source } from "@/lib/source";
import { CodeBlock } from "@/registry/terminal/ui/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/terminal/ui/tabs";

export function InstallTabs({
  item,
  packages,
  sources,
}: {
  item: RegistryItem;
  packages: string[];
  sources: Source[];
}) {
  const args = installArgs(item);
  const sourceFirst = item.type === "registry:block";
  const registryDependencies = item.registryDependencies ?? [];
  const registryStep = registryDependencies.length > 0 ? 1 : 0;

  if (sources.length === 0) {
    return <CommandTab args={args} />;
  }

  const install =
    packages.length > 0 ? `npm install ${packages.join(" ")}` : null;

  return (
    <Tabs defaultValue={sourceFirst ? "manual" : "command"}>
      <TabsList>
        <TabsTrigger value="command">Command</TabsTrigger>
        <TabsTrigger value="manual">Source</TabsTrigger>
      </TabsList>

      {/* The registry's type-on entrance stutters on short install commands. */}
      <TabsContent className="animate-none" value="command">
        <CommandTab args={args} />
      </TabsContent>

      <TabsContent className="animate-none pt-2" value="manual">
        <Steps>
          {registryStep ? (
            <Step index={1} title="Install the required registry items.">
              <p className="text-muted-foreground text-sm">
                <Link
                  className="underline underline-offset-4"
                  href="/docs/installation#configure-the-namespace"
                >
                  Configure the Afterglow namespace
                </Link>{" "}
                first. This command also installs the shared theme and nested
                dependencies.
              </p>
              <CommandTab
                args={`shadcn@latest add ${registryDependencies.join(" ")}`}
              />
            </Step>
          ) : null}
          {install ? (
            <Step
              index={registryStep + 1}
              title="Install the following dependencies."
            >
              <CodeBlock code={install} lang="bash" />
            </Step>
          ) : null}
          <Step
            index={registryStep + (install ? 2 : 1)}
            title="Copy the following into your project."
          >
            <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
              {sources.map((source) => (
                <CodeBlock
                  code={source.text}
                  key={source.path}
                  title={source.path}
                />
              ))}
            </div>
          </Step>
          <Step
            index={registryStep + (install ? 3 : 2)}
            title="Update the import paths to match your project."
          />
        </Steps>
      </TabsContent>
    </Tabs>
  );
}

function CommandTab({ args }: { args: string }) {
  const commands = RUNNERS.map((runner) => ({
    name: runner.name,
    text: `${runner.command} ${args}`,
  }));

  return (
    <Tabs defaultValue="npm">
      <TabsList variant="line">
        {commands.map((command) => (
          <TabsTrigger key={command.name} value={command.name}>
            {command.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {commands.map((command) => (
        <TabsContent
          className="animate-none"
          key={command.name}
          value={command.name}
        >
          <CodeBlock
            className="min-w-0"
            code={command.text}
            label={`Copy: ${command.text}`}
            lang="bash"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
