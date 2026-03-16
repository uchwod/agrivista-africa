export default function Resources() {
  const links = [
    { name: 'Federal Ministry of Agriculture and Food Security (Nigeria)', url: 'https://fmard.gov.ng', desc: 'Government programmes, policies, and farmer support.' },
    { name: 'CBN Anchor Borrowers’ Programme', url: 'https://www.cbn.gov.ng', desc: 'Central Bank of Nigeria financing for smallholder farmers.' },
    { name: 'National Agricultural Extension and Research Liaison Services (NAERLS)', url: 'https://naerls.gov.ng', desc: 'Extension services and training for farmers.' },
    { name: 'Nigeria Incentive-Based Risk Sharing for Agricultural Lending (NIRSAL)', url: 'https://nirsal.com', desc: 'Credit risk sharing and agribusiness support.' },
    { name: 'FAO Country Profile – Nigeria', url: 'https://www.fao.org/countryprofiles/index/en/?iso3=NGA', desc: 'FAO statistics and agriculture overview for Nigeria.' },
    { name: 'IFAD – Rural development projects', url: 'https://www.ifad.org/en/country/nigeria', desc: 'International Fund for Agricultural Development projects in Nigeria.' },
  ]

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Resources for farmers</h1>
      <p style={styles.subtitle}>Useful links to government programmes, financing, and extension services in Nigeria and beyond.</p>

      <section style={styles.section}>
        <h2 style={styles.h2}>Loans & grants</h2>
        <p style={styles.p}>Eligibility and focus vary by programme. Generally: smallholder farmers, cooperatives, and agribusinesses can apply. You may need a BVN, farm size/location, and proof of identity. Check each programme for current criteria and application windows.</p>
        <ul style={styles.eligibility}>
          <li><strong>CBN Anchor Borrowers’ Programme:</strong> Smallholder farmers; linked to anchor processors/off-takers.</li>
          <li><strong>NIRSAL:</strong> Credit guarantee and capacity building for farmers and agribusinesses.</li>
          <li><strong>FMARD:</strong> Federal schemes and state-level programmes; visit state ADPs for local grants.</li>
          <li><strong>IFAD:</strong> Rural development projects; often delivered through government and NGOs.</li>
        </ul>
      </section>

      <h2 style={styles.h2}>Links</h2>
      <ul style={styles.list}>
        {links.map((item, i) => (
          <li key={i} style={styles.item}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{item.name}</a>
            <p style={styles.desc}>{item.desc}</p>
          </li>
        ))}
      </ul>

      <p style={styles.note}>AgriVista Africa is not affiliated with these organisations. Links are provided for information only. Programmes and URLs may change; check official sites for current details.</p>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 640 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1.5rem' },
  section: { marginBottom: '1.5rem' },
  h2: { fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--leaf)' },
  p: { fontSize: '0.95rem', marginBottom: '0.75rem' },
  eligibility: { paddingLeft: '1.25rem', marginBottom: '1rem', fontSize: '0.9rem' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  item: { marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--sand)' },
  link: { fontWeight: 600, color: 'var(--leaf)', textDecoration: 'none' },
  desc: { margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--muted)' },
  note: { marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--muted)', fontStyle: 'italic' },
}
