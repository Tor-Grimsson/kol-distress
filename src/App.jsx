import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import RefinePage from './pages/RefinePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/refine" element={<RefinePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
