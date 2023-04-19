import { Suspense } from "react";
import Posts from "@/components/server/panels/Posts";
import PostsSkeleton from "@/components/client/skeletons/PostsSkeleton";

export const revalidate = 0;

const Page = async () => {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      {/* @ts-ignore Async Server Component */}
      <Posts />
    </Suspense>
  );
};

export default Page;
