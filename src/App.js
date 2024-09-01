import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import Developers from './components/Developers';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-pink text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/" element={<About />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;