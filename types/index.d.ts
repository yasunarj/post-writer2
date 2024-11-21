import { Icons } from "lucide-react";

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  }
};

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
    href: string;
    items?: never;
  }
  | {
    href?: string;
    items: NavItem[];
  }
)

type MarketingConfig = {
  mainNav: NavItem[];
};

type DashboardConfig = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
}

export type { SiteConfig, NavItem, MarketingConfig, DashboardConfig, SidebarNavItem };