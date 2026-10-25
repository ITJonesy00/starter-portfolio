# STARTER-PORTFOLIO

[![Release](https://img.shields.io/github/v/release/itjonesy00/starter-portfolio?style=flat-square)](https://github.com/itjonesy00/starter-portfolio/releases/latest) [![Deploy](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fitjonesy00.github.io%2Fstarter-portfolio%2Fversion.json&query=%24.version&label=deployed&style=flat-square)](https://itjonesy00.github.io/starter-portfolio)


## Stack

| Layer | Tool |
|---|---|
| **Site** | HTML, CSS, JavaScript (no framework, no build step) |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions (3 workflows: `dev`, `release`, `deploy`) |
| **Versioning** | `dev` → `test` → `main` branches, version tags |
| **Security** | Minimal : Dependabot, secret scanning, OIDC authentication (token) |
| **Workflow tools** | `jq` (writes `version.json`), GitHub CLI `gh` (triggers the deployment) |

## CI/CD minimal pipeline

The pipeline is deliberately minimal: check, build, tag, publish to GitHub Pages. There is **no separate test environment**: GitHub Pages only offers one site per repository. The `test` branch validates the build but deploys nothing.

### Steps:

🏁 develop ➡️ test ➡️ deploy 🎉

### More details: 

| Step | Trigger | What it does | Security |
|---|---|---|---|
| **dev** | push to `develop` | Checks `index.html` exists, the JS is valid,... | Read-only permissions, Dependabot, secret scanning |
| **test** | push to `test` | Rebuilds, advances `main`, creates the version tag | Write access limited to the promotion job, no force-push, `main` moves only if the build passes |
| **deploy** | tag pushed in `main` branch| Writes the version into `version.json`, publishes to GitHub Pages | Only tags publish, Pages permissions scoped to this job, OIDC, environment restricted to tags |


**Rollback**: Actions → Deploy → Run workflow, then pick the old tag under "Use workflow from".

**Accepted limit**: testing happens on the build, not on real infrastructure. For a larger site, the best practice is a **dedicated staging infrastructure** mirroring production, to validate the actual deployment before release. The structure above stays the same: you add a deployment step to that environment between `test` and production.

---
## Next steps (when the stack grows)
- Post-deploy smoke test (check the live `version.json` matches the tag)
- Verify the tag points to a commit on `main`
- Pin GitHub Actions to commit SHAs (Dependabot keeps them updated)
