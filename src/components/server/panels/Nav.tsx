import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import getUserByToken from "@/utils/getUserByToken";
import LoginBtn from "@/components/client/buttons/LoginBtn";

const Nav = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const userInformation = await getUserByToken(token);

  return (
    <nav className="border-b sticky top-0 bg-white/50 backdrop-blur z-10">
      {/* pc */}
      <div className="container mx-auto hidden md:flex justify-between items-center px-2 md:px-4 py-2">
        <h1 className="font-bold text-2xl">
          <Link href={"/"}>Logo</Link>
        </h1>

        <button>
          <BsSearch />
        </button>
      </div>

      {/* mobile */}
      {userInformation && (
        <div className="container mx-auto flex items-center justify-between md:hidden px-2 md:px-4 py-2 gap-2 relative">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>Logo</Link>
          </h1>

          <Link href={"/profile"} className="rounded-full overflow-hidden">
            <Image
              src={userInformation.profile.profile_picture_url}
              alt={`${userInformation.profile.user_name}의 프로필사진`}
              width={36}
              height={36}
              className="rounded-full overflow-hidden"
            />
          </Link>
        </div>
      )}

      {!userInformation && (
        <div className="container mx-auto flex items-center justify-between md:hidden px-2 md:px-4 py-2 gap-2">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>Logo</Link>
          </h1>

          <LoginBtn />
        </div>
      )}
    </nav>
  );
};

export default Nav;
