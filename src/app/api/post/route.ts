import { createQuestion } from "@/lib/openai";
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
    const { image, title, content, description, email } = await request.json();

    const author = await prisma.user.findUnique({
      where: { email },
    });

    if (!author) throw new Error("존재하지 않는 유저");

    const question = await createQuestion(title, content);

    if (!question) throw new Error("어시스턴트 오류");

    await prisma.post.create({
      data: {
        image,
        title,
        content,
        description,
        authorId: author.id,
        question,
      },
    });

    return Response.json({ status: 201 });
  } catch (err) {
    console.log("오류:", err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
