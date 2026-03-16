import { useState, useEffect } from 'react'

const CROPS = ['maize', 'rice', 'cassava', 'yam', 'sorghum', 'cowpea', 'groundnut', 'soybean', 'cocoa', 'oil_palm', 'millet', 'cocoyam', 'sesame', 'tomato', 'pepper', 'rubber', 'cotton', 'beans', 'fio_fio', 'akidi']
const API_BASE = import.meta.env.VITE_API_BASE || ''

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

// Indicative farm-gate price ranges (₦/kg) for reference only – varies by season and location
const INDICATIVE_PRICES: { crop: string; low: number; high: number }[] = [
  { crop: 'Maize', low: 120, high: 220 },
  { crop: 'Rice', low: 180, high: 350 },
  { crop: 'Cassava (tubers)', low: 25, high: 55 },
  { crop: 'Yam', low: 80, high: 180 },
  { crop: 'Sorghum', low: 100, high: 200 },
  { crop: 'Cowpea', low: 250, high: 450 },
  { crop: 'Groundnut', low: 350, high: 600 },
  { crop: 'Soybean', low: 200, high: 400 },
  { crop: 'Tomato', low: 80, high: 200 },
  { crop: 'Pepper', low: 150, high: 400 },
  { crop: 'Beans', low: 280, high: 500 },
  { crop: 'Cocoa', low: 600, high: 1200 },
]

type Listing = {
  id: string
  crop_type: string
  quantity_kg: number
  price_per_kg: number
  region: string
  farmer_id: string
  status: string
  state?: string
}

export default function Marketplace() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterState, setFilterState] = useState<string>('')
  const [filterCrop, setFilterCrop] = useState<string>('')
  const [form, setForm] = useState({
    crop_type: 'maize',
    quantity_kg: '500',
    price_per_kg: '150',
    region: 'North Central',
    state: 'Lagos',
    farmer_id: 'farmer_1',
  })

  useEffect(() => {
    const params = new URLSearchParams()
    if (filterState) params.set('state', filterState)
    if (filterCrop) params.set('crop_type', filterCrop)
    fetch(`${API_BASE}/api/marketplace/listings?${params}`)
      .then(r => r.json())
      .then(data => { setListings(data.listings || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filterState, filterCrop])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/api/marketplace/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop_type: form.crop_type,
        quantity_kg: parseFloat(form.quantity_kg),
        price_per_kg: parseFloat(form.price_per_kg),
        region: form.region,
        state: form.state,
        farmer_id: form.farmer_id,
      }),
    })
    if (res.ok) {
      const newListing = await res.json()
      setListings(prev => [newListing, ...prev])
      setShowForm(false)
      setForm({ crop_type: 'maize', quantity_kg: '500', price_per_kg: '150', region: 'North Central', state: 'Lagos', farmer_id: 'farmer_1' })
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sell your produce</h1>
      <p style={styles.subtitle}>List your harvest for buyers. Filter by state or crop.</p>

      <details style={styles.pricePanel}>
        <summary style={styles.priceSummary}>Typical farm-gate prices (indicative ₦/kg)</summary>
        <p style={styles.priceNote}>Rough ranges for reference only. Actual prices depend on season, location, and quality.</p>
        <div style={styles.priceGrid}>
          {INDICATIVE_PRICES.map(({ crop, low, high }) => (
            <div key={crop} style={styles.priceRow}>
              <span style={styles.priceCrop}>{crop}</span>
              <span>₦{low} – ₦{high}/kg</span>
            </div>
          ))}
        </div>
      </details>

      <div style={styles.filters}>
        <label style={styles.filterLabel}>
          <span>State</span>
          <select value={filterState} onChange={e => setFilterState(e.target.value)} style={styles.input}>
            <option value="">All states</option>
            {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label style={styles.filterLabel}>
          <span>Crop</span>
          <select value={filterCrop} onChange={e => setFilterCrop(e.target.value)} style={styles.input}>
            <option value="">All crops</option>
            {CROPS.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
          </select>
        </label>
      </div>

      <button type="button" onClick={() => setShowForm(!showForm)} style={styles.btn}>
        {showForm ? 'Cancel' : '+ New listing'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <label><span>Crop</span><select value={form.crop_type} onChange={e => setForm(f => ({ ...f, crop_type: e.target.value }))} style={styles.input}>{CROPS.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}</select></label>
            <label><span>Quantity (kg)</span><input type="number" value={form.quantity_kg} onChange={e => setForm(f => ({ ...f, quantity_kg: e.target.value }))} style={styles.input} /></label>
            <label><span>Price (₦/kg)</span><input type="number" value={form.price_per_kg} onChange={e => setForm(f => ({ ...f, price_per_kg: e.target.value }))} style={styles.input} /></label>
            <label><span>State</span><select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} style={styles.input}>{NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
            <label><span>Region</span><input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} style={styles.input} placeholder="e.g. North Central" /></label>
          </div>
          <button type="submit" style={styles.btn}>List produce</button>
        </form>
      )}

      {loading ? <p>Loading…</p> : (
        <div style={styles.list}>
          {listings.length === 0 ? (
            <p style={styles.empty}>No listings yet. Add one above.</p>
          ) : (
            listings.map(l => (
              <div key={l.id} style={styles.card}>
                <strong style={styles.crop}>{l.crop_type.replace('_', ' ')}</strong>
                <span>{l.quantity_kg.toLocaleString()} kg</span>
                <span>₦{l.price_per_kg}/kg</span>
                <span>{l.state || l.region}</span>
                <span style={styles.status}>{l.status}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {},
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1rem' },
  btn: { padding: '0.5rem 1rem', background: 'var(--soil)', color: 'var(--cream)', border: 'none', borderRadius: 6, fontWeight: 600, marginBottom: '1rem' },
  form: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 10, padding: '1rem', marginBottom: '1rem' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' },
  input: { width: '100%', padding: '0.4rem', border: '1px solid var(--sand)', borderRadius: 6 },
  list: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  filters: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' },
  filterLabel: { minWidth: 140 },
  card: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: '#fff', border: '1px solid var(--sand)', borderRadius: 8 },
  crop: { textTransform: 'capitalize' },
  status: { fontSize: '0.85rem', color: 'var(--muted)' },
  empty: { color: 'var(--muted)' },
  pricePanel: { marginBottom: '1rem', padding: '0.75rem 1rem', background: 'var(--sand)', borderRadius: 8, border: '1px solid var(--sand)' },
  priceSummary: { cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' },
  priceNote: { fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.35rem', marginBottom: '0.5rem' },
  priceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.25rem 1rem' },
  priceRow: { display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.9rem' },
  priceCrop: { fontWeight: 500 },
}
