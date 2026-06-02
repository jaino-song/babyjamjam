import * as Sentry from "@sentry/nextjs";

import { initPostHog } from "@/lib/posthog-client";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "local";
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const tracesSampleRate = appEnv === "production" ? 0.1 : appEnv === "preview" ? 0.3 : 1.0;
const replaysOnErrorSampleRate = appEnv === "local" ? 0 : 1.0;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
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
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

initPostHog();
