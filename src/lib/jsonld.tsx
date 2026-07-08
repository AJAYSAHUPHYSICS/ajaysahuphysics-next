import { siteConfig } from "@/lib/site-config";

export type BreadcrumbItem = { name: string; path?: string };

/** Builds a schema.org BreadcrumbList object from page-relative paths. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${siteConfig.url}${item.path}` } : {}),
    })),
  };
}

/** Builds a schema.org LearningResource object for a chapter resource page. */
export function learningResourceJsonLd(params: {
  name: string;
  description: string;
  path: string;
  learningResourceType: string;
  educationalLevel: "11" | "12";
  chapterName: string;
}) {
  const { name, description, path, learningResourceType, educationalLevel, chapterName } =
    params;
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    learningResourceType,
    educationalLevel: `Class ${educationalLevel}`,
    about: chapterName,
    inLanguage: "en",
    isAccessibleForFree: true,
    provider: {
      "@type": "Person",
      name: "Ajay Sahu",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/** Renders a JSON-LD script tag. Use once per structured-data object. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
