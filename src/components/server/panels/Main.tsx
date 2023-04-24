import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import PostItem from "../items/PostItem";
import Link from "next/link";

const getRecentPosts = async () => {
  // TODO: 최근 글 5개 불러오도록 해야히ㅏㅁ
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false })
    .range(0, 5);

  if (!data) return null;

  return data as Post[];
};

const Main = async () => {
  const posts = await getRecentPosts();

  return (
    <div className="md:px-4 pt-0 h-full">
      <div className="mb-12 flex justify-center items-center h-[320px] bg-gray-400">로고</div>

      <h2 className="max-w-md md:max-w-full mx-auto font-bold text-3xl mb-4 px-2 md:p-0">최근 스토리</h2>

      <ul className="flex flex-wrap gap-8 justify-between">
        {posts?.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>

      <div className="flex justify-center my-8">
        <Link href="/posts" className="py-6 px-12 bg-gray-400 rounded-full">
          스토리 보기
        </Link>
      </div>
    </div>
  );
};

export default Main;
