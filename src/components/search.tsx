"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const searchList = [
  {
    id: 0,
    name: "asdf",
  },
  {
    id: 1,
    name: "qwer",
  },
];

export default function Search() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(searchList);

  return (
    <>
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
        <CommandList>
          <CommandGroup heading="최근 검색어">
            <CommandEmpty>최근 검색어가 없습니다.</CommandEmpty>
            {list.map((item) => (
              <CommandItem key={item.id}>
                {item.name}
                <XIcon
                  className="ml-auto"
                  onClick={() =>
                    setList((prev) => prev.filter(({ id }) => id !== item.id))
                  }
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
