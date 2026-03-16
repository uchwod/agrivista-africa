"""Pest risk alerts based on crop, location, and weather (West Africa relevant pests)."""
import random
from app.schemas import CropType, FarmerInput, PestRiskAlert


# Common pests by crop in Nigeria/West Africa
PEST_BY_CROP = {
    CropType.MAIZE: ["Fall armyworm", "Stemborer", "Maize weevil", "Ear rot"],
    CropType.RICE: ["Rice blast", "Stemborer", "Rice bug", "Bacterial leaf blight"],
    CropType.CASSAVA: ["Cassava mealybug", "Green mite", "Whitefly", "Cassava mosaic virus"],
    CropType.YAM: ["Yam beetle", "Nematodes", "Anthracnose", "Dry rot"],
    CropType.SORGHUM: ["Stemborer", "Head bug", "Grain mold", "Striga"],
    CropType.COWPEA: ["Maruca pod borer", "Aphids", "Thrips", "Storage weevil"],
    CropType.GROUNDNUT: ["Leaf spot", "Groundnut rosette virus", "Aphids", "Termites"],
    CropType.SOYBEAN: ["Soybean rust", "Pod borer", "Aphids", "Nematodes"],
    CropType.COCOA: ["Black pod", "Capsids", "Cocoa swollen shoot virus", "Mirids"],
    CropType.OIL_PALM: ["Rhinoceros beetle", "Ganoderma", "Leaf miner", "Bunch moth"],
    CropType.MILLET: ["Stemborer", "Head miner", "Grain mold", "Striga"],
    CropType.COCOYAM: ["Leaf blight", "Aphids", "Nematodes", "Corm rot"],
    CropType.SESAME: ["Aphids", "Capsid", "Cercospora leaf spot", "Bacterial blight"],
    CropType.TOMATO: ["Tuta absoluta", "Whitefly", "Early blight", "Fruit borer"],
    CropType.PEPPER: ["Thrips", "Aphids", "Anthracnose", "Viral diseases"],
    CropType.RUBBER: ["Leaf blight", "White root disease", "Corynespora", "Mites"],
    CropType.COTTON: ["Bollworm", "Aphids", "Boll rot", "Leaf curl virus"],
    CropType.BEANS: ["Bean beetle", "Aphids", "Pod borer", "Angular leaf spot"],
    CropType.FIO_FIO: ["Pod borer", "Aphids", "Nematodes", "Cercospora leaf spot"],
    CropType.AKIDI: ["Maruca pod borer", "Aphids", "Thrips", "Storage weevil"],
}


def get_pest_risk(inp: FarmerInput, weather: dict) -> PestRiskAlert:
    """Compute pest risk level and return alerts (simplified model using humidity/rain)."""
    pests = PEST_BY_CROP.get(inp.crop_type, PEST_BY_CROP[CropType.MAIZE])
    humidity = weather.get("humidity_avg", 70)
    rainfall = weather.get("rainfall_mm", 100)
    # Higher humidity/rain often increases fungal/insect pressure in the region
    raw_score = (humidity / 100) * 0.5 + min(rainfall / 400, 1.0) * 0.5
    raw_score += random.uniform(-0.1, 0.1)
    severity = max(0, min(1, raw_score))
    if severity < 0.35:
        risk_level = "low"
        recs = ["Monitor fields weekly.", "Use certified seeds."]
    elif severity < 0.65:
        risk_level = "medium"
        recs = [
            "Scout for pests and disease signs.",
            "Consider biopesticides or recommended chemicals.",
            "Remove infected plants to reduce spread.",
        ]
    else:
        risk_level = "high"
        recs = [
            "Increase scouting frequency.",
            "Apply approved pest/disease control as per extension guidelines.",
            "Avoid excess nitrogen; ensure good drainage.",
            "Contact extension officer or Agri AI advisory.",
        ]
    return PestRiskAlert(
        risk_level=risk_level,
        pests=pests[:4],
        recommendations=recs,
        severity_score=round(severity, 2),
    )
