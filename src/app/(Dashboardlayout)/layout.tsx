import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  patient,
  psychologist,
}: {
  admin: React.ReactNode;
  patient: React.ReactNode;
  psychologist: React.ReactNode;
}) {
  const { data: session } = await userService.getSession();
  const userInfo = session?.user;
  if (!userInfo) {
    redirect("/auth/sign-in");
  }

  let content;

  switch (userInfo.role) {
    case "ADMIN":
      content = admin;
      break;

    case "PSYCHOLOGIST":
      content = psychologist;
      break;

    case "PATIENT":
      content = patient;
      break;

    default:
      redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{content}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
