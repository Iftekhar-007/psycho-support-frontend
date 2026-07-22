import { Route } from "@/types";
import { CalendarIcon, PaperclipIcon, UsersIcon } from "lucide-react";

export const patientRoutes: Route[] = [
  {
    title: "Patient Dashboard",
    items: [
      {
        title: "My appointments",
        url: "/my-appointments",
        icon: CalendarIcon,
      },
      {
        title: "My profile",
        url: "/my-profile",
        icon: UsersIcon,
      },
      {
        title: "My prescriptions",
        url: "/my-prescriptions",
        icon: PaperclipIcon,
      },
    ],
  },
];
