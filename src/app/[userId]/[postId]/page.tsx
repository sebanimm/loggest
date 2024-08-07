import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost, getUser } from "@/apis";
import AIQuestionForm from "@/components/aiQuestionForm";
import { PlateEditor } from "@/components/common/PlateEditor";
import MoreMenu from "@/components/moreMenu";
import StarButton from "@/components/starButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { YYYYMMDD } from "@/lib/dayjs";
import { minRead } from "@/lib/minRead";

interface PostPageParams {
  params: {
    userId: string;
    postId: string;
  };
}

export default async function PostPage({
  params: { userId, postId },
}: PostPageParams) {
  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  const refinedQuestion = post.question.split("\n").filter((q) => q !== "");

  const question = {
    introduction: refinedQuestion[0],
    choices: [...refinedQuestion.slice(1, 5)],
    answer: refinedQuestion.at(-1)?.at(-1) as string,
  };

  const author = await getUser(userId);

  return (
    <main className="container lg:w-2/3">
      <article className="flex flex-col py-8">
        <h1 className="mb-10 text-5xl font-bold leading-tight tracking-tighter">
          {post.title}
        </h1>
        <div className="mb-4 flex items-end justify-between">
          <div className="flex gap-2">
            <Button variant="link" className="p-0" asChild>
              <Link href={`/${userId}`}>
                <Avatar>
                  <AvatarImage src={author.image} />
                  <AvatarFallback>{author.name}</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
            <div className="flex flex-col">
              <Button
                variant="link"
                className="h-fit justify-start p-0"
                asChild
              >
                <Link href={`/${userId}`}>{author.name}</Link>
              </Button>
              <span className="text-sm">
                {YYYYMMDD(post.createdAt)} • {minRead(post.description)}
              </span>
            </div>
          </div>
          <div>
            <StarButton userId={userId} postId={postId} />
            {userId === author.id && <MoreMenu />}
          </div>
        </div>
        <main className="mb-24">
          <PlateEditor value={JSON.parse(post.content)} />
        </main>
        <Separator className="mb-16" />
        <AIQuestionForm {...question} />
      </article>
    </main>
  );
}
