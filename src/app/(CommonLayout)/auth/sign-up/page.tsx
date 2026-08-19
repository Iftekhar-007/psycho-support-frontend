import { SignUpForm } from "@/components/sign-up-form";
import {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  UserCheck,
  CalendarCheck2,
  Lock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata = {
  title: "Create Account | Psychology & Mental Health Support",
  description: "Join as a patient or psychologist and begin your journey toward wellness.",
};

const SignUpPage = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-emerald-800/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-[#8FAF9F]/15 blur-[140px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Branded Showcase (Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between h-full p-8 xl:p-10 rounded-3xl bg-gradient-to-br from-[#0d221c] via-[#133027] to-[#0a1814] text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-64 rounded-full bg-[#8FAF9F]/10 blur-3xl" />

          {/* Top Badge & Header */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/40 px-3.5 py-1.5 text-xs font-medium text-emerald-200 backdrop-blur-md">
              <Sparkles className="size-3.5 text-emerald-300" />
              <span>Join Our Healing Community</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl xl:text-4xl font-light tracking-tight text-[#F7F5F0]">
                Start your journey toward wellness today.
              </h2>
              <p className="text-sm text-emerald-100/75 leading-relaxed">
                Whether you are seeking therapy or providing clinical psychological care,
                our platform offers the tools, privacy, and support you need.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-800/60 border border-emerald-600/30">
                  <UserCheck className="size-4 text-emerald-300" />
                </div>
                <span>Patients: Match with top certified therapists</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-800/60 border border-emerald-600/30">
                  <Stethoscope className="size-4 text-emerald-300" />
                </div>
                <span>Psychologists: Expand and manage your clinical practice</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-800/60 border border-emerald-600/30">
                  <CalendarCheck2 className="size-4 text-emerald-300" />
                </div>
                <span>Easy scheduling, prescription notes & video calls</span>
              </div>
            </div>
          </div>

          {/* Bottom Practitioner Quote Card */}
          <div className="relative z-10 mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-xs text-emerald-100/90 italic leading-relaxed">
              &ldquo;Mental health care should be accessible, dignified, and securely protected.
              This platform bridges patients and practitioners seamlessly.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <Avatar className="size-7 border border-emerald-400/30">
                <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Dr. Aris" />
                <AvatarFallback className="bg-emerald-900 text-xs">DA</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium text-[#F7F5F0]">Dr. Aris Vance, Ph.D.</p>
                <p className="text-[10px] text-emerald-300/70">Clinical Psychologist & Advisor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-7 sm:p-9 shadow-xl shadow-black/5 dark:shadow-none">
            <div className="mb-6 space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="size-3.5" />
                <span>Get Started</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Select your role and enter your details below.
              </p>
            </div>

            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
