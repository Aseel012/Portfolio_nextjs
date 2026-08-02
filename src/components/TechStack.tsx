"use client";

import { useEffect, useRef, useState } from "react";
import { icons, type IconKey } from "./TechIcons";

type Category = "frontend" | "backend" | "tools";

type Tech = {
  name: string;
  category: Category;
  bg: string;
  fg: string;
  icon: IconKey;
};

const TECH: Tech[] = [
  { name: "JavaScript", category: "frontend", bg: "#f7df1e", fg: "#111", icon: "js" },
  { name: "TypeScript", category: "frontend", bg: "#3178c6", fg: "#fff", icon: "ts" },
  { name: "React", category: "frontend", bg: "#e8f6ff", fg: "#149eca", icon: "react" },
  { name: "Next.js", category: "frontend", bg: "#111", fg: "#fff", icon: "next" },
  { name: "Tailwind CSS", category: "frontend", bg: "#e6fbff", fg: "#0ea5c8", icon: "tailwind" },
  { name: "Flutter", category: "frontend", bg: "#e8f2fe", fg: "#1f6fea", icon: "flutter" },
  { name: "Node.js", category: "backend", bg: "#e9f7ec", fg: "#3c8c3f", icon: "node" },
  { name: "Express.js", category: "backend", bg: "#111", fg: "#fff", icon: "express" },
  { name: "MongoDB", category: "backend", bg: "#e9f7ee", fg: "#12924f", icon: "mongo" },
  { name: "Python", category: "backend", bg: "#eaf3fb", fg: "#3776ab", icon: "python" },
  { name: "Java", category: "backend", bg: "#fdeceb", fg: "#e0483c", icon: "java" },
  { name: "Docker", category: "tools", bg: "#eaf6fd", fg: "#2496ed", icon: "docker" },
  { name: "AWS", category: "tools", bg: "#fff3e0", fg: "#e8890c", icon: "aws" },
  { name: "Git", category: "tools", bg: "#fdece9", fg: "#e94430", icon: "git" },
  { name: "GitHub", category: "tools", bg: "#111", fg: "#fff", icon: "github" },
  { name: "Vercel", category: "tools", bg: "#111", fg: "#fff", icon: "vercel" },
  { name: "Figma", category: "tools", bg: "#f3f3f5", fg: "#111", icon: "figma" },
  { name: "Postman", category: "tools", bg: "#fff1eb", fg: "#ff6c37", icon: "postman" },
];

const FILTERS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools & Cloud" },
];

function MusicOnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
function MusicOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <path d="M2 2l20 20" />
    </svg>
  );
}

/* Shared hover-sound state so the mute toggle (rendered in the section's
 * header row) and the chip grid (rendered in the section's content row)
 * stay in sync even though they're two separate component instances. */
let globalSoundOn = true;
const listeners = new Set<(v: boolean) => void>();
function setGlobalSound(v: boolean) {
  globalSoundOn = v;
  listeners.forEach((fn) => fn(v));
}

let audioCtx: AudioContext | null = null;
export function playTechHoverTick() {
  if (!globalSoundOn) return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(720, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(920, audioCtx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.13);
  } catch {
    /* Web Audio unsupported — fail silently */
  }
}

/** Renders inside <SectionHeader title="Tech Stack" right={<TechStackSoundToggle />} /> */
export function TechStackSoundToggle() {
  const [soundOn, setSoundOn] = useState(globalSoundOn);

  useEffect(() => {
    listeners.add(setSoundOn);
    return () => {
      listeners.delete(setSoundOn);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setGlobalSound(!soundOn)}
      aria-label={soundOn ? "Mute hover sounds" : "Unmute hover sounds"}
      aria-pressed={soundOn}
      className="rounded-[var(--r)] border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-3)] shrink-0"
    >
      {soundOn ? <MusicOnIcon /> : <MusicOffIcon />}
    </button>
  );
}

/** Renders inside a plain <Section> as the content row below the header row. */
export default function TechStack() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const ref = useRef<HTMLDivElement>(null);

  const items = filter === "all" ? TECH : TECH.filter((t) => t.category === filter);

  return (
    <div ref={ref} className="p-[var(--pad)] flex flex-col gap-4">
      <div className="inline-flex self-start flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-3)] p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              filter === f.key ? "bg-[var(--text)] text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <div
            key={t.name}
            onMouseEnter={playTechHoverTick}
            className="flex items-center gap-2 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] px-3 py-2 text-[13px] font-medium text-[var(--text)] hover:border-[var(--dot-strong)] hover:-translate-y-0.5 hover:shadow-[var(--sh-md)] transition-all cursor-default"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-[5px] shrink-0" style={{ background: t.bg, color: t.fg }}>
              {icons[t.icon]}
            </span>
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}
