import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/terminal/ui/accordion";

export function AccordionDefault() {
  return (
    <Accordion className="w-full max-w-md" multiple={false}>
      <AccordionItem value="a">
        <AccordionTrigger>What is on /core?</AccordionTrigger>
        <AccordionContent>
          Eighteen thousand blocks, mostly capture indexes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Why is /spool offline?</AccordionTrigger>
        <AccordionContent>
          No entry in the log and no fault light. A replacement controller is on
          order.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can it be forced?</AccordionTrigger>
        <AccordionContent>
          Yes, and it skips the consistency pass.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
