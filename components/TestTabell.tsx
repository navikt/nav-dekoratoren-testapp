import {
  Table,
  TableBody,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@navikt/ds-react/Table";
import type { TestRad } from "../lib/test-rad";

export function TestTabell({ rader }: { rader: TestRad[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Parameter</TableHeaderCell>
          <TableHeaderCell>Testcase</TableHeaderCell>
          <TableHeaderCell>Verdi</TableHeaderCell>
          <TableHeaderCell>Feilmelding</TableHeaderCell>
          <TableHeaderCell>Hva testes?</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rader.map((r) => (
          <TableRow
            key={r.id}
            data-testid={`rad-${r.id}`}
            data-som-forventet={r.somForventet}
          >
            <TableDataCell>{r.somForventet ? "✅" : "❌"}</TableDataCell>
            <TableDataCell>{r.parameter}</TableDataCell>
            <TableDataCell>{r.testcase}</TableDataCell>
            <TableDataCell>
              <details>
                <summary>Vis verdi</summary>
                <code style={{ overflowWrap: "anywhere" }}>{r.verdi}</code>
              </details>
            </TableDataCell>
            <TableDataCell>{r.feilmelding ?? "–"}</TableDataCell>
            <TableDataCell>
              <details>
                <summary>Vis beskrivelse</summary>
                {r.beskrivelse}
              </details>
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
