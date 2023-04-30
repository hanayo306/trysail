import supabase from '@/libs/supabase';
import { UserInformation } from '@/utils/getUserByToken';
import { useState, useEffect } from 'react';
import getPublicUrlsFromFiles from '@/utils/getPublicUrlsFromFiles';

const useProfileUrls = (userInformation: UserInformation) => {
  const [images, setImages] = useState<
    {
      name: string;
      url: string;
    }[]
  >([]);

  const getImages = async () => {
    const { data: files } = await supabase.storage.from('avatars').list(userInformation.user.email, {
      sortBy: { column: 'name', order: 'asc' },
    });

    if (!files) return;

    const publicUrls = getPublicUrlsFromFiles({
      files,
      bucketName: 'avatars',
      userInformation,
    });

    setImages(publicUrls);
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, setImages, getImages };
};

export default useProfileUrls;
