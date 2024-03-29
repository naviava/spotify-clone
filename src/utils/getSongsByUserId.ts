// Next.
import { cookies } from "next/headers";

// External packages.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Types.
import { Song } from "@/types";

export default async function getSongsByUserId(): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
}
