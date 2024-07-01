import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const allPosts = await prisma.post.findMany();
    return Response.json(allPosts);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
