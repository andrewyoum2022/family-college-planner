# Daily Supabase Backup

The repository includes `.github/workflows/daily-backup.yml`.

## Schedule
- Every day at 00:00 KST (Asia/Seoul).
- GitHub Actions cron is UTC, so the workflow uses `0 15 * * *` (15:00 UTC = 00:00 KST the next calendar day).
- It can also be run manually with **Actions > Daily encrypted Supabase backup > Run workflow**.

## What is backed up
`pg_dump` creates a PostgreSQL custom-format database backup. This captures the application database schema and rows, including the College Planner tables. The dump is encrypted before upload.

## Where backups are stored
Encrypted backups are uploaded as GitHub Actions artifacts and retained for 90 days. They are NOT committed into the public repository.

## Required GitHub Actions secrets
Before the first successful run, add these repository secrets under **Settings > Secrets and variables > Actions**:

1. `SUPABASE_DB_URL` — the Supabase Postgres connection URI, including the database password. Prefer the connection string Supabase provides for server/CI usage.
2. `BACKUP_ENCRYPTION_PASSWORD` — a long, unique password used only to encrypt backups. Store a copy in a password manager. If this password is lost, encrypted backups cannot be decrypted.

Never put either value in source code, `.env.example`, an issue, or a commit.

## Restore procedure
1. Download the desired encrypted artifact from GitHub Actions.
2. Decrypt it locally:
   `openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in BACKUP.dump.enc -out BACKUP.dump -pass env:BACKUP_ENCRYPTION_PASSWORD`
3. Restore to a fresh/test Supabase database first:
   `pg_restore --no-owner --no-privileges --clean --if-exists --dbname "$TARGET_DB_URL" BACKUP.dump`
4. Verify family members, schools, tasks, deadlines, RLS policies, and login behavior before restoring to production.

## Safety notes
- The GitHub repository is public, so raw database backups must never be committed to it.
- Backups are encrypted before being uploaded as Actions artifacts.
- The workflow has only `contents: read` permission.
- Keep the encryption password separately from GitHub/Supabase credentials.
- A backup is only useful after a restore test. Periodically run a restore into a temporary database to verify it.
