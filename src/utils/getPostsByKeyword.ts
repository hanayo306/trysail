import supabase from '@/libs/supabase';
import { Post } from '@/types/response';

const getPostsByKeyword = async (keyword: string) => {
  const { data: posts } = await supabase
    .from('posts')
    .select('*', {
      count: 'exact',
    })
    .eq('deleted', false)
    .textSearch('title', keyword)
    .order('created_at', { ascending: false });

  return posts as Post[];
};

export default getPostsByKeyword;
