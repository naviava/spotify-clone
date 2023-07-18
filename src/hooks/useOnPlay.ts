// Custom hooks.
import { useUser } from "./useUser";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";

// Types.
import { Song } from "@/types";
import useSubscribeModal from "./useSubscribeModal";

export default function useOnPlay(songs: Song[]) {
  const { user, subscription } = useUser();
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  function onPlay(id: string) {
    if (!user) return authModal.onOpen();

    if (!subscription) return subscribeModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}
