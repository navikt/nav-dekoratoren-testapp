"use client";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import { useState } from "react";
import type { TestRad } from "../lib/test-rad";
import { ParameterBolker } from "./ParameterBolker";
import { ParametreCsr } from "./ParametreCsr";

type ParametreOversiktProps = {
  ssrRader: TestRad[];
  ssrEkstraBolker: Parameters<typeof ParameterBolker>[0]["ekstraBolker"];
};

function statusIkon(somForventet: boolean | undefined): string {
  if (somForventet === undefined) return "⏳ ";
  return somForventet ? "✅ " : "❌ ";
}

export function ParametreOversikt({
  ssrRader,
  ssrEkstraBolker,
}: ParametreOversiktProps) {
  const [csrStatus, setCsrStatus] = useState<boolean | undefined>(undefined);

  const ssrStatus =
    ssrRader.every((rad) => rad.somForventet) &&
    (ssrEkstraBolker ?? []).every((bolk) => bolk.somForventet !== false);

  return (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>{statusIkon(ssrStatus)}SSR</AccordionHeader>
        <AccordionContent>
          <ParameterBolker rader={ssrRader} ekstraBolker={ssrEkstraBolker} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>{statusIkon(csrStatus)}CSR</AccordionHeader>
        <AccordionContent>
          <ParametreCsr onStatusChange={setCsrStatus} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
