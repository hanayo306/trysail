"use client";

import CreateIcon from "@mui/icons-material/Create";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PostMobileBtn = () => {
  const pathname = usePathname();

  return (
    <Link
      className={`${
        pathname === "/post" ? "hidden" : "block"
      } md:hidden rounded-full overflow-hidden fixed bottom-6 right-6 w-[70px] h-[70px]`}
      href="/post"
    >
      <CreateIcon
        fontSize="large"
        className="text-white bg-blue-400 block md:hidden rounded-full overflow-hidden p-2 w-[70px] h-[70px]"
      />
    </Link>
  );
};

export default PostMobileBtn;
