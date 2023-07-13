// Next.
import { cookies } from "next/headers";

// External packages.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Types.
import { Song } from "@/types/types";

export default async function getSongs(): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}
