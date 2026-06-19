import WhatsAppButton from "./WhatsAppButton";

export default function ComingSoonTab({
  resourceLabel,
  chapterName,
  classLabel,
}: {
  resourceLabel: string;
  chapterName: string;
  classLabel: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-navy/15 bg-white p-8 sm:p-10 text-center">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold-deep font-display text-xl mb-4">
        !
      </span>
      <h3 className="font-display text-xl text-navy">
        {resourceLabel} coming soon
      </h3>
      <p className="mt-2 text-sm text-slate leading-relaxed max-w-md mx-auto">
        {resourceLabel} for <strong>{chapterName}</strong> is being prepared.
        Message Ajay Sir on WhatsApp to get notified the moment it&apos;s
        ready.
      </p>
      <div className="mt-5 flex justify-center">
        <WhatsAppButton
          message={`Hi Ajay Sir, please notify me when ${resourceLabel} for "${chapterName}" (${classLabel}) is ready.`}
        >
          Notify me on WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
