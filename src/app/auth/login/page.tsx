import { Metadata } from "next";
import LoginForm from "@/components/client/forms/LoginForm";

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
        <h2 className="text-2xl font-bold mb-8">Login</h2>

        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
