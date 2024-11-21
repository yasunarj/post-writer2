import { NextRequest, NextResponse } from "next/server";
import { postCreateSchema } from "../route";
import { db } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

const DELETE = async (
  req: NextResponse,
  context: z.infer<typeof routeContextSchema>
) => {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 422 });
    }
    return NextResponse.json(null, { status: 500 });
  }
};

const PATCH = async (
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) => {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
};

const verifyCurrentUserHasAccessToPost = async (postId: string) => {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });
  return count > 0;
};

export { PATCH, DELETE };
