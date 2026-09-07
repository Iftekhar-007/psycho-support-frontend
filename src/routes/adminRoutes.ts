/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route } from "@/types";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Panel",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "All Users",
        url: "/all-users",
        icon: Users,
      },
      {
        title: "Verify Psychologists",
        url: "/confirm-users",
        icon: ShieldCheck,
      },
      {
        title: "All Appointments",
        url: "/dashboard/all-appointments",
        icon: CalendarDays,
      },
      {
        title: "All Psychologists",
        url: "/all-psychologists",
        icon: UserCheck,
      },
      {
        title: "All Patients",
        url: "/all-patients",
        icon: Users,
      },
    ],
  },
];
