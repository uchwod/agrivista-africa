from fastapi import APIRouter
from pydantic import BaseModel
from enum import Enum

router = APIRouter()


class PlanType(str, Enum):
    FREE = "free"
    FARM = "farm"       # Subscription for farms
    GOVERNMENT = "government"  # Government agricultural programs


class SubscriptionInfo(BaseModel):
    plan: PlanType
    features: list[str]
    price_ngn_per_month: int | None
    description: str


@router.get("/subscription/plans")
def get_plans():
    """List subscription plans (revenue: farms + government programs)."""
    return {
        "plans": [
            SubscriptionInfo(
                plan=PlanType.FREE,
                features=["3 yield predictions/month", "Basic fertilizer tips", "Weather 7-day"],
                price_ngn_per_month=None,
                description="For smallholder trial",
            ),
            SubscriptionInfo(
                plan=PlanType.FARM,
                features=[
                    "Unlimited yield predictions",
                    "Fertilizer & pest alerts",
                    "Satellite/weather integration",
                    "Marketplace listing",
                    "Export reports",
                ],
                price_ngn_per_month=5000,
                description="For registered farms and cooperatives",
            ),
            SubscriptionInfo(
                plan=PlanType.GOVERNMENT,
                features=[
                    "Everything in Farm",
                    "Bulk dashboards & analytics",
                    "API access for state programs",
                    "Extension officer tools",
                ],
                price_ngn_per_month=None,
                description="Custom pricing for government agricultural programs",
            ),
        ],
    }
