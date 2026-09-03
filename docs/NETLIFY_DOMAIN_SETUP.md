# Deploying to Netlify + connecting your ilearn4u domain

A quick correction first: **your domain connects to Netlify (hosting), not
to Supabase.** Supabase only stores your data behind the scenes — visitors
never go "to" Supabase directly. The chain is:

```
ilearn4u.com.au (your domain)  →  Netlify (hosts the website)  →  Supabase (database, called by the server)
                                                                →  Square (payments, called by the server)
```

## 1. Deploy the site to Netlify

1. Push this project to a GitHub repository (private is fine) — see
   [docs/GITHUB_SETUP.md](./GITHUB_SETUP.md) if you haven't done this yet.
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an
   existing project** → connect GitHub → pick the repo.
3. Netlify auto-detects Next.js (the `@netlify/plugin-nextjs` dependency and
   `netlify.toml` are already in this repo) — accept the default build
   settings (`npm run build`).
4. **Site configuration → Environment variables** → add every variable from
   `.env.example` with your real values (Supabase, Square, Google Analytics —
   see the other setup docs).
5. Deploy. You'll get a temporary `*.netlify.app` URL to confirm it works.

## 2. Connect your domain

You said you already own the domain. In Netlify:

1. **Domain management → Add a domain** → enter your domain
   (e.g. `ilearn4u.com.au`) → Netlify checks if it can detect your registrar.
2. Choose one of two approaches:
   - **Netlify DNS (recommended, simplest)** — Netlify gives you 4
     nameservers (e.g. `dns1.p0N.nsone.net`). Log into wherever you
     registered the domain (GoDaddy, Crazy Domains, VentraIP, etc — this is
     a step only you can do, in your registrar's account) and replace its
     nameservers with Netlify's. Propagation usually takes anywhere from a
     few minutes to a few hours.
   - **Keep your current DNS provider** — instead add the specific records
     Netlify shows you (typically an `A` record pointing at Netlify's load
     balancer IP, plus a `CNAME` for `www`) in your existing DNS panel.
3. Once DNS resolves, Netlify automatically provisions a **free HTTPS
   certificate** (Let's Encrypt) for your domain — no extra step, and it
   auto-renews.
4. **Domain management → HTTPS** → confirm "Force HTTPS" is on, so
   `http://` visitors are redirected to the encrypted `https://` version.

## 3. Point Supabase at the right site (CORS / redirect URLs)

In Supabase → **Authentication → URL Configuration**, set:
- **Site URL** → `https://ilearn4u.com.au` (your real domain, once live)
- **Redirect URLs** → add both your Netlify preview URL and your production
  domain, so login/auth redirects work in both environments.

## 4. Every deploy after this

Once connected, every `git push` to your main branch triggers a new Netlify
build automatically — no manual redeploy step needed.
