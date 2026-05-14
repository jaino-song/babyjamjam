<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Babyjamjam Next.js App Router project. The integration covers the full consultation funnel — from the moment a visitor opens the booking modal to a successful consultation submission — as well as pricing wizard engagement. Both desktop and mobile variants of every component are instrumented. Server-side tracking via `posthog-node` captures consultation inquiry outcomes at the API boundary. Client-side tracking uses `posthog-js` initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern). A reverse proxy is configured in `next.config.ts` to route PostHog ingestion through `/ingest/`.

**Files created:**
- `instrumentation-client.ts` — client-side PostHog initialization with exception capture
- `src/lib/posthog-server.ts` — server-side PostHog singleton (`posthog-node`)
- `next.config.ts` — updated with `/ingest/` reverse proxy rewrites and `skipTrailingSlashRedirect`
- `.env.local` — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`

| Event | Description | File |
|---|---|---|
| `consultation_modal_opened` | User opens the consultation booking modal (desktop) | `src/components/desktop/chrome/booking-button.tsx` |
| `consultation_modal_opened` | User opens the consultation booking modal (mobile) | `src/components/mobile/chrome/booking-button.tsx` |
| `consultation_region_selected` | User selects a region/municipality on the map (desktop) | `src/components/desktop/chrome/booking-modal.tsx` |
| `consultation_region_selected` | User selects a region/municipality on the map (mobile) | `src/components/mobile/chrome/booking-modal.tsx` |
| `consultation_form_submitted` | Consultation form successfully submitted (desktop) | `src/components/desktop/chrome/booking-modal.tsx` |
| `consultation_form_submitted` | Consultation form successfully submitted (mobile) | `src/components/mobile/chrome/booking-modal.tsx` |
| `consultation_submission_failed` | Consultation form submission failed (desktop) | `src/components/desktop/chrome/booking-modal.tsx` |
| `consultation_submission_failed` | Consultation form submission failed (mobile) | `src/components/mobile/chrome/booking-modal.tsx` |
| `pricing_wizard_started` | User clicks '시작하기' to begin the pricing wizard (desktop) | `src/components/desktop/pages/pricing-client.tsx` |
| `pricing_wizard_started` | User clicks '시작하기' to begin the pricing wizard (mobile) | `src/components/mobile/pages/pricing-client.tsx` |
| `pricing_wizard_answer_selected` | User selects an answer in the pricing wizard step | `src/components/desktop/sections/pricing-form-modal.tsx` |
| `pricing_plan_selected` | User selects a postpartum care service plan | `src/components/desktop/sections/pricing-plans-section.tsx` |
| `consultation_inquiry_submitted` | Server-side: inquiry successfully forwarded to backend | `src/app/api/consultation-inquiries/route.ts` |
| `consultation_inquiry_failed` | Server-side: inquiry forwarding to backend failed | `src/app/api/consultation-inquiries/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1583330)
- [Consultation Conversion Funnel](/insights/hAsEUEJW) — tracks drop-off from opening the modal → selecting a region → submitting
- [Daily Consultation Submissions](/insights/AePcJwui) — daily count of successful consultation form submissions
- [Pricing Wizard Engagement](/insights/UqHe2iGm) — unique users starting the wizard vs. selecting a plan
- [Consultation Submission Failures](/insights/QD4lyLXW) — monitors technical/UX failure rate on the consultation form
- [Desktop vs Mobile Consultation Opens](/insights/m9XFa5DX) — bar chart breakdown of modal opens by device type

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
