"use client";

import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Skeleton variant="rounded" width={100} height={32} />
        <Skeleton variant="rounded" width={90} height={44} />
      </div>
      <Skeleton variant="text" width={50} height={24} className="mb-4" />
      <Skeleton variant="text" width={100} height={24} className="mb-4" />

      <div className="flex gap-4">
        <Skeleton variant="rounded" width="50%" height={600} />
        <Skeleton variant="rounded" width="50%" height={600} />
      </div>
    </>
  );
};

export default Loading;
