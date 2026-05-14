import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "local";
const tracesSampleRate = appEnv === "production" ? 0.1 : appEnv === "preview" ? 0.3 : 1.0;
const replaysOnErrorSampleRate = appEnv === "local" ? 0 : 1.0;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: appEnv,
  tracesSampleRate,
  replaysOnErrorSampleRate,
  replaysSessionSampleRate: 0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
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
