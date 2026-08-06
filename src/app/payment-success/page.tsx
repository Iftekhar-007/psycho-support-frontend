/* eslint-disable @typescript-eslint/no-explicit-any */
// app/payment-success/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const appointmentId = params.get("appointmentId");
  const [status, setStatus] = useState<"checking" | "confirmed" | "pending">(
    "checking",
  );

  useEffect(() => {
    if (!appointmentId) return;

    let attempts = 0;
    const poll = async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/payment/my-payments",
        { credentials: "include" },
      );
      const data = await res.json();
      const payment = data.data?.find?.(
        (p: any) => p.appointmentId === appointmentId,
      );

      if (payment?.status === "COMPLETED") {
        setStatus("confirmed");
        return;
      }
      attempts++;
      if (attempts < 5)
        setTimeout(poll, 1500); // retry for ~7s while webhook lands
      else setStatus("pending");
    };

    poll();
  }, [appointmentId]);

  if (status === "checking") return <p>Confirming your payment...</p>;
  if (status === "confirmed")
    return <p>Payment confirmed! Your appointment is booked.</p>;
  return (
    <p>
      Payment received — we are still confirming with Stripe. This can take a
      moment; check My Appointments shortly.
    </p>
  );
}
