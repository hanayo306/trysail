import BackBtn from "@/components/client/buttons/BackBtn";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// const getPostsByKeyword = async (keyword: string) => {};

const Page = async ({ searchParams }: Props) => {
  const searchKeyword = searchParams.keyword;

  return (
    <>
      <BackBtn />
      <p>{searchKeyword || "추가예정"}</p>
    </>
  );
};
export default Page;
