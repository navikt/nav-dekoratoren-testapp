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

export type RedirectToAppTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  redirectToApp: NonNullable<DecoratorParams["redirectToApp"]>;
};

export type RedirectToUrlTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  redirectToUrl: NonNullable<DecoratorParams["redirectToUrl"]>;
};

export type RedirectToUrlLogoutTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  redirectToUrlLogout: NonNullable<DecoratorParams["redirectToUrlLogout"]>;
};

export type ChatbotTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  chatbot: NonNullable<DecoratorParams["chatbot"]>;
};

export type ChatbotVisibleTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  chatbotVisible: NonNullable<DecoratorParams["chatbotVisible"]>;
};

export type LogoutWarningTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  logoutWarning: NonNullable<DecoratorParams["logoutWarning"]>;
};

export type ShareScreenTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  shareScreen: NonNullable<DecoratorParams["shareScreen"]>;
};

export type FeedbackTestCase = {
  id: string;
  navn: string;
  beskrivelse: string;
  feedback: NonNullable<DecoratorParams["feedback"]>;
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

export const redirectToAppTestCases: RedirectToAppTestCase[] = [
  {
    id: "aktivert",
    navn: "Aktivert",
    beskrivelse:
      "Dekoratøren godtar redirectToApp=true, som sender brukeren tilbake til gjeldende URL etter innlogging.",
    redirectToApp: true,
  },
  {
    id: "deaktivert",
    navn: "Deaktivert",
    beskrivelse:
      "Dekoratøren godtar redirectToApp=false, som beholder standard oppførsel etter innlogging.",
    redirectToApp: false,
  },
];

export const redirectToUrlTestCases: RedirectToUrlTestCase[] = [
  {
    id: "nav-no",
    navn: "Gyldig nav.no-URL",
    beskrivelse:
      "Dekoratøren godtar en fullstendig nav.no-URL som mål etter innlogging.",
    redirectToUrl: "https://www.nav.no/minside",
  },
];

export const redirectToUrlLogoutTestCases: RedirectToUrlLogoutTestCase[] = [
  {
    id: "nav-no",
    navn: "Gyldig nav.no-URL",
    beskrivelse:
      "Dekoratøren godtar en fullstendig nav.no-URL som mål etter utlogging.",
    redirectToUrlLogout: "https://www.nav.no",
  },
];

export const chatbotTestCases: ChatbotTestCase[] = [
  {
    id: "aktivert",
    navn: "Aktivert",
    beskrivelse:
      "Dekoratøren godtar chatbot=true, som aktiverer chatbot-funksjonaliteten.",
    chatbot: true,
  },
  {
    id: "deaktivert",
    navn: "Deaktivert",
    beskrivelse:
      "Dekoratøren godtar chatbot=false, som deaktiverer chatbot-funksjonaliteten.",
    chatbot: false,
  },
];

export const chatbotVisibleTestCases: ChatbotVisibleTestCase[] = [
  {
    id: "synlig",
    navn: "Synlig",
    beskrivelse:
      "Dekoratøren godtar chatbotVisible=true, som viser chatbot-ikonet.",
    chatbotVisible: true,
  },
  {
    id: "skjult",
    navn: "Skjult",
    beskrivelse:
      "Dekoratøren godtar chatbotVisible=false, som skjuler chatbot-ikonet når det ikke finnes en aktiv økt.",
    chatbotVisible: false,
  },
];

export const logoutWarningTestCases: LogoutWarningTestCase[] = [
  {
    id: "aktivert",
    navn: "Aktivert",
    beskrivelse:
      "Dekoratøren godtar logoutWarning=true, som aktiverer varsel før innloggingsøkten utløper.",
    logoutWarning: true,
  },
  {
    id: "deaktivert",
    navn: "Deaktivert",
    beskrivelse:
      "Dekoratøren godtar logoutWarning=false, som deaktiverer Dekoratørens utloggingsvarsel.",
    logoutWarning: false,
  },
];

export const shareScreenTestCases: ShareScreenTestCase[] = [
  {
    id: "aktivert",
    navn: "Aktivert",
    beskrivelse:
      "Dekoratøren godtar shareScreen=true, som aktiverer funksjonalitet for skjermdeling.",
    shareScreen: true,
  },
  {
    id: "deaktivert",
    navn: "Deaktivert",
    beskrivelse:
      "Dekoratøren godtar shareScreen=false, som deaktiverer funksjonalitet for skjermdeling.",
    shareScreen: false,
  },
];

export const feedbackTestCases: FeedbackTestCase[] = [
  {
    id: "aktivert",
    navn: "Aktivert",
    beskrivelse:
      "Dekoratøren godtar feedback=true, som viser tilbakemeldingskomponenten.",
    feedback: true,
  },
  {
    id: "deaktivert",
    navn: "Deaktivert",
    beskrivelse:
      "Dekoratøren godtar feedback=false, som skjuler tilbakemeldingskomponenten.",
    feedback: false,
  },
];
