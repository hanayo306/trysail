import PostForm from "@/components/client/forms/PostForm";
import getUserByToken from "@/utils/getUserByToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Post - Trysail",
  description: "Post - Trysail",
  openGraph: {
    title: "Post - Trysail",
    description: "Post - Trysail",
  },
};

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const userInformation = await getUserByToken(token);

  if (!userInformation) {
    redirect("/auth/login");
  }

  return <PostForm userInformation={userInformation} />;
};

export default Page;
