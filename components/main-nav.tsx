"use client";

import { NavItem } from "@/types";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MobileNav from "./mobile-nav";

interface MainNavProps {
  items: NavItem[];
  children?: ReactNode;
}

const MainNav = ({ items }: MainNavProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const showClose = () => {
    setShowMobileMenu(false);
  }
  return (
    <div className="flex items-center md:gap-10">
      <Link href={"/"} className="md:flex items-center space-x-2">
        <span className="hidden md:inline-block">Post Writer2</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className="text-lg sm:text-sm font-medium hover:text-foreground/80"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
      <button className="md:hidden" onClick={() => setShowMobileMenu(prev => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {showMobileMenu && <MobileNav items={items} showClose={showClose} />}
    </div>
  );
};

export default MainNav;
