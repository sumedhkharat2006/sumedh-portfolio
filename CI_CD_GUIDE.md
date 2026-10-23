# CI/CD Guide: GitHub → GitHub Actions → Netlify

This project deploys itself. Push code to GitHub, and it is checked, built and published to
**https://sumedhkharat-portfolio.netlify.app** automatically.

---

## 1. What is CI/CD?

| Term | Meaning | In this project |
| --- | --- | --- |
| **CI**: Continuous Integration | Every change is automatically checked and built | TypeScript type-check + production build on every push and pull request |
| **CD**: Continuous Deployment | Every change that passes CI is automatically released | Push to `main` → live site updated. Pull request → private preview URL |

Without CI/CD you run `npm run build` and upload files by hand. With CI/CD you only `git push`.

---

## 2. How the pipeline works

```
 You: git push
        │
        ▼
 GitHub repository  (sumedhkharat2006/sumedh-portfolio)
        │  triggers
        ▼
 GitHub Actions: workflow ".github/workflows/ci-cd.yml"
        │
        ├─ Job 1  "Type-check & build"   (CI, runs for every push and PR)
        │     1. checkout code
        │     2. install Node 22 + npm ci
        │     3. npm run typecheck   ← fails the pipeline on TypeScript errors
        │     4. npm run build       ← fails the pipeline if the site can't build
        │     5. save dist/ as an artifact
        │
        ├─ Job 2  "Deploy preview"       (CD, pull requests only)
        │     deploy dist/ to a preview URL  → comment the link on the PR
        │
        └─ Job 3  "Deploy production"    (CD, push to main only)
              deploy dist/ to Netlify production → live site updated
```

If Job 1 fails, **nothing is deployed** and the live site keeps working on the previous version.

---

## 3. Files involved

| File | Purpose |
| --- | --- |
| `.github/workflows/ci-cd.yml` | The pipeline definition (jobs, steps, triggers) |
| `package.json` → `typecheck`, `build` scripts | The commands CI runs |
| `package-lock.json` | Exact dependency versions so CI installs the same packages as your PC |
| `netlify.toml` | Build settings and cache headers used by Netlify |

### Secrets (stored in GitHub, never in code)

| Secret | What it is |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | Lets GitHub Actions deploy to your Netlify account |
| `NETLIFY_SITE_ID` | Which Netlify project to deploy to (`sumedhkharat-portfolio`) |

To see them, open the repo on GitHub, then go to **Settings → Secrets and variables → Actions**.

---

## 4. Everyday workflow

### Update the live site
```
git add -A
git commit -m "Update project descriptions"
git push
```
Then open **GitHub → repo → Actions** to watch the run. About 1–2 minutes later the live site is updated.

### Try a change safely with a preview (recommended for bigger changes)
```
git checkout -b new-hero-video
# ...make changes...
git add -A
git commit -m "Try a new hero video"
git push -u origin new-hero-video
```
1. GitHub shows a **"Compare & pull request"** button. Click it, then click **Create pull request**.
2. CI runs, and a bot comment appears with a **preview URL** such as `https://pr-1--sumedhkharat-portfolio.netlify.app`.
3. If it looks good, click **Merge pull request**. That deploys it to production automatically.

### Re-run a deploy manually
Go to **GitHub → Actions → CI/CD → Run workflow → Run workflow**.

---

## 5. How CI/CD was integrated into this project (step by step)

Use these steps to add the same pipeline to any other Vite/React project.

### Step 1: Put the project on GitHub
```
git init -b main
git add -A
git commit -m "Initial commit"
gh repo create <your-user>/<repo-name> --public --source . --remote origin --push
```

### Step 2: Make sure the project builds from a clean install
```
npm ci
npm run typecheck
npm run build
```
CI runs exactly these commands, so they must pass on your PC first.
Add a `typecheck` script to `package.json` if there isn't one:
```json
"typecheck": "tsc --noEmit"
```

### Step 3: Create the Netlify site (once)
- Netlify dashboard → **Add new project → Deploy manually**, or run `netlify deploy` from the CLI.
- Copy its **Site ID** from **Project configuration → General → Project details**.

### Step 4: Create a Netlify access token
Netlify → avatar → **User settings → Applications → Personal access tokens → New access token**.
Name it `GitHub Actions` and copy the token. It is shown only once.

### Step 5: Add the secrets to GitHub
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
- `NETLIFY_AUTH_TOKEN` = the token from Step 4
- `NETLIFY_SITE_ID` = the Site ID from Step 3

Or from a terminal:
```
gh secret set NETLIFY_AUTH_TOKEN
gh secret set NETLIFY_SITE_ID
```

### Step 6: Add the workflow file
Create `.github/workflows/ci-cd.yml` (copy the one from this repo). It contains:
- **Triggers:** `push` to `main`, `pull_request` to `main`, and a manual `workflow_dispatch`.
- **`ci` job:** checkout → setup-node (with npm cache) → `npm ci` → `npm run typecheck` → `npm run build` → upload `dist`.
- **`deploy-preview` job** (PRs): `netlify deploy --alias=pr-<number>`, then comment the URL.
- **`deploy-production` job** (main): `netlify deploy --prod`.

### Step 7: Push and watch
```
git add .github/workflows/ci-cd.yml
git commit -m "Add CI/CD pipeline"
git push
```
Open the **Actions** tab. All jobs should show a green ✓.

---

## 6. Security notes

- Secrets are encrypted by GitHub and hidden in logs. Never commit tokens to the code.
- Preview deploys run only for branches in this repo, not for pull requests from forks,
  so outsiders can't use your Netlify token.
- PR titles and commit messages are passed to the shell through environment variables,
  never pasted directly into scripts (this prevents command injection).
- **Rotating the token:** the current `NETLIFY_AUTH_TOKEN` is the token from your
  `netlify login`. For a dedicated one, create a new token (Step 4), replace the secret
  (Step 5), and revoke the old token in Netlify if you no longer use the CLI.

---

## 7. Alternative: Netlify's built-in Git integration

Netlify can also build directly from GitHub without GitHub Actions:
Netlify → project → **Project configuration → Build & deploy → Continuous deployment → Link repository** → choose GitHub → `sumedh-portfolio`.
It reads `netlify.toml` (build command `npm run build`, publish `dist`).

**Use only one of the two methods.** If you link the repo in Netlify, delete
`.github/workflows/ci-cd.yml` (or remove its deploy jobs) to avoid deploying twice.
This project uses GitHub Actions because the full pipeline is visible and versioned in the repo.

---

## 8. Troubleshooting

| Problem | Fix |
| --- | --- |
| ❌ **Type-check** failed | Run `npm run typecheck` locally, fix the errors shown, then commit and push again |
| ❌ **Install dependencies** (`npm ci`) failed | `package.json` and `package-lock.json` are out of sync. Run `npm install` locally and commit `package-lock.json` |
| ❌ Deploy says *Unauthorized* | `NETLIFY_AUTH_TOKEN` expired or was revoked. Create a new token and update the secret |
| ❌ Deploy says *Site not found* | Check the `NETLIFY_SITE_ID` secret |
| Live site didn't change | Check the Actions run finished green, then hard-refresh the browser with `Ctrl + F5` |
| Want to deploy from your PC anyway | `npm run deploy` still works |
