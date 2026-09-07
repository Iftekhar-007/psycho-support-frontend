/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  CalendarDays,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
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
import { toast } from "sonner";

export default function AdminDashboardDefaultPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalPsychologists: 0,
    totalPatients: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
  });
  const [pendingPsychologists, setPendingPsychologists] = useState<any[]>([]);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      const [statsRes, pendingRes] = await Promise.all([
        fetch("/api/v1/admin/stats", { credentials: "include" }),
        fetch("/api/v1/admin/pending-psychologists", { credentials: "include" }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data || {});
      }

      if (pendingRes.ok) {
        const pendingData = await pendingRes.json();
        setPendingPsychologists(pendingData.data || []);
      }
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleVerify = async (psychologistId: string) => {
    setVerifyingId(psychologistId);
    try {
      const res = await fetch(`/api/v1/admin/verify-psychologist/${psychologistId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: true }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to verify psychologist");
      }

      toast.success("Psychologist verified successfully!");
      setPendingPsychologists((prev) => prev.filter((p) => p.id !== psychologistId));
      fetchAdminData();
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading administrative overview...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-6 min-h-screen">
      {/* HEADER */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Platform Administration 🛡️
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor platform activity, manage registered accounts, verify practitioners, and oversee appointments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/all-users"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-7 text-[0.8rem] font-medium hover:bg-muted"
          >
            <Users className="mr-2 h-4 w-4" />
            All Users
          </Link>

          <Link
            href="/confirm-users"
            className="inline-flex items-center justify-center rounded-lg bg-[#0f241d] hover:bg-[#18392e] text-white px-2.5 h-7 text-[0.8rem] font-medium"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Verification Queue
          </Link>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Platform Revenue */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Processed Revenue</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  ৳ {stats.totalRevenue?.toLocaleString() ?? 0}
                </h2>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Stripe payments
                </p>
              </div>
              <div className="rounded-xl bg-emerald-800/10 p-2.5 text-emerald-800 dark:text-emerald-400">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Accounts</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">{stats.totalUsers ?? 0}</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Patients & Psychologists
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Psychologists */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Psychologists</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {stats.totalPsychologists ?? 0}
                </h2>
                <p className="mt-1 text-[11px] text-blue-600 font-medium">Practitioners onboard</p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Appointments */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Appointments</p>
                <h2 className="mt-1.5 text-2xl font-bold text-foreground">
                  {stats.totalAppointments ?? 0}
                </h2>
                <p className="mt-1 text-[11px] text-green-600 font-medium">
                  {stats.completedAppointments ?? 0} completed sessions
                </p>
              </div>
              <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PENDING PSYCHOLOGISTS VERIFICATION QUEUE */}
      <section>
        <Card className="shadow-xs">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                  Psychologist Verification Requests
                </CardTitle>
                <CardDescription className="text-xs">
                  Psychologists awaiting admin credentials check and verification badge
                </CardDescription>
              </div>
              <Badge variant="secondary" className="font-semibold text-xs">
                {pendingPsychologists.length} Pending
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {pendingPsychologists.length === 0 ? (
              <div className="flex min-h-[140px] flex-col items-center justify-center text-center text-xs text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 text-emerald-600/80 mb-2" />
                <p className="font-medium text-foreground">All psychologists are verified!</p>
                <p>No unverified psychologist applications in the queue.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingPsychologists.map((psy) => (
                  <div
                    key={psy.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Avatar className="h-11 w-11 border">
                        <AvatarImage src={psy.profilePhoto || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {psy.name?.charAt(0) || "D"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">{psy.name}</h4>
                        <p className="text-xs text-muted-foreground">{psy.sector} · License: {psy.licenseId}</p>
                        <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                          {psy.qualification} ({psy.experience} yrs exp)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/psychologists/${psy.id}`}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-8 text-xs font-medium hover:bg-muted"
                      >
                        View Profile <ExternalLink className="ml-1.5 h-3 w-3" />
                      </Link>

                      <Button
                        size="sm"
                        disabled={verifyingId === psy.id}
                        onClick={() => handleVerify(psy.id)}
                        className="text-xs h-8 bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer"
                      >
                        {verifyingId === psy.id ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-1" /> Verifying...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve & Verify
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* QUICK MANAGEMENT SHORTCUTS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/all-users" className="block group">
          <Card className="h-full p-4 hover:border-primary/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  All Users
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Manage user profiles and roles</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link href="/confirm-users" className="block group">
          <Card className="h-full p-4 hover:border-primary/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  Confirm Users
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Approve licenses and practitioners</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link href="/all-psychologists" className="block group">
          <Card className="h-full p-4 hover:border-primary/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  All Psychologists
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">List of verified therapists</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/all-appointments" className="block group">
          <Card className="h-full p-4 hover:border-primary/50 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  All Appointments
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">All platform consultations</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </section>
    </main>
  );
}
