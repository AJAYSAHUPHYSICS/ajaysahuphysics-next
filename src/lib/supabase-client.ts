import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Guarded so importing this module never throws — if the env vars are ever
// unset (e.g. a preview build without secrets configured), auth features
// simply become inert (supabase is null) rather than crashing the whole
// static export. Every consumer must null-check before use.
//
// Only the publishable/anon key is ever referenced here. The service-role
// key must never appear in this file, any other client file, or any
// GitHub Actions step that runs `npm run build`.
//
// PKCE: email links (confirmation, password reset) return a one-time code
// that only the browser which started the flow can exchange. The exchange
// happens explicitly on /auth/callback/ (detectSessionInUrl is off so no
// other page tries to consume a code from its URL).
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { flowType: "pkce", detectSessionInUrl: false, persistSession: true, autoRefreshToken: true },
      })
    : null;
