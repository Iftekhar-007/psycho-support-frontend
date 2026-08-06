/* eslint-disable @typescript-eslint/no-explicit-any */
// components/create-prescription-dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreatePrescriptionDialogProps {
  appointmentId: string;
  onCreated: (appointmentId: string) => void;
}

export function CreatePrescriptionDialog({
  appointmentId,
  onCreated,
}: CreatePrescriptionDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [medication, setMedication] = useState("");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setMedication("");
    setExercise("");
    setDuration("");
    setNotes("");
    setError(null);
  };

  const handleSubmit = async () => {
    if (!medication || !exercise || !duration) {
      setError("Medication, exercise, and duration are required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/prescription/create-prescription",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointmentId,
            medication,
            exercise,
            duration,
            notes: notes || undefined,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create prescription");
      }

      onCreated(appointmentId);
      resetForm();
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger>
        <Button size="sm">Create Prescription</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Prescription</DialogTitle>
          <DialogDescription>
            This will mark the appointment as completed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="e.g. Sertraline 50mg"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="exercise">Exercise</Label>
            <Input
              id="exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="e.g. Daily breathing exercises"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 4 weeks"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes for the patient"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving..." : "Save Prescription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
