"use client";

import Skeleton from "@mui/material/Skeleton";

const AsideSkeleton = () => {
  return (
    <div className="w-64 p-4 hidden md:block sticky top-12 border-l min-h-[calc(100vh-49px)]">
      <div className="flex flex-col gap-4 items-start space-y-2">
        <Skeleton variant="circular" width={80} height={80} />

        <div className="flex flex-col items-start">
          <Skeleton variant="text" width={150} className="mb-2" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={130} sx={{ fontSize: "1rem" }} />
        </div>

        <Skeleton variant="rounded" width={210} height={24} />

        <Skeleton variant="rounded" width="100%" height={36.5} />
      </div>
    </div>
  );
};

export default AsideSkeleton;
