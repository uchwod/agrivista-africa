"""Fertilizer recommendations by crop and soil for West Africa."""
from app.schemas import CropType, SoilType, FarmerInput, FertilizerRecommendation


# N-P-K (kg/ha) and timing by crop - aligned with Nigerian/West African extension guidelines
FERTILIZER_DB = {
    CropType.MAIZE: {
        "npk": "NPK 20-10-10 or 15-15-15",
        "kg_per_ha": 300,
        "timing": ["At planting (basal)", "4–6 weeks after planting (top dress)"],
        "organic": ["Poultry manure 2–3 t/ha", "Compost 5 t/ha"],
    },
    CropType.RICE: {
        "npk": "NPK 15-15-15 or urea",
        "kg_per_ha": 200,
        "timing": ["At transplanting", "Tillering", "Panicle initiation"],
        "organic": ["Green manure (e.g. Sesbania)", "Rice straw compost"],
    },
    CropType.CASSAVA: {
        "npk": "NPK 12-12-17 or 15-15-15",
        "kg_per_ha": 400,
        "timing": ["At planting", "6–8 weeks after planting"],
        "organic": ["Poultry manure", "Compost"],
    },
    CropType.YAM: {
        "npk": "NPK 15-15-15 or 20-10-10",
        "kg_per_ha": 400,
        "timing": ["At planting (in mound)", "8–10 weeks after planting"],
        "organic": ["Wood ash", "Poultry manure"],
    },
    CropType.SORGHUM: {
        "npk": "NPK 20-10-10 or urea",
        "kg_per_ha": 150,
        "timing": ["At planting", "4–5 weeks after planting"],
        "organic": ["Farmyard manure", "Compost"],
    },
    CropType.COWPEA: {
        "npk": "Minimal N; P and K (e.g. 0-20-20)",
        "kg_per_ha": 50,
        "timing": ["At planting only (legume fixes N)"],
        "organic": ["No nitrogen fertilizer; use rhizobium inoculant"],
    },
    CropType.GROUNDNUT: {
        "npk": "NPK 0-20-20 or 15-15-15 (low N)",
        "kg_per_ha": 100,
        "timing": ["At planting", "Flowering"],
        "organic": ["Compost", "Rock phosphate"],
    },
    CropType.SOYBEAN: {
        "npk": "P and K (e.g. 0-20-20); minimal N",
        "kg_per_ha": 80,
        "timing": ["At planting"],
        "organic": ["Rhizobium inoculant", "Compost"],
    },
    CropType.COCOA: {
        "npk": "NPK 12-12-17 or 15-10-15",
        "kg_per_ha": 300,
        "timing": ["Start of rains", "Mid-season"],
        "organic": ["Cocoa pod husk", "Poultry manure"],
    },
    CropType.OIL_PALM: {
        "npk": "NPK 12-12-17 or palm-specific",
        "kg_per_ha": 500,
        "timing": ["Twice yearly (early and late rains)"],
        "organic": ["Empty fruit bunch", "Palm oil mill effluent"],
    },
    CropType.MILLET: {
        "npk": "NPK 20-10-10 or urea",
        "kg_per_ha": 100,
        "timing": ["At planting", "4–5 weeks after planting"],
        "organic": ["Farmyard manure", "Compost"],
    },
    CropType.COCOYAM: {
        "npk": "NPK 15-15-15 or 20-10-10",
        "kg_per_ha": 350,
        "timing": ["At planting", "6–8 weeks after planting"],
        "organic": ["Poultry manure", "Compost"],
    },
    CropType.SESAME: {
        "npk": "NPK 15-15-15 or low N (e.g. 10-20-20)",
        "kg_per_ha": 80,
        "timing": ["At planting", "4–5 weeks (if needed)"],
        "organic": ["Compost", "Farmyard manure"],
    },
    CropType.TOMATO: {
        "npk": "NPK 15-15-15 or 20-10-10",
        "kg_per_ha": 400,
        "timing": ["At transplanting", "Flowering", "First fruit set"],
        "organic": ["Poultry manure", "Compost", "Vermicompost"],
    },
    CropType.PEPPER: {
        "npk": "NPK 15-15-15 or 12-12-17",
        "kg_per_ha": 250,
        "timing": ["At transplanting", "Flowering", "Fruit development"],
        "organic": ["Poultry manure", "Compost"],
    },
    CropType.RUBBER: {
        "npk": "NPK 12-12-17 or rubber-specific (high K)",
        "kg_per_ha": 400,
        "timing": ["Start of rains", "Mid-season (mature trees)"],
        "organic": ["Legume cover crops", "Mulch", "Empty pod husk"],
    },
    CropType.COTTON: {
        "npk": "NPK 20-10-10 or 15-15-15",
        "kg_per_ha": 200,
        "timing": ["At planting", "Square formation", "Early flowering"],
        "organic": ["Compost", "Poultry manure"],
    },
    CropType.BEANS: {
        "npk": "Minimal N; P and K (e.g. 0-20-20 or 15-15-15)",
        "kg_per_ha": 60,
        "timing": ["At planting", "Flowering if needed"],
        "organic": ["Rhizobium inoculant", "Compost", "Poultry manure"],
    },
    CropType.FIO_FIO: {
        "npk": "P and K (e.g. 0-20-20); minimal N (legume)",
        "kg_per_ha": 50,
        "timing": ["At planting"],
        "organic": ["Compost", "Farmyard manure", "Rhizobium for pigeon pea"],
    },
    CropType.AKIDI: {
        "npk": "Minimal N; P and K (e.g. 0-20-20)",
        "kg_per_ha": 50,
        "timing": ["At planting only (legume fixes N)"],
        "organic": ["Rhizobium inoculant", "Compost"],
    },
}


def get_fertilizer_recommendation(inp: FarmerInput) -> FertilizerRecommendation:
    """Return fertilizer recommendation for crop and soil."""
    rec = FERTILIZER_DB.get(inp.crop_type)
    if not rec:
        rec = FERTILIZER_DB[CropType.MAIZE]
    # Adjust for soil type
    if inp.soil_type == SoilType.SANDY:
        kg = rec["kg_per_ha"] * 1.1  # slightly more split applications
        caution = "Sandy soil: split applications and add organic matter."
    elif inp.soil_type == SoilType.CLAY:
        kg = rec["kg_per_ha"] * 0.9
        caution = "Clay soil: ensure good drainage; avoid waterlogging."
    else:
        kg = rec["kg_per_ha"]
        caution = None
    return FertilizerRecommendation(
        npk_ratio=rec["npk"],
        kg_per_hectare=round(kg, 0),
        application_timing=rec["timing"],
        organic_options=rec["organic"],
        caution=caution,
    )
