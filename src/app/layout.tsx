import { Suspense } from 'react';
import { Metadata } from 'next';
import './globals.css';
import 'swiper/swiper.min.css';

import Nav from '@/components/server/panels/Nav';
import NavSkeleton from '@/components/client/skeletons/NavSkeketon';
import Footer from '@/components/server/panels/Footer';
import Panel from '@/components/server/panels/Panel';

export const metadata: Metadata = {
  title: 'Trysail',
  description: 'Trysail',
  openGraph: {
    title: 'Trysail',
    description: 'Trysail',
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='kr'>
      <body className='min-h-screen'>
        <Panel />

        <Suspense fallback={<NavSkeleton />}>
          {/* @ts-ignore Async Server Component */}
          <Nav />
        </Suspense>
        <main className='min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-49px)]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
