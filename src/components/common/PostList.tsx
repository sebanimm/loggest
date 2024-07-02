import { getAllPosts } from "@/apis";
import Post from "@/components/post";

export default async function PostList() {
  const posts = await getAllPosts();

  return (
    <>
      {posts.map((item: any) => (
        <Post key={item.id} {...item} />
      ))}
    </>
  );
}
