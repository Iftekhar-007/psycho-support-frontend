// import React from "react";

// const PsychologistDefaultDashboardPage = () => {
//   return <div>psychologist dashboard default</div>;
// };

// export default PsychologistDefaultDashboardPage;

"use client";

import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  MoreHorizontal,
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

const sessionData = [
  { month: "Jan", sessions: 24 },
  { month: "Feb", sessions: 31 },
  { month: "Mar", sessions: 28 },
  { month: "Apr", sessions: 36 },
  { month: "May", sessions: 42 },
  { month: "Jun", sessions: 39 },
  { month: "Jul", sessions: 47 },
];

const appointments = [
  {
    name: "Sarah Johnson",
    type: "Individual Therapy",
    time: "09:30 AM",
    duration: "50 min",
    mode: "Video",
    status: "Confirmed",
  },
  {
    name: "Michael Brown",
    type: "Follow-up Session",
    time: "11:00 AM",
    duration: "45 min",
    mode: "In-person",
    status: "Confirmed",
  },
  {
    name: "Emily Davis",
    type: "Initial Assessment",
    time: "02:30 PM",
    duration: "60 min",
    mode: "Video",
    status: "Pending",
  },
  {
    name: "James Wilson",
    type: "Individual Therapy",
    time: "04:00 PM",
    duration: "50 min",
    mode: "Video",
    status: "Confirmed",
  },
];

const activities = [
  {
    title: "Session notes completed",
    description: "Notes added for Sarah Johnson",
    time: "25 minutes ago",
    icon: FileText,
  },
  {
    title: "New patient assigned",
    description: "Emily Davis was assigned to you",
    time: "2 hours ago",
    icon: Users,
  },
  {
    title: "New message",
    description: "Michael Brown sent you a message",
    time: "Yesterday",
    icon: MessageSquare,
  },
  {
    title: "Appointment completed",
    description: "Session with James Wilson completed",
    time: "Yesterday",
    icon: CheckCircle2,
  },
];

const PsychologistDashboardDefaultPage = () => {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
        {/* ================= HEADER ================= */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good morning, Dr. Sarah 👋
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your practice today.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar
            </Button>

            <Button>
              <Users className="mr-2 h-4 w-4" />
              Patients
            </Button>
          </div>
        </section>

        {/* ================= STAT CARDS ================= */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Patients */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Patients
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">128</h2>

                  <p className="mt-1 text-xs text-green-600">
                    +8.2% from last month
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Sessions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Today&apos;s Sessions
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">6</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    2 remaining today
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Sessions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Sessions
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">47</h2>

                  <p className="mt-1 text-xs text-green-600">
                    +12.5% from last month
                  </p>
                </div>

                <div className="rounded-xl bg-green-500/10 p-3">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Notes */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Notes</p>

                  <h2 className="mt-2 text-3xl font-bold">4</h2>

                  <p className="mt-1 text-xs text-orange-600">
                    Requires attention
                  </p>
                </div>

                <div className="rounded-xl bg-orange-500/10 p-3">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ================= CHART + QUICK SUMMARY ================= */}
        <section className="grid gap-6 lg:grid-cols-7">
          {/* Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Session Overview</CardTitle>

                  <CardDescription>
                    Your completed sessions over the last 7 months
                  </CardDescription>
                </div>

                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionData}>
                    <defs>
                      <linearGradient
                        id="sessionFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      className="text-xs"
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#sessionFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Practice Overview */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Practice Overview</CardTitle>

              <CardDescription>
                Your current practice statistics
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Active patients */}
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Active Patients</p>

                    <p className="text-xs text-muted-foreground">
                      Currently in treatment
                    </p>
                  </div>
                </div>

                <span className="text-lg font-semibold">94</span>
              </div>

              {/* New patients */}
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <UserPlusIcon />
                  </div>

                  <div>
                    <p className="text-sm font-medium">New Patients</p>

                    <p className="text-xs text-muted-foreground">
                      Added this month
                    </p>
                  </div>
                </div>

                <span className="text-lg font-semibold">12</span>
              </div>

              {/* Completion */}
              <div className="rounded-xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Treatment Completion</p>

                    <p className="text-xs text-muted-foreground">
                      Overall completion rate
                    </p>
                  </div>

                  <span className="font-semibold">78%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[78%] rounded-full bg-primary" />
                </div>
              </div>

              {/* Satisfaction */}
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Patient Satisfaction</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Based on recent feedback
                    </p>
                  </div>

                  <span className="text-xl font-bold">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ================= APPOINTMENTS + ACTIVITY ================= */}
        <section className="grid gap-6 lg:grid-cols-7">
          {/* Appointments */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today&apos;s Appointments</CardTitle>

                  <CardDescription>Your schedule for today</CardDescription>
                </div>

                <Button variant="outline" size="sm">
                  View all
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.name}-${appointment.time}`}
                  className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 gap-4">
                    {/* Avatar */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {appointment.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-medium">{appointment.name}</h3>

                      <p className="text-sm text-muted-foreground">
                        {appointment.type}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {appointment.time}
                        </span>

                        <span>{appointment.duration}</span>

                        <span className="flex items-center gap-1">
                          {appointment.mode === "Video" ? (
                            <Video className="h-3.5 w-3.5" />
                          ) : (
                            <Users className="h-3.5 w-3.5" />
                          )}

                          {appointment.mode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      appointment.status === "Confirmed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>

              <CardDescription>
                Latest activity in your practice
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={`${activity.title}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Icon className="h-4 w-4" />
                        </div>

                        {index < activities.length - 1 && (
                          <div className="absolute left-1/2 top-9 h-8 w-px -translate-x-1/2 bg-border" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.description}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

/**
 * Small icon component used in the practice overview.
 * Keeping it here avoids adding another icon dependency.
 */
const UserPlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600"
    >
      <path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
};

export default PsychologistDashboardDefaultPage;
