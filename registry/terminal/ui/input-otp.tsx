"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { use } from "react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      className={cn("disabled:cursor-not-allowed", className)}
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-40",
        containerClassName
      )}
      data-slot="input-otp"
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-px bg-line p-px", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
}

/**
 * One cell per character, with a real caret in the active one.
 *
 * `input-otp` reports which slot is focused and whether the caret should be
 * showing; the caret is drawn rather than inherited, because the field behind
 * these cells is a single invisible input and has no caret to lend them.
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const context = use(OTPInputContext);
  const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};

  return (
    <div
      className={cn(
        "relative flex size-9 items-center justify-center rounded-none bg-panel-sunken font-mono text-phosphor-bright text-sm outline-none transition-[background-color,box-shadow]",
        "data-[active=true]:z-10 data-[active=true]:bg-accent data-[active=true]:shadow-[inset_0_0_0_1px_var(--phosphor)]",
        "aria-invalid:shadow-[inset_0_0_0_1px_var(--destructive)]",
        className
      )}
      data-active={isActive}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret bg-phosphor-bright" />
        </div>
      ) : null}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div aria-hidden="true" data-slot="input-otp-separator" {...props}>
      <MinusIcon className="size-3.5 text-phosphor-dim" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
