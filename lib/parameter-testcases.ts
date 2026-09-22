import type { DecoratorParams } from "@navikt/nav-dekoratoren-moduler/ssr";

export type BreadcrumbTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  breadcrumbs: NonNullable<DecoratorParams["breadcrumbs"]>;
};

export type AvailableLanguagesTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  availableLanguages: NonNullable<DecoratorParams["availableLanguages"]>;
};

export type ContextTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  context: NonNullable<DecoratorParams["context"]>;
};

export const breadcrumbTestCases: BreadcrumbTestCase[] = [
  {
    id: "vanlige-lenker",
    navn: "Vanlige nav.no-lenker",
    beskrivelse:
      "Dekoratøren godtar en vanlig brødsmulesti med fullstendige nav.no-lenker.",
    breadcrumbs: [
      { title: "nav.no", url: "https://www.nav.no" },
      {
        title: "Ditt NAV",
        url: "https://www.nav.no/person/dittnav",
      },
    ],
  },
  {
    id: "tom-liste",
    navn: "Tom liste",
    beskrivelse:
      "Breadcrumbs kan nullstilles ved å sende en tom liste uten at Dekoratøren feiler.",
    breadcrumbs: [],
  },
  {
    id: "in-app-navigasjon",
    navn: "In-app-navigasjon",
    beskrivelse:
      "En gyldig nav.no-lenke med handleInApp=true kan settes slik at appen selv kan håndtere navigasjonen.",
    breadcrumbs: [
      {
        title: "Kontakt NAV",
        url: "https://www.nav.no/person/kontakt-oss",
        handleInApp: true,
      },
    ],
  },
  {
    id: "spesialtegn",
    navn: "Spesialtegn i tittel",
    beskrivelse:
      "Vanlige spesialtegn, som æ, ø og å i en breadcrumb-tittel håndteres og vises korrekt.",
    breadcrumbs: [
      {
        title: "Søknader og skjemaer – «oversikt» & hjelp",
        url: "https://www.nav.no/person",
      },
    ],
  },
];

export const availableLanguagesTestCases: AvailableLanguagesTestCase[] = [
  {
    id: "bokmal",
    navn: "Bokmål",
    beskrivelse:
      "Dekoratøren godtar bokmål som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "nb", url: "https://www.nav.no" }],
  },
  {
    id: "nynorsk",
    navn: "Nynorsk",
    beskrivelse:
      "Dekoratøren godtar nynorsk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "nn", url: "https://www.nav.no/nn/home" }],
  },
  {
    id: "engelsk",
    navn: "Engelsk",
    beskrivelse:
      "Dekoratøren godtar engelsk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "en", url: "https://www.nav.no/en/home" }],
  },
  {
    id: "samisk",
    navn: "Samisk",
    beskrivelse:
      "Dekoratøren godtar samisk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "se", url: "https://www.nav.no/se/home" }],
  },
  {
    id: "polsk",
    navn: "Polsk",
    beskrivelse:
      "Dekoratøren godtar polsk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "pl", url: "https://www.nav.no/pl/home" }],
  },
  {
    id: "ukrainsk",
    navn: "Ukrainsk",
    beskrivelse:
      "Dekoratøren godtar ukrainsk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "uk", url: "https://www.nav.no/uk/home" }],
  },
  {
    id: "russisk",
    navn: "Russisk",
    beskrivelse:
      "Dekoratøren godtar russisk som et tilgjengelig språkvalg med en fullstendig nav.no-lenke.",
    availableLanguages: [{ locale: "ru", url: "https://www.nav.no/ru/home" }],
  },
  {
    id: "tom-liste",
    navn: "Tom liste",
    beskrivelse:
      "Språkvelgeren kan nullstilles ved å sende en tom liste uten at Dekoratøren feiler.",
    availableLanguages: [],
  },
  {
    id: "in-app-navigasjon",
    navn: "In-app-navigasjon",
    beskrivelse:
      "Et språkvalg med en gyldig nav.no-lenke og handleInApp=true kan settes.",
    availableLanguages: [
      {
        locale: "en",
        url: "https://www.nav.no/en/home",
        handleInApp: true,
      },
    ],
  },
];

export const contextTestCases: ContextTestCase[] = [
  {
    id: "privatperson",
    navn: "Privatperson",
    beskrivelse:
      "Dekoratøren godtar privatperson og viser menyen for privatpersoner.",
    context: "privatperson",
  },
  {
    id: "arbeidsgiver",
    navn: "Arbeidsgiver",
    beskrivelse:
      "Dekoratøren godtar arbeidsgiver og viser menyen for arbeidsgivere.",
    context: "arbeidsgiver",
  },
  {
    id: "samarbeidspartner",
    navn: "Samarbeidspartner",
    beskrivelse:
      "Dekoratøren godtar samarbeidspartner og viser menyen for samarbeidspartnere.",
    context: "samarbeidspartner",
  },
];
