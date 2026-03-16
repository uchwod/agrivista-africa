"""Weather integration using Open-Meteo API (free, no key required)."""
import httpx
from app.config import settings


def _fallback_weather() -> dict:
    """Return default weather when API is unavailable (e.g. 429 rate limit)."""
    return {
        "temp_avg_c": 28.0,
        "rainfall_mm": 0.0,
        "humidity_avg": 70.0,
        "forecast_7d": [],
    }


async def get_weather_forecast(lat: float, lon: float, days: int = 14) -> dict:
    """Fetch daily weather forecast for a location (Nigeria/West Africa friendly)."""
    url = f"{settings.open_meteo_base}/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_mean",
        "timezone": "Africa/Lagos",
        "forecast_days": min(days, 16),
    }
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 429:
            return _fallback_weather()
        raise
    except Exception:
        return _fallback_weather()
    daily = data.get("daily", {})
    n = len(daily.get("time", []))
    if n == 0:
        return {"temp_avg_c": 28.0, "rainfall_mm": 0.0, "humidity_avg": 70.0, "forecast_7d": []}
    temp_max = daily.get("temperature_2m_max", [28] * n)
    temp_min = daily.get("temperature_2m_min", [22] * n)
    precip = daily.get("precipitation_sum", [0.0] * n)
    humidity = daily.get("relative_humidity_2m_mean", [70.0] * n)
    temps = [(a + b) / 2 for a, b in zip(temp_max, temp_min)]
    forecast_7d = []
    for i in range(min(7, n)):
        forecast_7d.append({
            "date": daily["time"][i],
            "temp_avg_c": round(temps[i], 1),
            "rainfall_mm": round(precip[i] or 0, 1),
            "humidity": round(humidity[i] or 70, 1),
        })
    return {
        "temp_avg_c": round(sum(temps) / n, 1),
        "rainfall_mm": round(sum(p or 0 for p in precip), 1),
        "humidity_avg": round(sum(h or 70 for h in humidity) / n, 1),
        "forecast_7d": forecast_7d,
    }
