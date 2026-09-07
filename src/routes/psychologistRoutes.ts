import { Route } from "@/types";
import { LayoutDashboard, CalendarDays, FileText, User } from "lucide-react";

export const psychologistRoutes: Route[] = [
  {
    title: "Psychologist Panel",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My appointments",
        url: "/psychologist-dashboard/my-appointments",
        icon: CalendarDays,
      },
      {
        title: "My profile",
        url: "/psychologist-dashboard/my-profile",
        icon: User,
      },
      {
        title: "My prescriptions",
        url: "/my-prescriptions",
        icon: FileText,
      },
    ],
  },
];

