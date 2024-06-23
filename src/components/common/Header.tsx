import { Plus } from "lucide-react";
import Image from "next/image";

import Logo from "@/assets/logo.svg";
import ThemeToggle from "@/components/common/ThemeToggle";
import Search from "@/components/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <Image src={Logo} alt="loggest" className="hidden sm:block" />
        <div className="flex flex-1 items-center justify-end gap-2">
          <Search />
          <Button variant="ghost" size="icon" className="w-10">
            <Plus />
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar style={{ cursor: "pointer" }}>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/102154824?v=4"
                  alt="프로필"
                />
                <AvatarFallback>프로필</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>내 블로그</DropdownMenuItem>
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
