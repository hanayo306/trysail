import { Suspense } from "react";
import Posts from "@/components/server/panels/Posts";
import PostsSkeleton from "@/components/client/skeletons/PostsSkeleton";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const Page = async ({ searchParams: { page } }: { searchParams: { page: string | undefined } }) => {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      {/* @ts-ignore Async Server Component */}
      <Posts page={page} />
    </Suspense>
  );
};

export default Page;
