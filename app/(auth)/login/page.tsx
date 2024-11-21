import UserAuthForm from "@/components/auth/user-auth-form";
import Link from "next/link";

const Login = () => {
  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <div className="w-full sm:w-[350px] flex flex-col justify-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してログインできます
          </p>
        </div>

        <UserAuthForm />

        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href={"/register"} className="underline underline-offset-4">アカウントを持っていませんか？</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
