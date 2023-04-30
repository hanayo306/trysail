import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import blurDataURL from '@/const';
import getUserByToken from '@/utils/getUserByToken';
import LogoutBtn from '@/components/client/buttons/LogoutBtn';
import BackBtn from '@/components/client/buttons/BackBtn';
import getImagesUploadedByUser from '@/utils/getImagesFromEmail';
import getPublicUrlsFromFiles from '@/utils/getPublicUrlsFromFiles';
import RecentImages from '@/components/server/panels/RecentImages';

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  const userInformation = await getUserByToken(token);

  if (!userInformation) {
    redirect('auth/login');
  }

  const [postsImages, avatarsImages] = await Promise.all([
    getImagesUploadedByUser(userInformation.user.email!, {
      limit: 6,
      bucketName: 'posts',
    }),
    getImagesUploadedByUser(userInformation.user.email!, {
      limit: 6,
      bucketName: 'avatars',
    }),
  ]);

  const [publicPostsUrls, publicAvatarsUrls] = [
    getPublicUrlsFromFiles({
      files: postsImages,
      userInformation,
      bucketName: 'posts',
    }),
    getPublicUrlsFromFiles({
      files: avatarsImages,
      userInformation,
      bucketName: 'avatars',
    }),
  ];

  return (
    <div className='py-4 px-2 md:px-4'>
      <div className='mx-auto max-w-3xl'>
        <BackBtn />
        <div className='flex flex-col gap-8'>
          <div className='flex justify-between items-start mt-4 mb-8'>
            <Image
              src={userInformation.profile.profile_picture_url}
              placeholder='blur'
              blurDataURL={blurDataURL}
              width={120}
              height={120}
              className='overflow-hidden object-cover w-[120px] h-[120px] border rounded-full cursor-pointer hover:border-blue-400 transition-[0.3s]'
              alt={userInformation.profile.user_name}
            />
            <LogoutBtn />
          </div>

          <div>
            <h2 className='font-bold text-xl mb-2'>{userInformation.profile.user_name}</h2>
            <p>{userInformation.user.email}</p>
          </div>

          <RecentImages title='이미지' urls={publicPostsUrls} />
          <RecentImages title='프로필' urls={publicAvatarsUrls} />

          <div className='flex justify-end'>
            <button className='text-red-400'>회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
