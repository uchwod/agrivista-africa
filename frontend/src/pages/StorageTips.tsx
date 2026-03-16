import { useState, useEffect } from 'react'
import { getStorageTips } from '../data/storageTips'

const CROP_IDS = ['maize', 'rice', 'cassava', 'yam', 'sorghum', 'cowpea', 'groundnut', 'soybean', 'cocoa', 'oil_palm', 'millet', 'cocoyam', 'sesame', 'tomato', 'pepper', 'rubber', 'cotton', 'beans', 'fio_fio', 'akidi']

function formatCrop(id: string) {
  return id.replace(/_/g, ' ')
}

export default function StorageTips() {
  const [crop, setCrop] = useState('maize')
  const [tips, setTips] = useState<string[]>([])

  useEffect(() => {
    setTips(getStorageTips(crop))
  }, [crop])

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Storage tips</h1>
      <p style={styles.subtitle}>Post-harvest advice by crop: moisture levels, storage structures, pest and aflatoxin control — Nigeria & West Africa.</p>

      <label style={styles.label}>
        <span>Select crop</span>
        <select value={crop} onChange={e => setCrop(e.target.value)} style={styles.select}>
          {CROP_IDS.map(id => <option key={id} value={id}>{formatCrop(id)}</option>)}
        </select>
      </label>

      <article style={styles.card}>
        <h2 style={styles.cardTitle}>{formatCrop(crop)}</h2>
        {tips.length > 0 ? (
          <ul style={styles.tipList}>
            {tips.map((t, i) => <li key={i} style={styles.tipItem}>{t}</li>)}
          </ul>
        ) : (
          <p style={styles.empty}>No storage tips available for this crop.</p>
        )}
      </article>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 640 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '1rem' },
  select: { padding: '0.5rem', border: '1px solid var(--sand)', borderRadius: 6, minWidth: 200 },
  card: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 10, padding: '1.25rem' },
  cardTitle: { marginTop: 0, marginBottom: '1rem', textTransform: 'capitalize' },
  tipList: { paddingLeft: '1.25rem', margin: 0 },
  tipItem: { marginBottom: '0.5rem', fontSize: '0.95rem' },
  empty: { color: 'var(--muted)', margin: 0 },
}
