"""In-app reminders: crops to plant this month (from planting windows)."""
from datetime import datetime
from fastapi import APIRouter
from app.services.planting_advice import PLANTING_ADVICE
from app.schemas import CropType

router = APIRouter()


@router.get("/reminders/planting")
def get_planting_reminders():
    """
    Return crops that are in their planting window this month.
    Used for Dashboard reminder: "This month consider planting: ..."
    """
    now = datetime.utcnow()
    month = now.month  # 1-12
    out = []
    for crop in CropType:
        adv = PLANTING_ADVICE.get(crop)
        if not adv:
            continue
        start = adv.get("best_start_month")
        end = adv.get("best_end_month")
        if start is None or end is None:
            continue
        if start <= end:
            if start <= month <= end:
                out.append(crop.value)
        else:
            if month >= start or month <= end:
                out.append(crop.value)
    return {"month": month, "crops_to_plant": out, "message": f"This month consider planting: {', '.join(c.replace('_', ' ').title() for c in out)}" if out else "No major planting window this month."}
