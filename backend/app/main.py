from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import predictions, weather, marketplace, subscription, notes, reminders, storage
from app.schemas import CropType
from app.services.storage_tips import get_storage_tips

app = FastAPI(
    title="AgriVista Africa",
    description="AI platform for yield prediction, fertilizer & pest advice, and marketplace — Nigeria & West Africa",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictions.router, prefix="/api", tags=["Predictions"])
app.include_router(weather.router, prefix="/api", tags=["Weather"])
app.include_router(marketplace.router, prefix="/api", tags=["Marketplace"])
app.include_router(subscription.router, prefix="/api", tags=["Subscription"])
app.include_router(notes.router, prefix="/api", tags=["Notes"])
app.include_router(reminders.router, prefix="/api", tags=["Reminders"])
app.include_router(storage.router, prefix="/api")


@app.get("/api/storage-tips/{crop_type}")
def api_storage_tips(crop_type: str):
    """Post-harvest storage tips for a crop. Always registered on app."""
    crop_clean = crop_type.strip().lower().replace("-", "_")
    try:
        ct = CropType(crop_clean)
    except ValueError:
        return {"crop_type": crop_type, "tips": [], "error": "Crop not found"}
    return {"crop_type": ct.value, "tips": get_storage_tips(ct)}


@app.get("/")
def root():
    return {
        "name": "AgriVista Africa",
        "region": "Nigeria & West Africa",
        "docs": "/docs",
        "health": "ok",
    }


@app.get("/health")
def health():
    return {"status": "ok"}
