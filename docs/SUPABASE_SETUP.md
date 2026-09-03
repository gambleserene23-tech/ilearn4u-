# Connecting Supabase (step-by-step)

This turns the mock-data prototype into a real database. Nobody but you can
do the account-creation steps (Claude can't sign into Supabase for you) — but
every step below is copy-paste simple.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in / create an account.
2. **New project** → pick an organisation → name it `ilearn4u` → choose a
   region close to your users (e.g. Sydney for Australia) → set a strong
   database password and **save it somewhere safe** (a password manager) —
   you won't be shown it again.
3. Wait ~2 minutes for the project to finish provisioning.

## 2. Run the migrations

**This is a SQL Editor task, not a file upload.** There's no "upload table"
button in Supabase for this — instead you paste SQL text and Supabase runs
it to build the tables for you. That trips people up the first time, so
here's the exact click path:

1. In the Supabase dashboard, click **SQL Editor** in the left sidebar (not
   **Table Editor** — that's for looking at data after tables already exist).
2. Click **+ New query**.
3. Open [`supabase/migrations/0001_schema.sql`](../supabase/migrations/0001_schema.sql)
   in this project, select all its text (Ctrl+A, Ctrl+C), and paste it into
   the Supabase SQL editor box.
4. Click **Run** (or Ctrl+Enter). You should see "Success. No rows returned."
5. Click **+ New query** again for the *next* file, and repeat for each file
   below, **one at a time, in this exact order**:

   1. `0001_schema.sql` — creates every table
   2. `0002_seed_lookups.sql` — fills in opportunity types + application statuses
   3. `0003_rls_policies.sql` — locks the database down so nobody can browse
      other people's data (this is the "encrypted / no outside view" piece)
   4. `0004_demo_data.sql` — *(optional)* fills in the same fictional
      schools, businesses, universities and students already shown on the
      website, so Table Editor isn't empty while you build

Running them out of order (e.g. pasting `0003` before `0001`) will fail with
an error like `relation "students" does not exist` — that just means a
table the RLS policies expect hasn't been created yet. Run `0001` first and
retry.

### If it still won't run

- **"Only part of the file pasted"** — the schema file is long (~200 lines).
  Make sure you selected the *entire* file before copying, not just what was
  visible on screen.
- **Nothing happens when you click Run** — check you're in the SQL Editor,
  not Table Editor. They look similar but only SQL Editor has a Run button
  for arbitrary SQL.
- **"permission denied" or "must be owner of..."** — you're on a paused or
  restricted project; open Project Settings → General and confirm the
  project is active (not paused from inactivity on the free tier).
- **A specific error message** — copy the exact red error text; it almost
  always names the table/column at fault, which tells you which migration
  file to check.

(Prefer the command line? Install the [Supabase CLI](https://supabase.com/docs/guides/cli),
run `supabase link --project-ref <your-project-ref>`, then
`supabase db push`, which applies all files automatically in order.)

## 3. Get your API keys

**Project Settings → API**. You need three values:

| Value | Where it's used | Safe to expose to the browser? |
|---|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes — it's *meant* to be public. Row Level Security (migration 3) is what actually protects data, not secrecy of this key. |
| `service_role` key | `SUPABASE_SERVICE_ROLE_KEY` | **No — never.** This key bypasses every security rule. It only ever goes in server-side environment variables, never in any file that ships to the browser, and never in a public git repo. |

## 4. Set the environment variables

**Local development** — copy `.env.example` to `.env.local` and fill in the
three values above.

**Production (Netlify)** — Netlify → your site → **Site configuration →
Environment variables** → add all three. Never commit real values to
`.env.local` into git (it's already in `.gitignore`).

## 5. Turn on email/password auth

**Authentication → Providers** in Supabase — Email is on by default. For a
platform used by minors, also consider:
- **Authentication → Settings** → require email confirmation before login.
- Turning off public sign-ups later once schools/organisations are
  onboarded manually, if you want tighter control over who can register.

## 6. Wire up the frontend

The Supabase client helpers already exist at `src/lib/supabase/browser.ts`
and `src/lib/supabase/server.ts`. The next step (not yet done — see
`src/lib/services/*.ts`) is to replace each function body (e.g.
`getOpportunities()`) with a real Supabase query, keeping the same function
signature so no page component needs to change. Example:

```ts
// src/lib/services/opportunities.ts (after connecting)
export async function getOpportunities() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase!
    .from("opportunities")
    .select("*")
    .eq("status", "open");
  if (error) throw error;
  return data;
}
```

## About the demo data (migration 0004)

The 22 students, 3 schools and 8 businesses/universities in `0004_demo_data.sql`
are the exact same fictional people/organisations already shown on the
website (`src/data/*.ts`) — Maya Chen, Riverbend State High School,
Northwave Digital, and so on. None of them have a real login yet
(`profile_id` is `NULL` on every seeded student/parent) — that's intentional,
not a bug. It represents a school having pre-registered its students before
any of them have actually signed up.

When a real person signs up later (once Supabase Auth is wired into
`/login` and `/signup` — see "Where things are handled" in the main
README), your signup code should either:
- create a brand-new `students` row with that person's real `profile_id` set, or
- if you're matching them to an existing pre-registered row (e.g. a school
  imported "Maya Chen" and the real Maya is now signing up), run
  `update students set profile_id = '<new-auth-user-id>' where id = '<existing-row-id>'`.

Feel free to delete every row `0004_demo_data.sql` inserted once you have
real users — nothing else in the schema depends on those specific rows.

## Keeping config files and lookup tables in sync

`opportunity_types` and `application_statuses` are stored **both** as
TypeScript config (`src/config/*.ts`, for instant UI changes with no
redeploy needed for wording/icons) **and** as database lookup tables (for
foreign-key integrity — an `opportunities.type_id` must reference something
real). If you add a new opportunity type:

1. Add it to `src/config/opportunity-types.ts`.
2. Add a matching row to `opportunity_types` in Supabase (same `id`) — either
   via the Table Editor UI or a one-line `insert` in the SQL Editor.

## Encrypting particularly sensitive fields (optional, beyond RLS)

Row Level Security (migration 3) is the primary protection and is enough for
everything in this schema. If you later add a column you consider especially
sensitive (e.g. a document upload path, a medical note), Postgres also
supports column-level encryption via the `pgcrypto` extension (already
enabled in migration 1):

```sql
-- encrypt on write
update students set some_sensitive_field = pgp_sym_encrypt('value', 'your-secret-key');
-- decrypt on read (server-side only)
select pgp_sym_decrypt(some_sensitive_field::bytea, 'your-secret-key') from students;
```

Don't reach for this by default — it makes the column unsearchable/unfilterable
and adds real complexity. Use RLS first; add column encryption only for a
specific field you've decided needs it.
