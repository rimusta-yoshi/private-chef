# Private Chef Website

Next.js site for a private chef business: marketing pages, a contact form, a booking system, and Stripe-powered deposit payments with email notifications.

## Stack (free-tier friendly)

- **Next.js + Tailwind** — frontend, deployed free on [Vercel](https://vercel.com)
- **Supabase** — Postgres database for contact messages and bookings (free tier)
- **Stripe** — booking deposit payments (no monthly fee, percentage per transaction only)
- **Resend** — sends an email notification on new contact messages, bookings, and paid deposits (free tier)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Environment variables

See [`.env.example`](.env.example). You'll need accounts (all free to start) for:

1. **Supabase** — create a project, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor, then copy the project URL and `service_role` key.
2. **Resend** — create an API key, verify a sending domain (or use the Resend test sender while developing), and set the email address that should receive notifications.
3. **Stripe** — copy the secret key from the dashboard; set up a webhook endpoint pointing at `/api/webhooks/stripe` for the `checkout.session.completed` event and copy its signing secret.

## API routes

- `POST /api/contact` — stores a contact message, emails the owner
- `POST /api/bookings` — stores a booking request, emails the owner
- `POST /api/checkout` — creates a Stripe Checkout session for a booking deposit
- `POST /api/webhooks/stripe` — marks a booking's deposit as paid when Stripe confirms payment

## Deployment

Push to GitHub, import the repo into [Vercel](https://vercel.com/new), and add the same environment variables there. Free tier covers this project comfortably until traffic/booking volume grows significantly.
