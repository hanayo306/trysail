import { cookies } from "next/headers";
import LogoutBtn from "../../client/buttons/LogoutBtn";
import PostBtn from "../../client/buttons/PostBtn";
import getUserByToken from "@/utils/getUserByToken";
import LoginBtn from "@/components/client/buttons/LoginBtn";
import SelectProfileImage from "@/components/client/modals/SelectProfileImage";

const Aside = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const userInformation = await getUserByToken(token);

  return (
    <aside className="w-64 hidden md:block sticky top-[49px] min-h-[calc(100vh-49px)] border-l">
      {userInformation && (
        <div className="flex flex-col gap-4 items-start space-y-2 p-4">
          <SelectProfileImage userInformation={userInformation} />

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
          <LoginBtn />
        </div>
      )}
    </aside>
  );
};

export default Aside;
