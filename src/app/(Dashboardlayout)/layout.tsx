export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  admin,
  patient,
  psychologist,
}: {
  children?: React.ReactNode;
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

  const role = userInfo.role?.toUpperCase();

  switch (role) {
    case "ADMIN":
      content = admin || children;
      break;

    case "PSYCHOLOGIST":
      content = psychologist || children;
      break;

    case "PATIENT":
      content = patient || children;
      break;

    default:
      content = patient || children || admin || psychologist;
      break;
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
