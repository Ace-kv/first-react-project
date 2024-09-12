import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.tsx'
import Admin from './pages/Admin.tsx'
import NotFound from './pages/NotFound.tsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App