/* eslint-disable @typescript-eslint/no-explicit-any */
// app/my-prescriptions/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export default function MyPrescriptions() {
  const { data: session } = authClient.useSession();
  const isPsychologist = session?.user?.role?.toUpperCase() === "PSYCHOLOGIST";

  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/prescription/my-prescriptions",
          { credentials: "include" },
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load prescriptions");
        }

        setPrescriptions(data.data ?? []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">{error}</p>;
  if (!prescriptions.length) return <p>No prescriptions yet.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {prescriptions.map((p) => {
        // Psychologist sees the patient; patient sees the psychologist
        const counterpart = isPsychologist ? p.patient : p.psychologist;

        return (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={counterpart?.profilePhoto}
                    alt={counterpart?.name}
                  />
                  <AvatarFallback>
                    {counterpart?.name?.charAt(0) ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{counterpart?.name ?? "Unknown"}</CardTitle>
                  <CardDescription>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Medication</p>
                <p>{p.medication}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Exercise</p>
                <p>{p.exercise}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Duration</p>
                <p>{p.duration}</p>
              </div>

              {p.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground">Notes</p>
                    <p>{p.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
