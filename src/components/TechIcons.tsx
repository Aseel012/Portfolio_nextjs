import type { ReactNode } from "react";

/* Centralized, brand-colored inline SVG icon set.
 * Shared by TechStack.tsx and ides/page.tsx so every "chip" across the
 * site (Tech Stack, Code Editors, Design Tools, Dev Tools) renders the
 * exact same icon style — no emojis, no duplicated SVG code. */

export type IconKey =
  | "js"
  | "ts"
  | "react"
  | "next"
  | "tailwind"
  | "flutter"
  | "node"
  | "express"
  | "mongo"
  | "python"
  | "java"
  | "docker"
  | "aws"
  | "git"
  | "github"
  | "vercel"
  | "figma"
  | "postman"
  | "vscode"
  | "cursor"
  | "zed"
  | "pycharm"
  | "canva"
  | "photopea"
  | "mongoAtlas";

export const icons: Record<IconKey, ReactNode> = {
  js: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm16.5 13.6c-.15-.9-.75-1.65-2.55-2.35-.6-.27-1.3-.45-1.5-.9-.08-.24-.09-.36-.04-.5.13-.5.7-.65 1.16-.5.3.1.55.32.7.68.75-.48.75-.48 1.27-.8-.2-.3-.3-.45-.44-.6-.47-.53-1.1-.8-2.14-.78l-.53.07c-.5.13-1 .38-1.28.72-.87.94-.62 2.6.44 3.28 1.05.75 2.6.9 2.8 1.6.2.85-.6 1.12-1.4 1.02-.57-.1-.9-.4-1.25-.92l-1.3.75c.15.35.33.5.6.8.65.65 2.3.86 3.35.5.5-.16.9-.4 1.14-.85.35-.6.35-1.35.02-1.9.03-.02.02-.02.02-.02zm-6.5-3.9h-1.6c0 1.4-.01 2.8-.01 4.2 0 .9.05 1.7-.1 1.95-.25.5-.9.44-1.2.34-.3-.15-.45-.35-.63-.65-.05-.08-.08-.15-.1-.15l-1.3.8c.2.44.5.8.9 1.1.6.4 1.4.53 2.25.35.55-.14 1.02-.4 1.28-.9.35-.6.3-1.35.3-2.15V12.7z" />
    </svg>
  ),
  ts: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.71 14.4c.36.9 1.1 1.6 2.36 1.6 1.4 0 2.35-.75 2.35-2.35 0-1.4-.8-2.02-2-2.5l-.38-.16c-.65-.28-.93-.46-.93-.9 0-.36.28-.64.72-.64.44 0 .72.19.98.65l1.25-.8c-.53-.93-1.27-1.28-2.23-1.28-1.4 0-2.3.9-2.3 2.08 0 1.35.8 1.99 1.86 2.44l.38.17c.7.3.99.5.99.98 0 .42-.4.72-1.02.72-.72 0-1.15-.37-1.47-.9l-1.36.78zM7 13.5h1.85v6h1.65v-6H12.35v-1.4H7v1.4z" />
    </svg>
  ),
  react: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  next: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.6 2C6.3 2 2 6.3 2 11.6S6.3 21.2 11.6 21.2 21.2 16.9 21.2 11.6 16.9 2 11.6 2zm4.2 5.3v9h-1.4l-5.7-6.9v6.9H7.3v-9h1.7l5.4 6.6V7.3h1.4z" />
    </svg>
  ),
  tailwind: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.75 1.9 1.36.98.99 2.11 2.14 4.6 2.14 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.75-1.9-1.36C15.62 7.15 14.49 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.75 1.9 1.36.98.99 2.11 2.14 4.6 2.14 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.75-1.9-1.36C10.62 13.15 9.49 12 7 12z" />
    </svg>
  ),
  flutter: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.3 2 3 13.3 6.7 17 21 2.7h-6.7zM14.3 22h6.7l-4.6-4.6-3.3 3.3z" />
      <path d="M9.7 15.7 6.7 18.7 9.7 21.7 15.7 15.7z" opacity=".6" />
    </svg>
  ),
  node: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.2 6.8 3.8v7.6L12 19.4l-6.8-3.8V8L12 4.2z" />
    </svg>
  ),
  express: <span className="font-mono font-bold text-[12px] leading-none">{"</>"}</span>,
  mongo: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.5 3 4 6.5 4 10 0 4-1.8 7-4 9-2.2-2-4-5-4-9 0-3.5 1.5-7 4-10z" />
    </svg>
  ),
  python: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.5 2C7 2 6.8 3.1 6.8 4.5V6h5.4v.7H4.7C3 6.7 2 8 2 10.5s1 3.8 2.7 3.8h1.6v-2.2c0-1.9 1.6-3.5 3.5-3.5h4.4c1.5 0 2.7-1.2 2.7-2.7V4.5C16.9 3.1 16.7 2 14.2 2H9.5zM8.4 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" />
      <path d="M14.5 22c2.5 0 2.7-1.1 2.7-2.5V18h-5.4v-.7h7.5c1.7 0 2.7-1.3 2.7-3.8s-1-3.8-2.7-3.8h-1.6v2.2c0 1.9-1.6 3.5-3.5 3.5H9.8c-1.5 0-2.7 1.2-2.7 2.7v2.4c0 1.4.2 2.5 2.7 2.5h4.7zm1.1-1.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
    </svg>
  ),
  java: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 17.5c-1 .6-.3 1.2.4 1.5 2 .9 6.8.8 8.7-.1 0 0 .6.4-1.3.9-4.6 1.2-9.6.1-8-2.3zm-.8-2.6c-1.1.7-.4 1.4.5 1.7 2.3.9 8.2.8 10.5-.1.4-.2.9.5-1.5 1.1-5.5 1.4-12.2.2-9.5-2.7zM13 12.5s2.6.6-1.1 1.4c-3.1.6-5-.4-5-.4s.8.7 1.7 1c3 1 8.9.5 5.4-2 0 0-.5-.2-.9 0zm2.3-8.1s1.5 1.5-1.4 2.7c-2.4 1-.9 1.6-.9 1.6s2.7-1 1.6-3.5c-.7-1.6-1.3-.8-1.3-.8s1.1 3-.9 3.7c.4-1.5-1.5-2-1.5-2 1.9-.4 4.3-1.7 4.4-1.7z" />
    </svg>
  ),
  docker: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 10.4c-.5-.4-1.7-.5-2.5-.4-.1-.8-.6-1.5-1.4-2.1l-.4-.3-.3.4c-.5.6-.7 1.6-.6 2.4.05.4.2.9.4 1.3-.3.2-.9.4-1.7.4H2.4c-.2.9-.2 3.7 1.7 5.9 1.4 1.6 3.6 2.4 6.4 2.4 6.2 0 10.7-2.8 12.8-8 .8 0 2.5 0 3.4-1.7l.2-.4-.4-.2c-.8-.5-1.9-.6-2.5-.4z" />
      <rect x="4" y="7.5" width="2.6" height="2.4" />
      <rect x="7.2" y="7.5" width="2.6" height="2.4" />
      <rect x="10.4" y="7.5" width="2.6" height="2.4" />
      <rect x="7.2" y="4.7" width="2.6" height="2.4" />
      <rect x="10.4" y="4.7" width="2.6" height="2.4" />
      <rect x="10.4" y="1.9" width="2.6" height="2.4" />
    </svg>
  ),
  aws: <span className="font-extrabold text-[10.5px] tracking-tight">aws</span>,
  git: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 11.1 12.9 2.4a1.4 1.4 0 0 0-2 0l-1.8 1.8 2.3 2.3a1.7 1.7 0 0 1 2.1 2.1l2.2 2.2a1.7 1.7 0 1 1-1 1l-2.1-2.1v5.5a1.7 1.7 0 1 1-1.4 0V9.7a1.7 1.7 0 0 1-.9-2.2L7.9 5.1l-5.5 5.5a1.4 1.4 0 0 0 0 2l8.7 8.7a1.4 1.4 0 0 0 2 0l8.5-8.5a1.4 1.4 0 0 0 0-1.7z" />
    </svg>
  ),
  github: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.2 5.4 18.3.5 12 .5z" />
    </svg>
  ),
  vercel: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 22 20H2L12 2z" />
    </svg>
  ),
  figma: (
    <svg width="11" height="11" viewBox="0 0 24 24">
      <circle cx="12" cy="18" r="3" fill="#0acf83" />
      <path d="M9 12a3 3 0 1 1 0-6h3v6H9z" fill="#a259ff" />
      <path d="M9 18a3 3 0 1 1 3-3v3H9z" fill="#f24e1e" />
      <path d="M12 6h3a3 3 0 1 1 0 6h-3V6z" fill="#1abcfe" />
      <path d="M15 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#ff7262" />
    </svg>
  ),
  postman: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.9 8.3-4.6 4.6a.9.9 0 0 1-1.3 0l-2-2a.9.9 0 1 1 1.3-1.3l1.35 1.35 3.95-3.95a.9.9 0 1 1 1.3 1.3z" />
    </svg>
  ),
  vscode: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 2.3 8.6 9.9 4.3 6.6l-1.6.9v9l1.6.9 4.3-3.3 8.4 7.6L21 20V4l-4-1.7zM17 6.3v11.4l-6-5.7 6-5.7zM4.4 9.2l1.9 1.8-1.9 1.8V9.2z" />
    </svg>
  ),
  cursor: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2l6.5 17.5 2.4-6.8 6.8-2.4L4 2z" />
    </svg>
  ),
  zed: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  pycharm: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M6.5 8h4.2c1.7 0 2.6.9 2.6 2.3 0 1.5-1 2.4-2.7 2.4H8.2V16H6.5V8zm1.7 1.4v2h2.2c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1H8.2z" fill="#fff" />
      <path d="M14.5 12.5c.5.6 1.2 1 2 1 .7 0 1.1-.3 1.1-.7 0-.5-.5-.6-1.4-.9-1.3-.4-2.2-.9-2.2-2.2 0-1.3 1.1-2.1 2.5-2.1 1 0 1.8.3 2.4.9l-.9 1.2c-.4-.4-.9-.6-1.5-.6-.6 0-.9.3-.9.6 0 .5.5.6 1.5.9 1.3.4 2.1.9 2.1 2.2 0 1.4-1.1 2.2-2.7 2.2-1.1 0-2.1-.4-2.8-1.1l.8-1.4z" fill="#fff" />
    </svg>
  ),
  canva: (
    <svg width="13" height="13" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="url(#canvaGrad)" />
      <defs>
        <linearGradient id="canvaGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#00c4cc" />
        </linearGradient>
      </defs>
      <path d="M16.2 10.8c-.2-1.6-1.5-2.5-3-2.4-2 .1-3.4 1.9-3.3 4 .1 2 1.6 3.5 3.5 3.4.9 0 1.7-.4 2.3-1v.7c0 .3.2.5.5.5s.5-.2.5-.5v-4.5c0-.2-.2-.4-.5-.2zm-3 3.9c-1.2.1-2.2-.9-2.3-2.2-.1-1.4.8-2.6 2-2.7 1.1-.1 2 .7 2.1 2v.4c-.1 1.3-.7 2.4-1.8 2.5z" fill="#fff" />
    </svg>
  ),
  photopea: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7.5 7.5h4.3c2 0 3.2 1.1 3.2 2.9 0 1.9-1.3 3-3.3 3H9.4V16H7.5V7.5zm1.9 1.6v2.7h2.2c1 0 1.6-.5 1.6-1.4 0-.8-.6-1.3-1.6-1.3H9.4z" fill="#fff" />
    </svg>
  ),
  mongoAtlas: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.5 3 4 6.5 4 10 0 4-1.8 7-4 9-2.2-2-4-5-4-9 0-3.5 1.5-7 4-10z" />
      <circle cx="12" cy="12" r="1.6" fill="#fff" />
    </svg>
  ),
};
