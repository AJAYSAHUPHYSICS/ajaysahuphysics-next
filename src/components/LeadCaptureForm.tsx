"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site-config";

export default function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [cls, setCls] = useState("11");
  const [exam, setExam] = useState("JEE");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = `Hi Ajay Sir, my name is ${name || "[name]"}. I'm in Class ${cls} preparing for ${exam}. I'd like to know more about your classes.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-navy/10 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="sm:col-span-2">
        <label
          htmlFor="lead-name"
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Your name
        </label>
        <input
          id="lead-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Riya Sharma"
          className="w-full px-3.5 py-2.5 rounded-md border border-navy/15 text-sm text-navy placeholder:text-navy/40 focus:outline-2 focus:outline-gold"
        />
      </div>

      <div>
        <label
          htmlFor="lead-class"
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Class
        </label>
        <select
          id="lead-class"
          value={cls}
          onChange={(e) => setCls(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-md border border-navy/15 text-sm text-navy focus:outline-2 focus:outline-gold bg-white"
        >
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
          <option value="Repeater">Repeater / Drop year</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="lead-exam"
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          Target exam
        </label>
        <select
          id="lead-exam"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-md border border-navy/15 text-sm text-navy focus:outline-2 focus:outline-gold bg-white"
        >
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="Boards only">Boards only</option>
        </select>
      </div>

      <div className="sm:col-span-2 mt-1">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold bg-gold text-navy-deep hover:bg-gold-deep hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4C7.5 4 3.78 7.7 3.78 12.25c0 1.5.4 2.9 1.1 4.12L4 20l3.73-.98a8.8 8.8 0 0 0 4.32 1.1h.01c4.55 0 8.27-3.7 8.27-8.25 0-2.2-.86-4.27-2.43-5.85l-.3.3zm-5.55 12.7h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.77.73.74-2.7-.18-.28a7.27 7.27 0 0 1-1.12-3.84c0-4 3.26-7.27 7.27-7.27a7.23 7.23 0 0 1 7.26 7.27c0 4-3.26 7.27-7.2 7.27z" />
          </svg>
          Continue on WhatsApp
        </button>
        <p className="mt-2 text-xs text-slate text-center">
          This opens WhatsApp with your details filled in, ready to send to
          Ajay Sir.
        </p>
      </div>
    </form>
  );
}
