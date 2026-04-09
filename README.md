# SyAi Backend

A Node.js/Express backend for managing Users, profile and all data.

## Setup
1. **Database**: Create a PostgreSQL DB and run the schema (provided in `/db/migrations/init.sql`).
2. **Mongo DB**: Create Mongo DB server for Document data.
3. **Env**: Create a `.env` file with `DATABASE_URL` and `JWT_SECRET`.
4. **Install**: `npm install`
5. **Run**: `node server.js`

## Curls for testing