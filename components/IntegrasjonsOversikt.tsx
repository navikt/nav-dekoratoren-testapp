"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { IntegrasjonsHelse } from "../lib/statussjekk";
import { sjekkCsrIntegrasjoner } from "../lib/statussjekk-klient";

function lasterRad(path: string, label: string): IntegrasjonsHelse {
  return { path, label, status: "ok", detalj: undefined };
}

type Props = {
  ssrHelse: IntegrasjonsHelse[];
};

export function IntegrasjonsOversikt({ ssrHelse }: Props) {
  const [csrHelse, setCsrHelse] = useState<IntegrasjonsHelse[] | null>(null);

  useEffect(() => {
    let aktiv = true;
    void sjekkCsrIntegrasjoner().then((resultat) => {
      if (aktiv) setCsrHelse(resultat);
    });
    return () => {
      aktiv = false;
    };
  }, []);

  const lasterCsr = [
    lasterRad("csr-med-moduler", "CSR med moduler"),
    lasterRad("csr-uten-moduler", "CSR uten moduler"),
  ];

  const alle = [...ssrHelse, ...(csrHelse ?? lasterCsr)];

  return (
    <ul>
      {alle.map(({ path, label, status, detalj }) => (
        <li key={path}>
          <Link href={`/${path}`}>{label}</Link>{" "}
          {csrHelse === null && path.startsWith("csr-") ? (
            <span data-testid={`helse-${path}`} data-status="laster">
              ⏳ Sjekker …
            </span>
          ) : (
            <span data-testid={`helse-${path}`} data-status={status}>
              {status === "ok" ? "✅ OK" : `❌ Feil${detalj ? `: ${detalj}` : ""}`}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
