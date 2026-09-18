# nav-dekoratoren-testapp

Dette er en vedlikeholdbar referanse- og integrasjonsapp for Nav Dekoratøren. Den er ikke en
produksjonsmal. Appen skal stå oppe kontinuerlig i Nais dev og brukes til å verifisere at alle
fire integrasjonsmåtene mot Dekoratøren fungerer som forventet.

## Integrasjoner

| Rute | Hva den demonstrerer |
| --- | --- |
| `/ssr-med-moduler` | Server-side rendering med `fetchDecoratorReact` fra modulpakken |
| `/ssr-uten-moduler` | Server-side rendering med direkte kall til `/ssr` |
| `/csr-med-moduler` | Client-side rendering med `injectDecoratorClientSide` |
| `/csr-uten-moduler` | Client-side rendering med CSS, `/env` og `client.js` uten modulpakken |
| `/parametre` | Tester breadcrumbs, språkvelger og andre hjelpefunksjoner mot Dekoratøren, se eget avsnitt under |

Forsiden (`/`) viser en samlet statusoversikt for alle fire integrasjonene, med live helsesjekk
mot Dekoratøren ved hvert sidelastet. Bruk denne til rask manuell verifikasjon.

SSR-rutene bruker service discovery til `nav-dekoratoren.personbruker`. CSR-rutene kjører i
nettleseren og bruker derfor den offentlige dev-ingressen
`https://dekoratoren.ekstern.dev.nav.no`. Direkte kall og CSR med moduler sender
`teamName=navno.navno`.

### Parametertester (`/parametre`)

Tester `setBreadcrumbs`, `setAvailableLanguages` (både SSR-params og CSR-funksjonene),
`setParams`/`getParams`, `buildCspHeader` og `getDecoratorVersionId`, med både gyldige og bevisst
kantete/ugyldige verdier (tom liste, relativ url, url utenfor nav.no, spesialtegn og svært lange
titler i breadcrumbs). Bakgrunnen er en tidligere regresjon der Dekoratørens validering av
breadcrumb-path krasjet rendringen for enkelte team – disse testene skal fange opp lignende feil
tidlig. Hver test viser om utfallet var som forventet, ikke bare om kallet «gikk bra», slik at en
ugyldig verdi som stille godtas også flagges som avvik.

`addDecoratorUpdateListener` demonstreres separat i `instrumentation.ts`, som registrerer en
lytter ved serveroppstart (riktig levetid for denne funksjonen) og logger versjons-id-endringer
teknisk.

Ikke tatt i bruk ennå: `openChatbot`, `getAnalyticsInstance`/analytics-hendelser og
samtykke/cookie-håndtering (`awaitDecoratorData`, `navLocalStorage` m.fl.) – vurderes senere.

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

Lokal Dekoratør-integrasjon er ikke en del av v1. `pnpm typecheck`, `pnpm test` og
`pnpm test:e2e` er tilgjengelige for validering.

## CI og deploy

CI trenger GitHub-secretet `READER_TOKEN` for GitHub Packages. Dev-deploy bygger og pusher
Docker-image med `nais/docker-build-push@v0` og deployer med `nais apply` mot Nais dev-gcp,
og eksponerer én offentlig ingress. Sett repository-variabelen `TEST_APP_URL` til den
deployede dev-ingressen før målrettet Playwright-verifikasjon.

Verifikasjonsworkflowene (`verify-*.yml`) kjører én spesifikasjon hver etter vellykket deploy
eller manuelt. Rollback er en Nais-redeploy til sist fungerende image; appen har ingen
datamigreringer eller persistent tilstand.
