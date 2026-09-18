export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { addDecoratorUpdateListener } = await import("@navikt/nav-dekoratoren-moduler/ssr");
  const { logTechnicalEvent } = await import("./lib/technical-logger");

  try {
    await addDecoratorUpdateListener({ env: "dev" }, (versionId) => {
      logTechnicalEvent("decorator_version_updated", "parametre", "addDecoratorUpdateListener", versionId);
    });
  } catch {
  }
}
