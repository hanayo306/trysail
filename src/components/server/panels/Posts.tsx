import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import PostItem from "../items/PostItem";

const perPage = 6;

const getPosts = async (page = 1) => {
  const [{ data: posts }, { data: nextPageData }] = await Promise.all([
    supabase
      .from("posts")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false })
      .range((page - 1) * perPage, perPage * page - 1),
    supabase
      .from("posts")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false })
      .range(page * perPage, perPage * (page + 1) - 1),
  ]);

  return {
    posts,
    nextPageLength: nextPageData?.length || 0,
  } as {
    posts: Post[] | null;
    nextPageLength: number;
  };
};

const Posts = async ({ page }: { page: string | undefined }) => {
  const numberPage = Number(page) || 1;
  const { posts, nextPageLength } = await getPosts(numberPage);

  return (
    <>
      <div className="flex justify-between px-2 pt-4 md:p-0 mb-4">
        <h2 className="font-bold text-3xl">스토리</h2>
        <div className="flex gap-4">
          {numberPage > 1 ? (
            <Link className="rounded-full w-fit h-fit overflow-hidden border" href={`/posts?page=${numberPage - 1}`}>
              <BsArrowLeftShort size={36} />
            </Link>
          ) : (
            <span className="rounded-full w-fit h-fit overflow-hidden border bg-gray-200 text-gray-400 opacity-50">
              <BsArrowLeftShort size={36} />
            </span>
          )}

          {posts && posts.length === perPage && nextPageLength !== 0 ? (
            <Link className="rounded-full w-fit h-fit overflow-hidden border" href={`/posts?page=${numberPage + 1}`}>
              <BsArrowRightShort size={36} />
            </Link>
          ) : (
            <span className="rounded-full w-fit h-fit overflow-hidden border bg-gray-200 text-gray-400 opacity-50">
              <BsArrowRightShort size={36} />
            </span>
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
