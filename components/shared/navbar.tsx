"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  Wrench,
  CalendarCheck,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { IUser } from "@/lib/type";
import { logout } from "@/service/logout";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Technicians",
    href: "/technicians",
  },
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "Become Technician",
    href: "/technician/register",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    action: "dashboard",
  },
  {
    label: "Profile",
    icon: User,
    action: "profile",
  },
  {
    label: "Settings",
    icon: Settings,
    action: "settings",
  },
];

type NavbarProps = {
  user: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();

      toast.success("User Logged Out Successfully!");

      router.push("/login");
    }

    if (action === "dashboard") {
      if (user.data.role === "CUSTOMER") {
        router.push("/dashboard");
      } else if (user.data.role === "TECHNICIAN") {
        router.push("/technician-dashboard");
      } else if (user.data.role === "ADMIN") {
        router.push("/admin-dashboard");
      }
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        bg-white/80
        backdrop-blur-lg
      "
    >
      <nav>
        <div
          className="
            mx-auto
            flex
            h-18
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-primary
                text-white
              "
            >
              <Wrench size={22} />
            </div>

            <div>
              <span
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-primary
                "
              >
                FixItNow
              </span>

              <p
                className="
                  hidden
                  text-[11px]
                  text-muted-foreground
                  sm:block
                "
              >
                Trusted Home Services
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-8
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:text-primary
                "
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {!user.success ? (
              <Link href="/login">
                <Button
                  className="
                    rounded-full
                    px-6
                    font-semibold
                    shadow-md
                  "
                >
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      transition
                      hover:bg-primary/20
                    "
                  >
                    <User
                      className="
                        h-5
                        w-5
                        text-primary
                      "
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-60 rounded-xl">
                  <DropdownMenuLabel>
                    <div className="space-y-1">
                      <p className="font-semibold">{user.data.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {user.data.email}
                      </p>

                      <span
                        className="
                          inline-block
                          rounded-full
                          bg-primary/10
                          px-2
                          py-1
                          text-xs
                          text-primary
                        "
                      >
                        {user.data.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {userMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                        className="cursor-pointer"
                      >
                        <Icon
                          className="
                            mr-2
                            h-4
                            w-4
                          "
                        />

                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={() => handleUserMenuAction("logout")}
                  >
                    <LogOut
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
