import { Post } from '@/types/response';
import Link from 'next/link';
import Image from 'next/image';
import blurDataURL from '@/const';
import koreanIntl from '@/utils/formatDate';

interface MainItemProps {
  post: Post;
}

const MainItem = ({ post }: MainItemProps) => {
  return (
    <li className='cursor-pointer w-full mx-auto md:mx-0 mb-8'>
      <Link href={`/posts/${post.id}`} className='flex flex-col md:flex-row gap-4 items-center md:items-stretch'>
        <Image
          src={post.images[0]}
          alt={post.title}
          width={360}
          height={202.5}
          className='object-cover max-w-md md:max-w-[360px] w-full aspect-video md:rounded-xl overflw-hidden'
          placeholder='blur'
          blurDataURL={blurDataURL}
        />

        <div className='w-full max-w-md md:max-w-full px-2 md:px-0 flex flex-col justify-between'>
          <div>
            <p className='font-bold text-xl text-ellipsis max-w-[200px] whitespace-nowrap overflow-hidden'>
              {post.title}
            </p>
            <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{post.user_name}</p>
          </div>
          <p className='text-right'>{koreanIntl.format(new Date(post.created_at))}</p>
        </div>
      </Link>
    </li>
  );
};

export default MainItem;
