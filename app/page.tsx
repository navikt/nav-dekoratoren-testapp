import Link from "next/link";
import { sjekkAlleIntegrasjoner } from "../lib/statussjekk";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const integrasjoner = await sjekkAlleIntegrasjoner();

  return (
    <main>
      <h1>Nav Dekoratøren testapp</h1>
      <p>Referanseimplementasjon for de fire støttede integrasjonsmåtene.</p>
      <nav aria-label="Integrasjoner">
        <ul>
          {integrasjoner.map(({ path, label, status, detalj }) => (
            <li key={path}>
              <Link href={`/${path}`}>{label}</Link>{" "}
              <span data-testid={`helse-${path}`} data-status={status}>
                {status === "ok" ? "✅ OK" : `❌ Feil${detalj ? `: ${detalj}` : ""}`}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
