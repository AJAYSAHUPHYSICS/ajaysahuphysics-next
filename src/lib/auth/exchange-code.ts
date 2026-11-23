"use client";

import { supabase } from "@/lib/supabase-client";

export type ExchangeResult = "signed-in" | "no-code" | "link-invalid" | "other-browser" | "unavailable";

/**
 * Completes an email-link sign-in (PKCE): exchanges the one-time `code` in
 * the URL for a session, then removes it from the address bar so it can't be
 * reused or leak through history or the Referer header.
 *
 * PKCE codes can only be exchanged in the browser that started the flow.
 * When the link is opened elsewhere, Supabase has still confirmed the email,
 * so the student is told to log in normally.
 */
export async function exchangeCodeFromUrl(): Promise<ExchangeResult> {
  if (!supabase) return "unavailable";
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const errorParam = url.searchParams.get("error") ?? url.searchParams.get("error_code");
  for (const p of ["code", "error", "error_code", "error_description", "type"]) url.searchParams.delete(p);
  window.history.replaceState(null, "", url.pathname + (url.searchParams.size ? `?${url.searchParams}` : "") + url.hash);
  if (errorParam) return "link-invalid";
  if (!code) return "no-code";
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (!error) return "signed-in";
  return /code verifier|code_verifier|both auth code and code verifier/i.test(error.message) ? "other-browser" : "link-invalid";
}
