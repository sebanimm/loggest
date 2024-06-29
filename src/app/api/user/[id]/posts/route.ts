import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const posts = await prisma.user.findUnique({
      where: { id: params.id },
      select: { posts: true },
    });

    return Response.json(posts);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "에러발생" });
  }
}
