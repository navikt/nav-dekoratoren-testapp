import Link from "next/link";

const integrations = [
  ["ssr-med-moduler", "SSR med moduler"],
  ["ssr-uten-moduler", "SSR uten moduler"],
  ["csr-med-moduler", "CSR med moduler"],
  ["csr-uten-moduler", "CSR uten moduler"],
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
