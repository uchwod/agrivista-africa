import { useState, useEffect, useRef } from 'react'

import { CROP_GUIDE } from '../data/cropGuide'

const CROPS = ['maize', 'rice', 'cassava', 'yam', 'sorghum', 'cowpea', 'groundnut', 'soybean', 'cocoa', 'oil_palm', 'millet', 'cocoyam', 'sesame', 'tomato', 'pepper', 'rubber', 'cotton', 'beans', 'fio_fio', 'akidi']
const SOILS = ['sandy', 'loamy', 'clay', 'sandy_loam', 'clay_loam', 'silty']
const PLANTING_ADVICE_BY_CROP = CROP_GUIDE
const API_BASE = import.meta.env.VITE_API_BASE || ''

const NIGERIAN_STATES: { name: string; lat: number; lon: number }[] = [
  { name: 'Abia', lat: 5.4527, lon: 7.5248 },
  { name: 'Adamawa', lat: 9.3265, lon: 12.3984 },
  { name: 'Akwa Ibom', lat: 4.9057, lon: 7.8537 },
  { name: 'Anambra', lat: 6.2104, lon: 7.0694 },
  { name: 'Bauchi', lat: 10.3158, lon: 9.8442 },
  { name: 'Bayelsa', lat: 4.7719, lon: 6.0699 },
  { name: 'Benue', lat: 7.7329, lon: 8.5391 },
  { name: 'Borno', lat: 11.8333, lon: 13.15 },
  { name: 'Cross River', lat: 5.8702, lon: 8.5988 },
  { name: 'Delta', lat: 5.8904, lon: 5.6804 },
  { name: 'Ebonyi', lat: 6.2649, lon: 8.0137 },
  { name: 'Edo', lat: 6.335, lon: 5.6037 },
  { name: 'Ekiti', lat: 7.6236, lon: 5.2206 },
  { name: 'Enugu', lat: 6.4521, lon: 7.5104 },
  { name: 'FCT (Abuja)', lat: 9.0765, lon: 7.3986 },
  { name: 'Gombe', lat: 10.2897, lon: 11.1673 },
  { name: 'Imo', lat: 5.4927, lon: 7.0355 },
  { name: 'Jigawa', lat: 11.75, lon: 9.35 },
  { name: 'Kaduna', lat: 10.5222, lon: 7.4383 },
  { name: 'Kano', lat: 12.0022, lon: 8.5919 },
  { name: 'Katsina', lat: 12.9816, lon: 7.6224 },
  { name: 'Kebbi', lat: 12.45, lon: 4.1999 },
  { name: 'Kogi', lat: 7.8, lon: 6.7333 },
  { name: 'Kwara', lat: 8.4799, lon: 4.5418 },
  { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
  { name: 'Nasarawa', lat: 8.4998, lon: 8.515 },
  { name: 'Niger', lat: 9.6, lon: 6.55 },
  { name: 'Ogun', lat: 7.1608, lon: 3.349 },
  { name: 'Ondo', lat: 7.2504, lon: 5.1994 },
  { name: 'Osun', lat: 7.6291, lon: 4.1794 },
  { name: 'Oyo', lat: 7.3775, lon: 3.947 },
  { name: 'Plateau', lat: 9.8965, lon: 8.8583 },
  { name: 'Rivers', lat: 4.8156, lon: 7.0498 },
  { name: 'Sokoto', lat: 13.0622, lon: 5.2339 },
  { name: 'Taraba', lat: 7.8704, lon: 9.78 },
  { name: 'Yobe', lat: 11.748, lon: 11.966 },
  { name: 'Zamfara', lat: 12.1704, lon: 6.66 },
]

type PlantingAdvice = {
  crop_type: string
  months_label: string
  harvest_after?: string
  harvest_days_approx?: number | null
  advice: string
  rainfall_note: string
  temp_note: string
  best_states?: string[]
  best_soils?: string[]
}

type Insights = {
  yield_prediction?: { predicted_yield_kg_per_hectare: number; confidence_low: number; confidence_high: number; factors_used: string[] }
  yield_by_soil?: Record<string, number>
  weather?: { temp_avg_c: number; rainfall_mm: number; humidity_avg: number; forecast_7d: Array<{ date: string; temp_avg_c: number; rainfall_mm: number; humidity: number }> }
  fertilizer?: { npk_ratio: string; kg_per_hectare: number; application_timing: string[]; organic_options: string[]; caution?: string }
  pest_risk?: { risk_level: string; pests: string[]; recommendations: string[]; severity_score: number }
  planting_advice?: PlantingAdvice
} | null

const SOIL_LABELS: Record<string, string> = {
  loamy: 'Loamy',
  sandy_loam: 'Sandy loam',
  clay_loam: 'Clay loam',
  silty: 'Silty',
  sandy: 'Sandy',
  clay: 'Clay',
}

// Indicative NPK price (₦/kg) for input cost estimate
const INDICATIVE_NPK_NGN_PER_KG = 450
const INDICATIVE_SEED_NGN_PER_HA: Record<string, number> = {
  maize: 18000, rice: 22000, cassava: 15000, yam: 120000, sorghum: 8000, cowpea: 12000, groundnut: 15000,
  soybean: 14000, millet: 7000, cocoyam: 25000, sesame: 10000, tomato: 45000, pepper: 35000, cotton: 9000,
  beans: 11000, fio_fio: 10000, akidi: 11000,
}

export default function Dashboard() {
  const [crop, setCrop] = useState('maize')
  const [soil, setSoil] = useState('loamy')
  const [stateName, setStateName] = useState('Lagos')
  const [hectares, setHectares] = useState('2')
  const [plantingDate, setPlantingDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<Insights>(null)
  const [error, setError] = useState<string | null>(null)
  const [reminder, setReminder] = useState<{ crops_to_plant: string[]; message: string } | null>(null)
  const initialFetchDone = useRef(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/reminders/planting`)
      .then(r => r.json())
      .then(data => setReminder(data))
      .catch(() => {})
  }, [])

  const state = NIGERIAN_STATES.find(s => s.name === stateName) ?? NIGERIAN_STATES[0]

  async function fetchInsights(lat: number, lon: number, cropVal: string, soilVal: string, hectaresVal: number) {
    const res = await fetch(`${API_BASE}/api/insights/full`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop_type: cropVal,
        soil_type: soilVal,
        latitude: lat,
        longitude: lon,
        farm_size_hectares: hectaresVal,
      }),
    })
    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    if (!data.planting_advice && PLANTING_ADVICE_BY_CROP[cropVal]) {
      data.planting_advice = { crop_type: cropVal, ...PLANTING_ADVICE_BY_CROP[cropVal] }
    }
    return data
  }

  useEffect(() => {
    if (!initialFetchDone.current || !insights) return
    let cancelled = false
    setError(null)
    setLoading(true)
    fetchInsights(state.lat, state.lon, crop, soil, parseFloat(hectares))
      .then(data => { if (!cancelled) setInsights(data) })
      .catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : 'Request failed') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [stateName, crop, soil, hectares])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setInsights(null)
    try {
      const data = await fetchInsights(state.lat, state.lon, crop, soil, parseFloat(hectares))
      initialFetchDone.current = true
      setInsights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Farm insights</h1>
      <p style={styles.subtitle}>Enter your farm details for AI yield prediction, weather, fertilizer and pest risk — Nigeria & West Africa.</p>
      <p style={styles.locationLine}>Insights use weather and location for <strong>{stateName}</strong>.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <label>
            <span>Crop type</span>
            <select value={crop} onChange={e => setCrop(e.target.value)} style={styles.input}>
              {CROPS.map(c => (
                <option key={c} value={c}>{c.replace('_', ' ')}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Soil type</span>
            <select value={soil} onChange={e => setSoil(e.target.value)} style={styles.input}>
              {SOILS.map(s => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </label>
          <label>
            <span>State</span>
            <select value={stateName} onChange={e => setStateName(e.target.value)} style={styles.input}>
              {NIGERIAN_STATES.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Farm size (hectares)</span>
            <input type="number" step="0.1" min="0.1" value={hectares} onChange={e => setHectares(e.target.value)} required style={styles.input} />
          </label>
          <label>
            <span>Planting date (optional)</span>
            <input type="date" value={plantingDate} onChange={e => setPlantingDate(e.target.value)} style={styles.input} />
          </label>
        </div>
        <button type="submit" disabled={loading} style={styles.btn}>
          {loading ? 'Loading…' : 'Get AI insights'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {reminder && reminder.crops_to_plant?.length > 0 && (
        <section style={styles.reminderCard}>
          <h2 style={styles.cardTitle}>This month</h2>
          <p style={styles.reminderText}>{reminder.message}</p>
        </section>
      )}

      {insights && (
        <div style={styles.cards}>
          {insights.yield_prediction && (
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>Yield prediction</h2>
              <p style={styles.bigNumber}>{insights.yield_prediction.predicted_yield_kg_per_hectare.toLocaleString()} <span style={styles.unit}>kg/ha</span></p>
              <p style={styles.muted}>Range: {insights.yield_prediction.confidence_low.toLocaleString()} – {insights.yield_prediction.confidence_high.toLocaleString()} kg/ha</p>
              {(() => {
                const ha = Number(hectares) || 0
                if (ha > 0) {
                  const total = Math.round(insights.yield_prediction.predicted_yield_kg_per_hectare * ha)
                  const totalLow = Math.round(insights.yield_prediction.confidence_low * ha)
                  const totalHigh = Math.round(insights.yield_prediction.confidence_high * ha)
                  return (
                    <p style={styles.totalProduction}>
                      <strong>Est. total for your farm ({ha} ha):</strong> {total.toLocaleString()} kg ({totalLow.toLocaleString()} – {totalHigh.toLocaleString()})
                    </p>
                  )
                }
                return null
              })()}
              {insights.yield_by_soil && Object.keys(insights.yield_by_soil).length > 0 && (
                <div style={styles.yieldBySoil}>
                  <h3 style={styles.yieldBySoilTitle}>How soil type affects yield</h3>
                  <p style={styles.yieldBySoilDesc}>Same crop &amp; location; only soil varies. Your selection: <strong>{SOIL_LABELS[soil] || soil}</strong></p>
                  <ul style={styles.yieldBySoilList}>
                    {Object.entries(insights.yield_by_soil)
                      .sort(([, a], [, b]) => b - a)
                      .map(([soilKey, kgHa]) => (
                        <li key={soilKey} style={soilKey === soil ? styles.yieldBySoilItemCurrent : styles.yieldBySoilItem}>
                          <span style={styles.yieldBySoilLabel}>{SOIL_LABELS[soilKey] || soilKey.replace('_', ' ')}</span>
                          {soilKey === soil && <span style={styles.yieldBySoilBadge}> your selection</span>}
                          <span style={styles.yieldBySoilValue}>{kgHa.toLocaleString()} kg/ha</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </section>
          )}
          {insights.weather && (
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>Weather</h2>
              {(() => {
                const f7 = insights.weather.forecast_7d || []
                const heavyRain = f7.find(d => (d.rainfall_mm || 0) > 25)
                const drySpell = f7.length >= 3 && f7.slice(0, 3).every(d => (d.rainfall_mm || 0) < 1)
                return (
                  <>
                    {heavyRain && <p style={styles.weatherAlert}>Heavy rain expected around {heavyRain.date} ({heavyRain.rainfall_mm} mm). Plan fieldwork accordingly.</p>}
                    {drySpell && !heavyRain && <p style={styles.weatherAlert}>Dry spell in the next few days. Consider irrigation or delay irrigation-sensitive tasks.</p>}
                  </>
                )
              })()}
              <p><strong>Avg temp:</strong> {insights.weather.temp_avg_c}°C · <strong>Rain:</strong> {insights.weather.rainfall_mm} mm · <strong>Humidity:</strong> {insights.weather.humidity_avg}%</p>
              {insights.weather.forecast_7d?.length > 0 && (
                <div style={styles.forecast}>
                  <strong>7-day:</strong>
                  <ul style={styles.forecastList}>
                    {insights.weather.forecast_7d.slice(0, 5).map((d, i) => (
                      <li key={i}>{d.date}: {d.temp_avg_c}°C, {d.rainfall_mm} mm</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
          {insights.fertilizer && (
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>Fertilizer recommendation</h2>
              <p><strong>{insights.fertilizer.npk_ratio}</strong> — {insights.fertilizer.kg_per_hectare} kg/ha</p>
              <p style={styles.inputCost}>
                <strong>Est. input cost per ha:</strong> Fertilizer ₦{(insights.fertilizer.kg_per_hectare * INDICATIVE_NPK_NGN_PER_KG).toLocaleString()}
                {INDICATIVE_SEED_NGN_PER_HA[crop] != null && <> · Seed ~₦{(INDICATIVE_SEED_NGN_PER_HA[crop] || 0).toLocaleString()}</>}
                {' '}(indicative)
              </p>
              <p style={styles.small}>For {Number(hectares) || 0} ha: ~₦{Math.round((insights.fertilizer.kg_per_hectare * INDICATIVE_NPK_NGN_PER_KG + (INDICATIVE_SEED_NGN_PER_HA[crop] || 0)) * (Number(hectares) || 0)).toLocaleString()} total (fertilizer + seed)</p>
              <ul style={styles.list}>
                {insights.fertilizer.application_timing.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <p style={styles.small}>Organic: {insights.fertilizer.organic_options.join('; ')}</p>
              {insights.fertilizer.caution && <p style={styles.caution}>{insights.fertilizer.caution}</p>}
            </section>
          )}
          {insights.pest_risk && (
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>Pest risk</h2>
              <p><span style={{ ...styles.badge, ...(insights.pest_risk.risk_level === 'high' ? styles.badgeHigh : insights.pest_risk.risk_level === 'medium' ? styles.badgeMed : {}) }}>{insights.pest_risk.risk_level}</span> (score: {insights.pest_risk.severity_score})</p>
              <p style={styles.small}>Watch for: {insights.pest_risk.pests.join(', ')}</p>
              <ul style={styles.list}>
                {insights.pest_risk.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </section>
          )}
          {insights.planting_advice && (
            <section style={styles.card}>
              <h2 style={styles.cardTitle}>When & where to plant {insights.planting_advice.crop_type.replace('_', ' ')}</h2>
              {plantingDate && insights.planting_advice.harvest_days_approx != null && insights.planting_advice.harvest_days_approx > 0 && (() => {
                const d = new Date(plantingDate)
                if (isNaN(d.getTime())) return null
                d.setDate(d.getDate() + (insights.planting_advice!.harvest_days_approx || 0))
                return <p style={styles.harvestEstimate}><strong>Expected harvest:</strong> ~{d.toISOString().slice(0, 10)} ({insights.planting_advice!.harvest_after})</p>
              })()}
              <div style={styles.bestMatchBox}>
                <p style={styles.bestMatch}><strong>Best states:</strong> {Array.isArray(insights.planting_advice.best_states) && insights.planting_advice.best_states.length > 0 ? insights.planting_advice.best_states.join(', ') : '—'}</p>
                <p style={styles.bestMatch}><strong>Best soil:</strong> {Array.isArray(insights.planting_advice.best_soils) && insights.planting_advice.best_soils.length > 0 ? insights.planting_advice.best_soils.map((s: string) => s.replace('_', ' ')).join(', ') : '—'}</p>
              </div>
              <p style={styles.plantingMonths}><strong>Best planting window:</strong> {insights.planting_advice.months_label}</p>
              {insights.planting_advice.harvest_after && !plantingDate && <p style={styles.bestMatch}><strong>Time to harvest:</strong> {insights.planting_advice.harvest_after}</p>}
              <p style={styles.small}>{insights.planting_advice.advice}</p>
              <p style={styles.small}><strong>Rainfall:</strong> {insights.planting_advice.rainfall_note}</p>
              <p style={styles.small}><strong>Temperature:</strong> {insights.planting_advice.temp_note}</p>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 800 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '0.5rem' },
  locationLine: { color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' },
  form: { marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' },
  input: { width: '100%', padding: '0.5rem', border: '1px solid var(--sand)', borderRadius: 6, background: '#fff' },
  btn: { padding: '0.6rem 1.2rem', background: 'var(--soil)', color: 'var(--cream)', border: 'none', borderRadius: 6, fontWeight: 600 },
  error: { padding: '0.75rem', background: '#fee', color: 'var(--danger)', borderRadius: 6, marginBottom: '1rem' },
  reminderCard: { background: 'var(--leaf)', color: '#fff', padding: '1rem 1.25rem', borderRadius: 10, marginBottom: '1rem' },
  reminderText: { margin: 0, fontSize: '0.95rem' },
  weatherAlert: { padding: '0.5rem 0.75rem', background: 'var(--sand)', borderRadius: 6, marginBottom: '0.75rem', fontSize: '0.9rem' },
  inputCost: { marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--ink)' },
  harvestEstimate: { padding: '0.5rem 0.75rem', background: 'var(--sand)', borderRadius: 6, marginBottom: '0.75rem', color: 'var(--leaf)', fontWeight: 600 },
  cards: { display: 'grid', gap: '1rem' },
  card: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 10, padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,.06)' },
  cardTitle: { marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem' },
  bigNumber: { fontSize: '1.75rem', fontWeight: 700, color: 'var(--leaf)' },
  unit: { fontSize: '0.9rem', fontWeight: 500, color: 'var(--muted)' },
  muted: { color: 'var(--muted)', fontSize: '0.9rem' },
  totalProduction: { marginTop: '0.75rem', fontSize: '1rem', color: 'var(--ink)' },
  yieldBySoil: { marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--sand)' },
  yieldBySoilTitle: { fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--ink)' },
  yieldBySoilDesc: { fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.6rem' },
  yieldBySoilList: { listStyle: 'none', padding: 0, margin: 0 },
  yieldBySoilItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0', fontSize: '0.9rem', color: 'var(--ink)' },
  yieldBySoilItemCurrent: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0', fontSize: '0.9rem', fontWeight: 600, color: 'var(--leaf)' },
  yieldBySoilLabel: { minWidth: '6rem' },
  yieldBySoilBadge: { fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 },
  yieldBySoilValue: { marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' },
  small: { fontSize: '0.85rem', color: 'var(--muted)' },
  list: { paddingLeft: '1.25rem', margin: '0.5rem 0' },
  forecast: { marginTop: '0.5rem' },
  forecastList: { paddingLeft: '1.25rem', fontSize: '0.9rem' },
  caution: { fontSize: '0.9rem', color: 'var(--earth)', marginTop: '0.5rem' },
  plantingMonths: { color: 'var(--leaf)', fontWeight: 600, marginBottom: '0.5rem' },
  bestMatchBox: { background: 'var(--sand)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem' },
  bestMatch: { fontSize: '0.95rem', margin: '0.25rem 0', color: 'var(--ink)' },
  badge: { display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: 4, background: 'var(--success)', color: '#fff', fontSize: '0.85rem', textTransform: 'capitalize' },
  badgeMed: { background: 'var(--gold)', color: 'var(--ink)' },
  badgeHigh: { background: 'var(--danger)' },
}
