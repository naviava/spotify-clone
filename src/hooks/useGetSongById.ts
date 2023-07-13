// React and Next.
import { useEffect, useMemo, useState } from "react";

// External packages.
import toast from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

// Types.
import { Song } from "@/types";

export default function useGetSongById(id?: string) {
  const [isLoading, setIsloading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsloading(true);

    async function fetchSong() {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsloading(false);
        return toast.error(error.message);
      }

      setSong(data as Song);
      setIsloading(false);
    }
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
}
