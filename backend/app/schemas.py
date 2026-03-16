from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class CropType(str, Enum):
    MAIZE = "maize"
    RICE = "rice"
    CASSAVA = "cassava"
    YAM = "yam"
    SORGHUM = "sorghum"
    COWPEA = "cowpea"
    GROUNDNUT = "groundnut"
    SOYBEAN = "soybean"
    COCOA = "cocoa"
    OIL_PALM = "oil_palm"
    MILLET = "millet"
    COCOYAM = "cocoyam"
    SESAME = "sesame"
    TOMATO = "tomato"
    PEPPER = "pepper"
    RUBBER = "rubber"
    COTTON = "cotton"
    BEANS = "beans"
    FIO_FIO = "fio_fio"
    AKIDI = "akidi"


class SoilType(str, Enum):
    SANDY = "sandy"
    LOAMY = "loamy"
    CLAY = "clay"
    SANDY_LOAM = "sandy_loam"
    CLAY_LOAM = "clay_loam"
    SILTY = "silty"


class FarmerInput(BaseModel):
    crop_type: CropType
    soil_type: SoilType
    latitude: float = Field(..., ge=-90, le=90, description="e.g. 9.0820 for Nigeria")
    longitude: float = Field(..., ge=-180, le=180, description="e.g. 8.6753 for Nigeria")
    farm_size_hectares: float = Field(..., gt=0, le=10000)
    planting_date: Optional[str] = None  # YYYY-MM-DD
    region: Optional[str] = None  # e.g. "North Central", "South West"


class YieldPredictionResponse(BaseModel):
    predicted_yield_kg_per_hectare: float
    confidence_low: float
    confidence_high: float
    season: str
    factors_used: list[str]


class FertilizerRecommendation(BaseModel):
    npk_ratio: str  # e.g. "20-10-10"
    kg_per_hectare: float
    application_timing: list[str]
    organic_options: list[str]
    caution: Optional[str] = None


class PestRiskAlert(BaseModel):
    risk_level: str  # low, medium, high
    pests: list[str]
    recommendations: list[str]
    severity_score: float


class WeatherSummary(BaseModel):
    temp_avg_c: float
    rainfall_mm: float
    humidity_avg: float
    forecast_7d: list[dict]


class MarketplaceListing(BaseModel):
    id: str
    crop_type: str
    quantity_kg: float
    price_per_kg: float
    region: str
    farmer_id: str
    status: str = "available"
