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

export async function POST(request: Request) {
  try {
    const { image, title, content, userId } = await request.json();

    const author = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!author) throw new Error("존재하지 않는 유저");

    await prisma.post.create({
      data: {
        image,
        title,
        content,
        description: content,
        authorId: author.id,
      },
    });

    return Response.json({ status: 201 });
  } catch (err) {
    console.log("오류:", err);
    return Response.json(
      { message: "알 수 없는 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
