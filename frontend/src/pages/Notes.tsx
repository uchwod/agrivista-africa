import { useState, useEffect } from 'react'

const CROPS = ['maize', 'rice', 'cassava', 'yam', 'sorghum', 'cowpea', 'groundnut', 'soybean', 'cocoa', 'oil_palm', 'millet', 'cocoyam', 'sesame', 'tomato', 'pepper', 'rubber', 'cotton', 'beans', 'fio_fio', 'akidi']
const API_BASE = import.meta.env.VITE_API_BASE || ''

type Note = {
  id: string
  farmer_id: string
  crop: string
  season: string
  note: string
  created_at: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ crop: 'maize', season: '', note: '' })
  const farmerId = 'farmer_1'

  useEffect(() => {
    fetch(`${API_BASE}/api/notes?farmer_id=${farmerId}`)
      .then(r => r.json())
      .then(data => { setNotes(data.notes || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmer_id: farmerId, crop: form.crop, season: form.season, note: form.note }),
    })
    if (res.ok) {
      const newNote = await res.json()
      setNotes(prev => [newNote, ...prev])
      setShowForm(false)
      setForm({ crop: 'maize', season: '', note: '' })
    }
  }

  async function handleDelete(id: string) {
    await fetch(`${API_BASE}/api/notes/${id}`, { method: 'DELETE' })
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My notes</h1>
      <p style={styles.subtitle}>Record what you planted, inputs used, and observations per season. Notes are stored on this device/session.</p>

      <button type="button" onClick={() => setShowForm(!showForm)} style={styles.btn}>
        {showForm ? 'Cancel' : '+ Add note'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <span>Crop</span>
            <select value={form.crop} onChange={e => setForm(f => ({ ...f, crop: e.target.value }))} style={styles.input}>
              {CROPS.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
            </select>
          </label>
          <label style={styles.label}>
            <span>Season (e.g. 2024 main)</span>
            <input value={form.season} onChange={e => setForm(f => ({ ...f, season: e.target.value }))} style={styles.input} placeholder="2024 main" />
          </label>
          <label style={styles.label}>
            <span>Note</span>
            <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} style={styles.textarea} rows={3} placeholder="e.g. Planted 2 ha maize, used NPK 20-10-10, first rain 15 Apr" required />
          </label>
          <button type="submit" style={styles.btn}>Save note</button>
        </form>
      )}

      {loading ? <p>Loading…</p> : notes.length === 0 ? (
        <p style={styles.empty}>No notes yet. Add one to track your seasons.</p>
      ) : (
        <ul style={styles.list}>
          {notes.map(n => (
            <li key={n.id} style={styles.card}>
              <div style={styles.cardHead}>
                <strong style={styles.crop}>{n.crop.replace('_', ' ')}</strong>
                {n.season && <span style={styles.season}>{n.season}</span>}
                <span style={styles.date}>{n.created_at.slice(0, 10)}</span>
                <button type="button" onClick={() => handleDelete(n.id)} style={styles.delBtn} aria-label="Delete">×</button>
              </div>
              <p style={styles.noteText}>{n.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 640 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1rem' },
  btn: { padding: '0.5rem 1rem', background: 'var(--soil)', color: 'var(--cream)', border: 'none', borderRadius: 6, fontWeight: 600, marginBottom: '1rem' },
  form: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 10, padding: '1rem', marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.75rem' },
  input: { width: '100%', padding: '0.5rem', border: '1px solid var(--sand)', borderRadius: 6 },
  textarea: { width: '100%', padding: '0.5rem', border: '1px solid var(--sand)', borderRadius: 6, resize: 'vertical' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  card: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' },
  cardHead: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
  crop: { textTransform: 'capitalize' },
  season: { fontSize: '0.9rem', color: 'var(--muted)' },
  date: { fontSize: '0.85rem', color: 'var(--muted)', marginLeft: 'auto' },
  delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--muted)', lineHeight: 1 },
  noteText: { margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap' },
  empty: { color: 'var(--muted)' },
}
