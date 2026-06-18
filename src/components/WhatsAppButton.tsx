import { whatsappLink } from "@/lib/site-config";

type Props = {
  message?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export default function WhatsAppButton({
  message = "Hi Ajay Sir, I'd like to know more about your physics classes.",
  children,
  variant = "solid",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold";
  const styles =
    variant === "solid"
      ? "bg-gold text-navy-deep hover:bg-gold-deep hover:text-white"
      : "border border-gold text-gold-deep hover:bg-gold hover:text-navy-deep";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4C7.5 4 3.78 7.7 3.78 12.25c0 1.5.4 2.9 1.1 4.12L4 20l3.73-.98a8.8 8.8 0 0 0 4.32 1.1h.01c4.55 0 8.27-3.7 8.27-8.25 0-2.2-.86-4.27-2.43-5.85l-.3.3zm-5.55 12.7h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.77.73.74-2.7-.18-.28a7.27 7.27 0 0 1-1.12-3.84c0-4 3.26-7.27 7.27-7.27a7.23 7.23 0 0 1 7.26 7.27c0 4-3.26 7.27-7.2 7.27zm3.98-5.45c-.22-.11-1.3-.64-1.5-.71-.2-.08-.35-.11-.5.11-.14.22-.57.71-.7.86-.13.14-.26.16-.48.05-.22-.11-1.04-.38-1.97-1.21a7.43 7.43 0 0 1-1.37-1.7c-.14-.24 0-.37.11-.48.1-.1.22-.27.34-.4.11-.14.15-.24.22-.4.07-.16.04-.3-.04-.4-.07-.11-.6-1.45-.83-1.98-.22-.5-.44-.44-.6-.45h-.51c-.16 0-.42.06-.65.31-.22.24-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.13.16 1.7 2.6 4.13 3.55 2.44.95 2.44.63 2.88.59.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.45-.27z" />
      </svg>
      {children}
    </a>
  );
}
