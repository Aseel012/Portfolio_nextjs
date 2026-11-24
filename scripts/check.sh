#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm test
npm run build
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 > /tmp/aseel-portfolio-preview.log 2>&1 &
PID=$!
trap 'kill "$PID" 2>/dev/null || true; wait "$PID" 2>/dev/null || true' EXIT
sleep 2
node scripts/e2e.mjs
