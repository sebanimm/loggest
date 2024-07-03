import {
  createRun,
  receiveMessage,
  sendMessageToAssistant,
  waitOnRun,
} from "@/lib/openai";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    await sendMessageToAssistant(title, content);

    const run = await createRun();

    await waitOnRun(run);

    const message = await receiveMessage();

    if (!message) {
      throw new Error("어시스턴트 답변 오류");
    }

    return Response.json(message);
  } catch (err) {
    console.log(err);
    return err;
  }
}
