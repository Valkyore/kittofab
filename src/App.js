import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Product from './components/Product';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Brevet from './components/Brevet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackGround';

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); // Apparaît après 300px de scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-[#04bfad] hover:bg-[#80d2f2] text-white p-3 rounded-full shadow-lg transition-colors duration-300 ${
        showButton ? 'block' : 'hidden'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      aria-label="Retour en haut"
    >
      ↑
    </motion.button>
  );
}

function App() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Product />
      <Brevet />
      <Features />
      <Gallery />      
      <Testimonials />
      <ParticlesBackground />

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;