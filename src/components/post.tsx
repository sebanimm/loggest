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
}

export default function Post({ id, createdAt, title, content }: PostProps) {
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
        <CardDescription className="flex justify-between">
          by 권세원
          <span>
            {createdAt} • {Math.round(content.length / 300)} min read
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
