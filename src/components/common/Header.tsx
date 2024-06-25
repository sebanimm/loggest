import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import AuthUser from "@/components/authUser";
import GeneratePostButton from "@/components/generatePostButton";
import Search from "@/components/search";
import ThemeToggle from "@/components/themeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <Image src={Logo} alt="loggest" className="hidden sm:block" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Search />
          <GeneratePostButton />
          <ThemeToggle />
          <AuthUser />
        </div>
      </div>
    </header>
  );
}
