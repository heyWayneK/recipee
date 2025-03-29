# Backup and Install Triggers, Functions and Edge Functions & Crons

// NOTE: This needs to be tested

project/
├── prisma/
│ ├── schema.prisma # From db pull
│ └── migrations/ # Prisma migrations
├── db-backup/
│ └── schema.sql # Triggers and functions
├── functions/ # Edge functions
└── backup-script.sh # Automation script

## Recommended (Not tested yet)

### Example BASH script

Example backup-script.sh:

#!/bin/bash
npx prisma db pull
pg_dump -h localhost -U user -d mydb --schema-only --no-owner > db-backup/schema.sql
git add .
git commit -m "Backup schema and functions"
git push origin main

## To Reinstall

### Reinstall:

- Pull from Git.
- Run npx prisma migrate deploy to apply the Prisma schema.
- Run the .sql file to restore triggers/functions.
- Deploy edge functions with your platform’s CLI.

## Triggers

### 1. Triggers and Database Functions

Since triggers and stored functions live in your database, the best way to back them up is to export their definitions directly from the database. This depends on your database system (e.g., PostgreSQL, MySQL, etc.), but here’s how you can do it:
PostgreSQL

- Backup Triggers and Functions:
- Use pg_dump to export triggers and functions:
- bash

pg_dump -h <host> -U <username> -d <database> --schema-only --no-owner --no-privileges > schema.sql

## --schema-only: Exports schema (tables, triggers, functions) without data.

Filter for just triggers and functions by adding --function="_" or --trigger="_" if needed (though this requires manual filtering of the output).

Alternatively, use a GUI like pgAdmin to export specific objects.

Result: A schema.sql file containing CREATE FUNCTION and CREATE TRIGGER statements.

## Reinstall:

Run the SQL file against your database:
bash

psql -h <host> -U <username> -d <database> -f schema.sql

## SUGGEST AUTOMATED BACKUP

4. Recommended Workflow
   Daily Backup: Automate with a cron job or GitHub Action:
   yaml

# .github/workflows/backup.yml

name: Backup Database and Code
on:
schedule: - cron: "0 0 \* \* \*" # Daily at midnight
jobs:
backup:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3 - run: npx prisma db pull - run: pg_dump -h ${{ secrets.DB_HOST }} -U ${{ secrets.DB_USER }} -d mydb --schema-only > db-backup/schema.sql - run: git add . - run: git commit -m "Automated backup" - run: git push

Test Restore: Periodically test restoring from your backup to ensure it works.
