// Registrerer en engangs-lytter ved oppstart av serveren, i tråd med
// anbefalt bruk av addDecoratorUpdateListener (cache-invalidering ved ny
// Dekoratør-versjon). Denne testappen har ingen HTML-cache å tømme, men
// logger oppdateringen teknisk slik at vi ser i loggene at mekanismen
// fungerer og at Dekoratøren faktisk publiserer versjonsoppdateringer.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { addDecoratorUpdateListener } = await import("@navikt/nav-dekoratoren-moduler/ssr");
  const { logTechnicalEvent } = await import("./lib/technical-logger");

  try {
    await addDecoratorUpdateListener({ env: "dev" }, (versionId) => {
      logTechnicalEvent("decorator_version_updated", "parametre", "addDecoratorUpdateListener", versionId);
    });
  } catch {
    // Best effort – appen skal fungere selv om oppstartslytteren feiler,
    // f.eks. hvis Dekoratøren ikke er nåbar ved kaldstart.
  }
}
