import { PostHog } from "posthog-node";
import type { EventMessage } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  const posthogProjectToken =
    process.env.POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  if (!posthogProjectToken) return null;

  if (!posthogClient) {
    posthogClient = new PostHog(
      posthogProjectToken,
      {
        host: process.env.POSTHOG_HOST ?? process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0,
      }
    );
  }
  return posthogClient;
}

export async function capturePostHogServerEvent(
  event: EventMessage
): Promise<void> {
  const posthog = getPostHogClient();
  if (!posthog) return;

  await posthog.captureImmediate(event).catch(() => undefined);
}

export async function capturePostHogServerException(
  error: unknown,
  distinctId: string
): Promise<void> {
  const posthog = getPostHogClient();
  if (!posthog) return;

  posthog.captureException(error, distinctId);
  await posthog.flush().catch(() => undefined);
}
