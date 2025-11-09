# Health App Project — Notes

This repository implements a small health risk assessment application. It contains a web frontend (Vite + React + TypeScript), a lightweight server, and Jupyter notebooks with model development artifacts.

Below are notes about the project layout, what each folder contains, and how to run the app locally.

## Top-level folders

- `health-app-web/` — Frontend (Vite + React + TypeScript)
  - `src/` — application source code
    - `components/` — React components used by the UI. Notable files:
      - `HealthAssessmentForm.tsx` — the main form to collect user inputs for risk calculation.
      - `RiskGauge.tsx` — visualization component for risk output.
      - `ui/` — design-system components (buttons, inputs, selects, cards, etc.).
    - `integrations/supabase/` — Supabase client and function types. The client reads `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
    - `hooks/`, `lib/`, `pages/` — utility hooks, helper functions, and page components.
  - `public/` — static assets
  - `package.json`, `vite.config.ts` — frontend build and dependency config

- `health-app-server/` — Small Python server that the frontend posts to (`/health`).
  - `app.py` — main Flask/FastAPI (or lightweight) server handler for health calculations and API endpoints.
  - `health_model.py` — helper for loading/transforming model inputs and running the prediction routines.
  - `models/` — any saved model artifacts used by the server.

- `health-app-model/` — Jupyter notebooks and model experimentation artifacts.
  - `MLA_Diabetes_model.ipynb` — notebook for diabetes model training/analysis.
  - `MLA_Heart_failure_model.ipynb` — notebook for heart disease/heart-failure model work.

## Environment variables

The frontend expects Vite environment variables prefixed with `VITE_`. Place them in `health-app-web/.env` or set them in your shell when running the dev server.

- `VITE_SUPABASE_URL` — e.g. `https://<project>.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/publishable key for client usage
- `VITE_SUPABASE_PROJECT_ID` — (optional) helpful for some supabase setups

Note: Vite only exposes `import.meta.env.VITE_*` variables that are defined in the project root (the folder where you run `npm run dev`). In this repo we keep a `.env` inside `health-app-web/` so the web app gets the variables during development.

If these are missing you will see a runtime error like: `VITE_SUPABASE_URL is required` (we added a fast-fail guard in the supabase client to surface this clearly).

## Running locally (frontend)

1. Open a terminal in `health-app-web/`:

```bash
cd health-app-web
npm install    # if you haven't installed dependencies
npm run dev
```

2. Visit the printed dev URL (usually `http://localhost:5173`) and open the Health Risk Assessment form.

## Running locally (server)

1. Open a terminal in `health-app-server/`.
2. Ensure Python dependencies are installed (use `requirements.txt` if present).
3. Start the server (the project uses a lightweight Python server; check `app.py` for the exact run command).

## Notes about form fields and backend mapping

- The frontend collects fields like `age`, `gender`, `cholesterol`, `bloodPressure`, `glucose`, `bmi`, `maxHeartRate`, `stDepression`, `smokes`, `drinks`, `existingHeartDisease`, `performsExercises`, `hereditary`, etc.
- The `smokes`, `drinks`, and `performsExercises` fields were updated to accept one of: `regularly`, `occasionally`, or `no`. If your backend expects booleans or numeric encodings, add a mapping step either client-side before sending, or server-side when receiving the request.
