# AI Lead Qualification Portal

AI Lead Qualification Portal is a Next.js application for collecting structured consultation enquiries and forwarding them to an automation webhook. The public website presents an AI consulting service, records a small amount of page-journey context for the current browser tab, and submits the visitor's enquiry through a server-owned API route.

The implemented backend boundary validates each submission with Zod before forwarding it to the URL configured in `N8N_WEBHOOK_URL`. This keeps the automation endpoint out of browser code and gives the application one place to enforce the payload contract, apply a timeout, and translate upstream failures into controlled HTTP responses.

This repository does **not** include an n8n workflow export or executable Gemini, Google Sheets, or Gmail integration. Those services are referenced by the website copy and project instructions, but their downstream implementation cannot be verified from this codebase. The documentation below distinguishes the working application path from those external, unverified workflow stages.

## Features

### Implemented

- Responsive AI consultation website with service, process, positioning, and contact sections
- Consultation lead form for contact, company, phone, company size, and enquiry details
- Browser-side validation with React Hook Form and Zod
- Required consent capture and an off-screen honeypot field for basic bot filtering
- Accessible form labels, validation messages, focus handling, and submission state
- Client-side normalization of submitted strings, including trimming, control-character removal, and whitespace collapsing
- Per-tab session identifiers stored in `sessionStorage`
- A fresh request identifier for every submission
- Page-journey tracking for up to five unique routes, including visit timestamps and accumulated duration
- Source URL, document title, referrer, and user-agent attribution in the lead payload
- Strictly typed lead payload and validation schemas
- Next.js API route at `POST /api/lead`
- Server-side Zod validation before forwarding
- Server-side webhook forwarding through `N8N_WEBHOOK_URL`
- 15-second upstream request timeout using `AbortController`
- Controlled responses for invalid input, missing configuration, upstream rejection, network failure, timeout, and unexpected server errors
- Duplicate-submission guard in the browser process
- Animated loading and success states with Framer Motion

### Partial or not connected

- A multi-step assessment UI exists under `components/features/assessment`, but its submit action waits for two seconds and displays success without calling an API. The landing page currently rendered by `app/page.tsx` does not mount this assessment.
- Dashboard, lead-management, analytics, qualification, and settings routes exist, but their components are placeholders and are not backed by data.
- `GET /api/leads`, `POST /api/leads`, and `POST /api/qualify` deliberately return HTTP `501 Not Implemented`.
- Marketing components describing Gemini categorization, scoring, Google Sheets synchronization, and Gmail delivery exist, but they are not mounted by the current home page and do not implement those integrations.
- No structured AI response schema or AI JSON parser is present.
- No n8n workflow file is included, so its trigger, model, processing, persistence, notification, and response nodes cannot be audited.

## Workflow Overview

The verified request flow is:

```text
Visitor
  ↓
Next.js website
  ↓
Consultation lead form
  ↓
Client validation and payload construction
  ↓
POST /api/lead
  ↓
Server-side Zod validation
  ↓
Configured n8n webhook URL
  ↓
Upstream HTTP status
  ↓
Controlled API success or error response
  ↓
Form success state or browser error message
```

1. **Visitor:** A visitor browses the consultation website. The root-level page tracker records route visits in the current tab's `sessionStorage`.
2. **Website:** The home page renders the consultation content and the contact section.
3. **Lead form:** The visitor supplies contact and business details, an enquiry of 20–1,500 characters, and consent.
4. **Browser validation:** React Hook Form applies `leadFormSchema`. Invalid fields receive inline messages and the first invalid field is focused.
5. **Payload construction:** The browser sanitizes strings, creates request and session identifiers, and attaches source, attribution, consent, and page-journey data.
6. **Next.js API route:** The browser posts the payload to `POST /api/lead`; it never receives the n8n endpoint.
7. **Server validation:** `leadPayloadSchema` validates the complete payload. Only the parsed Zod output is forwarded.
8. **Webhook forwarding:** The route sends JSON to `N8N_WEBHOOK_URL` and waits for an upstream response for at most 15 seconds.
9. **Response:** Any successful upstream HTTP status produces a local `200` response. Invalid or failed submissions receive a controlled `4xx` or `5xx` response.
10. **Browser result:** A successful request displays the form's success state. An error displays the message returned by the API.

The requested downstream sequence—Gemini classification, AI JSON parsing, Google Sheets persistence, and Gmail notification—is not implemented in this repository. It may exist in an external n8n instance, but there is no workflow export here from which to document or verify it.

## Architecture

