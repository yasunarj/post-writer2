"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { signIn } from "next-auth/react";
import { useState } from "react";

const UserAuthForm = () => {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  return (
    <div className="grid gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" placeholder="name@example.com" />
          </div>
          <button className={cn(buttonVariants())}>
            メールアドレスでログイン
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-b"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="text-muted-foreground px-2 bg-background">
            または
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github");
          }}
        >
          {isGithubLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.github className="" />
          )}
          Github
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.google />
          )}
          Google
        </button>
      </div>
    </div>
  );
};

export default UserAuthForm;
