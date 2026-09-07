/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, Loader2, CalendarDays, LayoutDashboard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const params = useSearchParams();
  const appointmentId = params.get("appointmentId");

  const [status, setStatus] = useState<"checking" | "confirmed" | "pending">(
    "checking",
  );

  useEffect(() => {
    if (!appointmentId) return;

    let attempts = 0;

    const poll = async () => {
      try {
        const res = await fetch("/api/v1/payment/my-payments", {
          credentials: "include",
        });

        const data = await res.json();
        const paymentsList = Array.isArray(data.data) ? data.data : data.data?.payments || [];
        const payment = paymentsList.find(
          (p: any) => p.appointmentId === appointmentId,
        );

        if (payment?.status === "COMPLETED") {
          setStatus("confirmed");
          return;
        }

        attempts++;
        if (attempts < 6) {
          setTimeout(poll, 1500);
        } else {
          setStatus("pending");
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        attempts++;
        if (attempts < 6) {
          setTimeout(poll, 1500);
        } else {
          setStatus("pending");
        }
      }
    };

    poll();
  }, [appointmentId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-emerald-800/20">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
            {status === "checking" ? (
              <Loader2 className="size-8 animate-spin text-emerald-700 dark:text-emerald-400" />
            ) : status === "confirmed" ? (
              <CheckCircle2 className="size-8 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Clock className="size-8 text-amber-600" />
            )}
          </div>

          <CardTitle className="text-2xl font-bold">
            {status === "checking"
              ? "Confirming Payment..."
              : status === "confirmed"
              ? "Payment Successful!"
              : "Payment Processing"}
          </CardTitle>

          <CardDescription className="text-sm mt-1.5">
            {status === "checking"
              ? "Verifying transaction with Stripe. Please hold on..."
              : status === "confirmed"
              ? "Your psychological consultation session has been paid and confirmed with your therapist."
              : "We've received your transaction and are finalizing confirmation with Stripe. Your appointment will update shortly."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-xs text-muted-foreground pb-6">
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
            View My Appointments
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

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
