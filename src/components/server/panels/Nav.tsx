import Link from "next/link";
import { BsSearch } from "react-icons/bs";

const Nav = () => {
  return (
    <nav className="border-b sticky top-0 bg-white/50 backdrop-blur">
      <div className="container mx-auto py-2 flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">
          <Link href={"/"}>Logo</Link>
        </h1>

        <button>
          <BsSearch />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
