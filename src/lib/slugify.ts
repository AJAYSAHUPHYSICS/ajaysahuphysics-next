/** Simple, deterministic slugifier used for in-page anchor ids (e.g. notes
 * section headings) so other parts of the site can deep-link to them. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
