import { Route } from "@/types";
import { LayoutDashboard, CalendarDays, FileText, User } from "lucide-react";

export const patientRoutes: Route[] = [
  {
    title: "Patient Panel",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My appointments",
        url: "/patient-dashboard/my-appointments",
        icon: CalendarDays,
      },
      {
        title: "My profile",
        url: "/patient-dashboard/my-profile",
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

