import supabase from '@/libs/supabase';
import { Post } from '@/types/response';
import { BsGithub } from 'react-icons/bs';
import MainItem from '@/components/server/items/MainItem';

const getRecentPosts = async () => {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('deleted', false)
    .order('created_at', { ascending: false })
    .range(0, 5);

  if (!data) return null;

  return data as Post[];
};

const Main = async () => {
  const posts = await getRecentPosts();

  return (
    <div>
      <div className='mb-12 flex justify-center items-center h-[calc(100vh-51px)] bg-gray-400 animate-pulse'>로고</div>

      <div className='md:px-4 max-w-6xl mx-auto'>
        <h2 className='mx-auto font-bold text-3xl mb-4 px-2 md:p-0'>최근 스토리</h2>

        <ul>
          {posts?.map(post => (
            <MainItem post={post} key={post.id} />
          ))}
        </ul>

        <div className='flex justify-center my-8'>
          <a
            href='https://github.com/hanayo306/trysail'
            className='flex flex-col items-center justify-center gap-4'
            target='_blank'
          >
            <h2 className='font-bold text-3xl'>GitHub</h2>
            <BsGithub size={64} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
