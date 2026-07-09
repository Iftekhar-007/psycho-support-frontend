"use client";

import { useState } from "react";
import { CalendarDays, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookAppointment = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire this up to your appointments API
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: photo */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src="https://images.pexels.com/photos/5234573/pexels-photo-5234573.jpeg"
              alt="A psychologist ready for your consultation"
              className="h-full max-h-[600px] w-full rounded-2xl object-cover shadow-lg shadow-black/10 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span
              className="pointer-events-none absolute left-0 top-0 h-0 w-0 rounded-tl-2xl border-l-2 border-t-2 border-[#8FAF9F] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 rounded-br-2xl border-b-2 border-r-2 border-[#8FAF9F] transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"
              aria-hidden="true"
            />
          </div>

          {/* Right: form */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-[#0f1f1c] sm:text-4xl">
                Book an Appointment
              </h2>
              <p className="mt-3 text-muted-foreground">
                Fill in your details and we&apos;ll reach out to confirm a time
                that works for you.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-[#8FAF9F]/30 bg-[#8FAF9F]/10 p-6 text-[#3f5449]">
                Thank you — your request has been received. We&apos;ll contact
                you within 24 hours to confirm your session.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="session-type">Session type</Label>
                    <Select name="sessionType">
                      <SelectTrigger id="session-type">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="in-person">In person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="preferred-date">Preferred date</Label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="preferred-date"
                        name="preferredDate"
                        type="date"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">
                    What would you like to talk about?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly share what's on your mind — this stays confidential."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0f1f1c] text-[#F7F5F0] hover:bg-[#1c332d] sm:w-fit"
                >
                  Request Appointment
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { BookAppointment };
