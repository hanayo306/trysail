import supabase from '@/libs/supabase';

type Config = {
  limit?: number;
  bucketName: string;
};

const getImagesUploadedByUser = async (email: string, config: Config) => {
  const { data: images } = await supabase.storage.from(config?.bucketName).list(email, {
    sortBy: {
      column: 'created_at',
      order: 'desc',
    },
    limit: config?.limit,
  });

  return images || [];
};

export default getImagesUploadedByUser;
