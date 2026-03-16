import { useState } from 'react'
import { CROP_GUIDE, CROP_IDS, formatCropName, formatSoilName } from '../data/cropGuide'

export default function CropGuide() {
  const [cropId, setCropId] = useState('maize')
  const guide = CROP_GUIDE[cropId]

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Crop guide</h1>
      <p style={styles.subtitle}>
        Best time of year, soil type, Nigerian states, and weather for each crop. Select a crop to see the full guide.
      </p>

      <label style={styles.selectLabel}>
        <span>Select crop</span>
        <select
          value={cropId}
          onChange={e => setCropId(e.target.value)}
          style={styles.select}
        >
          {CROP_IDS.map(id => (
            <option key={id} value={id}>{formatCropName(id)}</option>
          ))}
        </select>
      </label>

      {guide && (
        <article style={styles.card}>
          <h2 style={styles.cardTitle}>{formatCropName(cropId)}</h2>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Best time of year to plant</h3>
            <p style={styles.value}>{guide.months_label}</p>
            <p style={styles.small}>{guide.advice}</p>
          </section>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Best soil type</h3>
            <p style={styles.value}>{guide.best_soils.map(formatSoilName).join(', ')}</p>
          </section>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Best Nigerian states for yield</h3>
            <p style={styles.value}>{guide.best_states.join(', ')}</p>
            <p style={styles.small}>These states match the crop’s climate, rainfall, and soil conditions.</p>
          </section>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Best weather & planting window</h3>
            <p style={styles.weatherRow}><strong>Rainfall:</strong> {guide.rainfall_note}</p>
            <p style={styles.weatherRow}><strong>Temperature:</strong> {guide.temp_note}</p>
            <p style={styles.weatherRow}><strong>Planting window:</strong> {guide.months_label}</p>
          </section>
        </article>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 720 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1.5rem' },
  selectLabel: { display: 'block', marginBottom: '1.5rem' },
  select: { marginLeft: '0.5rem', padding: '0.5rem 0.75rem', minWidth: 200, border: '1px solid var(--sand)', borderRadius: 6, background: '#fff' },
  card: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
  cardTitle: { marginTop: 0, marginBottom: '1.25rem', fontSize: '1.5rem', textTransform: 'capitalize' },
  section: { marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--sand)' },
  sectionTitle: { fontSize: '1rem', marginTop: 0, marginBottom: '0.5rem', color: 'var(--leaf)', fontWeight: 600 },
  value: { margin: '0.25rem 0', fontSize: '1.05rem' },
  small: { fontSize: '0.9rem', color: 'var(--muted)', margin: '0.35rem 0' },
  weatherRow: { margin: '0.4rem 0', fontSize: '0.95rem' },
}
