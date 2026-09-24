import {
  addDecoratorUpdateListener,
  getDecoratorVersionId,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import { decoratorEnvironment } from "./decorator-config";

type Oppdateringsstatus = {
  lytterAktiv: boolean;
  gjeldendeVersjon?: string;
  sistOppdagetVersjon?: string;
  sistOppdagetTidspunkt?: string;
};

type GlobalMedOppdateringsstatus = typeof globalThis & {
  decoratorOppdateringsstatus?: Oppdateringsstatus;
  decoratorOppdateringslytterStartet?: boolean;
};

const globalMedOppdateringsstatus = globalThis as GlobalMedOppdateringsstatus;

function status(): Oppdateringsstatus {
  if (!globalMedOppdateringsstatus.decoratorOppdateringsstatus) {
    globalMedOppdateringsstatus.decoratorOppdateringsstatus = {
      lytterAktiv: false,
    };
  }
  return globalMedOppdateringsstatus.decoratorOppdateringsstatus;
}

export async function startDekoratorOppdateringslytter() {
  if (globalMedOppdateringsstatus.decoratorOppdateringslytterStartet) {
    return status();
  }

  globalMedOppdateringsstatus.decoratorOppdateringslytterStartet = true;
  const gjeldendeVersjon = await getDecoratorVersionId({
    env: decoratorEnvironment,
  });

  await addDecoratorUpdateListener(
    { env: decoratorEnvironment },
    (versjonId) => {
      Object.assign(status(), {
        sistOppdagetVersjon: versjonId,
        sistOppdagetTidspunkt: new Date().toISOString(),
      });
    },
  );

  Object.assign(status(), {
    lytterAktiv: true,
    gjeldendeVersjon,
  });

  return status();
}
