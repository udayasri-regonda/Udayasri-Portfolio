"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/profile";

export default function Contact() {
  const [status, setStatus] = useState("");

  /** No backend is configured, so the form composes an email in the visitor's own mail app. */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app with the message ready to send.");
  }

  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: LinkedinIcon, label: "LinkedIn", value: "regonda-udayasri", href: profile.linkedin, external: true },
    { icon: GithubIcon, label: "GitHub", value: "udayasri-regonda", href: profile.github, external: true },
  ];

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk about opportunities"
      intro="Open to software engineering, AI/ML, data engineering and analyst roles. Email is the fastest way to reach me."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <l.icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">
                      {l.label}
                      {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                    <span className="block truncate text-sm font-semibold">{l.value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="card flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <MapPin size={20} aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-muted">Location</span>
                <span className="block text-sm font-semibold">{profile.location}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="card space-y-5 p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-medium">
                  Name
                </label>
                <input id="c-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-medium">
                  Email
                </label>
                <input id="c-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label htmlFor="c-message" className="text-sm font-medium">
                Message
              </label>
              <textarea id="c-message" name="message" required rows={5} className={field} placeholder="Tell me about the role or project" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                <Send size={16} aria-hidden /> Send message
              </button>
              <p className="text-xs text-muted">Opens your email app with the message prepared.</p>
            </div>
            <p role="status" aria-live="polite" className="text-sm text-accent2">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
