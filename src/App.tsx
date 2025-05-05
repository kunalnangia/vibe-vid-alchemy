
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import VideoDemoPage from './pages/VideoDemoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/video-demo" element={<VideoDemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
