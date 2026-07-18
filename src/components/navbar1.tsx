/* eslint-disable @next/next/no-img-element */
"use client";

import { LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { useEffect, useState } from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

type SessionUser = {
  name: string;
  email: string;
  image?: string | null;
  role?: "PATIENT" | "PSYCHOLOGIST" | "ADMIN";
  // TODO: replace with real fields once you wire up profile-check logic
  hasPatientProfile?: boolean;
  hasPsychologistProfile?: boolean;
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

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/" },

    {
      title: "About",
      url: "/about",
    },
    { title: "Psychologists", url: "/psychologists" },

    {
      title: "Blog",
      url: "/blog",
    },
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    // },
  ],
  auth = {
    login: { title: "Login", url: "/auth/sign-in" },
    signup: { title: "Sign up", url: "/auth/sign-up" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [userStatus, setUserStatus] = useState<{
    role: "PATIENT" | "PSYCHOLOGIST" | "ADMIN";
    hasPatientProfile: boolean;
    hasPsychologistProfile: boolean;
  } | null>(null);

  const user = session?.user as SessionUser | undefined;

  useEffect(() => {
    if (!session) return;

    const getStatus = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/user/me/status`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      setUserStatus(data.data);
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
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <section className={cn("py-4", className)}>
      <div className="max-w-10/12 mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {isPending ? (
            <Skeleton className="size-9 rounded-full" />
          ) : session ? (
            <div className="flex items-center gap-3">
              {showCreatePatientProfile && (
                <Button size="sm" onClick={handleCreateProfile}>
                  Create Patient Profile
                </Button>
              )}
              {showCreatePsychologistProfile && (
                <Button size="sm" onClick={handleCreateProfile}>
                  Create Psychologist Profile
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="size-9 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/50">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="text-sm">
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <p className="truncate font-medium">
                        {session.user.name}
                      </p>
                      <p className="truncate text-xs font-normal text-muted-foreground">
                        {session.user.email}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      render={
                        <a
                          href="/dashboard"
                          className="flex items-center gap-2"
                        />
                      }
                    >
                      <User className="size-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                render={<a href={auth.login.url} />}
                nativeButton={false}
              >
                {auth.login.title}
              </Button>
              <Button
                size="sm"
                render={<a href={auth.signup.url} />}
                nativeButton={false}
              >
                {auth.signup.title}
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>

            <div className="flex items-center gap-3">
              {!isPending && showCreatePatientProfile && (
                <Button size="sm" onClick={handleCreateProfile}>
                  Create Patient
                </Button>
              )}
              {!isPending && showCreatePsychologistProfile && (
                <Button size="sm" onClick={handleCreateProfile}>
                  Create Psychologist
                </Button>
              )}

              {!isPending && session && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="size-9 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/50">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name}
                      />
                      <AvatarFallback className="text-sm">
                        {getInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <p className="truncate font-medium">
                          {session.user.name}
                        </p>
                        <p className="truncate text-xs font-normal text-muted-foreground">
                          {session.user.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        render={
                          <a
                            href="/dashboard"
                            className="flex items-center gap-2"
                          />
                        }
                      >
                        <User className="size-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="icon" />}>
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <a href={logo.url} className="flex items-center gap-2">
                        <img
                          src={logo.src}
                          className="max-h-8 dark:invert"
                          alt={logo.alt}
                        />
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      // type="single"
                      // collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    {!isPending && !session && (
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          render={<a href={auth.login.url} />}
                          nativeButton={false}
                        >
                          {auth.login.title}
                        </Button>
                        <Button
                          render={<a href={auth.signup.url} />}
                          nativeButton={false}
                        >
                          {auth.signup.title}
                        </Button>
                      </div>
                    )}

                    {!isPending && session && (
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-destructive"
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
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              key={subItem.title}
              className="w-80"
              render={<SubMenuLink item={subItem} />}
            ></NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
