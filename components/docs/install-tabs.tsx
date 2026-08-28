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

/**
 * Two ways to get an item. Run the CLI, or paste the file.
 *
 * `Command` first, because the registry exists so that you do not have to do
 * the other one. `Manual` is there for the project that cannot run the CLI, and
 * for the reader who wants to see what they are agreeing to before they do.
 *
 * An item with no files, the theme and the style, has no manual path. There is
 * nothing to paste, only variables and other items, so it gets the command
 * alone.
 */
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

  if (sources.length === 0) {
    return <CommandTab args={args} />;
  }

  const dependencies =
    packages.length > 0
      ? await highlight(`npm install ${packages.join(" ")}`, "bash")
      : null;

  return (
    <Tabs defaultValue="command">
      <TabsList>
        <TabsTrigger value="command">Command</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      {/* `animate-none` opts out of the registry's own panel entrance. The
          type-on reveal is built for a block of code and reads as a stutter on
          two lines of install command. The component keeps it for consumers who
          are switching between larger panels. */}
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

/** The same command in every runner, since the prefix is the only difference. */
function CommandTab({ args }: { args: string }) {
  return (
    <Tabs defaultValue="npm">
      <TabsList variant="line">
        {RUNNERS.map((runner) => (
          <TabsTrigger key={runner.name} value={runner.name}>
            {runner.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {RUNNERS.map((runner) => (
        <TabsContent
          className="animate-none"
          key={runner.name}
          value={runner.name}
        >
          <CopyCommand command={`${runner.command} ${args}`} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
