import { redirect } from 'next/navigation';
import PostItem from '../items/PostItem';
import getPostsByPage from '@/utils/getPostsByPage';
import InfinitePosts from '@/components/client/utils/InfinitePosts';

const Posts = async () => {
  const posts = await getPostsByPage();

  if (!posts) {
    redirect('/');
  }

  return (
    <>
      <div className='max-w-md md:max-w-full mx-auto flex justify-between px-2 pt-4 md:p-0 mb-4'>
        <h2 className='font-bold text-3xl'>오늘의 스토리들</h2>
      </div>

      <ul className='flex flex-wrap gap-8 justify-between'>
        {posts.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>

      <InfinitePosts />
    </>
  );
};

export default Posts;
