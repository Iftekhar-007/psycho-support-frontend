/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  HeartPulse,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  Stethoscope,
  Video,
  MapPin,
  CheckCircle2,
  CircleAlert,
  Loader2,
  FileText,
  DollarSign,
  User,
} from "lucide-react";
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
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { authClient } from "@/lib/auth-client";

export default function PatientDashboardDefaultPage() {
  const { data: session } = authClient.useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const [appRes, prescRes] = await Promise.all([
          fetch("/api/v1/appointment/my-appointments", { credentials: "include" }),
          fetch("/api/v1/prescription/my-prescriptions", { credentials: "include" }),
        ]);

        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData.data || []);
        }

        if (prescRes.ok) {
          const prescData = await prescRes.json();
          setPrescriptions(prescData.data || []);
        }
      } catch (err) {
        console.error("Patient dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const patientName = session?.user?.name || "Patient";
  const confirmedAppointments = appointments.filter(
    (a) => a.appointmentStatus === "CONFIRMED",
  );
  const completedAppointments = appointments.filter(
    (a) => a.appointmentStatus === "COMPLETED",
  );
  const pendingAppointments = appointments.filter(
    (a) => a.appointmentStatus === "PENDING",
  );

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts: Record<string, number> = {};
  monthNames.forEach((m) => (monthlyCounts[m] = 0));
  appointments.forEach((a) => {
    const month = monthNames[new Date(a.date).getMonth()];
    if (monthlyCounts[month] !== undefined) monthlyCounts[month]++;
  });
  const chartData = monthNames.slice(0, 8).map((m) => ({
    month: m,
    appointments: monthlyCounts[m] || 0,
  }));

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-6 min-h-screen">
      {/* HEADER */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {patientName} 🌸
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your psychological support journey, upcoming sessions, and treatment prescriptions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/psychologists"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-7 text-[0.8rem] font-medium hover:bg-muted"
          >
            Find a Psychologist
          </Link>

          <Link
            href="/patient-dashboard/my-appointments"
            className="inline-flex items-center justify-center rounded-lg bg-[#0f241d] hover:bg-[#18392e] text-white px-2.5 h-7 text-[0.8rem] font-medium"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            My Appointments
          </Link>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Sessions */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Booked Sessions</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">{appointments.length}</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">Mental health consultations</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <HeartPulse className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmed Sessions */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Confirmed & Ready</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {confirmedAppointments.length}
                </h2>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium">Scheduled with therapist</p>
              </div>
              <div className="rounded-xl bg-emerald-800/10 p-2.5 text-emerald-800 dark:text-emerald-400">
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
                <p className="text-xs font-medium text-muted-foreground">Completed Sessions</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {completedAppointments.length}
                </h2>
                <p className="mt-1 text-[11px] text-blue-600 font-medium">Treatments received</p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Prescriptions */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Prescriptions & Care</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {prescriptions.length}
                </h2>
                <p className="mt-1 text-[11px] text-muted-foreground">Exercises & Guidance</p>
              </div>
              <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600">
                <FileText className="h-5 w-5" />
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
            <div>
              <CardTitle className="text-base font-semibold">Care Journey Frequency</CardTitle>
              <CardDescription className="text-xs">
                Monthly distribution of your mental health sessions
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="h-[260px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="patientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f241d" stopOpacity={0.25} />
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
                            <p className="text-muted-foreground">Appointments: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="#0f241d"
                    strokeWidth={2}
                    fill="url(#patientFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Next Consultations */}
        <Card className="lg:col-span-3 shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Upcoming Sessions</CardTitle>
              <Link
                href="/patient-dashboard/my-appointments"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                View all
              </Link>
            </div>
            <CardDescription className="text-xs">
              Your scheduled therapy appointments
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 flex-1">
            {appointments.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center text-center text-xs text-muted-foreground">
                <CalendarDays className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p>No booked consultations yet.</p>
                <Link
                  href="/psychologists"
                  className="mt-2 inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-7 text-xs font-medium hover:bg-muted"
                >
                  Browse Psychologists
                </Link>
              </div>
            ) : (
              appointments.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={app.psychologist?.profilePhoto || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {app.psychologist?.name?.charAt(0) || "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-xs truncate text-foreground">
                        {app.psychologist?.name || "Psychologist"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {new Date(app.date).toLocaleDateString()} · {app.psychologist?.sector || "Consultation"}
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

      {/* RECENT PRESCRIPTIONS / CARE PLANS */}
      <section>
        <Card className="shadow-xs">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Prescriptions & Care Instructions</CardTitle>
                <CardDescription className="text-xs">
                  Treatment notes and recommendations from your psychologist
                </CardDescription>
              </div>
              <Link
                href="/my-prescriptions"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                View all
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {prescriptions.length === 0 ? (
              <div className="flex min-h-[140px] flex-col items-center justify-center text-center text-xs text-muted-foreground">
                <FileText className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p>No prescriptions received yet.</p>
                <p className="text-[11px] mt-0.5">Your psychologist will issue guidance after your session.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {prescriptions.slice(0, 3).map((p) => (
                  <Card key={p.id} className="p-4 border bg-muted/20 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">
                          {p.psychologist?.name || "Psychologist"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-xs space-y-1">
                        <p><span className="text-muted-foreground font-medium">Medication:</span> {p.medication}</p>
                        <p><span className="text-muted-foreground font-medium">Exercise:</span> {p.exercise}</p>
                        <p><span className="text-muted-foreground font-medium">Duration:</span> {p.duration}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
