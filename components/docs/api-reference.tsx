import { Prose } from "@/components/docs/prose";
import { documentedParts, type ItemDoc, type PartDoc } from "@/lib/doc";
import { cn } from "@/lib/utils";

/**
 * The part of the API that is ours.
 *
 * Every primitive here is a redrawing of a Base UI part, so all but a handful
 * of its props belong to Base UI. Restating them would be a copy that goes
 * stale on somebody else's release schedule, and a worse copy than the one
 * upstream. What is listed here is the parts an item exports and the props
 * afterglow adds; the link at the end is where the rest lives.
 *
 * Three columns, and no Description. The sentence sits above the table, where
 * it has the width to be a sentence.
 */
export function ApiReference({ doc }: { doc: ItemDoc }) {
  const parts = documentedParts(doc);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
      {doc.notes?.map((note) => (
        <Prose key={note}>{note}</Prose>
      ))}

      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}

      {doc.upstream && doc.upstream.length > 0 ? (
        <p className="max-w-prose text-pretty text-muted-foreground text-sm">
          Everything else is{" "}
          {doc.upstream.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? " and " : null}
              <a
                className="text-phosphor underline decoration-line-strong underline-offset-4 transition-colors hover:text-phosphor-bright"
                href={link.href}
                rel="noopener"
                target="_blank"
              >
                {link.label}
              </a>
            </span>
          ))}
          {"'s API, documented there."}
        </p>
      ) : null}
    </div>
  );
}

function Part({ part }: { part: PartDoc }) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <h3
        className="scroll-mt-20 font-medium font-mono text-phosphor-bright text-sm"
        id={part.name.toLowerCase()}
      >
        {part.name}
      </h3>
      {part.summary ? <Prose>{part.summary}</Prose> : null}
      {part.props && part.props.length > 0 ? (
        <div className="overflow-x-auto border border-line">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className="border-line border-b bg-panel-sunken text-left">
                <Cell head>Prop</Cell>
                <Cell fill head>
                  Type
                </Cell>
                <Cell head>Default</Cell>
              </tr>
            </thead>
            <tbody>
              {part.props.map((prop) => (
                <tr
                  className="border-line/60 border-b last:border-b-0"
                  key={prop.name}
                >
                  <Cell>
                    <span className="text-phosphor">{prop.name}</span>
                  </Cell>
                  <Cell fill>
                    <span className="text-muted-foreground">{prop.type}</span>
                  </Cell>
                  <Cell>
                    <span className="text-phosphor-dim">
                      {prop.default ?? "-"}
                    </span>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

/**
 * `fill` takes the slack, and it goes on the type column.
 *
 * A prop name and a default are a few characters; a type is a union of six.
 * Giving the width to either of the short columns starves the one that needs
 * it, and a union broken across five lines one word at a time is unreadable.
 * `w-px` with `nowrap` is how a table column is told to hug its contents.
 */
function Cell({
  children,
  fill = false,
  head = false,
}: {
  children: React.ReactNode;
  fill?: boolean;
  head?: boolean;
}) {
  const className = cn(
    "px-3 py-2 align-top",
    fill ? "w-full" : "w-px whitespace-nowrap"
  );

  return head ? (
    <th
      className={cn(
        className,
        "font-semibold text-3xs text-phosphor-dim uppercase tracking-terminal-lg"
      )}
      scope="col"
    >
      {children}
    </th>
  ) : (
    <td className={className}>{children}</td>
  );
}
