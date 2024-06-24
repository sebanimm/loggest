import PostList from "@/components/common/PostList";

export default function Home() {
  return (
    <div className="container pt-8">
      <main className="grid grid-cols-3 gap-4 lg:grid-cols-4">
        <PostList />
      </main>
    </div>
  );
}
