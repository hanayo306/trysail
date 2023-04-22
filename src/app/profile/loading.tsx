"use client";

import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <div className="py-4 px-2 md:px-4">
      <div className="mx-auto max-w-3xl flex flex-col gap-4">
        <Skeleton variant="circular" width={36} height={36} />

        <Skeleton variant="circular" width={120} height={120} />

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

export default Loading;
