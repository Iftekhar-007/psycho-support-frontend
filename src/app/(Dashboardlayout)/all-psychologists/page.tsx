/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Search,
  Loader2,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AllPsychologistsPage() {
  const [psychologists, setPsychologists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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

    fetchPsychologists();
  }, []);

  const filtered = psychologists.filter((p) => {
    const query = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query) ||
      p.sector?.toLowerCase().includes(query) ||
      p.licenseId?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading psychologists list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Registered Psychologists</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Full directory of licensed practitioners registered on the platform.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 font-semibold w-fit">
          Total: {psychologists.length} Psychologists
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, sector, license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((psy) => (
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
                    {psy.verified && (
                      <Badge className="bg-emerald-800 text-white text-[10px] gap-0.5">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs truncate">{psy.sector}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-xs pb-4">
              <div className="rounded-lg bg-muted/40 p-2.5 space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License ID:</span>
                  <span className="font-mono font-medium">{psy.licenseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Fee:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">৳ {psy.appointmentFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{psy.experience} Years</span>
                </div>
              </div>

              <div className="space-y-1 text-muted-foreground pt-1">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{psy.email}</span>
                </div>
                {psy.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>{psy.contactNumber}</span>
                  </div>
                )}
              </div>
            </CardContent>

            <div className="p-4 pt-0 border-t border-muted/50">
              <Link
                href={`/psychologists/${psy.id}`}
                target="_blank"
                className="w-full inline-flex items-center justify-center rounded-md text-xs font-medium h-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                View Public Profile <ExternalLink className="ml-1.5 h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
