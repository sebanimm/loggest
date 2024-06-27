import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const idParam = params.id;

    const id = parseInt(idParam);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    return Response.json(post);
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { image, title, content } = await request.json();

    const idParam = params.id;

    const id = parseInt(idParam);

    await prisma.post.update({
      data: { image, title, content, description: content },
      where: { id },
    });

    return Response.json({ message: "성공적으로 업데이트되었습니다." });
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const idParam = params.id;

    const id = parseInt(idParam);

    await prisma.post.delete({
      where: { id },
    });

    return Response.json({ message: "성공적으로 삭제되었습니다." });
  } catch (err) {
    console.log("에러:", err);
    return Response.json({ message: "류가 발생했습니다." }, { status: 500 });
  }
}
