import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RemovePostBtn from "@/components/client/buttons/RemovePostBtn";
import PostImagesSwiper from "@/components/client/swipers/PostImagesSwiper";
import getDetail from "@/utils/getDetail";
import getUserByToken from "@/utils/getUserByToken";
import BackBtn from "@/components/client/buttons/BackBtn";

type Props = {
  params: { postId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.postId;

  const post = await getDetail(id);

  return {
    title: `${post?.title || "없는 이미지"} - Trysail`,
    description: post?.content || "설명이 없어요",
    openGraph: {
      title: `${post?.title || "없는 이미지"} - Trysail`,
      description: post?.content || "설명이 없어요",
      images: post?.images || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post?.title || "없는 이미지"} - Trysail`,
      description: post?.content || "설명이 없어요",
    },
  };
};

const Page = async ({ params: { postId } }: Props) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const [userInformation, post] = await Promise.all([getUserByToken(token), getDetail(postId)]);

  if (!post) {
    redirect("/");
  }

  return (
    <>
      <BackBtn />

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl my-4">{post.title}</h2>
        {userInformation?.user.id === post.user_id && <RemovePostBtn postId={post.id} />}
      </div>

      <p className="mb-4">{post.user_name}</p>

      <p className="whitespace-pre-wrap">{post.content}</p>

      <PostImagesSwiper post={post} />
    </>
  );
};

export default Page;
