# Getting this project onto GitHub

Netlify deploys your site by watching a GitHub repository — every time you
push a change, Netlify automatically rebuilds and republishes. This doc gets
your local `ilearn4u` folder onto GitHub for the first time. Pick whichever
of the two methods below feels more comfortable; they end at the same place.

## Before you start

1. Create a free GitHub account at [github.com/signup](https://github.com/signup)
   if you don't already have one.
2. This project already has `.gitignore` configured to exclude `node_modules`,
   build output, and `.env.local` — so secrets and clutter won't accidentally
   get pushed. Don't remove entries from it.

---

## Method A — GitHub Desktop (easiest, no command line)

1. Download and install [GitHub Desktop](https://desktop.github.com/) and
   sign in with your GitHub account.
2. **File → Add local repository** → browse to and select your `ilearn4u`
   folder (`C:\Users\seren\Documents\ilearn4u`).
3. It will say "This directory does not appear to be a Git repository." —
   click **create a repository** in that same message.
4. Fill in the repository name (`ilearn4u`), leave the rest as default, and
   click **Create Repository**.
5. You'll see a list of every file as a pending change. Add a summary like
   "Initial commit" in the bottom-left box, then click **Commit to main**.
6. Click **Publish repository** in the top bar. Choose whether it's public
   or private (private is reasonable while you're still building), then
   **Publish Repository**.
7. Done — your code is now on GitHub. Any time you make changes, GitHub
   Desktop will show them; write a short summary and click **Commit**, then
   **Push origin** to send them up.

## Method B — Command line (Git is already installed on this machine)

Open a terminal in the `ilearn4u` folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then create an empty repository on GitHub (don't let it add a README or
.gitignore — you already have one):

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `ilearn4u`. Choose Public or Private.
3. Leave every checkbox unticked (no README, no .gitignore, no license).
4. Click **Create repository**.

GitHub will show you a page with a remote URL like
`https://github.com/<your-username>/ilearn4u.git`. Back in your terminal:

```bash
git remote add origin https://github.com/<your-username>/ilearn4u.git
git branch -M main
git push -u origin main
```

The first push will prompt you to sign in — a browser window opens for you
to authenticate with GitHub (this is normal and safe; it's GitHub's own
login page).

After this first push, sending future changes is just:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

---

## Connecting it to Netlify

Once the code is on GitHub, follow
[docs/NETLIFY_DOMAIN_SETUP.md](./NETLIFY_DOMAIN_SETUP.md) — Netlify's "Import
an existing project" step asks you to pick a GitHub repository, and
`ilearn4u` will now show up in that list.

## A note on secrets

Never commit a real `.env.local` file (it's already git-ignored). Supabase
keys, Square keys, and your Google Analytics id are set directly in
Netlify's **Environment variables** screen instead — see
[SUPABASE_SETUP.md](./SUPABASE_SETUP.md), [SQUARE_SETUP.md](./SQUARE_SETUP.md)
and `.env.example` for the full list.
