import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({ select: { name: true } });
    const usernames = users.map((user) => user.name);
    return Response.json(usernames);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "에러발생" });
  }
}
