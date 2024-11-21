import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }
    const { user } = session;
    const { id } = user;

    const json = await req.json();
    const body = postPatchSchema.parse(json);
    const { title, content } = body;

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: id,
      },
      select: {
        id: true,
      }
    });
    return NextResponse.json(post);
  } catch (e) {
    if(e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 422 })
    }
    return NextResponse.json(null, { status: 500 });
  }
};

export { POST };
