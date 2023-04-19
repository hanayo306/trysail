"use client";

import { Skeleton } from "@mui/material";

const MainSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton variant="rectangular" width="full" height={320} className="mb-12" />

      <Skeleton variant="rounded" width={80} height={40} className="mb-4" />

      <ul className="flex flex-wrap gap-8 justify-center">
        {[...new Array(6).keys()].map(key => (
          <li key={key} className="overflow-hidden">
            <Skeleton variant="rounded" width={360} height={200} />

            <div className="py-2 my-1 flex gap-4 items-center">
              <Skeleton variant="text" width={80} height={40} />
              <Skeleton variant="text" width={50} height={40} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainSkeleton;
