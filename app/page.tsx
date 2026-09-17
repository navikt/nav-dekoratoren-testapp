import { IntegrasjonsOversikt } from "../components/IntegrasjonsOversikt";
import { sjekkSsrIntegrasjoner } from "../lib/statussjekk";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const ssrHelse = await sjekkSsrIntegrasjoner();

  return (
    <main>
      <h1>Nav Dekoratøren testapp</h1>
      <p>Referanseimplementasjon for de fire støttede integrasjonsmåtene.</p>
      <nav aria-label="Integrasjoner">
        <IntegrasjonsOversikt ssrHelse={ssrHelse} />
      </nav>
    </main>
  );
}
