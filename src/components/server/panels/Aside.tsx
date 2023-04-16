import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "../../client/buttons/LogoutBtn";
import PostBtn from "../../client/buttons/PostBtn";
import getUserByToken from "@/utils/getUserByToken";

const Aside = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const userInformation = await getUserByToken(token);

  return (
    <aside className="w-64 hidden md:block sticky top-[49px] min-h-[calc(100vh-49px)] border-l">
      {userInformation && (
        <div className="flex flex-col gap-4 items-start space-y-2 p-4">
          <Image
            src={userInformation.profile.profile_picture_url}
            blurDataURL={userInformation.profile.profile_picture_url}
            width={80}
            height={80}
            className="overflow-hidden object-cover w-[80px] h-[80px] border rounded-full cursor-pointer hover:border-blue-400 transition-[0.3s]"
            alt={userInformation.profile.user_name}
            priority
          />

          <div>
            <p className="text-gray-400">{userInformation.profile.user_name}</p>
            <p className="text-gray-400">{userInformation.user.email}</p>
          </div>

          <LogoutBtn userInformation={userInformation} />
          <PostBtn />
        </div>
      )}

      {!userInformation && (
        <div className="flex flex-col justify-center items-center space-y-2 h-full min-h-[calc(100vh-49px)]">
          <Link href="/auth/login">로그인</Link>
        </div>
      )}
    </aside>
  );
};

export default Aside;
