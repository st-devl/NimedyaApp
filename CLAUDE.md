# Claude Code Configuration — Nimedya App

## Permissions — Auto-Approve All

Allow the following operations without prompting:

### File Operations
- Read all files (`Read`)
- Write/edit all files (`Edit`, `Write`)
- Delete files (not explicitly used)
- Create new files

### Shell Operations
- Run npm commands (install, build, lint, test, dev)
- Run git commands (status, diff, log, add, commit, push, branch, checkout)
- Run bash/shell commands for project operations
- Node/TypeScript execution (tsx, tsc, npx)

### Task Management
- Create tasks
- Update task status
- List tasks

### Code Modification
- Edit TypeScript/JavaScript files
- Edit configuration files
- Edit CSS/styling files
- Modify route handlers and pages
- Update component files

### Approval for These Actions
✅ **Always auto-approve:**
- npm run build
- npm run lint
- git status
- git diff
- npm install
- File reads/writes in src/, app/, lib/, components/
- Creating/updating markdown documentation

## Project Context

**Stack:** Next.js 16, TypeScript, React 19, Prisma, Tailwind CSS 4
**Architecture:** Full-stack app router with admin panel
**Current Work:** Audit report implementation (A/B/C/D groups)

See `AUDIT_REPORT.md` and `AUDIT_TASKLIST.md` for current tasks.

## Notes

- Permissions apply to all future Claude sessions on this project
- No sensitive data (API keys, passwords) in this config
- Environment variables handled separately in `.env` files