| Component | Responsibility | Why it exists |
| --- | --- | --- |
| Frontend | Renders the consultation website, validates the form, creates tracking metadata, and submits to the local API | Provides a guided and accessible visitor experience without exposing infrastructure configuration |
| Next.js API | Revalidates the payload, reads the server environment, forwards JSON, enforces a timeout, and normalizes errors | Establishes a trusted server boundary between an untrusted browser request and the automation endpoint |
| Webhook boundary | Receives the validated JSON at the configured `N8N_WEBHOOK_URL` | Decouples the website deployment from the downstream automation |
| n8n | Not included in this repository | The environment variable and site copy identify n8n as the intended automation service, but its behavior is not verifiable here |
| Gemini | Not implemented in this repository | Mentioned in presentation copy only; there is no model client, prompt, credential use, or workflow node export |
| Google Sheets | Not implemented in this repository | No Sheets API client, credential configuration, or workflow node export is present |
| Gmail | Not implemented in this repository | No Gmail API client, credential configuration, template, or workflow node export is present |

## Tech Stack

| Area | Technology | Use in this repository |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Pages, layouts, metadata, and route handlers |
| UI runtime | React 19 | Server and client components |
| Language | TypeScript 5 | Strictly typed application, form, and payload code |
| Styling | Tailwind CSS 4 | Utility-based layout and visual styling |
| Component primitives | shadcn configuration, Radix UI, Class Variance Authority | Button primitive and composable styling |
| Forms | React Hook Form | Form state, submission, focus, and field errors |
| Validation | Zod 4 and `@hookform/resolvers` | Browser and server payload validation |
| Animation | Framer Motion | Section, form, loading, and success transitions |
| Icons | Lucide React | Interface icons |
| Automation boundary | HTTP webhook configured through `N8N_WEBHOOK_URL` | Server-side lead forwarding |

Gemini, Google Sheets, and Gmail are excluded from this table because no executable integration for them is present in the repository.

## Project Structure

```text
.
├── app/
│   ├── api/
│   │   ├── lead/route.ts          # Implemented lead submission endpoint
│   │   ├── leads/route.ts         # 501 placeholder
│   │   └── qualify/route.ts       # 501 placeholder
│   ├── dashboard/                 # Placeholder dashboard routes
│   ├── layout.tsx                 # Root layout and page tracker
│   └── page.tsx                   # Current consultation website
├── components/
│   ├── landing/                   # Current home-page sections
│   ├── lead-form/                 # Implemented consultation form
│   ├── features/assessment/       # Validated UI with simulated submission
│   ├── features/                  # Mostly unmounted or placeholder features
│   ├── layout/                    # Navigation, footer, and layout shells
│   ├── providers/                 # Page-tracking and placeholder providers
│   └── ui/                        # Shared UI primitives
├── config/                        # Site and navigation constants
├── hooks/                         # Currently placeholder hooks
├── lib/
│   ├── lead-tracking/             # Session and route-journey tracking
│   ├── payload-builder.ts         # Sanitized lead payload construction
│   └── utils.ts                   # Shared class-name utility
├── public/                        # Static SVG assets
├── types/
│   ├── lead-form.ts               # Active form and payload schemas
│   └── assessment.ts              # Multi-step assessment schemas
├── .env.example                   # Environment variable template
└── package.json
```

## Workflow Breakdown

An n8n workflow definition is not present in the repository. Consequently, there are no auditable node names, connections, expressions, prompts, credentials, retry settings, or response mappings.

| Expected node | Repository status |
| --- | --- |
| Webhook Trigger | The Next.js route forwards to a configured webhook URL, but the receiving node is not included |
| Gemini | No node export, prompt, model configuration, or structured-output schema is included |
| JavaScript Processing | No n8n Code node or equivalent AI-output parser is included |
| Google Sheets | No node export or field-to-column mapping is included |
| Gmail | No node export, recipient rule, or email template is included |
| Webhook Response | The Next.js route accepts any upstream `2xx` response; the producing n8n node is not included |

To make this section fully reproducible, export the active n8n workflow as JSON, remove or replace credential identifiers as appropriate, and commit it to a documented workflow directory.

## Security

The repository implements the following controls:

- **Server-side forwarding:** Browser code calls `/api/lead`; only the server reads and calls the configured webhook URL.
- **Hidden webhook URL:** `N8N_WEBHOOK_URL` is not prefixed with `NEXT_PUBLIC_` and is accessed only by the route handler.
- **Environment configuration:** The webhook endpoint is loaded from the deployment environment rather than hard-coded.
- **Browser validation:** The form validates required fields, email format, phone format, length limits, and consent before submission.
- **Server validation:** The API independently validates the entire payload with Zod and forwards only `validationResult.data`.
- **Request sanitization:** The payload builder trims strings, removes ASCII control characters, and collapses whitespace before submission.
- **Payload limits:** Zod applies field lengths and a maximum page-journey array size.
- **Timeout handling:** The webhook request is aborted after 15 seconds.
- **Basic bot filtering:** A honeypot field silently treats a filled submission as successful without sending it.

The project does not currently implement authentication, authorization, rate limiting, CSRF tokens, origin enforcement, CAPTCHA, webhook signing, or server-side bot detection.

## Error Handling

