export const dynamic = "force-dynamic";

import MyAppointments from "@/app/ui-components/appointments/my-appointments";
import React from "react";

export default function MyAppointmentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Appointments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review your scheduled consultations, treatment status, and meeting links.
        </p>
      </div>
      <MyAppointments />
    </div>
  );
}
