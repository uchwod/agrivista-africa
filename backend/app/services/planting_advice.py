"""Best planting windows, best states, and best soils by crop (Nigeria & West Africa)."""
from app.schemas import CropType

# Best planting months and advice aligned with Nigeria's rainy season (Apr–Oct) and extension guidelines.
# best_states: Nigerian states where the crop is most suited (climate, tradition, production).
# best_soils: Soil types that suit the crop best (drainage, texture, fertility).
# Months are 1-based (1=Jan).
PLANTING_ADVICE = {
    CropType.MAIZE: {
        "best_start_month": 3,
        "best_end_month": 6,
        "months_label": "March–June",
        "harvest_after": "3–4 months (90–120 days)",
        "advice": "Plant when reliable rains have settled (usually from March in the South, April–May in the North). Ensures adequate moisture for flowering and grain-filling. Avoid planting too early in dry spells.",
        "rainfall_note": "Needs 500–800 mm in growing season. Peak water need at tasselling and grain fill.",
        "temp_note": "Optimal 25–30°C. Frost-free period required.",
        "best_states": ["Kaduna", "Niger", "Kano", "Taraba", "Oyo"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.RICE: {
        "best_start_month": 4,
        "best_end_month": 6,
        "months_label": "April–June",
        "harvest_after": "3–5 months (90–150 days, variety-dependent)",
        "advice": "Plant at the onset of rains for rainfed rice. Lowland rice needs consistent water; upland rice can be planted when soil is moist. May–June is ideal for most regions.",
        "rainfall_note": "Rainfed: 1000–1500 mm. Ensure good moisture at transplanting and tillering.",
        "temp_note": "Warm season crop; 20–35°C suitable.",
        "best_states": ["Kebbi", "Niger", "Kano", "Ebonyi", "Anambra"],
        "best_soils": ["clay_loam", "loamy", "silty"],
    },
    CropType.CASSAVA: {
        "best_start_month": 4,
        "best_end_month": 6,
        "months_label": "April–June",
        "harvest_after": "9–18 months (often 12 months)",
        "advice": "Plant at the start of the rainy season so roots establish before dry period. Can extend to July in high-rainfall areas. Needs at least 3 months of good moisture after planting.",
        "rainfall_note": "Thrives with 1000–1500 mm/year. Tolerates short dry spells once established.",
        "temp_note": "Best 25–29°C; avoid cold or very high heat at planting.",
        "best_states": ["Benue", "Delta", "Oyo", "Imo", "Rivers"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.YAM: {
        "best_start_month": 3,
        "best_end_month": 5,
        "months_label": "March–May",
        "harvest_after": "6–8 months (180–240 days)",
        "advice": "Plant with early rains when soil is workable and moist. March–April in the South, April–May in the North. High moisture at planting improves sett germination.",
        "rainfall_note": "Needs 1000–1500 mm; well-distributed rains support vine growth and tuber bulking.",
        "temp_note": "Warm (25–30°C); sensitive to waterlogging.",
        "best_states": ["Benue", "Niger", "Nasarawa", "Taraba", "Oyo"],
        "best_soils": ["loamy", "sandy_loam", "clay_loam"],
    },
    CropType.SORGHUM: {
        "best_start_month": 4,
        "best_end_month": 6,
        "months_label": "April–June",
        "harvest_after": "3–4 months (90–120 days)",
        "advice": "Plant when rains are established—April–May in the South, May–June in the North. More drought-tolerant than maize; avoid waterlogged soils.",
        "rainfall_note": "400–800 mm sufficient. Critical period: flowering and grain fill.",
        "temp_note": "Warm (25–32°C); tolerates heat better than maize.",
        "best_states": ["Kano", "Sokoto", "Borno", "Zamfara", "Yobe"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.COWPEA: {
        "best_start_month": 4,
        "best_end_month": 7,
        "months_label": "April–July",
        "harvest_after": "2–3 months (60–90 days)",
        "advice": "Plant from early to mid rains. Early planting (April–May) gives longer season; later planting (June–July) suits short-duration varieties. Avoid waterlogging.",
        "rainfall_note": "300–600 mm. Excess rain increases disease; well-drained soil preferred.",
        "temp_note": "Warm (25–35°C); frost-sensitive.",
        "best_states": ["Kano", "Borno", "Yobe", "Gombe", "Bauchi"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.GROUNDNUT: {
        "best_start_month": 4,
        "best_end_month": 6,
        "months_label": "April–June",
        "harvest_after": "3–4 months (90–120 days)",
        "advice": "Plant after rains have started and soil is warm. Well-drained, light soils reduce pod rot. April–June is ideal across most of Nigeria.",
        "rainfall_note": "500–700 mm; avoid waterlogging during pod development.",
        "temp_note": "Optimal 27–30°C; needs warm soil for germination.",
        "best_states": ["Kano", "Niger", "Zamfara", "Kaduna", "Jigawa"],
        "best_soils": ["sandy", "sandy_loam"],
    },
    CropType.SOYBEAN: {
        "best_start_month": 5,
        "best_end_month": 6,
        "months_label": "May–June",
        "harvest_after": "3–4 months (90–120 days)",
        "advice": "Plant when soil is moist and warm—typically May–June. Short-day crop; timing affects flowering. Ensure good moisture at flowering and pod fill.",
        "rainfall_note": "450–700 mm; critical at flowering and pod development.",
        "temp_note": "20–30°C; sensitive to frost.",
        "best_states": ["Benue", "Nasarawa", "Kaduna", "Plateau"],
        "best_soils": ["loamy", "clay_loam"],
    },
    CropType.COCOA: {
        "best_start_month": 3,
        "best_end_month": 9,
        "months_label": "March–September",
        "harvest_after": "3–5 years to first harvest (perennial)",
        "advice": "Plant at the start of rains (March–April) or during main rainy season. Perennial; young plants need shade and consistent moisture. Main planting window is March–September.",
        "rainfall_note": "1500–2000 mm/year; well-distributed. Shade helps in establishment.",
        "temp_note": "24–28°C; humid conditions preferred.",
        "best_states": ["Ondo", "Cross River", "Ogun", "Oyo", "Ekiti"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.OIL_PALM: {
        "best_start_month": 4,
        "best_end_month": 8,
        "months_label": "April–August",
        "harvest_after": "3–4 years to first harvest (perennial)",
        "advice": "Plant in the rainy season when soil is moist—April–August. Perennial; ensure good drainage and avoid waterlogging at planting.",
        "rainfall_note": "2000–2500 mm/year ideal; consistent moisture for young palms.",
        "temp_note": "24–28°C; humid lowland conditions.",
        "best_states": ["Cross River", "Akwa Ibom", "Rivers", "Edo", "Delta"],
        "best_soils": ["loamy", "sandy_loam", "clay_loam"],
    },
    CropType.MILLET: {
        "best_start_month": 5,
        "best_end_month": 6,
        "months_label": "May–June",
        "harvest_after": "3–4 months (90–100 days)",
        "advice": "Plant when rains are established, typically May–June in the North. Short season (90–100 days); more drought-tolerant than sorghum. Suited to drier zones.",
        "rainfall_note": "300–600 mm; low water requirement compared to maize/sorghum.",
        "temp_note": "Warm (25–32°C); heat-tolerant.",
        "best_states": ["Sokoto", "Borno", "Yobe", "Zamfara", "Jigawa"],
        "best_soils": ["sandy", "sandy_loam"],
    },
    CropType.COCOYAM: {
        "best_start_month": 3,
        "best_end_month": 5,
        "months_label": "March–May",
        "harvest_after": "6–8 months",
        "advice": "Plant with early rains, March–May. Similar to yam—needs moist, well-drained soil. Shade-tolerant; can be intercropped.",
        "rainfall_note": "1000–1500 mm; consistent moisture for corm development.",
        "temp_note": "25–30°C; avoid waterlogging.",
        "best_states": ["Cross River", "Delta", "Edo", "Imo"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.SESAME: {
        "best_start_month": 5,
        "best_end_month": 7,
        "months_label": "May–July",
        "harvest_after": "3–4 months (90–120 days)",
        "advice": "Plant when soil is warm and rains have started—May–July. Well-drained soil; avoid heavy rains at flowering to reduce disease. Short season (90–120 days).",
        "rainfall_note": "400–650 mm; sensitive to waterlogging.",
        "temp_note": "25–32°C; warm-season crop.",
        "best_states": ["Nasarawa", "Benue", "Jigawa", "Kano"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.TOMATO: {
        "best_start_month": 3,
        "best_end_month": 6,
        "months_label": "March–June",
        "harvest_after": "2–3 months (60–90 days)",
        "advice": "Plant at start of rains (March–April) or in mid rains for rainfed. Nursery then transplant when 4–6 leaves. Avoid waterlogging; use stakes and good drainage. Second planting August–September possible in some areas.",
        "rainfall_note": "600–900 mm; consistent moisture, avoid wet foliage to reduce blight.",
        "temp_note": "Optimal 21–24°C; high heat affects fruit set.",
        "best_states": ["Kano", "Kaduna", "Jigawa", "Plateau", "Oyo"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.PEPPER: {
        "best_start_month": 3,
        "best_end_month": 6,
        "months_label": "March–June",
        "harvest_after": "2–3 months (60–90 days)",
        "advice": "Plant with early to mid rains—March–June. Transplant after nursery when risk of dry spell is low. Hot pepper and bell pepper both need warm, well-drained soil.",
        "rainfall_note": "500–800 mm; avoid waterlogging; mulch helps in heavy rain.",
        "temp_note": "20–30°C; frost-sensitive.",
        "best_states": ["Kano", "Kaduna", "Plateau", "Taraba", "Oyo"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.RUBBER: {
        "best_start_month": 4,
        "best_end_month": 8,
        "months_label": "April–August",
        "harvest_after": "5–7 years to first tapping (perennial)",
        "advice": "Plant in the rainy season when soil is moist—April–August. Perennial; choose well-drained land. Seedlings or budded stumps need shade and regular moisture in first year.",
        "rainfall_note": "2000–2500 mm/year; high humidity preferred in establishment.",
        "temp_note": "24–28°C; humid lowland; avoid waterlogging.",
        "best_states": ["Edo", "Delta", "Ondo", "Cross River"],
        "best_soils": ["loamy", "clay_loam"],
    },
    CropType.COTTON: {
        "best_start_month": 5,
        "best_end_month": 6,
        "months_label": "May–June",
        "harvest_after": "4–6 months (120–180 days)",
        "advice": "Plant when rains are well established—typically May–June in the North. Needs warm soil and 120–180 days frost-free. Avoid late planting to reduce bollworm pressure.",
        "rainfall_note": "600–1000 mm; critical at flowering and boll development.",
        "temp_note": "25–32°C; warm-season; sensitive to frost.",
        "best_states": ["Katsina", "Zamfara", "Kaduna", "Kano", "Oyo"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.BEANS: {
        "best_start_month": 4,
        "best_end_month": 7,
        "months_label": "April–July",
        "harvest_after": "2–3 months (60–90 days)",
        "advice": "Plant with early to mid rains. Common bean (Phaseolus) needs well-drained soil; avoid waterlogging. Short season 60–90 days.",
        "rainfall_note": "500–700 mm. Critical at flowering and pod fill.",
        "temp_note": "20–28°C. Frost-sensitive.",
        "best_states": ["Plateau", "Kaduna", "Kano", "Borno", "Nasarawa"],
        "best_soils": ["loamy", "sandy_loam"],
    },
    CropType.FIO_FIO: {
        "best_start_month": 5,
        "best_end_month": 7,
        "months_label": "May–July",
        "harvest_after": "4–6 months (pigeon pea)",
        "advice": "Plant when rains are established. Pigeon pea (Cajanus cajan) is drought-tolerant; suited to Northern and Middle Belt. Can be intercropped.",
        "rainfall_note": "600–1000 mm. Tolerates dry spells once established.",
        "temp_note": "25–30°C. Warm-season legume.",
        "best_states": ["Kano", "Kaduna", "Niger", "Nasarawa", "Benue"],
        "best_soils": ["sandy_loam", "loamy"],
    },
    CropType.AKIDI: {
        "best_start_month": 4,
        "best_end_month": 7,
        "months_label": "April–July",
        "harvest_after": "2–3 months (60–90 days)",
        "advice": "Plant from early to mid rains. Akidi (black-eyed pea / cowpea type) is popular in the South-East; well-drained soil preferred.",
        "rainfall_note": "300–600 mm. Avoid waterlogging.",
        "temp_note": "Warm 25–35°C. Frost-sensitive.",
        "best_states": ["Anambra", "Enugu", "Imo", "Ebonyi", "Abia"],
        "best_soils": ["sandy_loam", "loamy"],
    },
}


def _harvest_days_approx(harvest_after: str) -> int | None:
    """Parse harvest_after string to approximate days for harvest date estimate. Returns None for perennials."""
    import re
    if not harvest_after or "year" in harvest_after.lower() or "perennial" in harvest_after.lower():
        return None
    m = re.search(r"(\d+)[–\-](\d+)\s*days", harvest_after, re.I)
    if m:
        return (int(m.group(1)) + int(m.group(2))) // 2
    m = re.search(r"(\d+)[–\-](\d+)\s*months", harvest_after, re.I)
    if m:
        return ((int(m.group(1)) + int(m.group(2))) // 2) * 30
    m = re.search(r"(\d+)\s*months", harvest_after, re.I)
    if m:
        return int(m.group(1)) * 30
    return None


def get_planting_advice(crop: CropType) -> dict:
    """Return planting advice, best states, and best soils for a single crop."""
    data = PLANTING_ADVICE.get(crop, PLANTING_ADVICE[CropType.MAIZE])
    harvest_after = data.get("harvest_after", "")
    return {
        "crop_type": crop.value,
        "best_start_month": data["best_start_month"],
        "best_end_month": data["best_end_month"],
        "months_label": data["months_label"],
        "harvest_after": harvest_after,
        "harvest_days_approx": _harvest_days_approx(harvest_after),
        "advice": data["advice"],
        "rainfall_note": data["rainfall_note"],
        "temp_note": data["temp_note"],
        "best_states": data["best_states"],
        "best_soils": data["best_soils"],
    }


def get_all_planting_advice() -> list[dict]:
    """Return planting advice for all crops."""
    return [get_planting_advice(crop) for crop in CropType]
