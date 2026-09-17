"use client";

import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { useEffect } from "react";
import { IntegrationPage } from "./IntegrationPage";
import { directDecoratorParams } from "../lib/decorator-params";

export function CsrMedModulerDekorator() {
  useEffect(() => {
    injectDecoratorClientSide({ env: "dev", params: directDecoratorParams });
  }, []);

  return (
    <IntegrationPage
      title="CSR med moduler"
      description="Dekoratøren er initialisert i nettleseren med modulpakken."
      integrationVariant="csr-moduler"
      rendering="klient"
      transport="offentlig dev-ingress"
      initialStatus="initializing"
      observe={async () => {
        await waitForDecorator();
      }}
    >
      <p data-testid="app-content">CSR med moduler er initialisert.</p>
    </IntegrationPage>
  );
}

async function waitForDecorator() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (document.querySelector("header") && document.querySelector("footer")) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("CSR_MODULES_TIMEOUT");
}
