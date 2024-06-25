"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import avatarPlaceholder from "@/assets/user.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthUser() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <>
      {!user && session.status !== "loading" && (
        <Button variant="ghost" onClick={() => signIn()}>
          로그인
        </Button>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar style={{ cursor: "pointer" }}>
              <AvatarImage src={user.image || avatarPlaceholder} alt="프로필" />
              <AvatarFallback>프로필</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>내 블로그</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
