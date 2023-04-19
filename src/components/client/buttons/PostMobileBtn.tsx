"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateIcon from "@mui/icons-material/Create";

const PostMobileBtn = () => {
  const pathname = usePathname();

  return (
    <Link
      className={`${
        pathname === "/post" ? "hidden" : "block"
      } md:hidden rounded-full overflow-hidden fixed bottom-6 right-6 z-10`}
      href="/post"
    >
      <CreateIcon
        fontSize="large"
        className="text-white bg-blue-400 block md:hidden rounded-full overflow-hidden p-2 w-16 h-16"
      />
    </Link>
  );
};

export default PostMobileBtn;
