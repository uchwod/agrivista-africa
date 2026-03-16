"""Historical crop yields from FAOSTAT (Nigeria national) to calibrate baselines."""
from typing import Optional
import httpx
from app.config import settings
from app.schemas import CropType

# In-memory cache: crop -> (kg_per_ha, rough expiry). Avoids repeated FAO calls.
_fao_cache: dict[CropType, float] = {}


# FAOSTAT QCL: area 81 = Nigeria, element 5512 = Yield (hg/ha). 1 hg/ha = 0.1 kg/ha.
# Item codes from FAOSTAT Crops and Livestock (QCL).
FAO_ITEM_CODES = {
    CropType.MAIZE: 56,
    CropType.RICE: 27,
    CropType.CASSAVA: 125,
    CropType.YAM: 137,
    CropType.SORGHUM: 83,
    CropType.COWPEA: 191,
    CropType.GROUNDNUT: 81,
    CropType.SOYBEAN: 236,
    CropType.COCOA: 661,
    CropType.OIL_PALM: 254,
    CropType.MILLET: 79,
    CropType.SESAME: 289,
    CropType.TOMATO: 388,
    CropType.COTTON: 767,
    CropType.BEANS: 176,
    # Cocoyam, pepper, rubber, fio_fio, akidi may not have exact QCL items; we use fallback baseline
}

NIGERIA_AREA_CODE = 81
YIELD_ELEMENT_CODE = 5512
# Latest N years to average for national baseline
FAO_YEARS_AVG = 5


async def get_nigeria_yield_kg_per_ha(crop: CropType) -> Optional[float]:
    """
    Fetch Nigeria national average yield (kg/ha) for the crop from FAOSTAT.
    Returns None if crop not in QCL or API fails; caller uses static baseline.
    Cached in memory to avoid repeated external calls.
    """
    if crop in _fao_cache:
        return _fao_cache[crop]
    item_code = FAO_ITEM_CODES.get(crop)
    if item_code is None:
        return None
    url = f"{settings.faostat_api_base}/QCL"
    params = {
        "area": NIGERIA_AREA_CODE,
        "item": item_code,
        "element": YIELD_ELEMENT_CODE,
        "format": "json",
        "show_codes": "true",
        "show_unit": "true",
    }
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
    except Exception:
        return None
    records = data.get("data") if isinstance(data, dict) else None
    if not records or not isinstance(records, list):
        return None
    values = []
    for r in records:
        if not isinstance(r, dict):
            continue
        try:
            y = r.get("Year") or r.get("year")
            yr = int(y) if y is not None else 0
            v = r.get("Value") or r.get("value")
            val = float(v) if v is not None and v != "" else 0.0
        except (TypeError, ValueError):
            continue
        if 2015 <= yr <= 2024 and val > 0:
            values.append(val)
    if not values:
        return None
    recent = values[-FAO_YEARS_AVG:] if len(values) >= FAO_YEARS_AVG else values
    avg = sum(recent) / len(recent)
    # QCL yield typically in hg/ha (1 hg = 0.1 kg). Nigerian maize ~1500–2500 kg/ha -> 15000–25000 hg/ha
    if avg > 10000:
        result = round(avg * 0.1, 1)
    elif avg > 1000:
        result = round(avg * 0.1, 1)
    else:
        result = round(avg, 1)
    _fao_cache[crop] = result
    return result
