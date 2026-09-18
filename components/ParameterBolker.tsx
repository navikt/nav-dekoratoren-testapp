import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import type { TestRad } from "../lib/test-rad";
import { TestTabell } from "./TestTabell";

type ParameterBolkerProps = {
  rader: TestRad[];
};

export function ParameterBolker({ rader }: ParameterBolkerProps) {
  const grupper = rader.reduce<TestRad[][]>((resultat, rad) => {
    const gruppe = resultat.find(
      ([forsteRad]) => forsteRad.parameter === rad.parameter,
    );

    if (gruppe) {
      gruppe.push(rad);
    } else {
      resultat.push([rad]);
    }

    return resultat;
  }, []);

  return (
    <Accordion>
      {grupper.map((gruppe) => {
        const [forsteRad] = gruppe;
        const altErOk = gruppe.every((rad) => rad.somForventet);

        return (
          <AccordionItem key={forsteRad.parameter}>
            <AccordionHeader>
              {altErOk ? "✅" : "❌"} {forsteRad.parameter}
            </AccordionHeader>
            <AccordionContent>
              <TestTabell rader={gruppe} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
