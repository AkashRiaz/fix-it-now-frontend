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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LayoutDashboard, LogOut, Menu, User, Wrench } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    label: "Register as Technician",
    href: "/technicians/register",
  },
];

type UserMenuAction = "dashboard" | "profile" | "logout";

type UserMenuItem = {
  label: string;
  icon: typeof LayoutDashboard;
  action: UserMenuAction;
};

type NavbarProps = {
  user: IUser;
};

const getUserMenuItems = (role?: IUser["data"]["role"]): UserMenuItem[] => {
  const items: UserMenuItem[] = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      action: "dashboard",
    },
  ];

  if (role === "TECHNICIAN") {
    items.push({
      label: "Profile",
      icon: User,
      action: "profile",
    });
  }

  return items;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const userMenuItems = getUserMenuItems(user?.data?.role);

  const activeNavHref = [...navItems]
    .sort((firstItem, secondItem) => {
      return secondItem.href.length - firstItem.href.length;
    })
    .find((item) => {
      if (item.href.includes("#")) {
        return false;
      }

      if (item.href === "/") {
        return pathname === "/";
      }

      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    })?.href;

  const isActiveMenu = (href: string) => {
    return href === activeNavHref;
  };
  
  const handleUserMenuAction = async (action: UserMenuAction) => {
    if (action === "logout") {
      await logout();

      toast.success("User Logged Out Successfully!");

      router.push("/login");
      router.refresh();

      return;
    }

    if (action === "dashboard") {
      if (user?.data?.role === "CUSTOMER") {
        router.push("/dashboard");
      } else if (user?.data?.role === "TECHNICIAN") {
        router.push("/technician-dashboard");
      } else if (user?.data?.role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }

    if (action === "profile" && user?.data?.role === "TECHNICIAN") {
      router.push("/technician-dashboard/profile");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <nav>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
          {/* Mobile menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="shrink-0"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[290px] p-0 sm:w-[340px]">
                <SheetHeader className="border-b px-5 py-5 text-left">
                  <SheetTitle asChild>
                    <Link href="/" className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <Wrench size={21} />
                      </div>

                      <div>
                        <p className="text-xl font-extrabold tracking-tight text-primary">
                          FixItNow
                        </p>

                        <p className="text-xs font-normal text-muted-foreground">
                          Trusted Home Services
                        </p>
                      </div>
                    </Link>
                  </SheetTitle>

                  <SheetDescription className="sr-only">
                    Main navigation menu
                  </SheetDescription>
                </SheetHeader>

                <div className="flex h-[calc(100vh-81px)] flex-col">
                  <div className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
                    {navItems.map((item) => {
                      const isActive = isActiveMenu(item.href);

                      return (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>

                  {!user?.success && (
                    <div className="space-y-3 border-t p-4">
                      <SheetClose asChild>
                        <Button asChild className="w-full rounded-xl">
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>

                      <SheetClose asChild>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          <Link href="/register">Create Account</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}

                  {user?.success && (
                    <div className="border-t bg-slate-50 p-4">
                      <div className="mb-4 rounded-xl border bg-white p-4">
                        <p className="truncate font-semibold text-slate-900">
                          {user?.data?.name || "User"}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {user?.data?.email || ""}
                        </p>

                        <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {user?.data?.role || ""}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;

                          return (
                            <SheetClose key={item.action} asChild>
                              <button
                                type="button"
                                onClick={() =>
                                  handleUserMenuAction(item.action)
                                }
                                className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-white hover:text-primary"
                              >
                                <Icon className="mr-3 h-4 w-4" />

                                {item.label}
                              </button>
                            </SheetClose>
                          );
                        })}

                        <SheetClose asChild>
                          <button
                            type="button"
                            onClick={() => handleUserMenuAction("logout")}
                            className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                          </button>
                        </SheetClose>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white sm:flex">
              <Wrench size={22} />
            </div>

            <div className="min-w-0">
              <span className="block truncate text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
                FixItNow
              </span>

              <p className="hidden text-[11px] text-muted-foreground sm:block">
                Trusted Home Services
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = isActiveMenu(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-slate-100 hover:text-primary"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!user?.success ? (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden rounded-full px-4 font-semibold sm:inline-flex"
                >
                  <Link href="/register">Register</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="rounded-full px-4 font-semibold shadow-sm sm:px-6"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open user menu"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary/10 transition hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-64 rounded-xl"
                >
                  <DropdownMenuLabel>
                    <div className="space-y-1">
                      <p className="truncate font-semibold">
                        {user?.data?.name || "User"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.data?.email || ""}
                      </p>

                      <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                        {user?.data?.role || ""}
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
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                    onClick={() => handleUserMenuAction("logout")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
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
