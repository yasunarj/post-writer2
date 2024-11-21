import { siteConfig } from "@/config/site";
import { NavItem } from "@/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

interface MobileNavProps {
  items: NavItem[];
  showClose: () => void;
}

const MobileNav = ({ items, showClose }: MobileNavProps) => {
  useLockBodyScroll();
  
  return (
    <div className="fixed top-16 inset-0 z-50 p-6 md:hidden animate-in slide-in-from-bottom-80">  
      <div className="grid gap-6 bg-popover p-4 text-popover-foreground shadow-md">
        <Link href={"/"} className="font-bold" onClick={showClose}>
          {siteConfig.name}
        </Link>
        <nav className="text-sm flex gap-4">
          {items.map((item, index) => {
            return (
              <Link key={index} href={item.href}  onClick={showClose}>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
