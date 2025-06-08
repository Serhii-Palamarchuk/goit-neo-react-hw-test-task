import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import CamperDetails from './pages/CamperDetails.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/catalog">Catalog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CamperDetails />} />
      </Routes>
    </div>
  )
}

export default App
