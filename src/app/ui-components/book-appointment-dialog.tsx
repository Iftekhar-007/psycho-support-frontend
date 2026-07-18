// components/book-appointment-dialog.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Clock, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  formatSlotLabel,
  getTimeSlots,
  getUpcomingAvailableDates,
} from "@/lib/parse-availability";

interface BookAppointmentDialogProps {
  psychologistId: string;
  psychologistName: string;
  availability: string;
  appointmentFee: number;
}

const DURATION_OPTIONS = [30, 60, 90];
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const BookAppointmentDialog = ({
  psychologistId,
  psychologistName,
  availability,
  appointmentFee,
}: BookAppointmentDialogProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [patientIssue, setPatientIssue] = useState("");
  const [recordHistory, setRecordHistory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const availableDates = useMemo(
    () => getUpcomingAvailableDates(availability, 14),
    [availability],
  );

  const timeSlots = useMemo(
    () => getTimeSlots(availability, duration),
    [availability, duration],
  );

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setPatientIssue("");
    setRecordHistory("");
    setDuration(60);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    setOpen(next);
  };

  const handleSubmit = async () => {
    if (!session) {
      toast.error("Please sign in to book an appointment.");
      router.push("/sign-in");
      return;
    }

    if (session.user.role !== "PATIENT") {
      toast.error("Only patient accounts can book appointments.");
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot.");
      return;
    }

    if (!patientIssue.trim()) {
      toast.error("Please briefly describe what you'd like to talk about.");
      return;
    }

    const [hour, minute] = selectedSlot.split(":").map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hour, minute, 0, 0);

    setSubmitting(true);

    try {
      const res = await fetch(
        `${API_URL}/api/v1/appointment/create-appointment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            date: appointmentDate.toISOString(),
            duration,
            patientIssue: patientIssue.trim(),
            recordHistory: recordHistory.trim() || undefined,
            psychologistid: psychologistId,
          }),
        },
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Failed to book appointment");
      }

      toast.success("Appointment requested!", {
        description: `We've sent your request to ${psychologistName}. You'll be notified once it's confirmed.`,
      });

      handleOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error("Booking failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            size="lg"
            className="mt-2 w-full bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
          />
        }
      >
        Book Appointment
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book with {psychologistName}</DialogTitle>
          <DialogDescription>
            ৳{appointmentFee} per session · {psychologistName} is available{" "}
            {availability}
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-2">
            {/* Duration */}
            <div className="flex flex-col gap-2">
              <Label>Session duration</Label>
              <Select
                value={String(duration)}
                onValueChange={(val) => {
                  setDuration(Number(val));
                  setSelectedSlot(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date selection */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4 text-[#8FAF9F]" />
                Choose a date
              </Label>
              {availableDates.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Couldn&apos;t read this psychologist&apos;s availability.
                  Please contact them directly.
                </p>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {availableDates.map((date) => {
                    const isSelected =
                      selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={cn(
                          "flex shrink-0 flex-col items-center gap-0.5 rounded-xl border px-3 py-2 text-sm transition-colors",
                          isSelected
                            ? "border-[#0f1f1c] bg-[#8FAF9F]/10 text-[#0f1f1c]"
                            : "border-border text-muted-foreground hover:border-[#8FAF9F]/50",
                        )}
                      >
                        <span className="text-xs">
                          {date.toLocaleDateString(undefined, {
                            weekday: "short",
                          })}
                        </span>
                        <span className="font-medium">{date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2">
                  <Clock className="size-4 text-[#8FAF9F]" />
                  Choose a time slot
                </Label>
                {timeSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No slots available for this duration on this day.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "rounded-lg border px-2 py-2 text-sm transition-colors",
                          selectedSlot === slot
                            ? "border-[#0f1f1c] bg-[#0f1f1c] text-[#F7F5F0]"
                            : "border-border text-muted-foreground hover:border-[#8FAF9F]/50",
                        )}
                      >
                        {formatSlotLabel(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Patient issue */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="patientIssue">
                What would you like to talk about?
              </Label>
              <Textarea
                id="patientIssue"
                value={patientIssue}
                onChange={(e) => setPatientIssue(e.target.value)}
                placeholder="Briefly describe what's on your mind — this stays confidential."
                rows={3}
              />
            </div>

            {/* Record history (optional) */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="recordHistory">
                Relevant history{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="recordHistory"
                value={recordHistory}
                onChange={(e) => setRecordHistory(e.target.value)}
                placeholder="Any prior diagnoses, medication, or context that might help."
                rows={2}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={submitting || isPending}
            className="w-full bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Requesting...
              </>
            ) : (
              "Confirm Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { BookAppointmentDialog };

export default BookAppointmentDialog;
