import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Crea el cliente Supabase de servidor y adapta su sesión a las cookies de Next.js. */
export function createSupabaseServerClient() {
  // El almacén permite leer la sesión actual y persistir la renovación de tokens.
  const cookieStore = cookies();
  // Los métodos get/set/remove son el puente entre Auth de Supabase y las cookies HTTP.
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { get(name: string) { return cookieStore.get(name)?.value; }, set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); }, remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: "", ...options }); } } });
}
