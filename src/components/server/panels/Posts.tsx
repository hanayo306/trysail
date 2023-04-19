import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import PostItem from "../items/PostItem";

const getPosts = async () => {
  const { data } = await supabase.from("posts").select().eq("deleted", false).order("created_at", { ascending: false });

  if (!data) return null;

  return data as Post[];
};

const Posts = async () => {
  const posts = await getPosts();

  return (
    <>
      <h2 className="font-bold text-3xl mb-4">이미지</h2>

      <ul className="flex flex-wrap gap-8 justify-center">
        {posts?.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
