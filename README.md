# AgriVista Africa

AI platform for farmers in **Nigeria and West Africa**: yield prediction, weather integration, fertilizer recommendations, pest risk alerts, and a marketplace for selling produce.

## Features

- **Farmer inputs**: crop type, soil type, state (Nigeria), farm size
- **Weather**: Open-Meteo forecast + **historical** (Open-Meteo Archive, ERA5) for location-typical climate
- **Yield prediction**: Crop baselines from **FAO FAOSTAT** (Nigeria national yields) + soil, agro-ecological zone, and live + historical weather
- **Fertilizer recommendation**: N-P-K and timing by crop and soil
- **Pest risk alerts**: Crop-specific pests and severity from weather
- **Marketplace**: List and browse produce (region/crop filters); indicative farm-gate prices
- **Revenue**: Subscription plans (Free, Farm, Government programs)
- **Harvest timing**: Optional planting date → expected harvest date from crop duration
- **Input cost**: Est. fertilizer + seed cost per ha (indicative ₦)
- **Weather alerts**: Heavy rain / dry spell from 7-day forecast
- **Planting reminders**: “This month consider planting: …” from planting windows
- **Notes**: Save per-season notes (crop, season, note)
- **Market prices**: Links to AFEX, NBS, FAO, etc. for live/indicative prices
- **Loans & grants**: Resources page with eligibility and links (CBN, NIRSAL, FMARD, IFAD)
- **Storage tips**: Post-harvest storage advice per crop
- **PWA**: manifest + service worker for offline caching
- **Languages**: English, Hausa (Ha), Yoruba (Yo), Igbo (Ig) for nav and key labels

## Tech stack

- **Backend**: Python, FastAPI, Open-Meteo (forecast + historical archive), FAOSTAT (Nigeria crop yields)
- **Frontend**: React, TypeScript, Vite
- **Revenue**: Subscription for farms (e.g. ₦5,000/month), government agricultural programs (custom)

## Quick start

### Backend (Python)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

**Note:** If the Dashboard does not show "When & where to plant" (with Best states and Best soil), restart the backend so it loads the latest code (`Ctrl+C` then run `uvicorn` again).

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Dashboard: http://localhost:3000 (proxies `/api` to backend).

## Project structure

```
agri-ai-africa/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── config.py
│   │   ├── schemas.py       # Pydantic models, crop/soil enums
│   │   ├── routes/         # predictions, weather, marketplace, subscription
│   │   └── services/        # weather API, yield ML, fertilizer, pest risk
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── pages/          # Dashboard, Marketplace, Plans
│   │   └── components/
│   └── package.json
└── README.md
```

## API overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/insights/full` | POST | Full insights: yield + weather + fertilizer + pest risk |
| `/api/predict/yield` | POST | Yield prediction only |
| `/api/recommend/fertilizer` | POST | Fertilizer recommendation |
| `/api/alerts/pest-risk` | POST | Pest risk alert |
| `/api/weather/forecast` | GET | Weather forecast (lat, lon, days) |
| `/api/crops/planting-advice` | GET | Best planting windows for all crops (Nigeria) |
| `/api/crops/planting-advice/{crop_type}` | GET | Planting advice for one crop (includes harvest_days_approx) |
| `/api/crops/storage-tips/{crop_type}` | GET | Post-harvest storage tips per crop |
| `/api/reminders/planting` | GET | Crops to plant this month |
| `/api/notes` | GET/POST | Farmer notes (in-memory) |
| `/api/notes/{id}` | DELETE | Delete a note |
| `/api/marketplace/listings` | GET/POST | List/browse produce |
| `/api/subscription/plans` | GET | Subscription plans |

## Crops supported

Maize, rice, cassava, yam, sorghum, cowpea, groundnut, soybean, cocoa, oil palm, millet, cocoyam, sesame, tomato, pepper, rubber, cotton, beans, fio fio (pigeon pea), akidi (aligned with Nigerian/West African production). Each crop has best-planting-window advice based on annual weather (rainfall and temperature).

## Deploy backend on Render

- **Root directory:** `backend`
- **Build command:** `pip install -r requirements.txt`
- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment:** Add `PYTHON_VERSION` = `3.10.12` if the build fails (or use the `runtime.txt` in `backend/`).
- After deploy, set your frontend’s `VITE_API_BASE` to the Render URL (e.g. `https://your-service.onrender.com`).

## Environment

- Backend: copy `backend/.env.example` to `backend/.env`. Open-Meteo works without an API key.
- Optional: NASA POWER API for additional agro/solar data (see `.env.example`).

## License

MIT.
