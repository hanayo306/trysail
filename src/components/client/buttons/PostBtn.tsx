"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import CreateIcon from "@mui/icons-material/Create";

const PostBtn = () => {
  return (
    <Link className="w-full block" href="/post">
      <Button variant="contained" className="bg-blue-400 flex gap-2" fullWidth>
        포스트 작성
        <CreateIcon />
      </Button>
    </Link>
  );
};

export default PostBtn;
