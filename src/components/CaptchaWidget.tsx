"use client";

import { useEffect, useRef, useState } from "react";
import { loadTurnstile } from "@/lib/auth/captcha";

/**
 * Turnstile widget. Reports a token (or null when it expires or fails).
 * Tokens are single-use: bump `resetSignal` after every auth request
 * so the next attempt gets a fresh one.
 */
export default function CaptchaWidget({ siteKey, onToken, resetSignal }: { siteKey: string; onToken: (token: string | null) => void; resetSignal: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const report = useRef(onToken);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    report.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((t) => {
        if (cancelled || !box.current) return;
        widget.current = t.render(box.current, {
          sitekey: siteKey,
          action: "auth",
          theme: "light",
          callback: (token: string) => report.current(token),
          "expired-callback": () => report.current(null),
          "error-callback": () => report.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetSignal === 0 || !widget.current || !window.turnstile) return;
    report.current(null);
    window.turnstile.reset(widget.current);
  }, [resetSignal]);

  return (
    <div>
      <div ref={box} className="min-h-[65px] flex justify-center" />
      {failed ? (
        <p role="alert" className="text-xs text-red-700 text-center">
          The security check couldn&apos;t load. Check your connection or disable content blockers for this site, then reopen this window.
        </p>
      ) : null}
    </div>
  );
}
