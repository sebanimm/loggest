import prisma from "@/lib/prisma";

interface Params {
  params: {
    postId: string;
  };
}

export async function GET(request: Request, { params: { postId } }: Params) {
  try {
    const stars = await prisma.star.findMany({
      where: { postId: parseInt(postId) },
    });

    return Response.json(stars);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
