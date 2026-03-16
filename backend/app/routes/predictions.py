import asyncio
from datetime import date, timedelta
from fastapi import APIRouter, HTTPException
from app.schemas import FarmerInput, YieldPredictionResponse, FertilizerRecommendation, PestRiskAlert, CropType
from app.services.weather import get_weather_forecast
from app.services.historical_weather import get_historical_weather
from app.services.fao_yields import get_nigeria_yield_kg_per_ha
from app.services.yield_predictor import predict_yield, predict_yield_by_soil
from app.services.fertilizer import get_fertilizer_recommendation
from app.services.pest_risk import get_pest_risk
from app.services.planting_advice import get_planting_advice, get_all_planting_advice
from app.services.storage_tips import get_storage_tips

router = APIRouter()


async def _gather_historical_and_fao(lat: float, lon: float, crop_type: CropType):
    """Fetch historical weather and FAO national yield in parallel."""
    end = date.today() - timedelta(days=90)
    start = end - timedelta(days=365 * 5)
    hist, fao = await asyncio.gather(
        get_historical_weather(lat, lon, start_date=start, end_date=end),
        get_nigeria_yield_kg_per_ha(crop_type),
    )
    return hist, fao


@router.post("/predict/yield", response_model=YieldPredictionResponse)
async def api_predict_yield(inputs: FarmerInput):
    """Predict crop yield (kg/ha) using farmer inputs, live + historical weather, and FAO baselines."""
    try:
        weather, (historical_weather, fao_baseline) = await asyncio.gather(
            get_weather_forecast(inputs.latitude, inputs.longitude),
            _gather_historical_and_fao(inputs.latitude, inputs.longitude, inputs.crop_type),
        )
        result = predict_yield(
            inputs,
            weather,
            historical_weather=historical_weather,
            fao_baseline_kg_per_ha=fao_baseline,
        )
        return YieldPredictionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/recommend/fertilizer", response_model=FertilizerRecommendation)
def api_fertilizer(inputs: FarmerInput):
    """Get fertilizer recommendation for crop and soil."""
    return get_fertilizer_recommendation(inputs)


@router.post("/alerts/pest-risk", response_model=PestRiskAlert)
async def api_pest_risk(inputs: FarmerInput):
    """Get pest/disease risk and recommendations."""
    weather = await get_weather_forecast(inputs.latitude, inputs.longitude)
    return get_pest_risk(inputs, weather)


@router.post("/insights/full")
async def api_full_insights(inputs: FarmerInput):
    """One-shot: yield (with historical + FAO), weather, fertilizer, pest risk, and planting advice."""
    weather, (historical_weather, fao_baseline) = await asyncio.gather(
        get_weather_forecast(inputs.latitude, inputs.longitude),
        _gather_historical_and_fao(inputs.latitude, inputs.longitude, inputs.crop_type),
    )
    yield_result = predict_yield(
        inputs,
        weather,
        historical_weather=historical_weather,
        fao_baseline_kg_per_ha=fao_baseline,
    )
    yield_by_soil = predict_yield_by_soil(
        inputs,
        weather,
        historical_weather=historical_weather,
        fao_baseline_kg_per_ha=fao_baseline,
    )
    fertilizer = get_fertilizer_recommendation(inputs)
    pest = get_pest_risk(inputs, weather)
    planting = get_planting_advice(inputs.crop_type)
    return {
        "yield_prediction": yield_result,
        "yield_by_soil": yield_by_soil,
        "weather": weather,
        "fertilizer": fertilizer.model_dump(),
        "pest_risk": pest.model_dump(),
        "planting_advice": planting,
    }


@router.get("/crops/planting-advice")
def api_all_planting_advice():
    """Get best planting windows and weather-based advice for all crops (Nigeria)."""
    return {"planting_advice": get_all_planting_advice()}


@router.get("/crops/planting-advice/{crop_type}")
def api_planting_advice_by_crop(crop_type: CropType):
    """Get planting advice for a single crop."""
    return get_planting_advice(crop_type)


@router.get("/crops/storage-tips/{crop_type}")
@router.get("/storage-tips/{crop_type}")
def api_storage_tips(crop_type: str):
    """Get post-harvest storage tips for a crop. Accepts crop name e.g. maize, oil_palm."""
    crop_clean = crop_type.strip().lower().replace("-", "_")
    try:
        ct = CropType(crop_clean)
    except ValueError:
        return {"crop_type": crop_type, "tips": [], "error": "Crop not found"}
    return {"crop_type": ct.value, "tips": get_storage_tips(ct)}
