"use client";

import { OperatorDashboard as RegistryOperatorDashboard } from "@/registry/terminal/blocks/operator-dashboard/dashboard";

export function OperatorDashboard(
  props: React.ComponentProps<typeof RegistryOperatorDashboard>
) {
  return <RegistryOperatorDashboard {...props} />;
}
