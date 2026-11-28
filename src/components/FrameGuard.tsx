"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { FRAMED_NOTICE, isFramed } from "@/lib/frame-guard";

const noSubscribe = () => () => {};
const clientFramed = () => isFramed();
const serverFramed = () => false;

/**
 * Renders its children only when the page isn't inside a frame (audit F8,
 * interim; see src/lib/frame-guard.ts). The server render and the hydration
 * render both show the children, so the prerendered HTML matches; React
 * re-renders with the real answer straight after hydration, before any
 * account data has loaded.
 */
export default function FrameGuard({ children }: { children: ReactNode }) {
  const framed = useSyncExternalStore(noSubscribe, clientFramed, serverFramed);
  if (!framed) return <>{children}</>;
  return (
    <p role="alert" className="rounded-md border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-900">
      {FRAMED_NOTICE}{" "}
      <Link href="/" target="_top" className="underline font-semibold">Open AjaySahuPhysics directly</Link>.
    </p>
  );
}
