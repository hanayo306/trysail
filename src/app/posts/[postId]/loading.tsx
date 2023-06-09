"use client";

import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Skeleton variant="circular" width={36} height={36} />

      <div className="flex justify-between items-center my-4">
        <Skeleton variant="rounded" width={100} height={32} />
        <Skeleton variant="rounded" width={90} height={44} />
      </div>

      <Skeleton variant="text" width={50} height={24} className="mb-8" />
      <Skeleton variant="text" width={100} height={24} className="mb-8" />

      <Skeleton variant="rounded" width="100%" height={600} />
    </>
  );
};

export default Loading;
