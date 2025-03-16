import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Diagnostic from './pages/Diagnostic'
import AyuGPT from './pages/AyuGPT'
import Profile from './pages/profile'
import ProtectedRoute from './ProtectedRoute'
import Reports from './pages/Reports'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/ayugpt" element={<AyuGPT />} />
        <Route path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  )
}

export default App
