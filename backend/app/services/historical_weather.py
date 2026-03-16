"""Historical weather from Open-Meteo Archive (ERA5 reanalysis) for location-accurate yield."""
from datetime import date, timedelta
import httpx
from app.config import settings


async def get_historical_weather(
    lat: float,
    lon: float,
    *,
    start_date: date | None = None,
    end_date: date | None = None,
    years_back: int = 5,
) -> dict | None:
    """
    Fetch historical daily weather for a location. Used to compute typical temp/rain
    so yield predictions reflect long-term climate, not just current forecast.
    Returns None on failure (caller uses forecast-only path).
    """
    if end_date is None:
        end_date = date.today() - timedelta(days=60)  # avoid very recent (incomplete)
    if start_date is None:
        start_date = end_date - timedelta(days=365 * years_back)
    if start_date >= end_date:
        return None
    url = f"{settings.open_meteo_archive_base}/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum",
        "timezone": "Africa/Lagos",
    }
    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
    except Exception:
        return None
    daily = data.get("daily", {})
    times = daily.get("time", [])
    if not times:
        return None
    tmax = daily.get("temperature_2m_max", [])
    tmin = daily.get("temperature_2m_min", [])
    precip = daily.get("precipitation_sum", [])
    n = len(times)
    if n != len(tmax) or n != len(tmin) or n != len(precip):
        return None
    temps = [(float(tmax[i]) + float(tmin[i])) / 2 for i in range(n)]
    temp_avg = sum(temps) / n
    rain_total = sum(float(p or 0) for p in precip)
    return {
        "temp_avg_c": round(temp_avg, 1),
        "rainfall_mm": round(rain_total, 1),
        "days": n,
        "start_date": times[0],
        "end_date": times[-1],
    }
