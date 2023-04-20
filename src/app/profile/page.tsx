import LogoutBtn from "@/components/client/buttons/LogoutBtn";

const Page = async () => {
  return (
    <div className="p-4">
      <h2 className="mb-8">My Page</h2>

      <LogoutBtn />
    </div>
  );
};

export default Page;
