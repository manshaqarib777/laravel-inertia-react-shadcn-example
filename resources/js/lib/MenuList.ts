import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "#",
              label: "All Posts"
            },
            {
              href: "#",
              label: "New Post"
            }
          ]
        },
        {
          href: "#",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark
        },
        {
          href: "#",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "#",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users
        },
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: User
        }
      ]
    }
  ];
}
