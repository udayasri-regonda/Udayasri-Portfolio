"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";
import ProfilePhoto from "./ProfilePhoto";
import HeroVisual from "./HeroVisual";
import { GithubIcon, LinkedinIcon } from "./icons";
import RotatingText from "./RotatingText";
import CountUp from "./CountUp";
import { highlights, profile, workingWith } from "@/data/profile";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-32 top-10 h-96 w-96 animate-drift rounded-full bg-accent/20 blur-[110px]" />
        <div className="absolute -right-24 top-40 h-96 w-96 animate-drift rounded-full bg-accent2/15 blur-[110px] [animation-delay:-9s]" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
          <NetworkCanvas />
        </div>
      </div>

      <div className="container-x grid items-center gap-14 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <div>
          <motion.p {...fade(0)} className="chip gap-2 !text-ink">
            <span className="h-2 w-2 rounded-full bg-accent2" aria-hidden />
            Seeking early-career roles
            <span className="text-muted">·</span>
            <MapPin size={12} aria-hidden /> {profile.location}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {profile.name}
            <span className="mt-2 block gradient-text">{profile.headline}</span>
          </motion.h1>

          <motion.p {...fade(0.12)} className="mt-5 text-lg text-muted">
            I work with <RotatingText items={workingWith} />
          </motion.p>

          <motion.p {...fade(0.16)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.ul {...fade(0.22)} className="mt-6 flex flex-wrap gap-2" aria-label="Primary technical focus">
            {profile.focus.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-primary">
              <Download size={16} aria-hidden /> Download Resume
            </a>
            <a href="#projects" className="btn-ghost">
              View Projects <ArrowDown size={16} aria-hidden />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/60 text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/60 text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink"
            >
              <LinkedinIcon />
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.2)} className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:mx-0 lg:justify-self-end">
          <div className="animate-float">
            <ProfilePhoto className="aspect-[4/5] w-full" />
          </div>
          <div className="mt-4 flex justify-center lg:absolute lg:-bottom-8 lg:-left-16 lg:mt-0">
            <HeroVisual />
          </div>
        </motion.div>
      </div>

      <div className="container-x pb-12 sm:pb-16">
        <motion.dl {...fade(0.4)} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="bg-surface/90 p-5">
              <dt className="text-xs text-muted">{h.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold">
                {h.count ? <CountUp {...h.count} /> : h.value}
              </dd>
              <dd className="mt-0.5 text-xs text-muted">{h.note}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
