"use client";

import { useState } from "react";

// TODO: Once Ajay sets up Mailchimp/Brevo, replace this component's submit
// handler with the real form action/endpoint from that service, and set
// NEWSLETTER_READY to true below.
const NEWSLETTER_READY = false;

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!NEWSLETTER_READY) return;
    setSubmitted(true);
  }

  if (!NEWSLETTER_READY) {
    return (
      <div>
        <h3 className="font-display text-lg text-white">
          Newsletter
        </h3>
        <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm">
          A weekly email with physics tips and chapter priorities is coming
          soon.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div>
        <h3 className="font-display text-lg text-white">Newsletter</h3>
        <p className="mt-2 text-sm text-gold-light">
          Thanks for subscribing — check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display text-lg text-white">Newsletter</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm">
        A weekly email with physics tips and chapter priorities for JEE and
        NEET.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 max-w-sm">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-md border border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 focus:outline-2 focus:outline-gold"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-md bg-gold text-navy-deep text-sm font-semibold hover:bg-gold-deep hover:text-white transition-colors shrink-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
