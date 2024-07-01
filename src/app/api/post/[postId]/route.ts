import prisma from "@/lib/prisma";

interface Params {
  params: {
    postId: string;
  };
}

export async function GET(request: Request, { params: { postId } }: Params) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    return Response.json(post);
  } catch (err) {
    console.log("오류:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params: { postId } }: Params) {
  try {
    const { image, title, content, description } = await request.json();

    const post = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: { image, title, content, description },
    });

    return Response.json(post);
  } catch (err) {
    console.log("오류:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params: { postId } }: Params) {
  try {
    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    return Response.json(
      { message: "성공적으로 삭제되었습니다" },
      { status: 201 },
    );
  } catch (err) {
    console.log("오류:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
