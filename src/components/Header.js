import { useState } from 'react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">KittoFab</h1>
        <nav className="hidden md:flex space-x-8">
          <a href="#accueil" className="text-gray-700 hover:text-primary">Accueil</a>
          <a href="#fonctionnalites" className="text-gray-700 hover:text-primary">Fonctionnalités</a>
          <a href="#produit" className="text-gray-700 hover:text-primary">Produit</a>
          <a href="#galerie" className="text-gray-700 hover:text-primary">Galerie</a>
          <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <a href="#accueil" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Accueil</a>
          <a href="#fonctionnalites" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Fonctionnalités</a>
          <a href="#produit" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Produit</a>
          <a href="#galerie" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Galerie</a>
          <a href="#contact" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">Contact</a>
        </nav>
      )}
    </header>
  );
}

export default Header;