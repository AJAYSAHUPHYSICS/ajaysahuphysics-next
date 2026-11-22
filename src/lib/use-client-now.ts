"use client";

import { useSyncExternalStore } from "react";

// ─────────────────────────────────────────────────────────────────
// The browser's current time, available only AFTER hydration.
//
// The site is a static export: every page is prerendered once, on the build
// day. A component that reads Date.now() while rendering puts the build day
// into the HTML, and the browser, on any later day, renders something
// different. That is React hydration error #418 (seen on
// /dashboard/activity/, 2026-11-22).
//
// useClientNow() returns null on the server and during hydration, so the
// first browser render matches the prerendered HTML exactly. React then
// re-renders with the real time straight away. Callers render a
// date-independent placeholder of the same size while it is null.
//
// The value is rounded down to the minute, so repeated reads within a render
// are identical (useSyncExternalStore requires a stable snapshot). Day
// boundaries use the device's local time, as before.
// ─────────────────────────────────────────────────────────────────

const noSubscribe = () => () => {};
const clientNow = () => Math.floor(Date.now() / 60_000) * 60_000;
const serverNow = () => null;

export function useClientNow(): number | null {
  return useSyncExternalStore(noSubscribe, clientNow, serverNow);
}
