/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  Phone,
  Mail,
  Award,
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

export default function ConfirmUsersPage() {
  const [psychologists, setPsychologists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPsychologists = async () => {
    try {
      const res = await fetch("/api/v1/admin/all-psychologists", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPsychologists(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch psychologists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const handleToggleVerify = async (psychologistId: string, currentStatus: boolean) => {
    setUpdatingId(psychologistId);
    try {
      const res = await fetch(`/api/v1/admin/verify-psychologist/${psychologistId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !currentStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update verification status");
      }

      toast.success(
        !currentStatus
          ? "Psychologist verified successfully!"
          : "Verification revoked.",
      );
      setPsychologists((prev) =>
        prev.map((p) => (p.id === psychologistId ? { ...p, verified: !currentStatus } : p)),
      );
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading psychologist credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Confirm & Verify Psychologists
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review licenses, qualifications, and grant official verification badges to therapists.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 font-semibold w-fit">
          {psychologists.filter((p) => p.verified).length} Verified / {psychologists.length} Total
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {psychologists.map((psy) => (
          <Card key={psy.id} className="flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3.5">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={psy.profilePhoto || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {psy.name?.charAt(0) || "D"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <CardTitle className="text-sm font-semibold truncate">{psy.name}</CardTitle>
                    {psy.verified ? (
                      <Badge className="bg-emerald-800 text-white text-[10px] gap-0.5">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] text-amber-700 bg-amber-50 dark:bg-amber-950/30">
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs truncate">{psy.sector}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2.5 text-xs pb-4">
              <div className="rounded-lg bg-muted/40 p-2.5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License ID:</span>
                  <span className="font-mono font-medium">{psy.licenseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{psy.experience} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Fee:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">৳ {psy.appointmentFee}</span>
                </div>
              </div>

              <div>
                <p className="font-medium text-muted-foreground text-[11px]">Qualification:</p>
                <p className="text-foreground text-xs mt-0.5 line-clamp-2">{psy.qualification}</p>
              </div>

              {psy.contactNumber && (
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs pt-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{psy.contactNumber}</span>
                </div>
              )}
            </CardContent>

            <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-muted/50">
              <Link
                href={`/psychologists/${psy.id}`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Profile <ExternalLink className="ml-1 h-3 w-3" />
              </Link>

              <Button
                size="sm"
                disabled={updatingId === psy.id}
                onClick={() => handleToggleVerify(psy.id, psy.verified)}
                variant={psy.verified ? "outline" : "default"}
                className={`text-xs h-8 cursor-pointer ${
                  !psy.verified ? "bg-emerald-800 hover:bg-emerald-900 text-white" : ""
                }`}
              >
                {updatingId === psy.id ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : psy.verified ? (
                  "Revoke Verification"
                ) : (
                  "Verify Practitioner"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
