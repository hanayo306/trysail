"use client";

import { Skeleton } from "@mui/material";

const PostsSkeleton = () => {
  return (
    <>
      <Skeleton variant="rounded" width={80} height={40} className="mb-4" />

      <ul className="flex flex-wrap gap-8 justify-center">
        {[...new Array(6).keys()].map(key => (
          <li key={key}>
            <Skeleton variant="rounded" width={360} height={200} />

            <div className="py-2 my-1 flex gap-4 items-center">
              <Skeleton variant="text" width={80} height={40} />
              <Skeleton variant="text" width={50} height={40} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostsSkeleton;
