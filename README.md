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

`breadcrumbs` dekker vanlige nav.no-lenker, tom liste, `handleInApp` og vanlige spesialtegn i en
tittel. `availableLanguages` dekker alle støttede locales (`nb`, `nn`, `en`, `se`, `pl`, `uk` og
`ru`), tom liste og `handleInApp`. CSR har også en egen accordion for `setParams`/`getParams`,
med lenke til `/parametre/simple`.

SSR-oversikten tester også `buildCspHeader` ved å kontrollere at appens egne CSP-direktiver
beholdes i den sammenslåtte headeren, og `getDecoratorVersionId` ved å kontrollere at Dekoratøren
returnerer en ikke-tom versjons-id. Begge vises som egne utvidbare bolker med samlet status og
detaljer ved behov.

`/parametre/simple` er den faktiske testen av `simple: true`: Den initialiserer Dekoratøren
client-side med parameteren, venter på at den forenklede headeren er lastet og kontrollerer at
`getParams()` returnerer `simple: true`. Siden har grønn integrasjonsstatus når dette lykkes og
rød status ved avvik. Footer er bevisst ikke en del av testen, fordi `simple: true` bruker den
forenklede Dekoratør-visningen uten footer.

Accordionen «Forenklede visninger» har egne lenker til `simpleHeader: true` og
`simpleFooter: true`. Disse sidene verifiserer henholdsvis at den forenklede headeren eller
footer-versjonen lastes, at den øvrige Dekoratør-delen fortsatt finnes, og at parameteren kan
leses tilbake med `getParams()`.

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
