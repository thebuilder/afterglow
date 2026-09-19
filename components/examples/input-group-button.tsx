"use client";

import { CheckIcon, CopyIcon, InfoIcon, StarIcon } from "lucide-react";
import { useCallback, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/terminal/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/terminal/ui/popover";

const URL = "https://x.com/shadcn";

export function InputGroupButtonExample() {
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(URL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);
  const toggleFavorite = useCallback(
    () => setIsFavorite((favorite) => !favorite),
    []
  );

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder={URL} readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            onClick={copy}
            size="icon-xs"
            title="Copy"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger
              render={
                <InputGroupButton
                  aria-label="Connection info"
                  size="icon-xs"
                  variant="default"
                />
              }
            >
              <InfoIcon />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex flex-col gap-1 text-sm"
            >
              <p className="font-medium">Your connection is not secure.</p>
              <p>
                You should not enter any sensitive information on this site.
              </p>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupAddon className="pl-1.5">https://</InputGroupAddon>
        <InputGroupInput id="input-secure-19" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={toggleFavorite} size="icon-xs">
            <StarIcon
              className="data-[favorite=true]:fill-phosphor data-[favorite=true]:stroke-phosphor"
              data-favorite={isFavorite}
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
