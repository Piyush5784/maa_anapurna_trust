import { Topbar } from "@/components/custom/topbar";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <>
      {" "}
      <Topbar />
      <div className="flex w-full items-center justify-center p-6 pt-0 md:pt-0 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
