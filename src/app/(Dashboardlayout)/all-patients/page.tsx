/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Calendar,
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

export default function AllPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/v1/admin/all-patients", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setPatients(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filtered = patients.filter((p) => {
    const query = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(query) ||
      p.email?.toLowerCase().includes(query) ||
      p.contactNumber?.toLowerCase().includes(query) ||
      p.address?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading patients list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Registered Patients</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Patients seeking psychological care and receiving treatment.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 font-semibold w-fit">
          Total: {patients.length} Patients
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((patient) => (
          <Card key={patient.id} className="shadow-xs hover:shadow-sm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3.5">
                <Avatar className="h-11 w-11 border">
                  <AvatarImage src={patient.profilePhoto || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {patient.name?.charAt(0) || "P"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-sm font-semibold truncate">{patient.name}</CardTitle>
                  <CardDescription className="text-xs truncate">{patient.email}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 text-xs pb-4">
              {patient.contactNumber && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{patient.contactNumber}</span>
                </div>
              )}

              {patient.address && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{patient.address}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground pt-1 border-t border-muted/50">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>Joined {new Date(patient.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
