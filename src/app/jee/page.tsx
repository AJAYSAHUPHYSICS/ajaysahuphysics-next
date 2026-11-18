import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import JeeMainAdvancedPicker from "@/components/JeeMainAdvancedPicker";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "JEE Physics",
  description:
    "JEE Main and JEE Advanced physics with Ajay Sahu. Chapter-wise notes, formula sheets, practice questions and PYQs are being rebuilt from openly licensed and independently written material.",
  alternates: { canonical: "/jee" },
};

export default function JeePage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "JEE", path: "/jee" },
        ])}
      />
      <PageHero
        eyebrow="JEE Track"
        title="Physics preparation built for both JEE Main and JEE Advanced."
        description="From Class 11 mechanics to Class 12 modern physics, we're rebuilding notes, formula sheets, practice questions and previous year questions for every chapter, tuned to JEE's exam pattern. Chapters appear as they're reviewed."
      >
        <WhatsAppButton message="Hi Ajay Sir, I'm preparing for JEE and want to know more about your classes.">
          Talk to Ajay Sir about JEE prep
        </WhatsAppButton>
      </PageHero>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <JeeMainAdvancedPicker />
        </div>
      </section>
    </div>
  );
}
