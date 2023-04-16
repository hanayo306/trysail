import RemovePostBtn from "@/components/client/buttons/RemovePostBtn";
import PostImagesSwiper from "@/components/client/swipers/PostImagesSwiper";
import getDetail from "@/utils/getDetail";
import getUserByToken from "@/utils/getUserByToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: { postId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.postId;

  const post = await getDetail(id);

  return {
    title: post?.title || "없는 이미지",
    description: post?.content || "없는 이미지",
    openGraph: {
      title: post?.title || "없는 이미지",
      description: post?.content || "없는 이미지",
      images: post?.images || [],
    },
  };
};

const Page = async ({ params: { postId } }: { params: { postId: string } }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const [userInformation, post] = await Promise.all([getUserByToken(token), getDetail(postId)]);

  if (!post) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl my-4">{post.title}</h2>
        {userInformation?.user.id === post.user_id && <RemovePostBtn postId={post.id} />}
      </div>

      <p className="mb-4">{post.user_name}</p>

      <p>{post.content}</p>

      <PostImagesSwiper images={post.images} />
    </>
  );
};

export default Page;
