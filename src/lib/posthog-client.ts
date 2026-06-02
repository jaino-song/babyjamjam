"use client";

import posthog from "posthog-js";

type PostHogProperties = Record<string, unknown>;

const posthogProjectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

export function initPostHog(): void {
  if (!posthogProjectToken || posthog.__loaded) return;

  posthog.init(posthogProjectToken, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
      blockSelector: "[data-ph-block]",
    },
  });
}

export function capturePostHogEvent(
  eventName: string,
  properties?: PostHogProperties
): void {
  if (!posthogProjectToken) return;

  initPostHog();
  posthog.capture(eventName, properties, { send_instantly: true });
}

export function capturePostHogException(error: unknown): void {
  if (!posthogProjectToken) return;

  initPostHog();
  posthog.captureException(error);
}
