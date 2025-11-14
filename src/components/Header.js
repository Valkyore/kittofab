import { useState } from 'react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py- flex justify-between items-center">
        <img
            src={process.env.PUBLIC_URL + "/images/kittofab-logo.jpg"}
            alt="KittoFab Logo"
            className='w-48'
          />

        <nav className="hidden md:flex space-x-8">
          <a href="#accueil" className="font-semibold text-[#04bfad] hover:text-[#80d2f2]">Accueil</a>
          <a href="#fonctionnalites" className="font-semibold text-[#04bfad] hover:text-[#80d2f2]">Fonctionnalités</a>
          <a href="#produit" className="font-semibold text-[#04bfad] hover:text-[#80d2f2]">Produit</a>
          <a href="#galerie" className="font-semibold text-[#04bfad] hover:text-[#80d2f2]">Galerie</a>
          <a href="#contact" className="font-semibold text-[#04bfad] hover:text-[#80d2f2]">Contact</a>
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