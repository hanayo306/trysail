import supabase from '@/libs/supabase';
import { Post } from '@/types/response';

const getPostsByKeyword = async (keyword: string) => {
  const { data: posts, count } = await supabase
    .from('posts')
    .select('*', {
      count: 'exact',
    })
    .eq('deleted', false)
    .textSearch('title', keyword)
    .order('created_at', { ascending: false });

  return {
    posts: posts as Post[],
    count,
  };
};

export default getPostsByKeyword;
