# nav-dekoratoren-testapp

Dette er en vedlikeholdbar referanse- og integrasjonsapp for Nav Dekoratøren. Den er ikke en
produksjonsmal. Appen skal stå oppe kontinuerlig i Nais dev og brukes til å verifisere at alle
fire integrasjonsmåtene mot Dekoratøren fungerer som forventet.

## Integrasjoner

| Rute                | Hva den demonstrerer                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/ssr-med-moduler`  | Server-side rendering med `fetchDecoratorReact` fra modulpakken                                  |
| `/ssr-uten-moduler` | Server-side rendering med direkte kall til `/ssr`                                                |
| `/csr-med-moduler`  | Client-side rendering med `injectDecoratorClientSide`                                            |
| `/csr-uten-moduler` | Client-side rendering med CSS, `/env` og `client.js` uten modulpakken                            |
| `/parametre`        | Levende SSR- og CSR-tester av Dekoratør-parametere                                                |
| `/parametre/simple` | Client-side test av `simple: true` med egen integrasjonsstatus                                    |
| `/parametre/simple-header` | Client-side test av `simpleHeader: true` med forenklet header                 |
| `/parametre/simple-footer` | Client-side test av `simpleFooter: true` med forenklet footer                 |
| `/parametre/klikk-callbacks` | Client-side test av `onBreadcrumbClick` og `onLanguageSelect`               |
| `/parametre/open-chatbot` | Client-side test av `openChatbot`                                              |

Forsiden (`/`) viser en samlet statusoversikt for alle fire integrasjonene, med live helsesjekk
mot Dekoratøren ved hvert sidelastet. Bruk denne til rask manuell verifikasjon.

SSR-rutene bruker service discovery til `nav-dekoratoren.personbruker`. CSR-rutene kjører i
nettleseren og bruker derfor den offentlige dev-ingressen
`https://dekoratoren.ekstern.dev.nav.no`. Direkte kall og CSR med moduler sender
`teamName=navno.navno`.

### Parametertester (`/parametre`)

Siden kjører faktiske kall til Dekoratøren ved hver sidelast: `fetchDecoratorReact` for SSR og
`setBreadcrumbs`/`setAvailableLanguages` etter `injectDecoratorClientSide` for CSR. Den tester
bare verdier som skal fungere. ✅ betyr at parameteren ble godtatt; ❌ betyr et avvik, med
feilmeldingen fra Dekoratøren i detaljtabellen.

Hver parameter vises som en utvidbar Aksel-bolk. Bolkens status er grønn når alle underliggende
testcaser er grønne, og rød når minst én testcase feiler. Detaljtabellen viser testcase, komplett
verdi, feilmelding og en kort forklaring av hva som testes.

| Parameter eller funksjon | Testdekning | Integrasjon |
| ------------------------ | ----------- | ----------- |
| `analyticsQueryParams` | Hviteliste med spørrestrengparametre som beholdes i URL-en for Analytics | SSR og CSR (kun ved initialisering, endres ikke med `setParams()`) |
| `analyticsRedactFilter` | Filter for spørrestrengparametre som redigeres bort (redaction) fra URL-en for Analytics | SSR og CSR (kun ved initialisering, endres ikke med `setParams()`) |
| `breadcrumbs` | Vanlige nav.no-lenker, tom liste, `handleInApp` og spesialtegn i tittel | SSR og CSR |
| `availableLanguages` | Alle støttede språk, tom liste og `handleInApp` | SSR og CSR |
| `context` | `privatperson`, `arbeidsgiver` og `samarbeidspartner` | SSR og CSR |
| `origin` | Stabilt appnavn brukt til å filtrere sidevisninger i Analytics | SSR og CSR (kun ved initialisering, endres ikke med `setParams()`) |
| `pageType` | Gyldig sidetype brukt til å kategorisere sidevisninger i Analytics | SSR og CSR |
| `chatbot` | `true` og `false` | SSR og CSR |
| `chatbotVisible` | `true` og `false` | SSR og CSR |
| `feedback` | `true` og `false` | SSR og CSR |
| `language` | Alle støttede språk (`nb`, `nn`, `en`, `se`, `pl`, `uk`, `ru`) | SSR og CSR |
| `logoutUrl` | Gyldig nav.no-URL | SSR og CSR |
| `logoutWarning` | `true` og `false` | SSR og CSR |
| `shareScreen` | `true` og `false`, uten å starte skjermdeling | SSR og CSR |
| `utilsBackground` | `white`, `gray` og `transparent` | SSR og CSR |
| `redirectOnUserChange` | `true` og `false` | SSR og CSR |
| `redirectToApp` | `true` og `false`, uten å gjennomføre innlogging | SSR og CSR |
| `redirectToUrl` | Gyldig nav.no-URL, uten å gjennomføre innlogging | SSR og CSR |
| `redirectToUrlLogout` | Gyldig nav.no-URL, uten å gjennomføre utlogging | SSR og CSR |
| `simple` | Forenklet header og footer, samt tilbakeverdi fra `getParams()` | SSR og CSR på `/parametre/simple` |
| `simpleHeader` | Forenklet header mens footeren fortsatt finnes, samt tilbakeverdi fra `getParams()` | SSR og CSR på `/parametre/simple-header` |
| `simpleFooter` | Forenklet footer mens headeren fortsatt finnes, samt tilbakeverdi fra `getParams()` | SSR og CSR på `/parametre/simple-footer` |
| `onBreadcrumbClick` / `onLanguageSelect` | Simulerer Dekoratørens postMessage-kontrakt for et breadcrumb-klikk og et språkvalg, og verifiserer at callbacken mottar riktig nyttelast | CSR på `/parametre/klikk-callbacks` |
| `openChatbot` | Verifiserer at `chatbotVisible` settes til `true` etter kallet | CSR på `/parametre/open-chatbot` |
| `setParams` / `getParams` | Setter og leser tilbake CSR-parametere | CSR |
| `buildCspHeader` | Appens CSP-direktiver beholdes i den sammenslåtte headeren | SSR |
| `getDecoratorVersionId` | Dekoratøren returnerer en ikke-tom versjons-id | SSR |

`level` testes bevisst ikke her: den er sikkerhetssensitiv og ikke ment å være en offentlig
parameter som apper skal kunne sette selv.

Appen har ingen egne autentiserte endepunkter, identitetsoppslag, database, persistent lagring,
cookies eller analytics. Den viser og logger bare statisk teknisk integrasjonsstatus. Ingen
brukerdata eller Dekoratørens auth-data leses, lagres eller logges.

## Lokal utvikling

Installer private pakker med pnpm, GitHub Packages og en token med `read:packages`:

```bash
export NODE_AUTH_TOKEN=...
pnpm install
pnpm dev
```

Lokalt brukes den offentlige dev-ingressen for Dekoratøren. I Nais dev-gcp brukes intern service
discovery for direkte SSR-kall. `pnpm typecheck`, `pnpm test` og `pnpm test:e2e` er tilgjengelige
for validering.

## CI og deploy

CI trenger GitHub-secretet `READER_TOKEN` for GitHub Packages. Dev-deploy bygger og pusher
Docker-image med `nais/docker-build-push@v0` og deployer med `nais apply` mot Nais dev-gcp,
og eksponerer én offentlig ingress. Sett repository-variabelen `TEST_APP_URL` til den
deployede dev-ingressen før målrettet Playwright-verifikasjon.

Verifikasjonsworkflowene (`verify-*.yml`) kjører én spesifikasjon hver etter vellykket deploy
eller manuelt. Rollback er en Nais-redeploy til sist fungerende image; appen har ingen
datamigreringer eller persistent tilstand.
