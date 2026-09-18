"use client";

import {
  getParams,
  injectDecoratorClientSide,
} from "@navikt/nav-dekoratoren-moduler";
import { decoratorParams, teamName } from "../lib/decorator-params";
import { IntegrationPage } from "./IntegrationPage";

export function CsrSimpleDekorator() {
  return (
    <IntegrationPage
      title="simple: true"
      description="Dekoratøren initialiseres i nettleseren med simple: true."
      integrationVariant="csr-med-moduler"
      rendering="klient"
      transport="offentlig dev-ingress"
      teamName={teamName}
      initialStatus="initializing"
      observe={async () => {
        await injectDecoratorClientSide({
          env: "dev",
          params: { ...decoratorParams, simple: true },
        });
        await ventPaDekoratoren();

        const params = await getParams();
        if (params.simple !== true) {
          throw new Error("CSR_SIMPLE_PARAMETER_NOT_SET");
        }
      }}
    >
      <p data-testid="simple-parameter">simple: true</p>
    </IntegrationPage>
  );
}

async function ventPaDekoratoren() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (document.querySelector("header")) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("CSR_SIMPLE_TIMEOUT");
}
