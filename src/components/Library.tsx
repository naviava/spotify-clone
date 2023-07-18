"use client";

// External packages.
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

// Custom hooks.
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Types.
import { Song } from "@/types";

// Components.
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

export default function Library({ songs }: LibraryProps) {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const onPlay = useOnPlay(songs);

  function onClick() {
    if (!user) return authModal.onOpen();

    if (!subscription) return subscribeModal.onOpen();

    return uploadModal.onOpen();
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-md font-medium text-neutral-400">Your library</p>
        </div>
        <AiOutlinePlus
          size={20}
          onClick={onClick}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((item) => (
          <MediaItem
            key={item.id}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}
