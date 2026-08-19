"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  User,
  Sparkles,
  LayoutDashboard,
  Calendar,
  FileText,
  HeartHandshake,
  Shield,
  ArrowRight,
  Stethoscope,
  Info,
  BookOpen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: MenuItem[] = [
  { title: "Home", url: "/", icon: Sparkles },
  { title: "About", url: "/about", icon: Info },
  { title: "Psychologists", url: "/psychologists", icon: Stethoscope },
  { title: "Blog", url: "/blog", icon: BookOpen },
];

type SessionUser = {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  role?: "PATIENT" | "PSYCHOLOGIST" | "ADMIN";
};

const getInitials = (name?: string | null) => {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export const Navbar1 = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [userStatus, setUserStatus] = useState<{
    role: "PATIENT" | "PSYCHOLOGIST" | "ADMIN";
    hasPatientProfile: boolean;
    hasPsychologistProfile: boolean;
  } | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user as SessionUser | undefined;

  useEffect(() => {
    if (!session) return;

    const getStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "https://psychology-support-backend.vercel.app"}/api/v1/user/me/status`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUserStatus(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user status:", err);
      }
    };

    getStatus();
  }, [session]);

  const showCreatePatientProfile =
    userStatus?.role === "PATIENT" && !userStatus.hasPatientProfile;

  const showCreatePsychologistProfile =
    userStatus?.role === "PSYCHOLOGIST" && !userStatus.hasPsychologistProfile;

  const handleCreateProfile = () => {
    if (user?.role === "PATIENT") {
      router.push("/create-profile/patient");
    } else if (user?.role === "PSYCHOLOGIST") {
      router.push("/create-profile/psychologist");
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl supports-backdrop-filter:bg-background/70 transition-all",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group transition-transform">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d221c] to-[#1a4035] text-white shadow-xs group-hover:scale-105 transition-transform">
              <HeartHandshake className="size-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground leading-none flex items-center gap-1.5">
                MindCare
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                  Care
                </span>
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                Psychology Support
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.url === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.url);
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-emerald-950/5 dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-300 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-emerald-800 dark:bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth / User Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <Skeleton className="size-9 rounded-full" />
            ) : session ? (
              <div className="flex items-center gap-3">
                {showCreatePatientProfile && (
                  <Button
                    size="sm"
                    onClick={handleCreateProfile}
                    className="h-9 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium gap-1.5 shadow-xs"
                  >
                    <span className="size-2 rounded-full bg-emerald-300 animate-pulse" />
                    Complete Patient Profile
                  </Button>
                )}

                {showCreatePsychologistProfile && (
                  <Button
                    size="sm"
                    onClick={handleCreateProfile}
                    className="h-9 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium gap-1.5 shadow-xs"
                  >
                    <span className="size-2 rounded-full bg-emerald-300 animate-pulse" />
                    Complete Provider Profile
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="size-9 cursor-pointer ring-2 ring-emerald-800/20 hover:ring-emerald-800/50 transition-all">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name}
                      />
                      <AvatarFallback className="bg-emerald-950 text-white text-xs font-semibold">
                        {getInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl shadow-xl">
                    <DropdownMenuLabel className="p-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold leading-none text-foreground truncate max-w-[150px]">
                            {session.user.name}
                          </p>
                          {user?.role && (
                            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                              {user.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1" />

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard")}
                        className="rounded-xl cursor-pointer py-2 text-sm gap-2"
                      >
                        <LayoutDashboard className="size-4 text-emerald-800 dark:text-emerald-400" />
                        Dashboard
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard/my-appointments")}
                        className="rounded-xl cursor-pointer py-2 text-sm gap-2"
                      >
                        <Calendar className="size-4 text-muted-foreground" />
                        My Appointments
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => router.push("/my-prescriptions")}
                        className="rounded-xl cursor-pointer py-2 text-sm gap-2"
                      >
                        <FileText className="size-4 text-muted-foreground" />
                        Prescriptions
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1" />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="rounded-xl cursor-pointer py-2 text-sm gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/auth/sign-in")}
                  className="h-9 px-4 rounded-xl text-sm font-medium hover:bg-muted/70 cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/auth/sign-up")}
                  className="h-9 px-4 rounded-xl bg-[#0f241d] hover:bg-[#18392e] text-white text-sm font-medium shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {!isPending && session && (
              <Avatar className="size-8 ring-2 ring-emerald-800/20">
                <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                <AvatarFallback className="bg-emerald-950 text-white text-[11px]">
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-xl border-border/80"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between">
                <div>
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle>
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5"
                      >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-950 text-white">
                          <HeartHandshake className="size-4 text-emerald-300" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-foreground leading-none">
                            MindCare
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Psychology Platform
                          </p>
                        </div>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Navigation List */}
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url);
                      return (
                        <Link
                          key={item.url}
                          href={item.url}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                            isActive
                              ? "bg-emerald-950/10 text-emerald-900 dark:text-emerald-300 font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="size-4" />
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>

                  {session && (
                    <div className="mt-6 pt-6 border-t border-border/60 flex flex-col gap-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3.5 mb-1">
                        My Account
                      </p>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <LayoutDashboard className="size-4 text-emerald-800 dark:text-emerald-400" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/my-appointments"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <Calendar className="size-4" />
                        Appointments
                      </Link>
                      <Link
                        href="/my-prescriptions"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <FileText className="size-4" />
                        Prescriptions
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Bottom Actions */}
                <div className="pt-6 border-t border-border/60 space-y-3">
                  {!session ? (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMobileOpen(false);
                          router.push("/auth/sign-in");
                        }}
                        className="w-full h-10 rounded-xl"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileOpen(false);
                          router.push("/auth/sign-up");
                        }}
                        className="w-full h-10 rounded-xl bg-[#0f241d] hover:bg-[#18392e] text-white"
                      >
                        Get Started
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                      className="w-full h-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
