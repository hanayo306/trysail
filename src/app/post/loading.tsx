"use client";

import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <div className="">
      <Skeleton className="mb-8" width="100%" variant="rounded" />
      <Skeleton className="mb-8" width="100%" variant="rounded" height={400} />
      <Skeleton className="mb-8" width={64} variant="rounded" height={36.5} />
    </div>
  );
};

export default Loading;
