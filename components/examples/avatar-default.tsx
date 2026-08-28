import { Avatar, AvatarFallback } from "@/registry/terminal/ui/avatar";

export function AvatarDefault() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>N4</AvatarFallback>
      </Avatar>
      <Avatar className="size-6">
        <AvatarFallback className="text-[0.5rem]">OP</AvatarFallback>
      </Avatar>
    </div>
  );
}
