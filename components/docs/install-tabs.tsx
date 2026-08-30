import { CopyCommand } from "@/components/copy-command";
import { CodeBlock } from "@/components/docs/code-block";
import { Step, Steps } from "@/components/docs/steps";
import { highlight } from "@/lib/code";
import { installArgs, type RegistryItem, RUNNERS } from "@/lib/registry";
import type { Source } from "@/lib/source";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/terminal/ui/tabs";

export async function InstallTabs({
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

  if (sources.length === 0) {
    return <CommandTab args={args} />;
  }

  const dependencies =
    packages.length > 0
      ? await highlight(`npm install ${packages.join(" ")}`, "bash")
      : null;

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
          {dependencies ? (
            <Step index={1} title="Install the following dependencies.">
              <CodeBlock
                html={dependencies}
                text={`npm install ${packages.join(" ")}`}
              />
            </Step>
          ) : null}
          <Step
            index={dependencies ? 2 : 1}
            title="Copy the following into your project."
          >
            <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
              {sources.map((source) => (
                <CodeBlock
                  html={source.html}
                  key={source.path}
                  text={source.text}
                  title={source.path}
                />
              ))}
            </div>
          </Step>
          <Step
            index={dependencies ? 3 : 2}
            title="Update the import paths to match your project."
          />
        </Steps>
      </TabsContent>
    </Tabs>
  );
}

async function CommandTab({ args }: { args: string }) {
  const commands = await Promise.all(
    RUNNERS.map(async (runner) => {
      const text = `${runner.command} ${args}`;
      return { html: await highlight(text, "bash"), name: runner.name, text };
    })
  );

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
          <CopyCommand html={command.html} text={command.text} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
