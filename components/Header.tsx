"use client";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/actions/signOut";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/">
        <div className="flex flex-row items-center text-center">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <p className="font-bold text-2xl text-white mx-2">BookWise</p>
        </div>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <form action={signOutAction}>
            <LogOut className="text-red-600 cursor-pointer" />
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
