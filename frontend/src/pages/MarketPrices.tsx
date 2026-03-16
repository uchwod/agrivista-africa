export default function MarketPrices() {
  const sources = [
    { name: 'AFEX Commodities', url: 'https://afex.ng', desc: 'Commodity exchange and market prices (Nigeria).' },
    { name: 'LAPO Commodity Exchange', url: 'https://www.lapo.com.ng', desc: 'Agricultural commodity trading and price information.' },
    { name: 'FAO GIEWS Food Price Data', url: 'https://www.fao.org/giews/food-prices/', desc: 'Global and regional food price data.' },
    { name: 'Nigeria Bureau of Statistics (NBS) – Agriculture', url: 'https://www.nigerianstat.gov.ng', desc: 'Official statistics including agricultural and food prices.' },
    { name: 'USDA FAS – Nigeria', url: 'https://www.fas.usda.gov/regions/nigeria', desc: 'Reports on Nigerian agriculture and markets.' },
  ]

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Market prices</h1>
      <p style={styles.subtitle}>Live and indicative prices for crops. Use the links below to check current market and farm-gate prices. Our Marketplace shows indicative ranges on the Sell page.</p>

      <section style={styles.section}>
        <h2 style={styles.h2}>Where to check prices</h2>
        <ul style={styles.linkList}>
          {sources.map((s, i) => (
            <li key={i} style={styles.linkItem}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{s.name}</a>
              <p style={styles.desc}>{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <p style={styles.note}>AgriVista Africa does not provide live price feeds. For official or exchange prices, always use the sources above or your local extension office.</p>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 640 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1.5rem' },
  section: { marginBottom: '1.5rem' },
  h2: { fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--leaf)' },
  linkList: { listStyle: 'none', padding: 0, margin: 0 },
  linkItem: { marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--sand)' },
  link: { fontWeight: 600, color: 'var(--leaf)', textDecoration: 'none' },
  desc: { margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--muted)' },
  note: { fontSize: '0.85rem', color: 'var(--muted)', fontStyle: 'italic' },
}
