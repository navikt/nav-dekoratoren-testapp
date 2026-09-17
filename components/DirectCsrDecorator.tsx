"use client";

import { useEffect } from "react";
import { buildDirectCsrEnvironmentUrl, directCsrClientUrl } from "../lib/direct-csr";
import { IntegrationStatus } from "./IntegrationStatus";

export function DirectCsrDecorator() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = directCsrClientUrl();
    script.async = true;
    script.onerror = () => window.dispatchEvent(new Event("decorator-script-error"));
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://dekoratoren.ekstern.dev.nav.no/css" />
      <div id="decorator-env" data-src={buildDirectCsrEnvironmentUrl()} />
      <div id="decorator-header" />
      <IntegrationStatus
        integrationVariant="csr-direkte"
        rendering="klient/HTML-shell"
        transport="offentlig dev-ingress"
        initialStatus="initializing"
        observe={async () => waitForDecorator()}
      />
      <div data-testid="app-content">CSR uten moduler er initialisert.</div>
      <div id="decorator-footer" />
    </>
  );
}

async function waitForDecorator() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (document.querySelector("header") && document.querySelector("footer")) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("DIRECT_CSR_TIMEOUT");
}
