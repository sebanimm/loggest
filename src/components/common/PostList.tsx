import Post from "@/components/post";
import type { Post as PostData } from "@/types/schema";

interface PostListProps {
  posts: PostData[];
}

export default async function PostList({ posts }: PostListProps) {
  if (!posts.length || !posts) {
    return (
      <main className="flex flex-grow flex-col justify-center">
        <span className="text-center text-4xl font-bold">
          아직 아무것도 없네요!
        </span>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-3 grid-rows-[max-content] gap-4 lg:grid-cols-4">
      {posts.map((item: any) => (
        <Post key={item.id} {...item} />
      ))}
    </main>
  );
}
