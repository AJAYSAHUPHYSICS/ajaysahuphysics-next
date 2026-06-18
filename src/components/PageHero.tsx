type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="physics-grid bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-5 text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
