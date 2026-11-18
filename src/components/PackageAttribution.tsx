import type { ChapterPackage } from "@/lib/content-v2/chapter-package";

/**
 * Sources and licences for a rebuilt chapter (TASL attribution), shown under
 * any rebuilt resource. Rendered only when a package is actually served.
 */
export default function PackageAttribution({ pkg }: { pkg: ChapterPackage }) {
  return (
    <aside aria-label="Sources and licences" className="mt-8 rounded-lg border border-navy/10 bg-white p-5 text-sm text-slate">
      <h3 className="font-semibold text-navy">Sources and licences</h3>
      <p className="mt-1">
        Written independently by AjaySahuPhysics
        {pkg.sources.length > 0 ? ", with facts drawn from the sources below." : "."}
      </p>
      {pkg.sources.length > 0 && (
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {pkg.sources.map((s) => (
            <li key={s.id}>{s.attribution}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
