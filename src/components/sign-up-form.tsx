"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

type Role = "PATIENT" | "PSYCHOLOGIST";

export const SignUpForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<Role>("PATIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordMatching =
    confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      });

      if (signUpError) {
        setError(signUpError.message ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
        </div>
      )}

      {/* Role Selection Cards */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">
            I am joining as a
          </Label>
          <span className="text-[11px] font-medium text-muted-foreground">
            Select account role
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Patient Option */}
          <button
            type="button"
            onClick={() => setRole("PATIENT")}
            className={cn(
              "relative flex flex-col items-start gap-1.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer",
              role === "PATIENT"
                ? "border-emerald-800/80 bg-emerald-950/5 dark:bg-emerald-900/20 shadow-xs ring-2 ring-emerald-800/20"
                : "border-border/80 bg-card hover:border-border hover:bg-muted/40"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg transition-colors",
                  role === "PATIENT"
                    ? "bg-[#0f241d] text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <User className="size-4" />
              </div>
              {role === "PATIENT" && (
                <CheckCircle2 className="size-4 text-emerald-800 dark:text-emerald-400" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Patient</p>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                Seeking care & therapy
              </p>
            </div>
          </button>

          {/* Psychologist Option */}
          <button
            type="button"
            onClick={() => setRole("PSYCHOLOGIST")}
            className={cn(
              "relative flex flex-col items-start gap-1.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer",
              role === "PSYCHOLOGIST"
                ? "border-emerald-800/80 bg-emerald-950/5 dark:bg-emerald-900/20 shadow-xs ring-2 ring-emerald-800/20"
                : "border-border/80 bg-card hover:border-border hover:bg-muted/40"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg transition-colors",
                  role === "PSYCHOLOGIST"
                    ? "bg-[#0f241d] text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Stethoscope className="size-4" />
              </div>
              {role === "PSYCHOLOGIST" && (
                <CheckCircle2 className="size-4 text-emerald-800 dark:text-emerald-400" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Psychologist</p>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                Therapist / Provider
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="name"
            name="name"
            placeholder={role === "PSYCHOLOGIST" ? "Dr. Sarah Jenkins" : "Sarah Jenkins"}
            autoComplete="name"
            required
            className="pl-10 h-11 rounded-xl bg-background/80 border-border/80 focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="sarah@example.com"
            autoComplete="email"
            required
            className="pl-10 h-11 rounded-xl bg-background/80 border-border/80 focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </Label>
          <span className="text-[11px] text-muted-foreground">Min. 8 characters</span>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={8}
            className="pl-10 pr-10 h-11 rounded-xl bg-background/80 border-border/80 focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {/* Password Strength meter */}
        {password.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                password.length >= 8 ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                  ? "bg-emerald-500"
                  : "bg-muted"
              )}
            />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                password.length >= 12 && /[^A-Za-z0-9]/.test(password)
                  ? "bg-emerald-500"
                  : "bg-muted"
              )}
            />
            <span className="text-[10px] text-muted-foreground ml-1">
              {password.length < 8
                ? "Weak"
                : password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                ? "Strong"
                : "Good"}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </Label>
          {isPasswordMatching && (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3" /> Matched
            </span>
          )}
          {isPasswordMismatch && (
            <span className="text-[11px] text-destructive">
              Passwords don&apos;t match
            </span>
          )}
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={8}
            className={cn(
              "pl-10 pr-10 h-11 rounded-xl bg-background/80 border-border/80 focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all text-sm",
              isPasswordMismatch && "border-destructive/60 focus-visible:ring-destructive/30"
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full h-11 rounded-xl bg-[#0f241d] hover:bg-[#18392e] text-white font-medium shadow-md shadow-emerald-950/10 hover:shadow-lg hover:shadow-emerald-950/20 transition-all duration-200 mt-1 cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Creating your account...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Create {role === "PSYCHOLOGIST" ? "Psychologist" : "Patient"} Account
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </Button>

      {/* Security notice */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/80 mt-1">
        <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Your data is strictly confidential & HIPAA compliant</span>
      </div>

      {/* Bottom Switch Link */}
      <div className="text-center pt-2 border-t border-border/60">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-emerald-900 dark:text-emerald-400 hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};
