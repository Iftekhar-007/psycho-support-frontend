"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { psychologistRoutes } from "@/routes/psychologistRoutes";
import { patientRoutes } from "@/routes/patientRoutes";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  navMain: [
    {
      title: "Home",
      url: "/",
      // icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Appointments",
      url: "/dashboard/my-appointments",
      // icon: <ListIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      // icon: <ChartBarIcon />,
    },
    {
      title: "Projects",
      url: "#",
      // icon: <FolderIcon />,
    },
    {
      title: "Team",
      url: "#",
      // icon: <UsersIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const user = {
    name: session?.user.name ?? "Guest",
    email: session?.user.email ?? "",
    avatar: session?.user.image ?? "",
  };

  const role = session?.user.role;

  let routes: Route[] = [];

  switch (role) {
    case Roles.admin:
      routes = adminRoutes;
      break;

    case Roles.psychologist:
      routes = psychologistRoutes;
      break;

    case Roles.patient:
      routes = patientRoutes;
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
