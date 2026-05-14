import * as Sentry from "@sentry/nextjs";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "local";
const tracesSampleRate = appEnv === "production" ? 0.1 : 0.5;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: appEnv,
  tracesSampleRate,
});
