// React and Next.
import { useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// Custom hooks.
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

// Components.
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

export default function UploadModal() {
  const { user } = useUser();
  const router = useRouter();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { author: "", title: "", song: null, image: null },
  });

  function onChange(open: boolean) {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const audioFile = values.song?.[0];

      if (!imageFile || !audioFile || !user)
        return toast.error("Missing fields");

      const uniqueId = uniqid();

      // Upload audio track.
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, audioFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Song upload failed");
      }

      // Upload image.
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Image upload failed");
      }

      // If no errors, create the database entry.
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      // Upload successful.
      router.refresh();
      setIsLoading(false);
      toast.success("Entry created");
      reset();
      uploadModal.onClose();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an audio track"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Author"
          {...register("author", { required: true })}
        />
        <div>
          <div className="pb-1">Select a audio file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            placeholder="Author"
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            placeholder="Author"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
