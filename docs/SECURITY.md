# Security model — plain-language summary

You asked for the database and API to be "encrypted" and to not allow
"outside view." Here's exactly what that means in this stack and where each
piece lives.

## 1. Transport encryption (data in transit)

Every request between the browser, Netlify, and Supabase travels over HTTPS
(TLS) automatically — Netlify and Supabase both provision this for you, no
configuration needed. There is nothing to turn on.

## 2. "No outside view" = Row Level Security, not secrecy

A common misconception: making a database "private" means hiding its URL or
its key. That's not how Supabase (or any hosted Postgres-as-a-service) works,
and trying to achieve it that way is fragile. Instead:

- The **anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) is *designed* to be
  public — it ships in your website's JavaScript bundle, visible to anyone
  who opens DevTools. That's normal and fine.
- What actually stops a stranger from reading every student's data is **Row
  Level Security (RLS)** — see `supabase/migrations/0003_rls_policies.sql`.
  With RLS on, every single query is filtered by "is this the logged-in
  user's own row / their linked student / their school / their
  organisation?" A request that doesn't match any policy gets **zero rows
  back**, full stop — regardless of what key was used to ask.
- The **service role key** (`SUPABASE_SERVICE_ROLE_KEY`) is the one true
  secret in this system. It bypasses RLS completely. It must only ever be
  read by server-side code (Next.js Server Actions / Route Handlers, or a
  Netlify Function) and set as a Netlify environment variable — never
  imported into any file under `src/app` that runs in the browser, never
  prefixed with `NEXT_PUBLIC_`, never committed to git.

## 3. Checklist before you consider this "launch-ready"

- [ ] Run all three migrations, including `0003_rls_policies.sql` — the
      schema is **not protected** until that file has run.
- [ ] Confirm in Supabase → **Authentication → Policies** that every table
      shows a padlock icon (RLS enabled) and has policies listed, not "No
      policies created yet."
- [ ] Double-check `SUPABASE_SERVICE_ROLE_KEY` is only set in Netlify's
      server-side environment variables, never in a `NEXT_PUBLIC_*` variable.
- [ ] Replace the current demo login (`123/123`, mentioned in the README)
      with real Supabase Auth before any real student data goes in.
- [ ] Review `.gitignore` — `.env.local` must never be committed. Run
      `git status` before your first commit and confirm no `.env*` file
      (other than `.env.example`) is staged.
- [ ] Turn on Netlify's forced-HTTPS (on by default for Netlify-managed
      domains) once your custom domain is connected — see
      [NETLIFY_DOMAIN_SETUP.md](./NETLIFY_DOMAIN_SETUP.md).
- [ ] Have a lawyer review `/legal/privacy` and `/legal/terms` before
      collecting real data from minors — the current pages are clearly
      marked as placeholder starting points, not final legal advice.

## 4. What RLS does NOT do

RLS protects **database rows**. It doesn't:
- Validate that a payment actually happened (that's server-side Square
  webhook verification — see [SQUARE_SETUP.md](./SQUARE_SETUP.md)).
- Stop someone from screenshotting their own dashboard.
- Replace rate limiting on public endpoints like the contact form (Supabase
  has built-in abuse protection you can tune under **Authentication → Rate
  Limits**, and the `enquiries` table's public-insert policy should be
  paired with Supabase's built-in captcha/rate-limit settings if spam
  becomes an issue).
