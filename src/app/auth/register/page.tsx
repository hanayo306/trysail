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
    <>
      <div className="p-4 w-full">
        <div className="mx-auto max-w-2xl px-4 rounded-xl">
          <h2>Register</h2>

          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Page;
