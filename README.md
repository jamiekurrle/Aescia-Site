# v0-website-v2

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_QlKts0g8rrLm3GQpdiXxW4IgNZH0)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment variables

The contact form at `/contact` POSTs to `/api/contact`, which sends email via
[Resend](https://resend.com). Set these in Vercel (Settings → Environment
Variables) and locally in `.env.local`:

| Variable | Required | Default | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | yes | | Create in the Resend dashboard. |
| `CONTACT_TO_EMAIL` | no | `contact@aesciahealth.com` | Where enquiries are delivered. |
| `CONTACT_FROM_EMAIL` | no | `Aescia Site <no-reply@aesciahealth.com>` | Must be on a Resend-verified domain. Until `aesciahealth.com` is verified, temporarily set this to `onboarding@resend.dev` for testing. |

Steps to go live:

1. Sign up at `resend.com` and add `aesciahealth.com` as a verified sending domain. Add the DNS records Resend provides to your DNS host.
2. Create an API key scoped to sending. Paste it into Vercel as `RESEND_API_KEY`.
3. Redeploy. Enquiries arrive at `contact@aesciahealth.com` with `reply-to` set to the enquirer.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Resend Documentation](https://resend.com/docs)

<a href="https://v0.app/chat/api/kiro/clone/jamiekurrle/v0-website-v2" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
