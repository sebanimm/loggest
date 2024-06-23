"use client";

import { Plus, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Logo from "@/assets/logo.svg";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <Image src={Logo} alt="loggest" className="hidden sm:block" />
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="outline"
            className="relative h-8 w-full justify-start text-muted-foreground sm:w-40"
            onClick={() => setOpen(true)}
          >
            <SearchIcon size="16" className="mr-2" />
            <span className="inline-flex">검색하기...</span>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="검색어를 입력하세요..." />
          </CommandDialog>
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
