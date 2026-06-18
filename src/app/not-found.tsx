import Link from "next/link";

export default function NotFound() {
  return (
    <div className="physics-grid bg-navy text-white min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl">
          This page hasn&apos;t been derived yet.
        </h1>
        <p className="mt-4 text-white/70 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you back to solid ground.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold bg-gold text-navy-deep hover:bg-gold-deep hover:text-white transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
