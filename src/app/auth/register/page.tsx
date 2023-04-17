import { Metadata } from "next";
import RegisterForm from "@/components/client/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Login - Trysail",
  description: "Login - Trysail",
  openGraph: {
    title: "Login - Trysail",
    description: "Login - Trysail",
  },
};

export const revalidate = 0;

const Page = async () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-81px)]">
      <div className="mx-auto max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-8">Register</h2>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
