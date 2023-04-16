import supabase from "@/libs/supabase";

const getUserByToken = async (token: string | undefined) => {
  if (!token) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  if (!user) return null;

  const { data: profileDatas, error: profileError } = await supabase.from("user_profiles").select().eq("user_id", user.id);

  if (!profileDatas || !profileDatas[0]) return null;

  const profile = profileDatas[0] as { user_name: string; profile_picture_url: string };

  return {
    user,
    profile,
  };
};

export default getUserByToken;
