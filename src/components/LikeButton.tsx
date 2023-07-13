"use client";

// React and Next.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";

// Custom hooks.
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchData() {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) setIsLiked(true);
    }

    fetchData();
  }, [user?.id, songId, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  async function handleLike() {
    if (!user) return authModal.onOpen();

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) toast.error(error.message);
      else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }
    router.refresh();
  }

  return (
    <button onClick={handleLike} className="transition hover:opacity-75">
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
}
