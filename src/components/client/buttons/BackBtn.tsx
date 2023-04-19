'use client'

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";

const BackBtn = () => {
  return (
    <Link href="/posts" className="rounded-full w-fit h-fit overflow-hidden border flex">
      <BsArrowLeftShort size={36} className="text-gray-500" />
    </Link>
  );
};

export default BackBtn;
