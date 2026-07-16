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

/**
 * Builds a schema.org WebSite object for the site as a whole. Intentionally
 * omits `potentialAction` (SearchAction) — the site has no crawlable,
 * URL-pattern-based search endpoint (the "Search chapters..." boxes are
 * client-side filters over an already-loaded list, not a real search route),
 * and Google's guidelines require SearchAction to point to genuine search
 * results. Adding it without a real endpoint would be invalid structured
 * data. Render once, in the root layout.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
  };
}

/**
 * Builds a schema.org Organization object describing the coaching brand.
 * Render once, in the root layout.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    email: siteConfig.email,
    sameAs: [siteConfig.instagram, siteConfig.linkedin],
    founder: {
      "@type": "Person",
      name: "Ajay Sahu",
    },
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

/** Builds a schema.org FAQPage object from a chapter's genuine FAQ set. Only render this on a page where the FAQs are also visibly displayed — structured data must match visible content. */
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
