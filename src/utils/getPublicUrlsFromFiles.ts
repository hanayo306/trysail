import { FileObject } from '@supabase/storage-js';
import supabase from '@/libs/supabase';
import { UserInformation } from '@/utils/getUserByToken';

type Config = {
  userInformation: UserInformation;
  files: FileObject[];
  bucketName: string;
};

const getPublicUrlsFromFiles = ({ files, userInformation, bucketName }: Config) => {
  return files.map(file => {
    const { name } = file;
    const publicUrl = supabase.storage.from(bucketName).getPublicUrl(`${userInformation.user.email}/${name}`);
    return {
      name,
      url: publicUrl.data.publicUrl,
    };
  });
};

export default getPublicUrlsFromFiles;
