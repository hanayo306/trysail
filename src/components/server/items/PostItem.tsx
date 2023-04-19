import { Post } from "@/types/response";
import Image from "next/image";
import Link from "next/link";

const PostItem = ({ post }: { post: Post }) => {
  return (
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
  );
};

export default PostItem;
