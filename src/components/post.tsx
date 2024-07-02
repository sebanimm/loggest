import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/apis";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { YYYYMMDD } from "@/lib/dayjs";
import { minRead } from "@/lib/minRead";

interface PostProps {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  authorId: string;
}

export default async function Post({
  id,
  createdAt,
  title,
  description,
  authorId,
}: PostProps) {
  const user = await getUser(authorId);

  return (
    <Card key={id}>
      <Link href={`/${authorId}/${id}`}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="rounded-t-lg object-cover"
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-ellipsis">{title}</CardTitle>
          <CardDescription className="line-clamp-3 text-ellipsis">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-between">
            <span className="flex gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage width={20} height={20} src={user.image} />
                <AvatarFallback>프로필</AvatarFallback>
              </Avatar>
              {user.name}
            </span>
            <span>
              {YYYYMMDD(createdAt)} • {minRead(description)}
            </span>
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
