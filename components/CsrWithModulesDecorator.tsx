"use client";

import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { useEffect } from "react";
import { directDecoratorParams } from "../lib/decorator-params";
import { IntegrationStatus } from "./IntegrationStatus";

export function CsrWithModulesDecorator() {
  useEffect(() => {
    injectDecoratorClientSide({ env: "dev", params: directDecoratorParams });
  }, []);

  return (
    <>
      <IntegrationStatus
        integrationVariant="csr-moduler"
        rendering="klient"
        transport="offentlig dev-ingress"
        initialStatus="initializing"
        observe={async () => {
          await waitForDecorator();
        }}
      />
      <div data-testid="app-content">CSR med moduler er initialisert.</div>
    </>
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
