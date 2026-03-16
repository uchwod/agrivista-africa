/** Crop guide: best time, soil, states, and weather for each crop (Nigeria). */

export type CropGuideEntry = {
  months_label: string
  harvest_after: string
  best_states: string[]
  best_soils: string[]
  advice: string
  rainfall_note: string
  temp_note: string
}

export const CROP_GUIDE: Record<string, CropGuideEntry> = {
  maize: {
    months_label: 'March–June',
    harvest_after: '3–4 months (90–120 days)',
    best_states: ['Kaduna', 'Niger', 'Kano', 'Taraba', 'Oyo'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant when reliable rains have settled (March in the South, April–May in the North). Ensures adequate moisture for flowering and grain-filling.',
    rainfall_note: 'Needs 500–800 mm in growing season. Peak water need at tasselling and grain fill.',
    temp_note: 'Optimal 25–30°C. Frost-free period required.',
  },
  rice: {
    months_label: 'April–June',
    harvest_after: '3–5 months (90–150 days, variety-dependent)',
    best_states: ['Kebbi', 'Niger', 'Kano', 'Ebonyi', 'Anambra'],
    best_soils: ['clay_loam', 'loamy', 'silty'],
    advice: 'Plant at the onset of rains for rainfed rice. Lowland rice needs consistent water; May–June is ideal for most regions.',
    rainfall_note: 'Rainfed: 1000–1500 mm. Ensure good moisture at transplanting and tillering.',
    temp_note: '20–35°C suitable.',
  },
  cassava: {
    months_label: 'April–June',
    harvest_after: '9–18 months (often 12 months)',
    best_states: ['Benue', 'Delta', 'Oyo', 'Imo', 'Rivers'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant at the start of the rainy season so roots establish before dry period. Needs at least 3 months of good moisture after planting.',
    rainfall_note: 'Thrives with 1000–1500 mm/year. Tolerates short dry spells once established.',
    temp_note: 'Best 25–29°C.',
  },
  yam: {
    months_label: 'March–May',
    harvest_after: '6–8 months (180–240 days)',
    best_states: ['Benue', 'Niger', 'Nasarawa', 'Taraba', 'Oyo'],
    best_soils: ['loamy', 'sandy_loam', 'clay_loam'],
    advice: 'Plant with early rains when soil is workable and moist. March–April in the South, April–May in the North.',
    rainfall_note: 'Needs 1000–1500 mm; well-distributed rains support vine growth and tuber bulking.',
    temp_note: 'Warm 25–30°C. Sensitive to waterlogging.',
  },
  sorghum: {
    months_label: 'April–June',
    harvest_after: '3–4 months (90–120 days)',
    best_states: ['Kano', 'Sokoto', 'Borno', 'Zamfara', 'Yobe'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant when rains are established—April–May in the South, May–June in the North. More drought-tolerant than maize.',
    rainfall_note: '400–800 mm sufficient. Critical period: flowering and grain fill.',
    temp_note: 'Warm 25–32°C. Tolerates heat better than maize.',
  },
  cowpea: {
    months_label: 'April–July',
    harvest_after: '2–3 months (60–90 days)',
    best_states: ['Kano', 'Borno', 'Yobe', 'Gombe', 'Bauchi'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant from early to mid rains. Early planting gives longer season; avoid waterlogging.',
    rainfall_note: '300–600 mm. Excess rain increases disease; well-drained soil preferred.',
    temp_note: 'Warm 25–35°C. Frost-sensitive.',
  },
  groundnut: {
    months_label: 'April–June',
    harvest_after: '3–4 months (90–120 days)',
    best_states: ['Kano', 'Niger', 'Zamfara', 'Kaduna', 'Jigawa'],
    best_soils: ['sandy', 'sandy_loam'],
    advice: 'Plant after rains have started and soil is warm. Well-drained, light soils reduce pod rot.',
    rainfall_note: '500–700 mm. Avoid waterlogging during pod development.',
    temp_note: 'Optimal 27–30°C. Needs warm soil for germination.',
  },
  soybean: {
    months_label: 'May–June',
    harvest_after: '3–4 months (90–120 days)',
    best_states: ['Benue', 'Nasarawa', 'Kaduna', 'Plateau'],
    best_soils: ['loamy', 'clay_loam'],
    advice: 'Plant when soil is moist and warm—typically May–June. Ensure good moisture at flowering and pod fill.',
    rainfall_note: '450–700 mm; critical at flowering and pod development.',
    temp_note: '20–30°C. Sensitive to frost.',
  },
  cocoa: {
    months_label: 'March–September',
    harvest_after: '3–5 years to first harvest (perennial)',
    best_states: ['Ondo', 'Cross River', 'Ogun', 'Oyo', 'Ekiti'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant at the start of rains or during main rainy season. Perennial; young plants need shade and consistent moisture.',
    rainfall_note: '1500–2000 mm/year; well-distributed. Shade helps in establishment.',
    temp_note: '24–28°C. Humid conditions preferred.',
  },
  oil_palm: {
    months_label: 'April–August',
    harvest_after: '3–4 years to first harvest (perennial)',
    best_states: ['Cross River', 'Akwa Ibom', 'Rivers', 'Edo', 'Delta'],
    best_soils: ['loamy', 'sandy_loam', 'clay_loam'],
    advice: 'Plant in the rainy season when soil is moist. Perennial; ensure good drainage and avoid waterlogging at planting.',
    rainfall_note: '2000–2500 mm/year ideal; consistent moisture for young palms.',
    temp_note: '24–28°C. Humid lowland conditions.',
  },
  millet: {
    months_label: 'May–June',
    harvest_after: '3–4 months (90–100 days)',
    best_states: ['Sokoto', 'Borno', 'Yobe', 'Zamfara', 'Jigawa'],
    best_soils: ['sandy', 'sandy_loam'],
    advice: 'Plant when rains are established, typically May–June in the North. Short season; more drought-tolerant than sorghum.',
    rainfall_note: '300–600 mm; low water requirement.',
    temp_note: 'Warm 25–32°C. Heat-tolerant.',
  },
  cocoyam: {
    months_label: 'March–May',
    harvest_after: '6–8 months',
    best_states: ['Cross River', 'Delta', 'Edo', 'Imo'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant with early rains, March–May. Similar to yam—needs moist, well-drained soil. Shade-tolerant; can be intercropped.',
    rainfall_note: '1000–1500 mm; consistent moisture for corm development.',
    temp_note: '25–30°C. Avoid waterlogging.',
  },
  sesame: {
    months_label: 'May–July',
    harvest_after: '3–4 months (90–120 days)',
    best_states: ['Nasarawa', 'Benue', 'Jigawa', 'Kano'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant when soil is warm and rains have started. Well-drained soil; avoid heavy rains at flowering to reduce disease.',
    rainfall_note: '400–650 mm. Sensitive to waterlogging.',
    temp_note: '25–32°C. Warm-season crop.',
  },
  tomato: {
    months_label: 'March–June',
    harvest_after: '2–3 months (60–90 days)',
    best_states: ['Kano', 'Kaduna', 'Jigawa', 'Plateau', 'Oyo'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant at start of rains or in mid rains. Nursery then transplant when 4–6 leaves. Avoid waterlogging; use stakes and good drainage.',
    rainfall_note: '600–900 mm; consistent moisture. Avoid wet foliage to reduce blight.',
    temp_note: 'Optimal 21–24°C. High heat affects fruit set.',
  },
  pepper: {
    months_label: 'March–June',
    harvest_after: '2–3 months (60–90 days)',
    best_states: ['Kano', 'Kaduna', 'Plateau', 'Taraba', 'Oyo'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant with early to mid rains. Transplant after nursery when risk of dry spell is low. Warm, well-drained soil.',
    rainfall_note: '500–800 mm. Avoid waterlogging; mulch helps in heavy rain.',
    temp_note: '20–30°C. Frost-sensitive.',
  },
  rubber: {
    months_label: 'April–August',
    harvest_after: '5–7 years to first tapping (perennial)',
    best_states: ['Edo', 'Delta', 'Ondo', 'Cross River'],
    best_soils: ['loamy', 'clay_loam'],
    advice: 'Plant in the rainy season when soil is moist. Perennial; choose well-drained land. Seedlings need shade and regular moisture in first year.',
    rainfall_note: '2000–2500 mm/year; high humidity preferred in establishment.',
    temp_note: '24–28°C. Humid lowland; avoid waterlogging.',
  },
  cotton: {
    months_label: 'May–June',
    harvest_after: '4–6 months (120–180 days)',
    best_states: ['Katsina', 'Zamfara', 'Kaduna', 'Kano', 'Oyo'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant when rains are well established—typically May–June in the North. Needs warm soil and 120–180 days frost-free.',
    rainfall_note: '600–1000 mm; critical at flowering and boll development.',
    temp_note: '25–32°C. Warm-season; sensitive to frost.',
  },
  beans: {
    months_label: 'April–July',
    harvest_after: '2–3 months (60–90 days)',
    best_states: ['Plateau', 'Kaduna', 'Kano', 'Borno', 'Nasarawa'],
    best_soils: ['loamy', 'sandy_loam'],
    advice: 'Plant with early to mid rains. Common bean needs well-drained soil; avoid waterlogging. Short season 60–90 days.',
    rainfall_note: '500–700 mm. Critical at flowering and pod fill.',
    temp_note: '20–28°C. Frost-sensitive.',
  },
  fio_fio: {
    months_label: 'May–July',
    harvest_after: '4–6 months (pigeon pea)',
    best_states: ['Kano', 'Kaduna', 'Niger', 'Nasarawa', 'Benue'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant when rains are established. Pigeon pea (fio fio) is drought-tolerant; suited to Northern and Middle Belt. Can be intercropped.',
    rainfall_note: '600–1000 mm. Tolerates dry spells once established.',
    temp_note: '25–30°C. Warm-season legume.',
  },
  akidi: {
    months_label: 'April–July',
    harvest_after: '2–3 months (60–90 days)',
    best_states: ['Anambra', 'Enugu', 'Imo', 'Ebonyi', 'Abia'],
    best_soils: ['sandy_loam', 'loamy'],
    advice: 'Plant from early to mid rains. Akidi (black-eyed pea type) is popular in the South-East; well-drained soil preferred.',
    rainfall_note: '300–600 mm. Avoid waterlogging.',
    temp_note: 'Warm 25–35°C. Frost-sensitive.',
  },
}

export const CROP_IDS = Object.keys(CROP_GUIDE) as string[]

export function formatCropName(id: string): string {
  return id.replace(/_/g, ' ')
}

export function formatSoilName(id: string): string {
  return id.replace(/_/g, ' ')
}
