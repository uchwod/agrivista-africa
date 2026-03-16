import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || ''

type Plan = {
  plan: string
  features: string[]
  price_ngn_per_month: number | null
  description: string
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    fetch(`${API_BASE}/api/subscription/plans`)
      .then(r => r.json())
      .then(data => setPlans(data.plans || []))
      .catch(() => {})
  }, [])

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Plans for farms & government</h1>
      <p style={styles.subtitle}>Free trial for smallholders; subscriptions for farms; custom programs for government agricultural schemes.</p>

      <div style={styles.grid}>
        {plans.map(p => (
          <div key={p.plan} style={styles.card}>
            <h2 style={styles.planName}>{p.plan}</h2>
            <p style={styles.desc}>{p.description}</p>
            <p style={styles.price}>
              {p.price_ngn_per_month != null ? `₦${p.price_ngn_per_month.toLocaleString()}/month` : 'Custom / Free'}
            </p>
            <ul style={styles.features}>
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {p.plan === 'free' ? (
              <Link to="/" style={styles.cta}>Start free</Link>
            ) : (
              <a href="mailto:contact@agri-ai-africa.example.com?subject=Plan inquiry: Farm or Government" style={styles.cta}>Contact us</a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {},
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' },
  card: { background: '#fff', border: '1px solid var(--sand)', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.06)' },
  planName: { textTransform: 'capitalize', marginTop: 0, marginBottom: '0.5rem' },
  desc: { fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem' },
  price: { fontWeight: 700, color: 'var(--leaf)', marginBottom: '1rem' },
  features: { paddingLeft: '1.25rem', marginBottom: '1rem', fontSize: '0.9rem' },
  cta: { display: 'block', textAlign: 'center', padding: '0.5rem 1rem', background: 'var(--soil)', color: 'var(--cream)', border: 'none', borderRadius: 6, fontWeight: 600, width: '100%', textDecoration: 'none' },
}
