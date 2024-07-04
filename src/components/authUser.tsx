import Link from "next/link";

import { singInAction, singOutAction } from "@/actions";
import avatarPlaceholder from "@/assets/user.svg";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AuthUser() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <form action={singInAction}>
        <Button type="submit" variant="ghost">
          로그인
        </Button>
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user.image || avatarPlaceholder}
            alt="프로필"
          />
          <AvatarFallback>프로필</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={session.user.id as string} className="w-full">
            내 블로그
          </Link>
        </DropdownMenuItem>
        <form className="w-full" action={singOutAction}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full text-start">
              로그아웃
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
