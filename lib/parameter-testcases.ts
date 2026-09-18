import type { DecoratorParams } from "@navikt/nav-dekoratoren-moduler/ssr";

export type BreadcrumbTestCase = {
  id: string;
  label: string;
  breadcrumbs: NonNullable<DecoratorParams["breadcrumbs"]>;
  // Om vi forventer at Dekoratøren skal godta denne casen. Brukes til å
  // avgjøre om "ok" faktisk er riktig utfall eller en stille svelging av feil.
  forventetGyldig: boolean;
};

export type SprakTestCase = {
  id: string;
  label: string;
  availableLanguages: NonNullable<DecoratorParams["availableLanguages"]>;
  forventetGyldig: boolean;
};

// Bakgrunn: en tidligere regresjon i Dekoratøren gjorde at valideringen av
// breadcrumb-path kunne krasje hele rendringen for enkelte team. Casene her
// dekker både normale og bevisst kantete/ugyldige verdier, slik at vi
// oppdager om noe tilsvarende skjer igjen.
export const breadcrumbTestCases: BreadcrumbTestCase[] = [
  {
    id: "gyldig",
    label: "Gyldige breadcrumbs",
    forventetGyldig: true,
    breadcrumbs: [
      { title: "Ditt Nav", url: "https://www.nav.no/person/dittnav" },
      { title: "Testapp", url: "https://www.nav.no/testapp", handleInApp: true },
    ],
  },
  {
    id: "tom-liste",
    label: "Tom liste",
    forventetGyldig: true,
    breadcrumbs: [],
  },
  {
    id: "relativ-url",
    label: "Relativ url uten domene",
    forventetGyldig: false,
    breadcrumbs: [{ title: "Relativ sti", url: "/person/dittnav" }],
  },
  {
    id: "spesialtegn-og-lang-tittel",
    label: "Spesialtegn og veldig lang tittel",
    forventetGyldig: false,
    breadcrumbs: [
      {
        title: `Spesialtegn <>&"'; ${"x".repeat(500)}`,
        url: "https://www.nav.no/spesialtegn?a=<script>",
      },
    ],
  },
];

export const sprakTestCases: SprakTestCase[] = [
  {
    id: "gyldig",
    label: "Gyldige språkalternativer",
    forventetGyldig: true,
    availableLanguages: [
      { locale: "nb", url: "https://www.nav.no/min-side/nb" },
      { locale: "en", url: "https://www.nav.no/min-side/en", handleInApp: true },
    ],
  },
  {
    id: "tom-liste",
    label: "Tom liste",
    forventetGyldig: true,
    availableLanguages: [],
  },
  {
    id: "url-utenfor-navno",
    label: "Url utenfor nav.no",
    forventetGyldig: false,
    availableLanguages: [{ locale: "en", url: "https://example.com/en" }],
  },
];
