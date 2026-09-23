import { startDekoratorOppdateringslytter } from "../../../lib/decorator-oppdateringslytter";

export const dynamic = "force-dynamic";

export default async function DekoratorOppdateringerPage() {
  const status = await startDekoratorOppdateringslytter();

  return (
    <main>
      <p>
        <a href="/parametre">Tilbake</a>
      </p>
      <h1>addDecoratorUpdateListener</h1>
      <p>
        Lytter etter nye Dekoratør-versjoner i dev og kan brukes til å
        ugyldiggjøre en SSR-cache.
      </p>
      <p data-testid="update-listener-status">
        {status.lytterAktiv
          ? "Lytter etter Dekoratør-oppdateringer."
          : "Kunne ikke starte lytteren."}
      </p>
      <dl>
        <dt>Versjon ved oppstart</dt>
        <dd>{status.gjeldendeVersjon ?? "Ikke tilgjengelig"}</dd>
        <dt>Sist oppdagede oppdatering</dt>
        <dd>{status.sistOppdagetVersjon ?? "Ingen oppdatering oppdaget"}</dd>
        <dt>Tidspunkt</dt>
        <dd>{status.sistOppdagetTidspunkt ?? "Ikke tilgjengelig"}</dd>
      </dl>
      <p>
        Siden må lastes på nytt etter at Dekoratøren er oppdatert for å vise
        siste observerte versjon.
      </p>
    </main>
  );
}
