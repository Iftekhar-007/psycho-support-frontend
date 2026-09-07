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
import { CreatePrescriptionDialog } from "../prescription/create-prescription-dialog";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Video,
  AlertCircle,
  Loader2,
  CheckCircle2,
  User,
} from "lucide-react";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

const STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  CANCELLED: [],
  COMPLETED: [],
};

export default function MyAppointments() {
  const { data: session } = authClient.useSession();
  const isPsychologist = session?.user?.role?.toUpperCase() === "PSYCHOLOGIST";

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(
    null,
  );
  const [payingId, setPayingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/v1/appointment/my-appointments", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAppointments(data.data || []);
      } else {
        setAppointments(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePay = async (appointmentId: string) => {
    setPayingId(appointmentId);
    try {
      const res = await fetch(`/api/v1/payment/initiate/${appointmentId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to start payment");
      }

      window.location.href = data.data.checkoutUrl;
    } catch (err: any) {
      setError({ id: appointmentId, message: err.message });
      setPayingId(null);
    }
  };

  const canPrescribe = (appointment: any) =>
    isPsychologist &&
    appointment.appointmentStatus === "CONFIRMED";

  const handlePrescriptionCreated = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId ? { ...a, appointmentStatus: "COMPLETED" } : a,
      ),
    );
  };

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

  const getAvailableStatuses = (appointment: any): AppointmentStatus[] => {
    const next =
      STATUS_TRANSITIONS[appointment.appointmentStatus as AppointmentStatus] ??
      [];

    return next.filter((status) => {
      if (status === "CONFIRMED" && appointment.paymentStatus !== "COMPLETED") {
        return false;
      }
      return true;
    });
  };

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: AppointmentStatus,
  ) => {
    setUpdatingId(appointmentId);
    setError(null);

    try {
      const res = await fetch(
        `/api/v1/appointment/update-appointment-status/${appointmentId}`,
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

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center border-dashed">
        <div className="rounded-full bg-muted p-4 mb-3">
          <CalendarDays className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg font-semibold">No Appointments Yet</CardTitle>
        <CardDescription className="max-w-md mt-1">
          {isPsychologist
            ? "You don't have any booked sessions with patients yet. Once patients book appointments, they will show up here."
            : "You haven't scheduled any psychology consultations yet. Browse our verified psychologists to book your first session."}
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {appointments.map((appointment: any) => {
        const availableStatuses = getAvailableStatuses(appointment);
        const counterpart = isPsychologist
          ? appointment.patient
          : appointment.psychologist;
        const counterpartName =
          counterpart?.name || (isPsychologist ? "Patient" : "Psychologist");
        const counterpartPhoto = counterpart?.profilePhoto;
        const counterpartSubtitle = isPsychologist
          ? counterpart?.email || "Registered Patient"
          : counterpart?.sector || "Psychological Care";

        return (
          <Card key={appointment.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Avatar className="h-13 w-13 border">
                  <AvatarImage
                    src={counterpartPhoto || ""}
                    alt={counterpartName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {counterpartName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <CardTitle className="truncate text-base font-semibold">
                      {counterpartName}
                    </CardTitle>
                    <Badge
                      variant={getStatusVariant(appointment.appointmentStatus)}
                      className="text-[11px] font-medium"
                    >
                      {appointment.appointmentStatus}
                    </Badge>
                  </div>
                  <CardDescription className="truncate text-xs">
                    {counterpartSubtitle}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-sm pb-4">
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(appointment.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">
                      {appointment.duration || 60} mins
                    </p>
                  </div>
                </div>

                {counterpart?.contactNumber && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="font-medium text-foreground truncate">
                      {counterpart.contactNumber}
                    </p>
                  </div>
                )}
              </div>

              {appointment.patientIssue && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Reason for Consultation
                  </p>
                  <p className="text-xs mt-0.5 rounded-md bg-muted/20 p-2 text-foreground/90 leading-relaxed">
                    {appointment.patientIssue}
                  </p>
                </div>
              )}

              {appointment.recordHistory && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Medical / Relevant History
                  </p>
                  <p className="text-xs mt-0.5 rounded-md bg-muted/20 p-2 text-foreground/90 leading-relaxed">
                    {appointment.recordHistory}
                  </p>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Payment Status:</span>
                <Badge
                  variant={
                    appointment.paymentStatus === "COMPLETED"
                      ? "default"
                      : "secondary"
                  }
                  className="font-medium text-[11px]"
                >
                  {appointment.paymentStatus === "COMPLETED"
                    ? "Paid & Verified"
                    : "Payment Pending"}
                </Badge>
              </div>

              {/* Status change actions for Psychologist */}
              {isPsychologist && availableStatuses.length > 0 && (
                <div className="space-y-1 pt-1">
                  <Select
                    disabled={updatingId === appointment.id}
                    onValueChange={(value) =>
                      handleStatusChange(
                        appointment.id,
                        value as AppointmentStatus,
                      )
                    }
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue
                        placeholder={
                          updatingId === appointment.id
                            ? "Updating..."
                            : "Change Status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses.map((status) => (
                        <SelectItem key={status} value={status} className="text-xs">
                          Mark as {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {error?.id === appointment.id && (
                    <p className="text-destructive text-[11px] mt-1">
                      {error?.message}
                    </p>
                  )}
                </div>
              )}

              {/* Pay action for patient */}
              {!isPsychologist && appointment.paymentStatus !== "COMPLETED" && (
                <Button
                  onClick={() => handlePay(appointment.id)}
                  disabled={payingId === appointment.id}
                  className="w-full h-9 text-xs font-medium bg-[#0f241d] hover:bg-[#18392e] text-white cursor-pointer"
                >
                  {payingId === appointment.id ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                      Redirecting to Stripe...
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-3.5 w-3.5 mr-1" />
                      Pay for Session
                    </>
                  )}
                </Button>
              )}
            </CardContent>

            <CardFooter className="pt-2 pb-4 flex items-center justify-between gap-2 border-t border-muted/50">
              {canPrescribe(appointment) && (
                <CreatePrescriptionDialog
                  appointmentId={appointment.id}
                  onCreated={handlePrescriptionCreated}
                />
              )}

              {appointment.meetLink ? (
                <Button
                  size="sm"
                  variant="default"
                  className="ml-auto text-xs h-8 bg-emerald-800 hover:bg-emerald-900"
                  onClick={() => window.open(appointment.meetLink, "_blank")}
                >
                  <Video className="h-3.5 w-3.5 mr-1" /> Join Session
                </Button>
              ) : (
                <span className="text-[11px] text-muted-foreground ml-auto">
                  {appointment.appointmentStatus === "CONFIRMED"
                    ? "Online Session Confirmed"
                    : "Awaiting Confirmation"}
                </span>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
