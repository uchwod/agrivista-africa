from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid

router = APIRouter()

# In-memory store for demo; use DB in production
_listings: list[dict] = []


class CreateListing(BaseModel):
    crop_type: str
    quantity_kg: float
    price_per_kg: float
    region: str
    farmer_id: str
    state: Optional[str] = None  # Nigerian state e.g. Lagos, Kano


class ListingResponse(BaseModel):
    id: str
    crop_type: str
    quantity_kg: float
    price_per_kg: float
    region: str
    farmer_id: str
    status: str
    state: Optional[str] = None


@router.post("/marketplace/listings", response_model=ListingResponse)
def create_listing(body: CreateListing):
    """List produce for sale (marketplace)."""
    listing = {
        "id": str(uuid.uuid4()),
        "crop_type": body.crop_type,
        "quantity_kg": body.quantity_kg,
        "price_per_kg": body.price_per_kg,
        "region": body.region,
        "farmer_id": body.farmer_id,
        "status": "available",
        "state": body.state,
    }
    _listings.append(listing)
    return listing


@router.get("/marketplace/listings")
def list_listings(
    region: Optional[str] = None,
    crop_type: Optional[str] = None,
    state: Optional[str] = None,
):
    """Browse marketplace listings; filter by region, crop, or state."""
    out = list(_listings)
    if region:
        out = [l for l in out if l.get("region") and l["region"].lower() == region.lower()]
    if crop_type:
        out = [l for l in out if l["crop_type"].lower() == crop_type.lower()]
    if state:
        out = [l for l in out if l.get("state") and l["state"].lower() == state.lower()]
    return {"listings": out, "total": len(out)}


@router.get("/marketplace/listings/{listing_id}")
def get_listing(listing_id: str):
    """Get a single listing by ID."""
    for l in _listings:
        if l["id"] == listing_id:
            return l
    raise HTTPException(status_code=404, detail="Listing not found")
