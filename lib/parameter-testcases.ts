import type { DecoratorParams } from "@navikt/nav-dekoratoren-moduler/ssr";

export type BreadcrumbTestCase = {
  id: string;
  label: string;
  beskrivelse: string;
  breadcrumbs: NonNullable<DecoratorParams["breadcrumbs"]>;
  forventetGyldig: boolean;
};

export type SprakTestCase = {
  id: string;
  label: string;
  beskrivelse: string;
  availableLanguages: NonNullable<DecoratorParams["availableLanguages"]>;
  forventetGyldig: boolean;
};

const gyldigeBreadcrumbs: BreadcrumbTestCase["breadcrumbs"] = [
  { title: "Ditt Nav", url: "https://www.nav.no/person/dittnav" },
  { title: "Testapp", url: "https://www.nav.no/testapp", handleInApp: true },
];

const relativBreadcrumbUrl = "/person/dittnav";

const spesialtegnTittel = `Spesialtegn <>&"'; ${"x".repeat(500)}`;
const spesialtegnUrl = "https://www.nav.no/spesialtegn?a=<script>";

export const breadcrumbTestCases: BreadcrumbTestCase[] = [
  {
    id: "gyldig",
    label: "Gyldige breadcrumbs",
    beskrivelse: `To vanlige breadcrumbs med fullstendige nav.no-urler: ${gyldigeBreadcrumbs
      .map((b) => `"${b.title}" → ${b.url}`)
      .join(", ")}. Skal alltid fungere.`,
    forventetGyldig: true,
    breadcrumbs: gyldigeBreadcrumbs,
  },
  {
    id: "tom-liste",
    label: "Tom liste",
    beskrivelse:
      "Ingen breadcrumbs satt i det hele tatt. Skal håndteres som «ingen brødsmulesti», ikke som en feil.",
    forventetGyldig: true,
    breadcrumbs: [],
  },
  {
    id: "relativ-url",
    label: "Relativ url uten domene",
    beskrivelse: `Url uten protokoll/domene: "${relativBreadcrumbUrl}" i stedet for full https://www.nav.no/.... Dette er et vanlig utviklerfeilgrep, og Dekoratøren bør avvise eller korrigere det uten å krasje hele siden.`,
    forventetGyldig: false,
    breadcrumbs: [{ title: "Relativ sti", url: relativBreadcrumbUrl }],
  },
  {
    id: "spesialtegn-og-lang-tittel",
    label: "Spesialtegn og veldig lang tittel",
    beskrivelse: `Tittel med HTML-spesialtegn og anførselstegn: "${spesialtegnTittel.slice(0, 40)}…" (${spesialtegnTittel.length} tegn totalt, potensiell XSS/escaping-felle), kombinert med url-en ${spesialtegnUrl} som inneholder et mistenkelig query-parameter. Dette er akkurat den typen kantete input som tidligere har utløst krasj i Dekoratørens breadcrumb-validering – testen skal fange opp om det skjer igjen.`,
    forventetGyldig: false,
    breadcrumbs: [
      {
        title: spesialtegnTittel,
        url: spesialtegnUrl,
      },
    ],
  },
];

const gyldigeSprak: SprakTestCase["availableLanguages"] = [
  { locale: "nb", url: "https://www.nav.no/min-side/nb" },
  { locale: "en", url: "https://www.nav.no/min-side/en", handleInApp: true },
];

const sprakUtenforNavnoUrl = "https://example.com/en";

export const sprakTestCases: SprakTestCase[] = [
  {
    id: "gyldig",
    label: "Gyldige språkalternativer",
    beskrivelse: `To språkvalg med fullstendige nav.no-urler: ${gyldigeSprak
      .map((s) => `${s.locale} → ${s.url}`)
      .join(", ")}. Skal alltid fungere.`,
    forventetGyldig: true,
    availableLanguages: gyldigeSprak,
  },
  {
    id: "tom-liste",
    label: "Tom liste",
    beskrivelse:
      "Ingen språkalternativer satt. Skal håndteres som «kun ett språk tilgjengelig», ikke som en feil.",
    forventetGyldig: true,
    availableLanguages: [],
  },
  {
    id: "url-utenfor-navno",
    label: "Url utenfor nav.no",
    beskrivelse: `Peker til ${sprakUtenforNavnoUrl} i stedet for et nav.no-underdomene. Ifølge Dekoratørens dokumentasjon er kun nav.no og underdomener tillatt her, så dette skal avvises tydelig (ikke krasje appen).`,
    forventetGyldig: false,
    availableLanguages: [{ locale: "en", url: sprakUtenforNavnoUrl }],
  },
];
