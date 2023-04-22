import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import PostItem from "../items/PostItem";
import { redirect } from "next/navigation";
import LinkBtn from "../buttons/LinkBtn";

const perPage = 6;

const getPosts = async (page = 1) => {
  const [{ data: posts }, { data: nextPageData, count }] = await Promise.all([
    supabase
      .from("posts")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false })
      .range((page - 1) * perPage, perPage * page - 1),
    supabase
      .from("posts")
      .select("*", {
        count: "exact",
      })
      .eq("deleted", false)
      .order("created_at", { ascending: false })
      .range(page * perPage, perPage * (page + 1) - 1),
  ]);

  return {
    posts,
    nextPageLength: nextPageData?.length || 0,
    count,
  } as {
    posts: Post[] | null;
    nextPageLength: number;
    count: number | null;
  };
};

const Posts = async ({ page }: { page: string | undefined }) => {
  const numberPage = Number(page) || 1;
  const { posts, nextPageLength, count } = await getPosts(numberPage);

  if (!posts) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between px-2 pt-4 md:p-0 mb-4">
        <h2 className="font-bold text-3xl">스토리</h2>
      </div>

      <ul className="flex flex-wrap gap-8 justify-center">
        {posts.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>

      <div className="flex gap-4 justify-center items-center py-4">
        <LinkBtn href={`/posts?page=${numberPage - 1}`} Icon={BsArrowLeftShort} disabled={numberPage <= 1} />

        <ul className="flex gap-2 items-center">
          {count &&
            [...new Array(Math.ceil(count / perPage)).keys()].map(key => (
              <li key={key}>
                <Link
                  className={`font-bold border rounded aspect-square w-6 flex items-center justify-center transition-[0.3s] ${
                    numberPage === key + 1
                      ? "border-gray-500 bg-gray-500 text-white"
                      : "border-transparent hover:border-gray-400 text-gray-400"
                  }`}
                  href={`/posts?page=${key + 1}`}
                >
                  {key + 1}
                </Link>
              </li>
            ))}
        </ul>

        <LinkBtn
          href={`/posts?page=${numberPage + 1}`}
          Icon={BsArrowRightShort}
          disabled={!(posts.length === perPage && nextPageLength !== 0)}
        />
      </div>
    </>
  );
};

export default Posts;
