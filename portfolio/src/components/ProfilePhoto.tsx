import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Monogram placeholder until a real photo is configured.
 * To use a photo: add it to /public (for example profile.jpg) and set profile.profileImage in src/data/profile.ts.
 */
export default function ProfilePhoto({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface ${className}`}
      role="img"
      aria-label={`Portrait of ${profile.name}`}
    >
      {profile.profileImage ? (
        <Image src={profile.profileImage} alt="" fill priority sizes="(min-width:1024px) 320px, 70vw" className="object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 20% 10%, rgb(var(--accent) / 0.35), transparent 60%), radial-gradient(100% 80% at 90% 100%, rgb(var(--accent2) / 0.30), transparent 60%)",
            }}
          />
          <div className="grid-bg absolute inset-0 opacity-60" />
          <span className="absolute inset-x-0 top-[14%] text-center font-display text-7xl font-bold tracking-tight text-ink/90">
            {profile.initials}
          </span>
        </>
      )}
    </div>
  );
}
