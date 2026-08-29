import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ className, href, ...props }) => {
      const linkClassName = cn(
        "text-phosphor underline decoration-line-strong underline-offset-4 transition-colors hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright",
        className
      );

      return href?.startsWith("/") || href?.startsWith("#") ? (
        <Link className={linkClassName} href={href} {...props} />
      ) : (
        <a className={linkClassName} href={href} {...props} />
      );
    },
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-line-strong border-l pl-4 text-foreground/85",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "border border-line bg-panel px-1 py-0.5 font-mono text-phosphor text-xs",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "scroll-mt-20 pt-6 font-medium font-mono text-2xl text-phosphor-bright",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "scroll-mt-20 pt-3 font-medium font-mono text-lg text-phosphor-bright",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={cn(
          "pl-1 text-pretty text-muted-foreground text-sm marker:text-phosphor-dim",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn("grid max-w-prose list-decimal gap-2 pl-5", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          "max-w-prose text-pretty text-muted-foreground text-sm leading-relaxed",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "max-w-full overflow-x-auto border border-line bg-panel-sunken p-4 font-mono text-phosphor text-xs leading-relaxed [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn("grid max-w-prose list-square gap-2 pl-5", className)}
        {...props}
      />
    ),
    ...components,
  };
}
