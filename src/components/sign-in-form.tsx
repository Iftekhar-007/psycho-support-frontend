"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";

export const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
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

      {/* Email Field */}
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
            placeholder="jane@example.com"
            autoComplete="email"
            required
            className="pl-10 h-11 rounded-xl bg-background/80 border-border/80 focus-visible:ring-2 focus-visible:ring-emerald-700/30 transition-all text-sm"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </Label>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Please contact support or your administrator to reset your password.");
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            required
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
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
            className="data-[checked=true]:bg-emerald-900 data-[checked=true]:border-emerald-900"
          />
          <Label
            htmlFor="rememberMe"
            className="text-xs text-muted-foreground font-normal cursor-pointer select-none"
          >
            Keep me signed in on this device
          </Label>
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
            Signing you in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </Button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/80 mt-1">
        <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>256-bit encrypted & HIPAA-compliant security</span>
      </div>

      {/* Bottom Switch Link */}
      <div className="text-center pt-2 border-t border-border/60">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-emerald-900 dark:text-emerald-400 hover:underline underline-offset-4"
          >
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
};
