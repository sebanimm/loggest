import avatarPlaceholder from "@/assets/user.svg";
import { auth, signIn, signOut } from "@/auth";
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

  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
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
        <DropdownMenuItem>내 블로그</DropdownMenuItem>
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
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
