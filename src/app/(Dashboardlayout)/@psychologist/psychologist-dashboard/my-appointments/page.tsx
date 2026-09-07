export const dynamic = "force-dynamic";

import MyAppointments from "@/app/ui-components/appointments/my-appointments";
import React from "react";

const MyAppointmentsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Appointments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage booked patient consultations, update status, and issue prescriptions.
        </p>
      </div>
      <MyAppointments />
    </div>
  );
};

export default MyAppointmentsPage;

