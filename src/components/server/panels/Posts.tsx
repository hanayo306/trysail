import supabase from "@/libs/supabase";
import { Post } from "@/types/response";
import Image from "next/image";
import Link from "next/link";

const getPosts = async () => {
  const { data } = await supabase.from("posts").select().eq("deleted", false).order("created_at", { ascending: false });

  if (!data) return null;

  return data as Post[];
};

const Posts = async () => {
  const posts = await getPosts();

  return (
    <>
      <h2 className="font-bold text-3xl my-4">이미지</h2>

      <ul className="flex flex-wrap gap-8 justify-center">
        {posts?.map(post => (
          <li className="cursor-pointer" key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <Image
                src={post.images[0]}
                alt={post.title}
                width={360}
                height={200}
                className="object-cover w-[360px] h-[200px] rounded-xl overflw-hidden"
              />
              <div className="py-2 my-1 flex gap-4 items-center">
                <p className="font-bold text-xl text-ellipsis whitespace-nowrap overflow-hidden">{post.title}</p>
                <p className="text-ellipsis whitespace-nowrap overflow-hidden">{post.user_name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
