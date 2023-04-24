"use client";

import { Skeleton } from "@mui/material";

const MainSkeleton = () => {
  return (
    <div className="md:px-4 pt-0">
      <Skeleton variant="rectangular" width="full" height={320} className="mb-12" />

      <div className="pt-2 px-2 md:p-0">
        <Skeleton variant="rounded" width={80} height={40} className="mb-4" />
      </div>

      <ul className="flex flex-wrap gap-8 justify-between">
        {[...new Array(6).keys()].map(key => (
          <li key={key} className="overflow-hidden  max-w-md w-full md:w-[calc(50%-16px)] flex flex-col mx-auto">
            <Skeleton variant="rounded" width="full" height="auto" className="block w-full aspect-video" />

            <div className="px-2 md:px-0 py-2 my-1 flex gap-4 items-center">
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
