import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";

import MenuBtn from "@/components/client/buttons/MenuBtn";
import LoginBtn from "@/components/client/buttons/LoginBtn";
import getUserByToken from "@/utils/getUserByToken";

import logo from "@/assets/logo.png";

const Nav = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const userInformation = await getUserByToken(token);

  return (
    <nav className="border-b sticky top-0 bg-white/50 backdrop-blur z-10">
      {/* pc */}
      <div className="container mx-auto hidden md:flex justify-between items-center px-2 md:px-4 py-2">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={32} height={32} className="w-8 h-8" />
          <h1 className="font-bold text-xl">Trysail</h1>
        </Link>

        <MenuBtn userInformation={userInformation} />
      </div>

      {/* mobile */}
      {userInformation && (
        <div className="container mx-auto flex items-center justify-between md:hidden px-2 md:px-4 py-2 gap-2 relative">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={32} height={32} className="w-8 h-8" />
            <h1 className="font-bold text-xl">Trysail</h1>
          </Link>

          <Link href={"/profile"} className="rounded-full overflow-hidden">
            <Image
              src={userInformation.profile.profile_picture_url}
              alt={`${userInformation.profile.user_name}의 프로필사진`}
              width={36}
              height={36}
              className="rounded-full overflow-hidden w-9 h-9"
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
