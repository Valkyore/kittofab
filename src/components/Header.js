import { useState } from 'react';
import { motion } from 'framer-motion';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Composant simple pour lien avec soulignement animé
  const MenuLien = ({ href, children }) => (
    <motion.a
      href={href}
      className="relative font-semibold text-[#04bfad] hover:text-[#80d2f2] transition-colors pb-2" // pb-2 pour espace entre texte et ligne
      whileHover="hover"
      initial="initial"
      variants={{
        initial: {},
        hover: {}
      }}
    >
      <span>{children}</span> {/* Texte dans un span pour positionner la ligne en dessous */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-[#80d2f2]" 
        variants={{
          initial: { 
            scaleX: 0, 
            originX: 0.5 // Centre pour grandir du milieu
          },
          hover: { 
            scaleX: 1 
          }
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      />
    </motion.a>
  );

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/kittofab-logo.jpg"}
          alt="KittoFab Logo"
          className="w-48"
        />

        <nav className="hidden md:flex space-x-8">
          <MenuLien href="#accueil">Accueil</MenuLien>
          <MenuLien href="#fonctionnalites">Fonctionnalités</MenuLien>
          <MenuLien href="#produit">Produit</MenuLien>
          <MenuLien href="#galerie">Galerie</MenuLien>
          <MenuLien href="#contact">Contact</MenuLien>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <a href="#accueil" className="block px-6 py-3 font-semibold text-[#04bfad] hover:text-[#80d2f2]">Accueil</a>
          <a href="#fonctionnalites" className="block px-6 py-3 font-semibold text-[#04bfad] hover:text-[#80d2f2]">Fonctionnalités</a>
          <a href="#produit" className="block px-6 py-3 font-semibold text-[#04bfad] hover:text-[#80d2f2]">Produit</a>
          <a href="#galerie" className="block px-6 py-3 font-semibold text-[#04bfad] hover:text-[#80d2f2]">Galerie</a>
          <a href="#contact" className="block px-6 py-3 font-semibold text-[#04bfad] hover:text-[#80d2f2]">Contact</a>
        </nav>
      )}
    </header>
  );
}

export default Header;

        /*<h1 className="font-bold text-primary">
          <span className="text-2xl">KittO</span>
          <span className="text-xs">Fab</span>
        </h1>*/