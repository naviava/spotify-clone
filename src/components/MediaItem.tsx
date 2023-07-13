// React and Next.
import Image from "next/image";

// Types.
import { Song } from "@/types";

// Lib and utils.
import useLoadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

export default function MediaItem({ data, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(data);

  function handleClick() {
    if (onClick) return onClick(data.id);

    // TODO: Default turn on player
  }

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 transition hover:bg-neutral-800/50"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
}
