import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import OpenSource from './pages/OpenSource.jsx'
import Writing from './pages/Writing.jsx'
import Experience from './pages/Experience.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="projects" element={<Home />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="open-source" element={<OpenSource />} />
        <Route path="writing" element={<Writing />} />
        <Route path="experience" element={<Experience />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
