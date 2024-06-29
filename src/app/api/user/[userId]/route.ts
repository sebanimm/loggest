import prisma from "@/lib/prisma";

interface Params {
  params: {
    userId: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    return Response.json(user);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "에러발생" });
  }
}
