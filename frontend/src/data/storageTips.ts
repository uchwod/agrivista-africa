/** Post-harvest storage tips by crop — Nigeria & West Africa. Used when API is unavailable. */
export const STORAGE_TIPS: Record<string, string[]> = {
  maize: [
    'Dry cobs to below 13% moisture before shelling. Drying to 13–15% is the minimum; lower (e.g. 12%) is safer for long storage and reduces aflatoxin risk.',
    'Use rapid drying (sun on platforms or dryers). Slow drying in heaps encourages mould and aflatoxin. Clean maize to remove fines and damaged grains; this can cut aflatoxin by up to 50%.',
    'Store in well-ventilated cribs (raised, air flow) or in sacks on pallets off the ground. Avoid direct contact with soil or damp floors. Traditional rhumbu (clay) is used but can trap moisture.',
    'For sack storage beyond 2–3 months: use PICS (triple-layer hermetic) bags to control weevils without chemicals, or treat with approved insecticide (e.g. Actellic dust) at recommended rates. Insect damage is linked to higher aflatoxin in stores.',
    'Keep storage cool, dry, and rodent-proof. Do not store when grain is still warm after drying.',
  ],
  rice: [
    'Dry paddy to 14% moisture or less (12–14% is safe for storage). Use sun drying on mats or mechanical dryers; avoid drying on bare soil.',
    'Store in clean, dry sacks on pallets or platforms so air can circulate and bags do not absorb floor moisture. Do not stack bags directly on the ground.',
    'For storage beyond 3 months, fumigate with approved products (e.g. phosphine) following label instructions, or use hermetic bags if available. Keep warehouse dry and rodent-proof.',
    'Check periodically for heating, mould, or insects. Rotate stock (use older rice first) and keep storage area clean.',
  ],
  cassava: [
    'Cassava roots start to deteriorate within 24–48 hours of harvest (vascular streaking). Process or sell within 2–3 days when possible. Do not store fresh roots for long.',
    'If you must keep roots briefly: harvest with 2–5 cm of stem attached to reduce neck rot, handle gently to avoid bruises, and keep in a cool, shaded, well-ventilated place. Use within about a week.',
    'For longer-term storage, process into gari, fufu, dry chips, or flour. Dry chips must be dried to low moisture and stored in sealed bags or containers to avoid mould. Keep away from moisture and insects.',
  ],
  yam: [
    'Cure tubers for 1–2 weeks after harvest: keep in a shaded, ventilated place (not in sun) so wounds heal and skin hardens. This greatly reduces rot in storage.',
    'Store in a cool, dry, well-ventilated structure. Open-sided storage (shelves with good air flow) performs better than closed traditional barns: less weight loss, less decay, and fewer pests.',
    'Do not stack tubers too high; allow air to reach all sides. Keep tubers off the ground (use shelves or platforms). Avoid bruising during handling.',
    'Inspect regularly and remove any rotting or damaged tubers immediately so rot does not spread. Excess nitrogen in the field can increase rot in storage.',
  ],
  sorghum: [
    'Thresh and dry grains to 12–13% moisture before storage. Clean to remove chaff and broken grains.',
    'Store in clean, dry sacks on pallets or in silos. Keep storage area rodent-proof and ensure bags are not on damp floors. Treat with approved insecticide (e.g. Actellic) if storing beyond 3 months.',
    'Hermetic (PICS) bags are effective for sorghum and reduce weevil damage without chemicals. Keep store cool and dry.',
  ],
  cowpea: [
    'Sun-dry pods, then shell. Dry seeds to 10–12% moisture. High moisture leads to mould and bruchid (weevil) damage; losses of 30–70% are common without proper storage.',
    'PICS (triple-layer hermetic) bags are very effective for cowpea: they create low oxygen, kill insects without chemicals, and are widely used in Nigeria. Alternatively use clean sacks and treat with Actellic or phosphine at label rates.',
    'Store in a dry, cool place. Keep sacks off the ground and away from walls to reduce moisture. Avoid plastic bags that trap moisture and encourage mould.',
  ],
  groundnut: [
    'Dry pods to 8–10% moisture (or lower) before storage. High moisture (e.g. 14%+) greatly increases aflatoxin and mould risk. In Nigeria, aflatoxin in stored kernels is common; proper drying is critical.',
    'Store in-shell when possible; shelled kernels are more prone to insect and fungal damage. Use well-ventilated bags (jute or woven), not sealed plastic, to reduce aflatoxin risk.',
    'Triple-layer hermetic bags help control insects and slow fungal growth compared with ordinary sacks, but moisture must still be low before bagging. Keep storage cool, dry, and dark.',
    'Do not mix damaged or mouldy nuts with good ones. Clean and grade before storage. Check official limits (e.g. Nigeria 20 μg/kg aflatoxin) if selling to formal markets.',
  ],
  soybean: [
    'Dry seeds to 12% moisture or less. Avoid cracking and mechanical damage during threshing so that mould and insects do not enter.',
    'Store in clean, dry sacks on pallets or in silos. Hermetic (PICS) bags work well for soybean and reduce insect damage without chemicals. For conventional sacks, treat with approved insecticide if storing long-term.',
    'Keep storage cool, dry, and rodent-proof. Avoid moisture and direct sun on bags.',
  ],
  cocoa: [
    'Ferment beans for 5–7 days (depending on variety and climate), then dry to about 7% moisture. Proper fermentation and drying determine quality and price.',
    'Dry in the sun on mats or raised platforms; turn regularly. Do not dry on bare soil. Under-dried beans develop mould and off-flavours.',
    'Store dried beans in clean, dry, well-ventilated sacks in a dry place. Avoid plastic and sealed containers that trap moisture. Grade and bag only when fully dry to meet buyer standards.',
  ],
  oil_palm: [
    'Process fresh fruit bunches (FFB) within 24–48 hours of harvest to avoid high free fatty acid (FFA) in oil and quality loss.',
    'Crude palm oil: store in clean, sealed containers (not reactive metals), away from light and heat. Keep containers full to reduce oxidation, or use inert gas if available.',
    'Palm kernels: dry to 8–10% moisture and store in a ventilated, dry place. Keep away from moisture and pests.',
  ],
  millet: [
    'Thresh and dry to 12–13% moisture. Clean before storage to remove dirt and broken grains.',
    'Store in dry sacks or traditional bins. Keep off the ground and in a cool, shaded, rodent-proof place. Treat with approved insecticide for storage beyond 2–3 months.',
    'Hermetic bags (e.g. PICS) are effective for millet and reduce weevil damage without chemicals.',
  ],
  cocoyam: [
    'Corms are perishable. Store in a cool, shaded, well-ventilated place for 1–2 weeks only. Avoid waterlogging and bruising.',
    'Best used or processed (e.g. into flour or cooked product) soon after harvest. For longer preservation, process and dry.',
  ],
  sesame: [
    'Dry seeds to 6–8% moisture after threshing. Sesame is oily and prone to rancidity and mould if moisture is high.',
    'Store in clean, dry sacks or sealed containers in a cool, dark place. For long-term storage, keep as seeds rather than oil; oil turns rancid faster.',
  ],
  tomato: [
    'Fresh tomatoes: store in a cool, shaded, well-ventilated place; avoid stacking. Use within 1–2 weeks. Refrigeration (above 10°C for ripe fruit) can extend life a few more days.',
    'For longer storage, process into paste, sauce, or dried slices. Ensure containers are clean and sealed to avoid spoilage.',
  ],
  pepper: [
    'Fresh pepper: store in a cool, dry place; use within 1–2 weeks. Avoid plastic bags that trap moisture.',
    'For long storage, dry whole or ground. Sun-dry or use low heat; store in sealed containers away from light and moisture to preserve colour and reduce mould.',
  ],
  rubber: [
    'Latex is processed into sheets or concentrate at the farm or factory; it is not stored raw for long.',
    'Store rubber sheets in a dry, cool place, away from direct sun, oil, and chemicals. Grade and bale according to quality standards for sale.',
  ],
  cotton: [
    'Seed cotton: store in a dry, well-ventilated place until ginning. Avoid moisture and fire risk.',
    'After ginning: store lint in dry, clean bales in a dry warehouse. Keep seed for planting or oil extraction in a dry, pest-free place.',
  ],
  beans: [
    'Dry seeds to 10–12% moisture. Store in clean sacks or sealed containers. Hermetic (PICS) bags are very effective for common bean and reduce weevil damage without chemicals.',
    'If using ordinary sacks, treat with approved insecticide (e.g. Actellic) at recommended rates for storage beyond 2–3 months. Keep in a dry, cool, rodent-proof place.',
  ],
  fio_fio: [
    'Dry seeds to 10–12% moisture after threshing. Pigeon pea stores well in hermetic (PICS) bags with minimal insect damage and no chemicals.',
    'Otherwise store in dry sacks, treat with insecticide for storage beyond 2–3 months, and keep storage ventilated and rodent-proof.',
  ],
  akidi: [
    'Dry to 10–12% moisture. Store in clean, dry sacks or hermetic bags. Treat with Actellic or use PICS bags to control weevils.',
    'Keep in a cool, dry place away from moisture and rodents.',
  ],
}

export function getStorageTips(cropId: string): string[] {
  const key = cropId.toLowerCase().replace(/-/g, '_')
  return STORAGE_TIPS[key] ?? [
    'Dry produce to the recommended moisture level before storage (see similar crops for guidance).',
    'Store in a dry, cool, well-ventilated place. Keep sacks or containers off the ground.',
    'Use clean sacks or containers. Control pests and rodents. Consider hermetic (PICS) bags for grains and legumes.',
  ]
}
