import BackBtn from '@/components/client/buttons/BackBtn';
import SearchForm from '@/components/client/forms/SearchForm';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// const getPostsByKeyword = async (keyword: string) => {};

const Page = async ({ searchParams }: Props) => {
  const searchKeyword = searchParams.keyword;

  return (
    <>
      <BackBtn />
      <SearchForm />
    </>
  );
};
export default Page;
