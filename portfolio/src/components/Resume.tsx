import { Download, ExternalLink, FileText, Mail, MapPin } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="Everything on one page"
      intro="A concise PDF covering education, internship, projects, skills and achievements."
    >
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div className="card h-full p-7">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
              <FileText size={24} aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">{profile.name}</h3>
            <p className="text-sm text-muted">{profile.role}</p>

            <div className="mt-6 flex flex-col gap-3">
              <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-primary">
                <Download size={16} aria-hidden /> Download Resume (PDF)
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink size={16} aria-hidden /> Open in new tab
              </a>
            </div>

            <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
              <li className="flex items-center gap-3 text-muted">
                <Mail size={16} className="text-accent2" aria-hidden />
                <a href={`mailto:${profile.email}`} className="hover:text-ink">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin size={16} className="text-accent2" aria-hidden /> {profile.location}
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card hidden h-[34rem] overflow-hidden p-0 md:block">
            <object data={`${profile.resumeUrl}#toolbar=0&navpanes=0`} type="application/pdf" className="h-full w-full" aria-label="Resume preview">
              <div className="grid h-full place-items-center p-8 text-center text-sm text-muted">
                <p>
                  Your browser cannot preview PDFs here.{" "}
                  <a href={profile.resumeUrl} className="text-accent underline underline-offset-4">
                    Download the resume
                  </a>{" "}
                  instead.
                </p>
              </div>
            </object>
          </div>
          <p className="text-sm text-muted md:hidden">
            The inline preview is available on larger screens. Use the buttons above to open or download the PDF.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
