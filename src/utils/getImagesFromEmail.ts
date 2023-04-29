import supabase from '@/libs/supabase';

const getImagesUploadedByUser = async (email: string) => {
  const { data: images } = await supabase.storage.from('posts').list(email);

  return images || [];
};

export default getImagesUploadedByUser;
