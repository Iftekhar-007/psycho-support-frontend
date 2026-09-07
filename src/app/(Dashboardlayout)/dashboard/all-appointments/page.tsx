/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AllAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/v1/admin/all-appointments", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAppointments(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filtered = appointments.filter((a) => {
    const query = searchTerm.toLowerCase();
    return (
      a.patient?.name?.toLowerCase().includes(query) ||
      a.psychologist?.name?.toLowerCase().includes(query) ||
      a.appointmentStatus?.toLowerCase().includes(query) ||
      a.paymentStatus?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading all consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">All Appointments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Complete log of consultations, patient issues, and Stripe payment status across the platform.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 font-semibold w-fit">
          Total: {appointments.length} Consultations
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient, psychologist, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      <Card className="shadow-xs">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Psychologist</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Session Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No appointments found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={a.patient?.profilePhoto || ""} />
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                              {a.patient?.name?.charAt(0) || "P"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{a.patient?.name || "Patient"}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={a.psychologist?.profilePhoto || ""} />
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                              {a.psychologist?.name?.charAt(0) || "D"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{a.psychologist?.name || "Psychologist"}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground">
                            {new Date(a.date).toLocaleDateString()}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{a.duration || 60} mins</p>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            a.appointmentStatus === "CONFIRMED"
                              ? "default"
                              : a.appointmentStatus === "COMPLETED"
                              ? "outline"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {a.appointmentStatus}
                        </Badge>
                      </td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={a.paymentStatus === "COMPLETED" ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {a.paymentStatus === "COMPLETED" ? "Paid" : "Pending"}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right font-semibold text-emerald-700 dark:text-emerald-400">
                        ৳ {a.psychologist?.appointmentFee || 0}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
