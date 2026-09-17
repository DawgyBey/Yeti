# TrekSafe project structure

This repo is organized by role:

- `backend/` — Flask AI server and model files
- `treksafe-app/` — React Native / Expo frontend app
- `venv/` — local Python environment

## Backend
Run the local AI server from the repo root:

```bash
cd backend
python app.py
```

The Flask app expects the GGUF model in `backend/models/` and serves:
- `POST /ask`
- `GET /health`

## Frontend
From the Expo app:

```bash
cd treksafe-app
npm install
npx expo start
```

Update the API URL in `treksafe-app/config.js` to match your laptop's local IP on the current WiFi network.

## Notes
- The app frontend and backend are separated so the project matches the actual runtime roles.
- The `sos` route is still expected from the backend team / Twilio integration.
# Yeti
# Yeti
