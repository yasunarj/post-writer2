import { redirect } from "next/navigation";
import Editor from "@/components/editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Post } from "@prisma/client";

interface EditorPageProps {
  params: {
    postId: string;
  };
}

const getPostForUser = async (postId: Post["id"], userId: Post["id"]) => {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
  return post;
};

const EditorPage = async ({ params }: EditorPageProps) => {
  const user = await getCurrentUser();
  if(!user) {
    redirect("/login");
  }
  const userId = user.id;
  const { postId } = params;

  const post = await getPostForUser(postId, userId);
  if(!post) {
    redirect("/login");
  }
  const postData = {
    id: post.id,
    title: post.title,
    content: post.content,
    published: post.published,
  }

  return <Editor post={postData} />;
};

export default EditorPage;
