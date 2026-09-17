import Link from "next/link";

const integrations = [
  ["ssr-moduler", "SSR med moduler"],
  ["ssr-direkte", "SSR uten moduler"],
  ["csr-moduler", "CSR med moduler"],
  ["csr-direkte", "CSR uten moduler"],
];

export default function HomePage() {
  return (
    <main>
      <h1>Nav Dekoratøren testapp</h1>
      <p>Referanseimplementasjon for de fire støttede integrasjonsmåtene.</p>
      <nav aria-label="Integrasjoner">
        <ul>
          {integrations.map(([path, label]) => (
            <li key={path}>
              <Link href={`/${path}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
