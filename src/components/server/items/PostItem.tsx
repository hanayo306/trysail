import { Post } from "@/types/response";
import Image from "next/image";
import Link from "next/link";
import blurDataURL from "@/const";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <li className="cursor-pointer max-w-md w-full md:w-[calc(50%-16px)] mx-auto" key={post.id}>
      <Link href={`/posts/${post.id}`} className="block w-full">
        <Image
          src={post.images[0]}
          alt={post.title}
          width={360}
          height={202.5}
          className="object-cover w-full aspect-video md:rounded-xl overflw-hidden"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />

        <div className="mx-2 md:mx-0 py-2 my-1 flex gap-4 items-center">
          <p className="font-bold text-xl text-ellipsis max-w-[200px] whitespace-nowrap overflow-hidden">{post.title}</p>
          <p className="text-ellipsis whitespace-nowrap overflow-hidden">{post.user_name}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
