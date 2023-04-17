import supabase from "@/libs/supabase";
import { UserInformation } from "@/utils/getUserByToken";
import { useState, useEffect } from "react";

const useProfileUrls = (userInformation: UserInformation) => {
  const [images, setImages] = useState<
    {
      name: string;
      url: string;
    }[]
  >([]);

  const getImages = async () => {
    const { data: files } = await supabase.storage.from("avatars").list(userInformation.user.email, {
      sortBy: { column: "name", order: "asc" },
    });

    if (!files) return;

    const publicUrls = files.map(file => {
      const { name } = file;
      const publicUrl = supabase.storage.from("avatars").getPublicUrl(`${userInformation.user.email}/${name}`);
      return {
        name,
        url: publicUrl.data.publicUrl,
      };
    });

    setImages(publicUrls);
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, setImages, getImages };
};

export default useProfileUrls;
