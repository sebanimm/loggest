import OpenAI from "openai";
import type { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";
import type { Run } from "openai/resources/beta/threads/runs/runs.mjs";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;
const threadId = process.env.NEXT_PUBLIC_THREAD_ID;

export async function sendMessageToAssistant(title: string, content: string) {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: `블로그 제목 : ${title}\n\n블로그 내용 : ${content}`,
  });
}

export async function createRun() {
  return await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
}

export async function waitOnRun(run: Run) {
  // 실행 완료 될 때까지 반복
  // status가 "queued" 또는 "in_progress"인 경우 계속 대기
  while (run.status === "queued" || run.status === "in_progress") {
    // run.status를 업데이트
    run = await openai.beta.threads.runs.retrieve(threadId, run.id);
    // 서버 부하 줄이기
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기
  }
}

export async function receiveMessage() {
  const messages = await openai.beta.threads.messages.list(threadId, {
    order: "asc",
  });

  const assistantMessages = messages.data.filter(
    (message) => message.role !== "user",
  );

  const content = assistantMessages.at(-1)?.content[0] as TextContentBlock;

  return content.text.value;
}

export async function createQuestion(title: string, content: string) {
  await sendMessageToAssistant(title, content);

  const run = await createRun();

  await waitOnRun(run);

  return await receiveMessage();
}
