import { cookies } from "next/headers";
import LogoutBtn from "@/components/client/buttons/LogoutBtn";
import PostBtn from "@/components/client/buttons/PostBtn";
import LoginBtn from "@/components/client/buttons/LoginBtn";
import getUserByToken from "@/utils/getUserByToken";
import Image from "next/image";
import blurDataURL from "@/const";

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
            placeholder="blur"
            blurDataURL={blurDataURL}
            width={80}
            height={80}
            className="overflow-hidden object-cover w-[80px] h-[80px] border rounded-full cursor-pointer hover:border-blue-400 transition-[0.3s]"
            alt={userInformation.profile.user_name}
          />

          <div>
            <p className="text-gray-400">{userInformation.profile.user_name}</p>
            <p className="text-gray-400">{userInformation.user.email}</p>
          </div>

          <div className="w-full flex justify-between items-center">
            <p className="font-bold text-xl">{userInformation.profile.user_name}</p>
            <LogoutBtn />
          </div>

          <PostBtn />
        </div>
      )}

      {!userInformation && (
        <div className="flex flex-col justify-center items-center space-y-2 h-full min-h-[calc(100vh-49px)]">
          <LoginBtn />
        </div>
      )}
    </aside>
  );
};

export default Aside;
