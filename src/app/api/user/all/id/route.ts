import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({ select: { id: true } });
    const userIds = users.map((user) => user.id);
    return Response.json(userIds);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}
