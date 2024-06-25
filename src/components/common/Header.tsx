import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import { auth } from "@/auth";
import AuthUser from "@/components/authUser";
import ThemeToggle from "@/components/common/ThemeToggle";
import GeneratePostButton from "@/components/generatePostButton";
import Search from "@/components/search";

export default async function Header() {
  const session = await auth();

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
