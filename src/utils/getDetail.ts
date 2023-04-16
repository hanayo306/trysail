import { Post } from "@/types/response";
import supabase from "@/libs/supabase";

const getDetail = async (postId: string) => {
  const { data } = await supabase.from("posts").select().eq("id", postId).eq("deleted", false);

  if (!data) return null;

  return data[0] as Post;
};

export default getDetail;
