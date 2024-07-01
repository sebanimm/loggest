import prisma from "@/lib/prisma";

interface Params {
  params: {
    postId: string;
  };
}

export async function POST(request: Request, { params: { postId } }: Params) {
  try {
    const { userId } = await request.json();

    await prisma.star.create({ data: { userId, postId: parseInt(postId) } });

    return Response.json({ status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params: { postId } }: Params) {
  try {
    const { userId } = await request.json();

    await prisma.star.delete({
      where: { userId_postId: { userId, postId: parseInt(postId) } },
    });

    return Response.json({ status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
