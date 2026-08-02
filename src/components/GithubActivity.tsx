"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "aseel012";
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type DayCell = { date: string; count: number; level: number };
type ProfileStats = { repos: number; followers: number; joined: string };

const LEVEL_BG_LIGHT = ["#eeeef2", "#c7e3d0", "#8fcaa3", "#4fa66f", "#1f7a45"];
const LEVEL_BG_DARK = ["#1a1c23", "#123324", "#1c5f3c", "#279659", "#4ade80"];

/** Builds a light deterministic fallback pattern — used only if the
 *  contributions API is unreachable (e.g. offline dev), so the section
 *  never renders empty. Real usage always prefers the fetched data. */
function fallbackCells(weeks: number): DayCell[] {
  const out: DayCell[] = [];
  const today = new Date();
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const seed = Math.sin(i * 17.31) * 10000;
    const r = seed - Math.floor(seed);
    const level = r > 0.86 ? 4 : r > 0.68 ? 3 : r > 0.48 ? 2 : r > 0.28 ? 1 : 0;
    out.push({ date: d.toISOString().slice(0, 10), count: level * 2, level });
  }
  return out;
}

export default function GithubActivity() {
  const [cells, setCells] = useState<DayCell[] | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Real profile stats (repos / followers / joined date).
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setStats({
          repos: d.public_repos ?? 0,
          followers: d.followers ?? 0,
          joined: d.created_at ? new Date(d.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "—",
        });
      })
      .catch(() => setStats(null));

    // Real contribution calendar (public, unauthenticated, no rate-limit
    // headaches like GitHub's own GraphQL API requires a token for).
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { contributions: DayCell[] }) => {
        if (!d?.contributions?.length) throw new Error("empty");
        setCells(d.contributions);
      })
      .catch(() => {
        setUsingFallback(true);
        setCells(fallbackCells(53));
      });

    return () => obs.disconnect();
  }, []);

  const palette = isDark ? LEVEL_BG_DARK : LEVEL_BG_LIGHT;

  if (!cells) {
    return <div className="h-[104px] flex items-center text-[12.5px] text-[var(--muted)]">Loading activity…</div>;
  }

  // Group into weeks (columns of 7, Sun→Sat) the same way GitHub's own
  // calendar does, then compute which column each month label should sit
  // above by watching for the first cell of a new month per column.
  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthMarkers: { weekIndex: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstOfWeekWithDate = week.find(Boolean);
    if (!firstOfWeekWithDate) return;
    const m = new Date(firstOfWeekWithDate.date).getMonth();
    if (m !== lastMonth) {
      monthMarkers.push({ weekIndex: wi, label: MONTH_LABELS[m] });
      lastMonth = m;
    }
  });

  const total = cells.reduce((a, c) => a + c.count, 0);
  const cellPx = 10;
  const gapPx = 3;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1" style={{ minWidth: weeks.length * (cellPx + gapPx) }}>
          {/* Month labels row, aligned to each week column */}
          <div className="relative h-[14px]">
            {monthMarkers.map((m) => (
              <span
                key={`${m.label}-${m.weekIndex}`}
                className="absolute top-0 text-[10.5px] text-[var(--muted)]"
                style={{ left: m.weekIndex * (cellPx + gapPx) }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-max">
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{ background: palette[day.level] }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-[12.5px] text-[var(--muted)]">
          {total.toLocaleString()} contributions in the last year for{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--text)] hover:text-[var(--accent)]"
          >
            @{GITHUB_USERNAME}
          </a>
          {usingFallback && <span className="opacity-60"> (offline preview)</span>}
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <span>Less</span>
          {palette.map((c, i) => (
            <i key={i} className="w-[10px] h-[10px] rounded-[2px] inline-block" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {stats && (
        <div className="flex items-center gap-6 text-[12.5px] text-[var(--muted)] border-t border-[var(--border)] pt-3">
          <span>
            <strong className="text-[var(--text)]">{stats.repos}</strong> repos
          </span>
          <span>
            <strong className="text-[var(--text)]">{stats.followers}</strong> followers
          </span>
          <span>
            joined <strong className="text-[var(--text)]">{stats.joined}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
