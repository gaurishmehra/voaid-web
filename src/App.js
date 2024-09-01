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
        {/* <nav className="p-4 backdrop-blur-md">
          <ul className="flex justify-center space-x-4">
            <li><Link to="/About" className="hover:text-light-pink transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-light-pink transition-colors">Contact</Link></li>
            <li><Link to="/developers" className="hover:text-light-pink transition-colors">Developers</Link></li>
          </ul>
        </nav> */}
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
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;