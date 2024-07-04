import prisma from "@/lib/prisma";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params: { userId } }: Params) {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId, stars: { some: { userId } } },
      include: { stars: true },
    });

    return Response.json(posts);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
