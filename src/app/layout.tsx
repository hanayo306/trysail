import { Suspense } from "react";
import { Metadata } from "next";
import "./globals.css";
import "swiper/swiper.min.css";

import Nav from "@/components/server/panels/Nav";
import AsideSkeleton from "@/components/client/skeletons/AsideSkeleton";
import Aside from "@/components/server/panels/Aside";
import NavSkeleton from "@/components/client/skeletons/NavSkeketon";

export const metadata: Metadata = {
  title: "Trysail",
  description: "Trysail",
  openGraph: {
    title: "Trysail",
    description: "Trysail",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="kr">
      <body className="min-h-screen">
        <Suspense fallback={<NavSkeleton />}>
          {/* @ts-ignore Async Server Component */}
          <Nav />
        </Suspense>
        <main className="container mx-auto min-h-[calc(100vh-49px)]">
          <div className="flex items-start">
            <div className="w-full md:w-[calc(100%-256px)] min-h-[calc(100vh-49px)] p-4">{children}</div>

            <Suspense fallback={<AsideSkeleton />}>
              {/* @ts-ignore Async Server Component */}
              <Aside />
            </Suspense>
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
