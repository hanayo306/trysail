import { Suspense } from 'react';
import Aside from '@/components/server/panels/Aside';
import PostMobileBtn from '@/components/client/buttons/PostMobileBtn';
import AsideSkeleton from '@/components/client/skeletons/AsideSkeleton';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-6xl mx-auto flex items-start'>
      <PostMobileBtn />

      <div className='w-full md:w-[calc(100%-256px)] min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-49px)] px-2 md:px-4 py-4'>
        {children}
      </div>

      <Suspense fallback={<AsideSkeleton />}>
        {/* @ts-ignore Async Server Component */}
        <Aside />
      </Suspense>
    </div>
  );
};

export default Layout;
