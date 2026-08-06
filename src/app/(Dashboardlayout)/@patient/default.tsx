// import React from "react";

// const PatientDashboardDefaultPage = () => {
//   return <div>patient dashboard default</div>;
// };

// export default PatientDashboardDefaultPage;

"use client";

import React from "react";
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
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const appointmentData = [
  { month: "Jan", appointments: 2 },
  { month: "Feb", appointments: 4 },
  { month: "Mar", appointments: 3 },
  { month: "Apr", appointments: 6 },
  { month: "May", appointments: 5 },
  { month: "Jun", appointments: 8 },
  { month: "Jul", appointments: 6 },
];

const upcomingAppointments = [
  {
    doctor: "Dr. Sarah Ahmed",
    specialty: "Clinical Psychologist",
    date: "Aug 08, 2026",
    time: "10:30 AM",
    type: "Video Consultation",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Mahmud Hasan",
    specialty: "Psychiatrist",
    date: "Aug 12, 2026",
    time: "04:00 PM",
    type: "In-person",
    status: "Pending",
  },
  {
    doctor: "Dr. Nusrat Jahan",
    specialty: "Clinical Psychologist",
    date: "Aug 18, 2026",
    time: "11:00 AM",
    type: "Video Consultation",
    status: "Confirmed",
  },
];

const recentActivities = [
  {
    title: "Appointment completed",
    description: "Session with Dr. Sarah Ahmed",
    time: "2 hours ago",
    icon: CheckCircle2,
  },
  {
    title: "Prescription updated",
    description: "New prescription has been added",
    time: "Yesterday",
    icon: Stethoscope,
  },
  {
    title: "Health assessment completed",
    description: "Mental health assessment submitted",
    time: "3 days ago",
    icon: Activity,
  },
];

const PatientDashboardDefaultPage = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Good morning, Iftekhar 👋
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your health and appointments.
            </p>
          </div>

          <Button className="w-fit">
            <CalendarDays className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Upcoming Appointments
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">3</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Next: Aug 08, 2026
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Completed Sessions
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">12</h2>

                  <p className="mt-1 text-xs text-green-600">+3 this month</p>
                </div>

                <div className="rounded-xl bg-green-500/10 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>

                  <h2 className="mt-2 text-3xl font-bold">82%</h2>

                  <p className="mt-1 text-xs text-green-600">
                    +8% from last month
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-3">
                  <HeartPulse className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Actions
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">2</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Need your attention
                  </p>
                </div>

                <div className="rounded-xl bg-orange-500/10 p-3">
                  <CircleAlert className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Appointment Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Appointments Overview</CardTitle>
                  <CardDescription>
                    Your appointments over the last 7 months
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
                  <AreaChart data={appointmentData}>
                    <defs>
                      <linearGradient
                        id="appointmentGradient"
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
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-muted"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />

                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="appointments"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#appointmentGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Health Summary */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
              <CardDescription>Your current health overview</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Health</span>

                  <span className="font-medium">82%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[82%] rounded-full bg-primary" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Mental Wellness</span>

                  <span className="font-medium">76%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[76%] rounded-full bg-primary" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Treatment Progress
                  </span>

                  <span className="font-medium">68%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[68%] rounded-full bg-primary" />
                </div>
              </div>

              <div className="rounded-xl border bg-muted/40 p-4">
                <div className="flex gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <HeartPulse className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Keep going!</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Your health progress is moving in a positive direction.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Upcoming Appointments */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Your next scheduled sessions
                  </CardDescription>
                </div>

                <Button variant="outline" size="sm">
                  View all
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-medium">{appointment.doctor}</h3>

                      <p className="text-sm text-muted-foreground">
                        {appointment.specialty}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {appointment.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {appointment.time}
                        </span>

                        <span className="flex items-center gap-1">
                          {appointment.type === "In-person" ? (
                            <MapPin className="h-3.5 w-3.5" />
                          ) : (
                            <Video className="h-3.5 w-3.5" />
                          )}

                          {appointment.type}
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
                Latest updates from your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Icon className="h-4 w-4" />
                        </div>

                        {index !== recentActivities.length - 1 && (
                          <div className="absolute left-1/2 top-9 h-8 w-px -translate-x-1/2 bg-border" />
                        )}
                      </div>

                      <div className="flex-1">
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
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardDefaultPage;
