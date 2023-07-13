// Custom hooks.
import { useUser } from "./useUser";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";

// Types.
import { Song } from "@/types";

export default function useOnPlay(songs: Song[]) {
  const { user } = useUser();
  const player = usePlayer();
  const authModal = useAuthModal();

  function onPlay(id: string) {
    if (!user) return authModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}
