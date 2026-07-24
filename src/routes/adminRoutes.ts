/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route } from "@/types";

// import { CalendarIcon, CheckCircleIcon, UserIcon, UsersIcon } from "";

import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "All Users",
        url: "/all-users",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Confirm Users",
        url: "/confirm-users",
        icon: ListIcon,
      },
      {
        title: "All Appointments",
        url: "/dashboard/all-appointments",
        // icon: <CalendarIcon />,
        icon: ChartBarIcon,
      },
      {
        title: "All Psychologists",
        url: "/all-psychologists",
        // icon: <UserIcon />,
        icon: UsersIcon,
      },
      {
        title: "All Patients",
        url: "/all-patients",
        // icon: <UserIcon />,
        icon: UsersIcon,
      },
    ],
  },
];
