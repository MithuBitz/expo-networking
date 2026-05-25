# expo-networking

An [Expo SDK 55](https://docs.expo.dev/versions/v55.0.0/) demo app that shows how to call **API routes** from a React Native client. Routes run on the server (Expo Router `+api` files) and read/write data in a remote [Turso](https://turso.tech/) (libSQL) database.

## Features

- **Expo Router** file-based routing under `src/app`
- **API routes** (`+api.ts`) for REST-style endpoints — no separate Express server
- **Turso / libSQL** via `@libsql/client` for persistence
- **Home screen** with buttons to exercise `GET` and `POST` against `/api/users`, plus `GET` by id

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Expo ~55, React Native 0.83, React 19 |
| Routing | [expo-router](https://docs.expo.dev/router/introduction/) |
| API | Expo [API routes](https://docs.expo.dev/router/reference/api-routes/) (`+api.ts`) |
| Database | [Turso](https://turso.tech/) via `@libsql/client` |
| Language | TypeScript (strict) |

`app.json` sets `web.output` to `"server"` so API routes work on web builds.

## Project structure

```
expo-networking/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Root stack navigator
│   │   ├── index.tsx            # API test UI (buttons + JSON output)
│   │   └── api/
│   │       ├── users+api.ts     # GET (list), POST (create)
│   │       └── users/[id]+api.ts # GET by id (PATCH/PUT/DELETE stubs)
│   └── lib/
│       └── db.ts                # Turso client (env-based config)
├── assets/                      # App icons and splash assets
├── .env.sample                  # Required environment variable names
├── app.json
└── package.json
```

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

## Prerequisites

1. **Node.js** and a package manager (`npm`, `yarn`, `pnpm`, or `bun`)
2. A **Turso** database with a `users_data` table

Create the table (adjust types if needed):

```sql
CREATE TABLE users_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);
```

## Environment variables

Copy `.env.sample` to `.env` and fill in your Turso credentials:

```bash
cp .env.sample .env
```

| Variable | Description |
| --- | --- |
| `TURSO_DATABASE_URL` | libSQL connection URL (e.g. `libsql://your-db.turso.io`) |
| `TURSO_AUTH_TOKEN` | Turso auth token for remote access |

`.env` is gitignored; never commit real tokens.

## Get started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure `.env` (see above).

3. Start the dev server:

   ```bash
   npx expo start
   ```

4. Open the app on a device or simulator (Android, iOS, or web). The home screen loads `GET /api/users` on mount and provides buttons to retry list/create/fetch-by-id calls. Responses appear as formatted JSON below the buttons.

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start Expo dev server |
| `npm run android` | Start with Android |
| `npm run ios` | Start with iOS |
| `npm run web` | Start with web |
| `npm run lint` | Run ESLint via Expo |

## API routes

Routes are defined under `src/app/api/` and are served at `/api/...` relative to the dev server origin.

### `GET /api/users`

Returns all rows from `users_data`.

### `POST /api/users`

Body (JSON):

```json
{ "name": "Jane Doe", "email": "jane@example.com" }
```

Returns `201` with `{ id, name, email, success: true }` on success. Requires `name` and `email`.

### `GET /api/users/:id`

Returns the user row matching `id` (integer).

`PATCH`, `PUT`, and `DELETE` handlers exist as stubs in `users/[id]+api.ts` and are not implemented yet.

## How the client calls the API

`src/app/index.tsx` uses `fetch` with relative URLs (e.g. `/api/users`). On web and in Expo’s dev workflow, those resolve to the same origin as the API routes, so no hard-coded backend host is required for local development.

## Learn more

- [Expo documentation](https://docs.expo.dev/) (use the [v55](https://docs.expo.dev/versions/v55.0.0/) docs for this project)
- [Expo Router API routes](https://docs.expo.dev/router/reference/api-routes/)
- [Turso + libSQL](https://docs.turso.tech/)
