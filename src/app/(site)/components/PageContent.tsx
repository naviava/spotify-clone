"use client";

// Types.
import { Song } from "@/types";

// Components.
import SongItem from "@/components/SongItem";

interface PageContentProps {
  songs: Song[];
}

export default function PageContent({ songs }: PageContentProps) {
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((item) => (
        <SongItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
}
