"use client";

// Types.
import { Song } from "@/types";

// Components.
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface SearchContentProps {
  songs: Song[];
}

export default function SearchContent({ songs }: SearchContentProps) {
  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem data={song} onClick={() => {}} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
