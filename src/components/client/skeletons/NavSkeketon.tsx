"use client";

import Skeleton from "@mui/material/Skeleton";

const NavSkeleton = () => {
  return (
    <div className="border-b sticky top-0 bg-white/50 backdrop-blur z-10">
      <div className="container mx-auto flex items-center justify-between relative px-4 py-2">
        <Skeleton variant="rounded" width={60} height={32} />
        <Skeleton variant="rounded" width={57} height={32} className="absolute left-1/2 -translate-x-1/2" />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  );
};

export default NavSkeleton;
