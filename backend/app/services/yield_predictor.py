"""Yield prediction using crop baselines, soil, agro-ecological zone, and live + historical weather (Nigeria/West Africa)."""
from typing import Optional
from app.schemas import CropType, SoilType, FarmerInput


# Fallback baseline yields (kg/ha) when FAO data unavailable
CROP_BASELINE_YIELDS = {
    CropType.MAIZE: 1800,
    CropType.RICE: 2200,
    CropType.CASSAVA: 12000,
    CropType.YAM: 10000,
    CropType.SORGHUM: 1200,
    CropType.COWPEA: 600,
    CropType.GROUNDNUT: 1200,
    CropType.SOYBEAN: 1100,
    CropType.COCOA: 450,
    CropType.OIL_PALM: 4000,
    CropType.MILLET: 1000,
    CropType.COCOYAM: 6000,
    CropType.SESAME: 450,
    CropType.TOMATO: 15000,
    CropType.PEPPER: 8000,
    CropType.RUBBER: 1200,
    CropType.COTTON: 600,
    CropType.BEANS: 700,
    CropType.FIO_FIO: 550,
    CropType.AKIDI: 600,
}

# Soil multipliers by crop (relative to best soil = 1.0). Based on West Africa / Nigeria agronomy.
# Order per soil: loamy, sandy_loam, clay_loam, silty, sandy, clay
SOIL_BY_CROP: dict[CropType, dict[SoilType, float]] = {
    # Roots/tubers: need good drainage; heavy clay and very sandy reduce yield
    CropType.YAM: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.90,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.78,
        SoilType.CLAY: 0.80,
    },
    CropType.CASSAVA: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.88,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.76,
        SoilType.CLAY: 0.78,
    },
    CropType.COCOYAM: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.97,
        SoilType.CLAY_LOAM: 0.90,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.77,
        SoilType.CLAY: 0.80,
    },
    # Cereals: maize best on loam; rice tolerates heavier soils; sorghum/millet more drought/sandy tolerant
    CropType.MAIZE: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.96,
        SoilType.CLAY_LOAM: 0.97,
        SoilType.SILTY: 1.02,
        SoilType.SANDY: 0.82,
        SoilType.CLAY: 0.86,
    },
    CropType.RICE: {
        SoilType.LOAMY: 0.98,
        SoilType.SANDY_LOAM: 0.92,
        SoilType.CLAY_LOAM: 1.0,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.72,
        SoilType.CLAY: 1.02,
    },
    CropType.SORGHUM: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.94,
        SoilType.SILTY: 1.0,
        SoilType.SANDY: 0.88,
        SoilType.CLAY: 0.84,
    },
    CropType.MILLET: {
        SoilType.LOAMY: 0.98,
        SoilType.SANDY_LOAM: 1.0,
        SoilType.CLAY_LOAM: 0.90,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.92,
        SoilType.CLAY: 0.82,
    },
    # Legumes: cowpea/soybean/beans prefer well-drained sandy loam–clay loam; groundnut needs loose soil
    CropType.COWPEA: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 1.0,
        SoilType.CLAY_LOAM: 0.97,
        SoilType.SILTY: 0.98,
        SoilType.SANDY: 0.88,
        SoilType.CLAY: 0.85,
    },
    CropType.GROUNDNUT: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 1.02,
        SoilType.CLAY_LOAM: 0.94,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.90,
        SoilType.CLAY: 0.80,
    },
    CropType.SOYBEAN: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 1.0,
        SoilType.SILTY: 0.99,
        SoilType.SANDY: 0.85,
        SoilType.CLAY: 0.88,
    },
    CropType.BEANS: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 1.0,
        SoilType.CLAY_LOAM: 0.96,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.86,
        SoilType.CLAY: 0.84,
    },
    CropType.FIO_FIO: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.99,
        SoilType.CLAY_LOAM: 0.95,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.87,
        SoilType.CLAY: 0.84,
    },
    CropType.AKIDI: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.99,
        SoilType.CLAY_LOAM: 0.95,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.86,
        SoilType.CLAY: 0.84,
    },
    # Tree/plantation: cocoa, oil palm, rubber prefer well-drained sandy loam to sandy clay loam
    CropType.COCOA: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 1.0,
        SoilType.CLAY_LOAM: 0.90,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.82,
        SoilType.CLAY: 0.78,
    },
    CropType.OIL_PALM: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.92,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.80,
        SoilType.CLAY: 0.82,
    },
    CropType.RUBBER: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.99,
        SoilType.CLAY_LOAM: 0.91,
        SoilType.SILTY: 0.96,
        SoilType.SANDY: 0.81,
        SoilType.CLAY: 0.80,
    },
    # Vegetables: tomato/pepper prefer loam to sandy loam; tomato sensitive to heavy clay
    CropType.TOMATO: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.92,
        SoilType.SILTY: 0.98,
        SoilType.SANDY: 0.86,
        SoilType.CLAY: 0.84,
    },
    CropType.PEPPER: {
        SoilType.LOAMY: 0.98,
        SoilType.SANDY_LOAM: 1.0,
        SoilType.CLAY_LOAM: 0.94,
        SoilType.SILTY: 0.97,
        SoilType.SANDY: 0.88,
        SoilType.CLAY: 0.86,
    },
    # Sesame: research in Nigeria showed sandy soil gave highest yield
    CropType.SESAME: {
        SoilType.LOAMY: 0.94,
        SoilType.SANDY_LOAM: 0.98,
        SoilType.CLAY_LOAM: 0.88,
        SoilType.SILTY: 0.92,
        SoilType.SANDY: 1.0,
        SoilType.CLAY: 0.80,
    },
    # Cotton: well-drained loam; heavy clay not ideal
    CropType.COTTON: {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.97,
        SoilType.CLAY_LOAM: 0.92,
        SoilType.SILTY: 0.99,
        SoilType.SANDY: 0.86,
        SoilType.CLAY: 0.82,
    },
}


