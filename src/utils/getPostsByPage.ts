import supabase from "@/libs/supabase";
import { Post } from "@/types/response";

const perPage = 6;

const getPostsByPage = async (page = 1) => {
  const { data: posts } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
    })
    .eq("deleted", false)
    .order("created_at", { ascending: false })
    .range((page - 1) * perPage, perPage * page - 1);

  return posts as Post[];
};

export default getPostsByPage;
