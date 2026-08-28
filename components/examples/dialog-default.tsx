import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Button } from "@/registry/terminal/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/terminal/ui/dialog";

export function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open panel
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Eyebrow>Confirm</Eyebrow>
          <DialogTitle>Force-mount /spool?</DialogTitle>
          <DialogDescription>
            The volume has not answered since the last power cycle. Forcing it
            skips the consistency pass.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="signal" />}>
            Force mount
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
