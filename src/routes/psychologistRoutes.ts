import { Route } from "@/types";
import { CalendarIcon, PaperclipIcon, UsersIcon } from "lucide-react";

export const psychologistRoutes: Route[] = [
  {
    title: "Psychologist Dashboard",
    items: [
      {
        title: "My appointments",
        url: "/psychologist-dashboard/my-appointments",
        icon: CalendarIcon,
      },
      {
        title: "My profile",
        url: "/psychologist-dashboard/my-profile",
        icon: UsersIcon,
      },
      // {
      //   title: "My patients",
      //   url: "/my-patients",
      //   icon: UsersIcon,
      // },
      {
        title: "My prescriptions",
        url: "/my-prescriptions",
        icon: PaperclipIcon,
      },
    ],
  },
];
