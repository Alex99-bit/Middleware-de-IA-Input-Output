import { redirect } from "next/navigation";
import Workspace from "@/components/Workspace";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AppPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-6"><div className="max-w-md rounded-2xl border border-[#e6e8ef] bg-white p-7 text-center shadow-sm"><h1 className="text-xl font-bold">Configura tu workspace</h1><p className="mt-3 text-sm leading-6 text-[#718096]">Añade las variables de Supabase en `.env.local` y reinicia el servidor para activar la versión final.</p></div></main>;
  const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/login"); return <Workspace email={user.email || ""} />;
}
