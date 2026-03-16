from fastapi import APIRouter, HTTPException

router = APIRouter()

# Lazy import to use async
from app.services.weather import get_weather_forecast


@router.get("/weather/forecast")
async def api_weather_forecast(lat: float, lon: float, days: int = 14):
    """Get weather forecast for a location (Nigeria timezone)."""
    try:
        return await get_weather_forecast(lat, lon, days)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Weather service error: {e}")
