import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import AuthUser from "@/components/authUser";
import ThemeToggle from "@/components/common/ThemeToggle";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <Image src={Logo} alt="loggest" className="hidden sm:block" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Search />
          <Button variant="ghost" size="icon" className="w-10">
            <Plus />
          </Button>
          <ThemeToggle />
          <AuthUser />
        </div>
      </div>
    </header>
  );
}
