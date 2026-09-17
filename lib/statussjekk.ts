import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { buildPublicDecoratorUrl } from "./decorator-config";
import { decoratorParams, directDecoratorParams } from "./decorator-params";
import { fetchDirectSsrFragments } from "./ssr-uten-moduler";
import { csrUtenModulerClientUrl } from "./csr-uten-moduler";

export type IntegrasjonsHelseStatus = "ok" | "feil";

export type IntegrasjonsHelse = {
  path: string;
  label: string;
  status: IntegrasjonsHelseStatus;
  detalj?: string;
};

function feil(path: string, label: string, detalj: string): IntegrasjonsHelse {
  return { path, label, status: "feil", detalj };
}

function ok(path: string, label: string): IntegrasjonsHelse {
  return { path, label, status: "ok" };
}

async function sjekkSsrMedModuler(): Promise<IntegrasjonsHelse> {
  const path = "ssr-med-moduler";
  const label = "SSR med moduler";
  try {
    await fetchDecoratorReact({ env: "dev", params: decoratorParams });
    return ok(path, label);
  } catch {
    return feil(path, label, "Kunne ikke hente dekoratøren via service discovery");
  }
}

async function sjekkSsrUtenModuler(): Promise<IntegrasjonsHelse> {
  const path = "ssr-uten-moduler";
  const label = "SSR uten moduler";
  try {
    await fetchDirectSsrFragments();
    return ok(path, label);
  } catch {
    return feil(path, label, "Kunne ikke hente /ssr-endepunktet direkte");
  }
}

async function sjekkCsrMedModuler(): Promise<IntegrasjonsHelse> {
  const path = "csr-med-moduler";
  const label = "CSR med moduler";
  try {
    const url = buildPublicDecoratorUrl("/env", directDecoratorParams);
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    return ok(path, label);
  } catch {
    return feil(path, label, "Fikk ikke kontakt med offentlig dev-ingress (/env)");
  }
}

async function sjekkCsrUtenModuler(): Promise<IntegrasjonsHelse> {
  const path = "csr-uten-moduler";
  const label = "CSR uten moduler";
  try {
    const response = await fetch(csrUtenModulerClientUrl(), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    return ok(path, label);
  } catch {
    return feil(path, label, "Fikk ikke kontakt med offentlig dev-ingress (client.js)");
  }
}

export async function sjekkAlleIntegrasjoner(): Promise<IntegrasjonsHelse[]> {
  return Promise.all([
    sjekkSsrMedModuler(),
    sjekkSsrUtenModuler(),
    sjekkCsrMedModuler(),
    sjekkCsrUtenModuler(),
  ]);
}
