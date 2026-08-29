import type { ComponentType } from "react";

export interface Example {
  component: ComponentType;
  description?: string;
  name: string;
}

export type ExampleMap = Record<string, Example[]>;