def _soil_factor(soil_type: SoilType, crop: CropType) -> float:
    """Return agronomically appropriate soil multiplier for this crop."""
    return SOIL_BY_CROP.get(crop, _default_soil_multipliers()).get(soil_type, 1.0)


def _default_soil_multipliers() -> dict[SoilType, float]:
    """Fallback when a new crop is added before we add it to SOIL_BY_CROP."""
    return {
        SoilType.LOAMY: 1.0,
        SoilType.SANDY_LOAM: 0.95,
        SoilType.CLAY_LOAM: 0.98,
        SoilType.SILTY: 1.02,
        SoilType.SANDY: 0.85,
        SoilType.CLAY: 0.88,
    }

# Agro-ecological zone factor by latitude (Nigeria: North ~10–14°N, Middle Belt ~7–10°N, South ~4–7°N)
# Each crop has a best zone; others get a lower multiplier so yield varies by state.
ZONE_NORTH_BEST: tuple[CropType, ...] = (
    CropType.MAIZE, CropType.SORGHUM, CropType.MILLET, CropType.COTTON,
    CropType.GROUNDNUT, CropType.BEANS, CropType.SESAME, CropType.COWPEA,
)
ZONE_MIDDLE_BEST: tuple[CropType, ...] = (
    CropType.MAIZE, CropType.SORGHUM, CropType.RICE, CropType.SOYBEAN,
    CropType.YAM, CropType.CASSAVA, CropType.GROUNDNUT, CropType.TOMATO, CropType.PEPPER,
)
ZONE_SOUTH_BEST: tuple[CropType, ...] = (
    CropType.CASSAVA, CropType.YAM, CropType.COCOA, CropType.OIL_PALM, CropType.RICE,
    CropType.COCOYAM, CropType.RUBBER, CropType.FIO_FIO, CropType.AKIDI,
)


def _zone_factor(lat: float, crop: CropType) -> float:
    """Return multiplier by latitude zone so different states get different yields."""
    if lat >= 10:  # Northern Guinea / Sudan Savanna
        return 1.12 if crop in ZONE_NORTH_BEST else 0.90
    if lat >= 7:   # Middle Belt / Southern Guinea Savanna
        return 1.05 if crop in ZONE_MIDDLE_BEST else 0.98
    # South (humid forest / derived savanna)
    return 1.08 if crop in ZONE_SOUTH_BEST else 0.92


# Optimal temperature (°C) and reference rainfall (mm) by crop for weather factor
_OPT_TEMP: dict[CropType, float] = {
    CropType.MAIZE: 27.0,
    CropType.RICE: 28.0,
    CropType.SORGHUM: 28.0,
    CropType.MILLET: 29.0,
    CropType.CASSAVA: 28.0,
    CropType.YAM: 28.0,
    CropType.COCOYAM: 28.0,
    CropType.COWPEA: 28.0,
    CropType.GROUNDNUT: 28.0,
    CropType.SOYBEAN: 27.0,
    CropType.BEANS: 27.0,
    CropType.FIO_FIO: 28.0,
    CropType.AKIDI: 28.0,
    CropType.COCOA: 27.0,
    CropType.OIL_PALM: 28.0,
    CropType.RUBBER: 28.0,
    CropType.SESAME: 28.0,
    CropType.TOMATO: 26.0,
    CropType.PEPPER: 27.0,
    CropType.COTTON: 28.0,
}
_REF_RAIN: dict[CropType, float] = {
    CropType.MILLET: 320.0,
    CropType.SORGHUM: 350.0,
    CropType.COTTON: 380.0,
    CropType.SESAME: 400.0,
    CropType.GROUNDNUT: 420.0,
    CropType.MAIZE: 450.0,
    CropType.COCOA: 480.0,
    CropType.OIL_PALM: 520.0,
    CropType.RUBBER: 500.0,
    CropType.RICE: 550.0,
    CropType.CASSAVA: 480.0,
    CropType.YAM: 460.0,
    CropType.COCOYAM: 480.0,
    CropType.COWPEA: 400.0,
    CropType.SOYBEAN: 450.0,
    CropType.BEANS: 420.0,
    CropType.FIO_FIO: 420.0,
    CropType.AKIDI: 420.0,
    CropType.TOMATO: 420.0,
    CropType.PEPPER: 400.0,
}


