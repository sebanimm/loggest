import { notFound } from "next/navigation";

import { getAllUserIds, getUser, getUserPosts } from "@/apis";
import Post from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserPageParams {
  params: {
    userId: string;
  };
}

export default async function UserPage({ params: { userId } }: UserPageParams) {
  const existUserIds = await getAllUserIds();

  if (!existUserIds.includes(userId)) {
    notFound();
  }

  const user = await getUser(userId);
  const userPosts = await getUserPosts(userId);

  return (
    <div className="container">
      <main className="flex flex-col gap-12 py-8">
        <div className="m-auto flex w-[626px]">
          <Avatar className="mr-4 h-24 w-24">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col justify-center text-2xl font-semibold">
            {user.name}
          </span>
        </div>
        <ScrollArea>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
            {userPosts.map((item: any) => (
              <Post key={item.id} {...item} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}