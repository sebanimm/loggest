import Post from "@/components/post";
import type { Post as PostData } from "@/types/schema";

interface PostListProps {
  posts: PostData[];
}

export default async function PostList({ posts }: PostListProps) {
  if (!posts.length) {
    return (
      <div className="flex h-[calc(100vh-56px)] w-full flex-col">
        <span className="text-4xl font-bold">아직 아무것도 없네요!</span>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-3 gap-4 lg:grid-cols-4">
      {posts.map((item: any) => (
        <Post key={item.id} {...item} />
      ))}
    </main>
  );
}
