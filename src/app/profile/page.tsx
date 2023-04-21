import LogoutBtn from "@/components/client/buttons/LogoutBtn";

const Page = async () => {
  return (
    <div className="py-4 px-2 md:px-4">
      <h2 className="mb-8">My Page</h2>

      <LogoutBtn />
    </div>
  );
};

export default Page;
