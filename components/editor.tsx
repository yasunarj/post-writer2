"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema, postPatchSchemaType } from "@/lib/validations/post";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

const Editor = ({ post }: EditorProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [ isSaving, setIsSaving ] = useState<boolean>(false);
  const ref = useRef<EditorJS>();
  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const body = postPatchSchema.parse(post);

    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここに記事を書く",
      inlineToolbar: true,
      data: JSON.parse(body.content),
      tools: {
        header: Header,
        linkTool: LinkTool,
        list: List,
        code: Code,
      },
    });
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [isMounted, initializeEditor]);

  const { register, handleSubmit } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchemaType) => {
    setIsSaving(true);
    const blocks = await ref.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title, content: JSON.stringify(blocks) }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast({
        title: "問題が発生しました",
        description:
          "あなたの記事は正常に保存されませんでした。もう一度お試しください",
        variant: "destructive",
      });
    }
    router.refresh();

    return toast({
      description: "正常に保存されました",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-10 w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-10">
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              戻る
            </Link>
            <p className="text-sm text-muted-foreground ">公開</p>
          </div>
          <button className={cn(buttonVariants())} type="submit">
            { isSaving && <Icons.spinner className="animate-spin h-4 w-4"  /> }
            <span>保存</span>
          </button>
        </div>
        <div className="mx-auto max-w-[800px] space-y-10">
          <TextareaAutosize
            id="title"
            autoFocus
            placeholder={post.title}
            className="resize-none w-full overflow-hidden bg-transparent text-5xl focus:outline-none font-bold"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px] w-[90%] mx-auto"></div>
        </div>
        <p className="text-sm text-muted-foreground">
          Use
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
      </div>
    </form>
  );
};

export default Editor;
