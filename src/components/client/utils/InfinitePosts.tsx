'use client';

import { Skeleton } from '@mui/material';
import { Post } from '@/types/response';
import PostItem from '@/components/server/items/PostItem';
import getPostsByPage from '@/utils/getPostsByPage';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const InfinitePosts = () => {
  const { postsGroup, spinnerRef } = useInfiniteScroll<Post>({
    getPostsByPage,
    viewPerPage: 6,
    initialPage: 2,
  });

  return (
    <>
      <ul className='flex flex-wrap gap-8 justify-between'>
        {postsGroup.map(posts => posts.map(post => post && <PostItem key={post.id} post={post} />))}
      </ul>

      <ul className='flex flex-wrap gap-8 justify-between' ref={spinnerRef}>
        {[...new Array(6).keys()].map(key => (
          <li key={key} className='overflow-hidden max-w-md w-full md:w-[calc(50%-16px)] flex flex-col mx-auto'>
            <Skeleton variant='rounded' width='full' height='auto' className='block w-full aspect-video' />

            <div className='px-2 md:px-0 my-1 flex gap-4 items-center'>
              <Skeleton variant='text' width={80} height={40} />
              <Skeleton variant='text' width={50} height={40} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfinitePosts;
