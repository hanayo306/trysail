import { Suspense } from "react";
import MainSkeleton from "@/components/client/skeletons/MainSkeleton";
import Main from "@/components/server/panels/Main";

export const revalidate = 0;

const Page = async () => {
  return (
    <Suspense fallback={<MainSkeleton />}>
      {/* @ts-ignore ASC */}
      <Main />
    </Suspense>
  );
};

export default Page;
