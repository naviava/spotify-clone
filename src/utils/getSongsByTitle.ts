// Next.
import { cookies } from "next/headers";

// External packages.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Types.
import { Song } from "@/types";

// Lib and utils.
import getSongs from "./getSongs";

export default async function getSongsByTitle(title: string): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies: cookies });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}
