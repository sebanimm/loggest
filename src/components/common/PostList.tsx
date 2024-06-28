import instance from "@/apis/instance";
import Post from "@/components/post";

export default async function PostList() {
  const posts = await instance.get("/post");

  return (
    <>
      {posts.data.map((item: any) => (
        <Post key={item.id} {...item} />
      ))}
    </>
  );
}
