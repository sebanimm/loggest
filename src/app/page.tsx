import { getAllPosts } from "@/apis";
import PostList from "@/components/common/PostList";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container py-8">
      <PostList posts={posts} />
    </div>
  );
}
