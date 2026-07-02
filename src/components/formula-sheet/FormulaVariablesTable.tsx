import type { FormulaVariable } from "@/lib/formula-sheet";

export default function FormulaVariablesTable({
  variables,
}: {
  variables: FormulaVariable[];
}) {
  if (variables.length === 0) return null;
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full text-sm border-collapse min-w-[420px]">
        <caption className="sr-only">
          Variables used in this formula, with units and dimensions
        </caption>
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate/70 border-b border-navy/10">
            <th scope="col" className="py-1.5 pr-3 font-semibold">Symbol</th>
            <th scope="col" className="py-1.5 pr-3 font-semibold">Meaning</th>
            <th scope="col" className="py-1.5 pr-3 font-semibold">Unit</th>
            <th scope="col" className="py-1.5 font-semibold">Dimension</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((v) => (
            <tr key={v.symbol} className="border-b border-navy/5 last:border-0">
              <td className="py-1.5 pr-3 font-mono font-semibold text-navy">
                {v.symbol}
              </td>
              <td className="py-1.5 pr-3 text-slate">
                {v.name}
                {v.notes ? (
                  <span className="block text-xs text-slate/70">{v.notes}</span>
                ) : null}
              </td>
              <td className="py-1.5 pr-3 text-slate whitespace-nowrap">{v.unit}</td>
              <td className="py-1.5 font-mono text-xs text-slate whitespace-nowrap">
                {v.dimension}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