def _weather_factor(temp_c: float, rainfall_mm: float, crop: CropType) -> float:
    """Factor from current weather; optimal temp and ref rain are crop-specific."""
    opt_temp = _OPT_TEMP.get(crop, 28.0)
    temp_factor = 1.0 - 0.015 * abs(temp_c - opt_temp)
    temp_factor = max(0.82, min(1.12, temp_factor))
    ref_rain = _REF_RAIN.get(crop, 450.0)
    if rainfall_mm <= 0:
        rain_factor = 0.85
    else:
        rain_ratio = rainfall_mm / ref_rain
        rain_factor = min(1.15, max(0.78, 0.72 + 0.43 * min(rain_ratio, 1.8)))
    combined = temp_factor * rain_factor
    return max(0.82, combined)


def predict_yield(
    inp: FarmerInput,
    weather: dict,
    *,
    historical_weather: Optional[dict] = None,
    fao_baseline_kg_per_ha: Optional[float] = None,
) -> dict:
    """
    Predict crop yield (kg/ha) using:
    - FAO national baseline when available, else static baseline
    - Soil and agro-ecological zone
    - Live forecast weather, blended with historical (location-typical) when available
    """
    base = (
        fao_baseline_kg_per_ha
        if fao_baseline_kg_per_ha is not None and fao_baseline_kg_per_ha > 0
        else CROP_BASELINE_YIELDS[inp.crop_type]
    )
    soil_mult = _soil_factor(inp.soil_type, inp.crop_type)
    zone = _zone_factor(inp.latitude, inp.crop_type)
    temp = weather.get("temp_avg_c", 28.0)
    rain = weather.get("rainfall_mm", 100.0)
    weather_f = _weather_factor(temp, rain, inp.crop_type)
    if historical_weather and historical_weather.get("days", 0) >= 30:
        th = historical_weather.get("temp_avg_c", temp)
        rh = historical_weather.get("rainfall_mm", rain)
        if rh > 0:
            weather_f_hist = _weather_factor(th, rh, inp.crop_type)
            weather_f = 0.55 * weather_f + 0.45 * weather_f_hist
    pred = base * soil_mult * zone * weather_f
    # 0.50–1.50 so worst-case (poor soil + zone + weather) still shows variation, not one flat number
    pred = max(base * 0.50, min(pred, base * 1.50))
    confidence_range = pred * 0.16
    factors = [
        "crop_type", "soil_type", "location_zone", "farm_size",
        "temperature", "rainfall", "humidity",
    ]
    if fao_baseline_kg_per_ha is not None:
        factors.append("fao_national_yield")
    if historical_weather:
        factors.append("historical_weather")
    return {
        "predicted_yield_kg_per_hectare": round(pred, 1),
        "confidence_low": round(max(0, pred - confidence_range), 1),
        "confidence_high": round(pred + confidence_range, 1),
        "season": "main_season",
        "factors_used": factors,
    }


def predict_yield_by_soil(
    inp: FarmerInput,
    weather: dict,
    *,
    historical_weather: Optional[dict] = None,
    fao_baseline_kg_per_ha: Optional[float] = None,
) -> dict[str, float]:
    """
    Return predicted yield (kg/ha) for each soil type for the same crop, location, and weather.
    Used to show how soil type impacts yield on the Dashboard.
    """
    base = (
        fao_baseline_kg_per_ha
        if fao_baseline_kg_per_ha is not None and fao_baseline_kg_per_ha > 0
        else CROP_BASELINE_YIELDS[inp.crop_type]
    )
    zone = _zone_factor(inp.latitude, inp.crop_type)
    temp = weather.get("temp_avg_c", 28.0)
    rain = weather.get("rainfall_mm", 100.0)
    weather_f = _weather_factor(temp, rain, inp.crop_type)
    if historical_weather and historical_weather.get("days", 0) >= 30:
        th = historical_weather.get("temp_avg_c", temp)
        rh = historical_weather.get("rainfall_mm", rain)
        if rh > 0:
            weather_f_hist = _weather_factor(th, rh, inp.crop_type)
            weather_f = 0.55 * weather_f + 0.45 * weather_f_hist
    out: dict[str, float] = {}
    for st in SoilType:
        soil_mult = _soil_factor(st, inp.crop_type)
        pred = base * soil_mult * zone * weather_f
        pred = max(base * 0.50, min(pred, base * 1.50))
        out[st.value] = round(pred, 1)
    return out
