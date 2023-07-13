// External packages.
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Types.
import { Song } from "@/types";

export default function useLoadSong(song: Song) {
  const supabaseClient = useSupabaseClient();

  if (!song) return "";

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
}
