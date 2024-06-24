import { MessageSquareIcon, StarIcon } from "lucide-react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  stars: number;
  comments: number;
}

export default function Post({
  id,
  createdAt,
  title,
  content,
  stars,
  comments,
}: PostProps) {
  return (
    <Card key={id}>
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
          {content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        by 권세원
        <CardDescription className="flex justify-between">
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="w-4" /> {comments}
            <StarIcon className="ml-1 w-4" /> {stars}
          </span>
          <span className="flex items-center gap-1">
            {createdAt} • {Math.round(content.length / 300)} min read
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
