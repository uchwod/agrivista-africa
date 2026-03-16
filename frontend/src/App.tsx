import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import Plans from './pages/Plans'
import CropGuide from './pages/CropGuide'
import Help from './pages/Help'
import Resources from './pages/Resources'
import Notes from './pages/Notes'
import MarketPrices from './pages/MarketPrices'
import StorageTips from './pages/StorageTips'
import Layout from './components/Layout'
import { LangProvider } from './i18n/LangContext'

function App() {
  return (
    <LangProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/crop-guide" element={<CropGuide />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/help" element={<Help />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/storage-tips" element={<StorageTips />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </LangProvider>
  )
}

export default App
