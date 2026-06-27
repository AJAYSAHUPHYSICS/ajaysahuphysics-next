import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import JeeMainAdvancedPicker from "@/components/JeeMainAdvancedPicker";

export const metadata: Metadata = {
  title: "JEE Physics",
  description:
    "Complete JEE Main and JEE Advanced physics preparation — notes, formula sheets, Practice Questions, and PYQs by Ajay Sahu.",
};

export default function JeePage() {
  return (
    <div>
      <PageHero
        eyebrow="JEE Track"
        title="Physics preparation built for both JEE Main and JEE Advanced."
        description="From Class 11 mechanics to Class 12 modern physics, every chapter is covered with notes, formula sheets, daily practice, and previous year questions tuned to JEE's exam pattern."
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
