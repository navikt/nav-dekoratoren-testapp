import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { decoratorParams } from "./decorator-params";
import { fetchDirectSsrFragments } from "./ssr-uten-moduler";

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

export async function sjekkSsrIntegrasjoner(): Promise<IntegrasjonsHelse[]> {
  return Promise.all([sjekkSsrMedModuler(), sjekkSsrUtenModuler()]);
}
