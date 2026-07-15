import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Physics study tips, exam strategy, and updates from Ajay Sahu for JEE and NEET aspirants.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    title: "How to revise Mechanics in the last 15 days before JEE",
    excerpt:
      "A chapter-priority list and a day-by-day plan for squeezing maximum score out of limited revision time.",
    tag: "Exam Strategy",
    date: "Coming soon",
  },
  {
    title: "The 5 NEET Physics chapters that decide your score",
    excerpt:
      "Why Optics, Modern Physics, and three other chapters carry more weight than their page count suggests.",
    tag: "NEET",
    date: "Coming soon",
  },
  {
    title: "Why typed notes beat handwritten notes during revision",
    excerpt:
      "A look at how legibility and structure affect recall speed when you're revising under time pressure.",
    tag: "Study Tips",
    date: "Coming soon",
  },
];

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Notes from the classroom, for the exam."
        description="Study strategy, chapter priorities, and the occasional rant about commonly repeated mistakes — written for students preparing for JEE and NEET."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-lg border border-navy/10 p-6 flex flex-col hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                  {post.tag}
                </span>
                <h2 className="mt-3 font-display text-lg text-navy leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-slate leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-xs text-slate/70">
                  {post.date}
                </span>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-ivory border border-navy/10 p-8 text-center">
            <h3 className="font-display text-xl text-navy">
              New posts are on the way
            </h3>
            <p className="mt-2 text-sm text-slate max-w-md mx-auto">
              Ajay Sir is writing the first set of posts. Check back soon, or
              follow on Instagram for updates as they go live.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
