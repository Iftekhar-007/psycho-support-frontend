import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import {
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Lock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Care & Services",
    links: [
      { name: "Find Psychologists", href: "/psychologists" },
      { name: "Book an Appointment", href: "/psychologists" },
      { name: "Individual Counseling", href: "/about" },
      { name: "CBT & Clinical Therapy", href: "/about" },
      { name: "Prescription Care", href: "/dashboard" },
    ],
  },
  {
    title: "About MindCare",
    links: [
      { name: "Our Story & Mission", href: "/about" },
      { name: "Verified Specialists", href: "/psychologists" },
      { name: "Clinical Advisory Board", href: "/about" },
      { name: "Mental Health Blog", href: "/blog" },
      { name: "Join as a Practitioner", href: "/auth/sign-up" },
    ],
  },
  {
    title: "Resources & Support",
    links: [
      { name: "Crisis Hotline Directory", href: "#crisis-banner" },
      { name: "Patient FAQs", href: "/about" },
      { name: "Wellness Articles", href: "/blog" },
      { name: "Support Center", href: "/about" },
      { name: "Telehealth Guide", href: "/about" },
    ],
  },
  {
    title: "Trust & Compliance",
    links: [
      { name: "HIPAA Compliant Care", href: "#" },
      { name: "256-Bit Data Encryption", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Patient Rights & Safety", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export const Footer2 = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("border-t border-border/40 bg-muted/20 text-foreground pt-16 pb-12", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Crisis Hotline Banner */}
        <div
          id="crisis-banner"
          className="mb-14 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <PhoneCall className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-950 dark:text-rose-200">
                Immediate Crisis or Emergency Support
              </p>
              <p className="text-xs text-rose-800/80 dark:text-rose-300/80 leading-relaxed mt-0.5">
                If you or someone you care about is experiencing thoughts of suicide or a medical emergency,
                please call <strong>988</strong> (Suicide & Crisis Lifeline in the US) or your local emergency number immediately.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <a
              href="tel:988"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <PhoneCall className="size-3.5" />
              Call 988 Lifeline
            </a>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#0f241d] text-white shadow-xs">
                <HeartHandshake className="size-5 text-emerald-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-foreground leading-none">
                  MindCare
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Psychology Support Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Empowering individuals toward emotional resilience and mental wellness.
              We connect patients with certified, compassionate psychologists in a safe,
              confidential, and HIPAA-compliant telehealth environment.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-emerald-800/40 hover:bg-emerald-950/5 transition-all"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="size-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>&copy; {new Date().getFullYear()} MindCare Psychology Support. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/about" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
