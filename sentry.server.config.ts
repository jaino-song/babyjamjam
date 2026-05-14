import * as Sentry from "@sentry/nextjs";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "local";
const tracesSampleRate = appEnv === "production" ? 0.1 : appEnv === "preview" ? 0.3 : 1.0;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: appEnv,
  tracesSampleRate,
  beforeSend(event) {
    if (event.request) {
      delete event.request.data;
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers["cookie"];
        delete event.request.headers["authorization"];
      }
    }
    return event;
  },
});
