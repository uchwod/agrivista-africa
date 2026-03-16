import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'

export default function Layout({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang()
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <NavLink to="/" style={styles.logo}>
          Agri AI <span style={{ color: 'var(--earth)' }}>Africa</span>
        </NavLink>
        <nav style={styles.nav}>
          <NavLink to="/" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })} end>
            {t('Dashboard')}
          </NavLink>
          <NavLink to="/marketplace" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Marketplace')}
          </NavLink>
          <NavLink to="/crop-guide" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('CropGuide')}
          </NavLink>
          <NavLink to="/plans" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Plans')}
          </NavLink>
          <NavLink to="/help" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Help')}
          </NavLink>
          <NavLink to="/resources" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Resources')}
          </NavLink>
          <NavLink to="/notes" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Notes')}
          </NavLink>
          <NavLink to="/market-prices" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Prices')}
          </NavLink>
          <NavLink to="/storage-tips" style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.navActive : {}) })}>
            {t('Storage')}
          </NavLink>
          <select value={lang} onChange={e => setLang(e.target.value as 'en' | 'ha' | 'yo' | 'ig')} style={styles.langSelect} title="Language">
            <option value="en">En</option>
            <option value="ha">Ha</option>
            <option value="yo">Yo</option>
            <option value="ig">Ig</option>
          </select>
        </nav>
      </header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>
        Built for farmers in Nigeria & West Africa — Yield prediction, fertilizer & pest advice, marketplace.
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: {
    background: 'var(--soil)',
    color: 'var(--cream)',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: { fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'inherit', textDecoration: 'none' },
  nav: { display: 'flex', gap: '1.5rem' },
  navLink: { color: 'var(--sand)', textDecoration: 'none', fontWeight: 500 },
  navActive: { color: 'var(--gold)', textDecoration: 'underline' },
  langSelect: { marginLeft: '0.5rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,.2)', color: 'inherit', border: '1px solid rgba(255,255,255,.4)', borderRadius: 4, fontSize: '0.85rem' },
  main: { flex: 1, padding: '1.5rem', maxWidth: 1200, margin: '0 auto', width: '100%' },
  footer: {
    background: 'var(--sand)',
    color: 'var(--muted)',
    padding: '1rem 1.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
}
