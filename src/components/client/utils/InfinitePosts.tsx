'use client';

import { Post } from '@/types/response';
import PostItem from '@/components/server/items/PostItem';
import getPostsByPage from '@/utils/getPostsByPage';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import InfinitePostsSkeleton from '@/components/client/skeletons/InfinitePostsSkeleton';

const InfinitePosts = () => {
  const { postsGroup, spinnerRef } = useInfiniteScroll<Post>({
    getPostsByPage,
    viewPerPage: 6,
    initialPage: 2,
  });

  return (
    <>
      <ul className='flex flex-wrap gap-8 justify-between mb-8'>
        {postsGroup.map(posts => posts.map(post => post && <PostItem key={post.id} post={post} />))}
      </ul>

      <InfinitePostsSkeleton ref={spinnerRef} />
    </>
  );
};

export default InfinitePosts;
