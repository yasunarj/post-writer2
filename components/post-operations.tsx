"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Icons } from "./icons";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const deletePost = async (postId: string) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed");
    }
    return true;
  } catch (e) {
    toast({
      title: `問題が発生しました`,
      description: `削除できませんでした、もう一度お試しください。error: ${e}`,
      variant: "destructive",
    });
  }
};

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

const PostOperations = ({ post }: PostOperationsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icons.ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="w-full">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に記事を削除しますか?</AlertDialogTitle>
            <AlertDialogDescription>
              削除後には元に戻すことはできません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setIsDeleteLoading(true);
                const result = await deletePost(post.id);
                if (result) {
                  setShowDeleteAlert(false);
                  router.refresh();
                }
                setIsDeleteLoading(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleteLoading ? <Icons.spinner className="h-4 w-4 animate-spin"/> : <Icons.trash className="h-4 w-4"/>}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostOperations;
