"use client";

// Custom hooks.
import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";

// Components.
import PlayerContent from "./PlayerContent";

interface PlayerProps {}

export default function Player({}: PlayerProps) {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}
