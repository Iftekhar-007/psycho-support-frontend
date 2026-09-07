/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  Loader2,
  MoreHorizontal,
  TrendingUp,
  User,
  Users,
  Video,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export default function PsychologistDashboardDefaultPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, payRes] = await Promise.all([
          fetch("/api/v1/appointment/my-appointments", { credentials: "include" }),
          fetch("/api/v1/payment/my-payments", { credentials: "include" }),
        ]);

        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData.data || []);
        }

        if (payRes.ok) {
          const payData = await payRes.json();
          setPayments(payData.data?.payments || payData.data || []);
          setTotalIncome(payData.data?.totalIncome ?? 0);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const doctorName = session?.user?.name || "Doctor";
  const completedCount = appointments.filter(
    (a) => a.appointmentStatus === "COMPLETED",
  ).length;
  const confirmedCount = appointments.filter(
    (a) => a.appointmentStatus === "CONFIRMED",
  ).length;
  const pendingCount = appointments.filter(
    (a) => a.appointmentStatus === "PENDING",
  ).length;

  // Chart data from actual monthly appointments
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts: Record<string, number> = {};
  monthNames.forEach((m) => (monthlyCounts[m] = 0));
  appointments.forEach((a) => {
    const month = monthNames[new Date(a.date).getMonth()];
    if (monthlyCounts[month] !== undefined) monthlyCounts[month]++;
  });
  const chartData = monthNames.slice(0, 8).map((m) => ({
    month: m,
    sessions: monthlyCounts[m] || 0,
  }));

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your practice dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-6">
      {/* HEADER */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Good day, {doctorName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here is an overview of your psychology practice, appointments, and earnings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/psychologist-dashboard/my-appointments"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-7 text-[0.8rem] font-medium hover:bg-muted"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Manage Appointments
          </Link>

          <Link
            href="/psychologist-dashboard/my-profile"
            className="inline-flex items-center justify-center rounded-lg bg-[#0f241d] hover:bg-[#18392e] text-white px-2.5 h-7 text-[0.8rem] font-medium"
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Earnings */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow border-emerald-800/10">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Income / Earnings
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  ৳ {totalIncome.toLocaleString()}
                </h2>
                <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Verified & Paid
                </p>
              </div>
              <div className="rounded-xl bg-emerald-800/10 p-2.5 text-emerald-800 dark:text-emerald-400">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmed Sessions */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Confirmed Sessions
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {confirmedCount}
                </h2>
                <p className="mt-1 text-[11px] text-blue-600 font-medium">
                  Ready for consultation
                </p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Sessions */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Completed Treatments
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {completedCount}
                </h2>
                <p className="mt-1 text-[11px] text-muted-foreground font-medium">
                  Prescriptions issued
                </p>
              </div>
              <div className="rounded-xl bg-green-500/10 p-2.5 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Pending Requests
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {pendingCount}
                </h2>
                <p className="mt-1 text-[11px] text-amber-600 font-medium">
                  Requires confirmation
                </p>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CHART & UPCOMING SESSIONS */}
      <section className="grid gap-6 lg:grid-cols-7">
        {/* Activity Chart */}
        <Card className="lg:col-span-4 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Consultation Activity</CardTitle>
                <CardDescription className="text-xs">
                  Session frequency over the past months
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="h-[260px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="sessionFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f241d" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0f241d" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/60" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} allowDecimals={false} className="text-xs text-muted-foreground" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-md text-xs">
                            <p className="font-semibold">{payload[0].payload.month}</p>
                            <p className="text-muted-foreground">Sessions: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="#0f241d"
                    strokeWidth={2}
                    fill="url(#sessionFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="lg:col-span-3 shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Patients</CardTitle>
              <Link
                href="/psychologist-dashboard/my-appointments"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                View all
              </Link>
            </div>
            <CardDescription className="text-xs">
              Latest appointment bookings and patients
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 flex-1">
            {appointments.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center text-center text-xs text-muted-foreground">
                <Users className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p>No booked patients yet.</p>
              </div>
            ) : (
              appointments.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={app.patient?.profilePhoto || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {app.patient?.name?.charAt(0) || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-xs truncate text-foreground">
                        {app.patient?.name || "Patient"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {new Date(app.date).toLocaleDateString()} · {app.duration || 60}m
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      app.appointmentStatus === "CONFIRMED"
                        ? "default"
                        : app.appointmentStatus === "COMPLETED"
                        ? "outline"
                        : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {app.appointmentStatus}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      {/* RECENT PAYMENTS RECEIVED */}
      <section>
        <Card className="shadow-xs">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Payment & Earnings History</CardTitle>
                <CardDescription className="text-xs">
                  Direct payments made by patients for your consultations
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {payments.length === 0 ? (
              <div className="flex min-h-[140px] flex-col items-center justify-center text-center text-xs text-muted-foreground">
                <DollarSign className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p>No payments recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b text-muted-foreground font-medium">
                      <th className="pb-2.5">Patient</th>
                      <th className="pb-2.5">Date</th>
                      <th className="pb-2.5">Amount</th>
                      <th className="pb-2.5">Gateway</th>
                      <th className="pb-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50">
                    {payments.slice(0, 6).map((pay: any) => (
                      <tr key={pay.id} className="hover:bg-muted/20">
                        <td className="py-3 font-medium text-foreground">
                          {pay.appointment?.patient?.name || "Patient"}
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {new Date(pay.paymentDate || pay.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 font-semibold text-emerald-700 dark:text-emerald-400">
                          ৳ {pay.amount}
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {pay.gateway || "Stripe"}
                        </td>
                        <td className="py-3 text-right">
                          <Badge
                            variant={pay.status === "COMPLETED" ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {pay.status === "COMPLETED" ? "Paid" : pay.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
