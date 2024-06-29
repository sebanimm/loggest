import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

interface Params {
  params: {
    userId: string;
    postId: string;
  };
}

export async function GET(
  request: Request,
  { params: { userId, postId } }: Params,
) {
  try {
    const id = parseInt(postId);

    const post = await prisma.post.findUnique({
      where: { id, authorId: userId },
    });

    if (!post) {
      notFound();
    }

    return Response.json(post);
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params: { userId, postId } }: Params,
) {
  try {
    const { image, title, content } = await request.json();

    const id = parseInt(postId);

    await prisma.post.update({
      data: { image, title, content, description: content },
      where: { id, authorId: userId },
    });

    return Response.json({ message: "성공적으로 업데이트되었습니다." });
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { userId, postId } }: Params,
) {
  try {
    const id = parseInt(postId);

    await prisma.post.delete({
      where: { id, authorId: userId },
    });

    return Response.json({ message: "성공적으로 삭제되었습니다." });
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "류가 발생했습니다." }, { status: 500 });
  }
}
