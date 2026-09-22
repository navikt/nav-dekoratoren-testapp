import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import type { ReactNode } from "react";
import type { TestRad } from "../lib/test-rad";
import { TestTabell } from "./TestTabell";

type ParameterBolkerProps = {
  rader: TestRad[];
  ekstraBolker?: {
    id: string;
    tittel: string;
    innhold: ReactNode;
    somForventet?: boolean;
  }[];
};

export function ParameterBolker({
  rader,
  ekstraBolker = [],
}: ParameterBolkerProps) {
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

  const bolker = [
    ...grupper.map((gruppe) => {
      const [forsteRad] = gruppe;
      return {
        id: forsteRad.parameter,
        tittel: forsteRad.parameter,
        innhold: <TestTabell rader={gruppe} />,
        somForventet: gruppe.every((rad) => rad.somForventet),
      };
    }),
    ...ekstraBolker,
  ].sort((a, b) => a.tittel.localeCompare(b.tittel, "nb"));

  return (
    <Accordion>
      {bolker.map((bolk) => (
        <AccordionItem key={bolk.id}>
          <AccordionHeader>
            {bolk.somForventet === undefined
              ? null
              : bolk.somForventet
                ? "✅ "
                : "❌ "}
            {bolk.tittel}
          </AccordionHeader>
          <AccordionContent>{bolk.innhold}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
