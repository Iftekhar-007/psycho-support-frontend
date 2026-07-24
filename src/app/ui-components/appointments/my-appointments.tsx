// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { Badge } from "@/components/ui/badge";

// import { Button } from "@/components/ui/button";

// import { Separator } from "@/components/ui/separator";

// export default function MyAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getStatusVariant = (status: string) => {
//     switch (status) {
//       case "CONFIRMED":
//         return "default";

//       case "PENDING":
//         return "secondary";

//       case "COMPLETED":
//         return "outline";

//       case "CANCELLED":
//         return "destructive";

//       default:
//         return "secondary";
//     }
//   };

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/v1/appointment/my-appointments",
//           {
//             credentials: "include",
//           },
//         );

//         const data = await res.json();

//         setAppointments(data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//       {appointments.map((appointment: any) => (
//         <Card key={appointment.id}>
//           <CardHeader>
//             <div className="flex items-center gap-4">
//               <Avatar className="h-14 w-14">
//                 <AvatarImage
//                   src={appointment.psychologist?.profilePhoto}
//                   alt={appointment.psychologist?.name}
//                 />
//                 <AvatarFallback>
//                   {appointment.psychologist?.name.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>

//               <div>
//                 <CardTitle>{appointment.psychologist?.name}</CardTitle>

//                 <CardDescription>
//                   {appointment.psychologist?.sector}
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-muted-foreground">Date</p>
//                 <p>{new Date(appointment.date).toLocaleDateString()}</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Duration</p>
//                 <p>{appointment.duration} Minutes</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Fee</p>
//                 <p>৳ {appointment.psychologist?.appointmentFee}</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Experience</p>
//                 <p>{appointment.psychologist?.experience} Years</p>
//               </div>
//             </div>

//             <Separator />

//             <div>
//               <p className="text-muted-foreground text-sm">Patient Issue</p>

//               <p>{appointment.patientIssue}</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground text-sm">Record History</p>

//               <p>{appointment.recordHistory}</p>
//             </div>

//             <Separator />

//             <div className="flex flex-wrap gap-2">
//               {/* <Badge variant="secondary">
//                 Appointment Status: {appointment.appointmentStatus}
//               </Badge> */}

//               <Badge variant={getStatusVariant(appointment.appointmentStatus)}>
//                 Appointment Status: {appointment.appointmentStatus}
//               </Badge>

//               <Badge variant={getStatusVariant(appointment.paymentStatus)}>
//                 {" "}
//                 Payment Status: {appointment.paymentStatus}
//               </Badge>
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-between">
//             <Button variant="outline">View Details</Button>

//             {appointment.meetLink && <Button>Join Meeting</Button>}
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

// Mirrors validTransitions in appointment.service.ts
const STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  CANCELLED: [],
  COMPLETED: [],
};

export default function MyAppointments() {
  const { data: session } = authClient.useSession();
  const isPsychologist = session?.user?.role === "psychologist";

  const [appointments, setAppointments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(
    null,
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default";
      case "PENDING":
        return "secondary";
      case "COMPLETED":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Filters the raw state-machine transitions down to what's actually
  // allowed right now, matching the extra guards in updateAppointmentStatus
  const getAvailableStatuses = (appointment: any): AppointmentStatus[] => {
    const next =
      STATUS_TRANSITIONS[appointment.appointmentStatus as AppointmentStatus] ??
      [];

    return next.filter((status) => {
      if (status === "CONFIRMED" && appointment.paymentStatus !== "COMPLETED") {
        return false;
      }
      if (status === "COMPLETED" && new Date(appointment.date) > new Date()) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/appointment/my-appointments",
          { credentials: "include" },
        );
        const data = await res.json();
        setAppointments(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: AppointmentStatus,
  ) => {
    setUpdatingId(appointmentId);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/appointment/update-appointment-status/${appointmentId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentStatus: newStatus }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update appointment status");
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, ...data.data } : a)),
      );
    } catch (err: any) {
      setError({ id: appointmentId, message: err.message });
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {appointments.map((appointment: any) => {
        const availableStatuses = getAvailableStatuses(appointment);

        return (
          <Card key={appointment.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={appointment.psychologist?.profilePhoto}
                    alt={appointment.psychologist?.name}
                  />
                  <AvatarFallback>
                    {appointment.psychologist?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <CardTitle>{appointment.psychologist?.name}</CardTitle>
                  <CardDescription>
                    {appointment.psychologist?.sector}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p>{appointment.duration} Minutes</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fee</p>
                  <p>৳ {appointment.psychologist?.appointmentFee}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p>{appointment.psychologist?.experience} Years</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-muted-foreground text-sm">Patient Issue</p>
                <p>{appointment.patientIssue}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">Record History</p>
                <p>{appointment.recordHistory}</p>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={getStatusVariant(appointment.appointmentStatus)}
                >
                  Appointment Status: {appointment.appointmentStatus}
                </Badge>
                <Badge variant={getStatusVariant(appointment.paymentStatus)}>
                  Payment Status: {appointment.paymentStatus}
                </Badge>
              </div>

              {isPsychologist && availableStatuses.length > 0 && (
                <div className="space-y-1">
                  <Select
                    disabled={updatingId === appointment.id}
                    onValueChange={(value) =>
                      handleStatusChange(
                        appointment.id,
                        value as AppointmentStatus,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          updatingId === appointment.id
                            ? "Updating..."
                            : "Update status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          Mark as {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {error?.id === appointment.id && (
                    <p className="text-destructive text-xs">{error?.message}</p>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">View Details</Button>
              {appointment.meetLink && <Button>Join Meeting</Button>}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
