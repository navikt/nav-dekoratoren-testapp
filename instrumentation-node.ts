import { addDecoratorUpdateListener } from "@navikt/nav-dekoratoren-moduler/ssr";
import { logTechnicalEvent } from "./lib/technical-logger";

export async function registrerVersjonslytter() {
  try {
    await addDecoratorUpdateListener({ env: "dev" }, (versionId) => {
      logTechnicalEvent(
        "decorator_version_updated",
        "parametre",
        "addDecoratorUpdateListener",
        versionId,
      );
    });
  } catch {}
}
