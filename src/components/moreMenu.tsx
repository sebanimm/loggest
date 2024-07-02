"use client";

import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { deletePostAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MoreMenu() {
  const router = useRouter();
  const { postId } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/rewrite?id=${postId}`}>
            <Pen className="mr-2 h-4 w-4" />
            수정하기
          </Link>
        </DropdownMenuItem>
        <form
          action={async () => {
            await deletePostAction(postId as string);
            router.back();
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" /> 삭제하기
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
