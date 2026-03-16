export default function Help() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Help & FAQ</h1>
      <p style={styles.subtitle}>How to get the most from AgriVista Africa.</p>

      <section style={styles.section}>
        <h2 style={styles.h2}>Dashboard</h2>
        <p><strong>What does the Dashboard do?</strong> Enter your crop, soil type, state, and farm size, then click <strong>Get AI insights</strong>. You get a yield prediction (kg per hectare), weather for your area, fertilizer advice, pest risk, and when & where to plant.</p>
        <p><strong>Why does yield change when I change state?</strong> Yield depends on location (weather and agro-ecological zone). Changing the state updates the weather and zone, so the predicted yield changes.</p>
        <p><strong>What is “Est. total for your farm”?</strong> That is yield per hectare × your farm size, so you see total expected production in kg.</p>
        <p><strong>What is “How soil type affects yield”?</strong> It shows predicted yield for every soil type (same crop and location). Use it to see how much better or worse other soils would be.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Crop guide</h2>
        <p>Use <strong>Crop guide</strong> to see the best planting window, best soil types, and best Nigerian states for each crop. Pick a crop from the dropdown to view the full guide.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Marketplace</h2>
        <p><strong>How do I sell my produce?</strong> Go to Marketplace, click <strong>List produce</strong>, and fill in crop, quantity (kg), price per kg, and your state. Buyers can filter by state and crop.</p>
        <p><strong>Are the prices on the page real?</strong> The “Typical farm-gate prices” table is indicative only. Your actual listing price is set by you.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Plans</h2>
        <p>We offer a <strong>Free</strong> plan for smallholders and paid plans for larger farms. Government and cooperatives can contact us for custom programs. See <strong>Plans</strong> for details.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Tips</h2>
        <ul style={styles.tips}>
          <li>Run insights for different states to compare where your crop performs best.</li>
          <li>Compare soil types in the yield card to see the impact of improving your soil (e.g. adding organic matter).</li>
          <li>Check the Crop guide before planting to align with the best planting window and states.</li>
          <li>Use the Marketplace to list harvests and filter by your state or crop when buying.</li>
        </ul>
      </section>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 640 },
  title: { marginBottom: '0.25rem' },
  subtitle: { color: 'var(--muted)', marginBottom: '1.5rem' },
  section: { marginBottom: '1.5rem' },
  h2: { fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--leaf)' },
  tips: { paddingLeft: '1.25rem', margin: 0 },
}
