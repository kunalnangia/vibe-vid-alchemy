
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import VideoDemoPage from './pages/VideoDemoPage';
import PLMDashboard from './pages/PLMDashboard';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import AICreator from './pages/AICreator';
import Collaborate from './pages/Collaborate';
import Publishing from './pages/Publishing';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/video-demo" element={<VideoDemoPage />} />
        <Route path="/plm" element={<PLMDashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/ai-creator" element={<AICreator />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/publishing" element={<Publishing />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
