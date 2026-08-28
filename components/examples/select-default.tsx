import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/terminal/ui/select";

export function SelectDefault() {
  return (
    <Select defaultValue="/core">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a volume" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mounted</SelectLabel>
          <SelectItem value="/core">/core</SelectItem>
          <SelectItem value="/archive">/archive</SelectItem>
          <SelectItem value="/scratch">/scratch</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Unavailable</SelectLabel>
          <SelectItem disabled value="/spool">
            /spool
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
