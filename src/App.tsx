import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ProductionVibeCoding } from './pages/services/ProductionVibeCoding';
import { ClaudeSkills } from './pages/services/ClaudeSkills';
import AIReceptionistDashboard from './pages/dashboard/AIReceptionistDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import { VoiceDemo } from './components/sections/VoiceDemo';

function Layout() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  // const location = useLocation();

  // Reset scroll on route change
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary] font-sans selection:bg-[--primary] selection:text-white">
      <Header onOpenDemo={() => setIsDemoOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/production-vibe-coding" element={<ProductionVibeCoding />} />
          <Route path="/services/claude-skills" element={<ClaudeSkills />} />
          <Route path="/dashboard" element={<AIReceptionistDashboard />} />
          {/* Add more routes as we build them */}
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[--z-modal] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <VoiceDemo isModal onClose={() => setIsDemoOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