| Condition | API behavior | Browser behavior |
| --- | --- | --- |
| Invalid form fields | The browser prevents submission | Inline errors are displayed and the first invalid field is focused |
| Invalid API payload | Returns `400` with a generic validation message | The form displays the returned message in a browser alert |
| Missing `N8N_WEBHOOK_URL` | Returns `503` | The form displays the returned service-unavailable message |
| Upstream non-success status | Returns `502` | The form displays a generic submission failure |
| Network failure while calling the webhook | Returns `504` with a network message | The form displays that message |
| 15-second webhook timeout | Returns `504` with a timeout message | The form displays that message |
| Malformed request JSON or unexpected server exception | Returns `500` | The form displays the returned generic error |

The server logs validation details and upstream failures to its console. There is no retry queue, persistent failure store, or external monitoring integration.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- An HTTP endpoint that accepts the lead payload
- For n8n specifically, access to an n8n instance and a workflow with a POST Webhook node

### Installation

```bash
git clone <repository-url>
cd ai-lead-qualification-portal
npm install
```

### Environment configuration

Copy the example file:

```bash
cp .env.example .env.local
```

Set `N8N_WEBHOOK_URL` to the endpoint that should receive submissions. Never expose it through a `NEXT_PUBLIC_` variable.

### Running locally

```bash
npm run dev
```

Open `http://localhost:3000` and submit the form in the contact section.

### Testing with an n8n test webhook

1. Create or open an n8n workflow containing a POST Webhook node.
2. Copy its test URL, which conventionally contains `/webhook-test/`.
3. Set that complete URL as `N8N_WEBHOOK_URL` in `.env.local`.
4. Put the Webhook node into its test/listening state in n8n.
5. Restart the Next.js development server after changing the environment file.
6. Submit the consultation form and inspect the received JSON in n8n.

The repository does not provide an importable workflow, so downstream nodes must be configured separately.

### Switching to a production webhook

1. Activate the n8n workflow.
2. Copy the production Webhook URL, which conventionally contains `/webhook/` rather than `/webhook-test/`.
3. Replace `N8N_WEBHOOK_URL` in the application environment.
4. Restart or redeploy the Next.js application.
5. Submit a controlled test lead and verify both the HTTP response and downstream processing.

## Environment Variables

| Variable | Required | Exposure | Purpose |
| --- | --- | --- | --- |
| `N8N_WEBHOOK_URL` | Yes, for form submission | Server only | Destination used by `POST /api/lead` |
| `NEXT_PUBLIC_APP_URL` | No | Browser-safe by naming convention | Fallback-aware site URL in `config/site.ts`; the current rendered application does not consume `siteConfig` |

`.env.example` contains placeholders only:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.example/webhook/your-webhook-id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Next.js application

1. Deploy the repository to a platform that supports Next.js route handlers and Node.js server execution.
2. Add `N8N_WEBHOOK_URL` to the platform's server-side environment variables.
3. Optionally set `NEXT_PUBLIC_APP_URL` if `siteConfig` is connected to runtime metadata in a future change.
4. Build with `npm run build` and start with `npm run start`, or use the platform's equivalent commands.
5. Confirm that `POST /api/lead` can reach the webhook from the deployment network.

### n8n

No workflow is bundled with the project. On the external n8n instance:

1. Configure a POST Webhook node and any required downstream processing.
2. Store service credentials in n8n's credential manager rather than the frontend repository.
3. Activate the workflow before using its production URL.
4. Set the production `/webhook/` URL in the Next.js deployment environment.
5. Verify the complete flow with a non-sensitive test lead.

Production hardening should include rate limiting, webhook authentication or signing where supported, monitoring, durable retries, data-retention rules, and redaction of personal data from logs.

## AI Usage

The application presents an AI consulting experience, but this repository contains no executable AI model call. Gemini appears only in comments and presentation copy, while the active form sends a non-AI JSON payload to a configurable webhook.

The repository also does not include reliable provenance showing which source files were created with development assistance from an AI tool. No claim about AI-assisted implementation can therefore be made from the code alone. If AI assistance was used, maintainers should record the specific tasks it supported—such as scaffolding, refactoring, or review—without implying that generated output bypassed human validation.

## Future Improvements

- Commit a sanitized n8n workflow export so the automation is reproducible and reviewable
- Add a structured Gemini response schema and validate parsed model output before using it
- Connect the multi-step assessment to the submission API or remove the simulated success path
- Add bounded retries and a durable queue for transient webhook failures
- Add rate limiting and stronger automated-submission protection
- Authenticate webhook requests with a shared signature or another supported mechanism
- Add HTML and plain-text email templates with delivery-failure handling
- Add explicit Google Sheets field mappings and idempotent writes keyed by `requestId`
- Replace placeholder dashboard routes with authenticated, data-backed views
- Add automated tests for schemas, payload construction, route responses, and timeout behavior
- Add structured logging, error monitoring, and workflow observability
- Add CRM integrations behind the existing webhook boundary

## License

MIT
