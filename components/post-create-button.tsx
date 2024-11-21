"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { ReactNode, useState } from "react";
import { Icons } from "./icons";
import { toast } from "@/hooks/use-toast";
interface PostCreateButtonProps extends ButtonProps {children?: ReactNode}

const PostCreateButton = ({
  className,
  variant,
  ...props
}: PostCreateButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);
    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "untitled Post",
      }),
    });
    setIsLoading(false);

    if (!response.ok) {
      return toast({
        title: "問題が発生しました",
        description: "投稿が作成されませんでした",
        variant: "destructive",
        duration: 3000,
      });
    }

    const post = await response.json();
    router.refresh();
    router.push(`editor/${post.id}`);
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        `${isLoading ? "cursor-not-allowed opacity-60" : ""}`,
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Icons.spinner className="animate-spin" /> : <Icons.add />}
      新しい投稿
    </button>
  );
};

export default PostCreateButton;
