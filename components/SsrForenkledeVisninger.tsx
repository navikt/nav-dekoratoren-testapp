import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import type { TestRad } from "../lib/test-rad";
import { TestTabell } from "./TestTabell";

export function SsrForenkledeVisninger({ rader }: { rader: TestRad[] }) {
  const altErOk = rader.every((rad) => rad.somForventet);

  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          {altErOk ? "✅" : "❌"} Forenklede visninger (simple)
        </AccordionHeader>
        <AccordionContent>
          <TestTabell rader={rader} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
