"""Storage tips API — separate router so route is always registered."""
from fastapi import APIRouter
from app.schemas import CropType
from app.services.storage_tips import get_storage_tips

router = APIRouter(tags=["Storage"])


@router.get("/storage-tips/{crop_type}")
def get_storage_tips_api(crop_type: str):
    """Post-harvest storage tips for a crop. Path: /api/storage-tips/maize"""
    crop_clean = crop_type.strip().lower().replace("-", "_")
    try:
        ct = CropType(crop_clean)
    except ValueError:
        return {"crop_type": crop_type, "tips": [], "error": "Crop not found"}
    return {"crop_type": ct.value, "tips": get_storage_tips(ct)}
