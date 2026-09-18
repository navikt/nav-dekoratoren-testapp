import type { DecoratorParams } from "@navikt/nav-dekoratoren-moduler/ssr";

export type BreadcrumbTestCase = {
  id: string;
  navn: string;
  breadcrumbs: NonNullable<DecoratorParams["breadcrumbs"]>;
};

export const breadcrumbTestCases: BreadcrumbTestCase[] = [
  {
    id: "vanlige-lenker",
    navn: "Vanlige nav.no-lenker",
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
    breadcrumbs: [],
  },
  {
    id: "in-app-navigasjon",
    navn: "In-app-navigasjon",
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
    breadcrumbs: [
      {
        title: "Søknader og skjemaer – «oversikt» & hjelp",
        url: "https://www.nav.no/person",
      },
    ],
  },
];
