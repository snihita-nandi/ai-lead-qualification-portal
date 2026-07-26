# AI Lead Qualification Portal

A Next.js application that captures consultation enquiries, validates lead data, records session context, and forwards submissions to an n8n webhook through a secure server-side API route.

## Links

- [Live application](https://ai-lead-qualification-portal.vercel.app/)
- [Demo video](https://youtu.be/Is8-LihseuQ)

## Features

- Responsive consultation website and accessible lead form
- Browser and server validation with Zod
- Request IDs, session IDs, attribution, and page-journey tracking
- Server-side webhook forwarding with a 15-second timeout
- Input normalization, honeypot filtering, and duplicate-submit protection
- Controlled validation, network, webhook, and server errors

## Workflow

```text
Visitor -> Lead Form -> Next.js API -> Zod Validation -> n8n Webhook
```

The API returns a controlled success or error response to the form. The repository does not include the n8n workflow export, so its Gemini, Google Sheets, and Gmail stages cannot be verified from the committed source.

## Tech Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, React Hook Form, Zod, Framer Motion, Radix UI, shadcn/ui, Lucide React, and n8n.

## Setup

### Frontend

```bash
git clone https://github.com/snihita-nandi/ai-lead-qualification-portal.git
cd ai-lead-qualification-portal
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### API

The form submits to `POST /api/lead`. The route validates the payload and forwards it to the server-only `N8N_WEBHOOK_URL`.

### n8n

Create a workflow with a POST Webhook node. Use its `/webhook-test/` URL locally, then activate the workflow and switch to the production `/webhook/` URL for deployment.

## Environment Variables

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.example/webhook/your-webhook-id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`N8N_WEBHOOK_URL` is required. `NEXT_PUBLIC_APP_URL` is optional. Use placeholders in `.env.example` and never commit `.env.local`.

## AI Tools and Keys

The Next.js application does not call an AI model directly and requires no AI API key. Gemini is part of the intended external n8n automation, but its workflow and credentials are not committed. Gemini, Google Sheets, and Gmail credentials should be stored in n8n's credential manager.

## Current Limitations

- The n8n workflow export is not included.
- The multi-step assessment uses a simulated submission.
- Dashboard and lead-management routes are placeholders.
- `/api/leads` and `/api/qualify` return `501 Not Implemented`.

## License

MIT
