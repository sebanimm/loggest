import prisma from "@/lib/prisma";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: params.userId },
    });

    return Response.json(posts);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
