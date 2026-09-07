/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, CalendarDays, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentCancelledContent() {
  const params = useSearchParams();
  const appointmentId = params.get("appointmentId");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-destructive/20">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="size-8" />
          </div>

          <CardTitle className="text-2xl font-bold">Payment Cancelled</CardTitle>

          <CardDescription className="text-sm mt-1.5">
            Your Stripe checkout session was cancelled. You have not been charged.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-xs text-muted-foreground pb-6">
          <p>
            You can return to your appointments whenever you are ready to complete payment for your session.
          </p>
          {appointmentId && (
            <div className="rounded-lg bg-muted/40 p-3 font-mono">
              <span className="text-muted-foreground">Appointment ID:</span>{" "}
              <span className="font-semibold text-foreground">{appointmentId}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2.5 pb-8">
          <Link
            href="/patient-dashboard/my-appointments"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#0f241d] hover:bg-[#18392e] text-white h-9 px-4 text-sm font-medium"
          >
            <CalendarDays className="mr-2 size-4" />
            Go to My Appointments
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-foreground h-9 px-4 text-sm font-medium"
          >
            <LayoutDashboard className="mr-2 size-4" />
            Back to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentCancelled() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <PaymentCancelledContent />
    </Suspense>
  );
}
