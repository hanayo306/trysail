import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import PostItem from "../items/PostItem";

const perPage = 6;

const getPosts = async (page = 1) => {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false })
    .range((page - 1) * (perPage - 1), page * (perPage - 1));

  if (!data) return null;

  return data as Post[];
};

const Posts = async ({ page }: { page: string | undefined }) => {
  const numberPage = Number(page) || 1;
  const posts = await getPosts(numberPage);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold text-3xl mb-4">이미지</h2>
        <div className="flex gap-4">
          {numberPage > 1 && (
            <Link className="rounded-full w-fit h-fit overflow-hidden border" href={`/posts?page=${numberPage - 1}`}>
              <BsArrowLeftShort size={36} />
            </Link>
          )}
          {posts && posts.length === perPage && (
            <Link className="rounded-full w-fit h-fit overflow-hidden border" href={`/posts?page=${numberPage + 1}`}>
              <BsArrowRightShort size={36} />
            </Link>
          )}
        </div>
      </div>

      <ul className="flex flex-wrap gap-8 justify-center">
        {posts?.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
