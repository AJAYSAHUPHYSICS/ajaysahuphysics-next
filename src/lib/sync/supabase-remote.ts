import type { SupabaseClient } from "@supabase/supabase-js";
import type { Row } from "./adapters";
import type { RemoteStore } from "./engine";

/** Primary-key columns per table (user_id is added by the database default and RLS). */
const CONFLICT: Record<string, string> = {
  bookmarks: "user_id,bookmark_id",
  checklist_items: "user_id,cls,slug,item",
  revision_rounds: "user_id,cls,slug,round",
  mistakes: "user_id,id",
  goals: "user_id,goal_type",
  streaks: "user_id",
};

/**
 * RemoteStore backed by Supabase (PostgREST). Every request carries the
 * student's JWT; Row Level Security limits reads and writes to their own
 * rows and refuses writes unless the database has sync enabled for them.
 */
export function supabaseRemote(client: SupabaseClient, userId: string): RemoteStore {
  return {
    async pull(table) {
      const { data, error } = await client.from(table).select("*").eq("user_id", userId);
      if (error) throw new Error(`pull ${table}: ${error.message}`);
      return (data ?? []) as Row[];
    },
    async push(table, rows) {
      const onConflict = CONFLICT[table];
      if (!onConflict) throw new Error(`unknown table ${table}`);
      for (let i = 0; i < rows.length; i += 200) {
        const batch = rows.slice(i, i + 200).map((r) => ({ ...r, user_id: userId }));
        const { error } = await client.from(table).upsert(batch, { onConflict });
        if (error) throw new Error(`push ${table}: ${error.message}`);
      }
    },
  };
}
