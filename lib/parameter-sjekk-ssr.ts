import {
  buildCspHeader,
  fetchDecoratorReact,
  getDecoratorVersionId,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import { decoratorParams } from "./decorator-params";
import { breadcrumbTestCases, sprakTestCases } from "./parameter-testcases";

export type ParameterTestResultat = {
  id: string;
  label: string;
  beskrivelse: string;
  forventetGyldig: boolean;
  faktiskGyldig: boolean;
  somForventet: boolean;
  detalj?: string;
};

function evaluer(
  id: string,
  label: string,
  beskrivelse: string,
  forventetGyldig: boolean,
  faktiskGyldig: boolean,
  detalj?: string,
): ParameterTestResultat {
  return {
    id,
    label,
    beskrivelse,
    forventetGyldig,
    faktiskGyldig,
    somForventet: forventetGyldig === faktiskGyldig,
    detalj,
  };
}

async function kjorBreadcrumbTest(
  testCase: (typeof breadcrumbTestCases)[number],
): Promise<ParameterTestResultat> {
  try {
    await fetchDecoratorReact({
      env: "dev",
      params: { ...decoratorParams, breadcrumbs: testCase.breadcrumbs },
    });
    return evaluer(
      testCase.id,
      testCase.label,
      testCase.beskrivelse,
      testCase.forventetGyldig,
      true,
    );
  } catch (error) {
    return evaluer(
      testCase.id,
      testCase.label,
      testCase.beskrivelse,
      testCase.forventetGyldig,
      false,
      error instanceof Error ? error.message : "Ukjent feil",
    );
  }
}

async function kjorSprakTest(
  testCase: (typeof sprakTestCases)[number],
): Promise<ParameterTestResultat> {
  try {
    await fetchDecoratorReact({
      env: "dev",
      params: {
        ...decoratorParams,
        availableLanguages: testCase.availableLanguages,
      },
    });
    return evaluer(
      testCase.id,
      testCase.label,
      testCase.beskrivelse,
      testCase.forventetGyldig,
      true,
    );
  } catch (error) {
    return evaluer(
      testCase.id,
      testCase.label,
      testCase.beskrivelse,
      testCase.forventetGyldig,
      false,
      error instanceof Error ? error.message : "Ukjent feil",
    );
  }
}

export async function kjorSsrBreadcrumbTester(): Promise<
  ParameterTestResultat[]
> {
  return Promise.all(breadcrumbTestCases.map(kjorBreadcrumbTest));
}

export async function kjorSsrSprakTester(): Promise<ParameterTestResultat[]> {
  return Promise.all(sprakTestCases.map(kjorSprakTest));
}

export type CspTestResultat = {
  status: "ok" | "feil";
  header?: string;
  detalj?: string;
};

export async function kjorCspTest(): Promise<CspTestResultat> {
  try {
    const header = await buildCspHeader(
      {
        "default-src": ["'self'"],
        "connect-src": ["nav-dekoratoren-testapp.dev.nav.no"],
      },
      { env: "dev" },
    );
    return { status: "ok", header };
  } catch (error) {
    return {
      status: "feil",
      detalj: error instanceof Error ? error.message : "Ukjent feil",
    };
  }
}

export type VersjonTestResultat = {
  status: "ok" | "feil";
  versionId?: string;
  detalj?: string;
};

export async function hentDekoratorVersjon(): Promise<VersjonTestResultat> {
  try {
    const versionId = await getDecoratorVersionId({ env: "dev" });
    return { status: "ok", versionId };
  } catch (error) {
    return {
      status: "feil",
      detalj: error instanceof Error ? error.message : "Ukjent feil",
    };
  }
}
