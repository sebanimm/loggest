import { redirect } from "next/navigation";

import { getUserStarredPosts } from "@/apis";
import { auth } from "@/auth";
import PostList from "@/components/common/PostList";

export default async function StarredPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/api/auth/signin");
  }

  const posts = await getUserStarredPosts(session.user.id);

  return (
    <div className="container flex min-h-[80vh] flex-col py-8">
      <h1 className="mb-4 text-3xl font-semibold">별표 표시한 게시물</h1>
      <PostList posts={posts} />
    </div>
  );
}
