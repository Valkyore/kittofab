import { useEffect, useRef } from 'react';

function Hero() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && iframeRef.current) {
        iframeRef.current.src = iframeRef.current.dataset.src;
        observer.unobserve(iframeRef.current);
      }
    });
    if (iframeRef.current) observer.observe(iframeRef.current);
  }, []);

  return (
    <section id="accueil" className="relative pt-20 overflow-hidden">
      {/* Wrapper full-width pour la vidéo (inchangé) */}
      <div className="absolute inset-x-0 top-0 -z-10">
        <iframe
          ref={iframeRef}
          data-src="https://www.youtube.com/embed/1n2Z2YeKj7M?autoplay=1&mute=1&loop=1&playlist=1n2Z2YeKj7M&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&si=Xc1qJA62WeUz3sd8"
          className="w-full h-[calc(100vh+20rem)] object-cover"
          title="Vidéo de fond Hero"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
          referrerPolicy="strict-origin-when-cross-origin"
        />

        {/* Fallback image full-width */}
        <img
          src="https://images.unsplash.com/photo-1516321310764-9f3c93e4b7e5?w=1920&h=1080&fit=crop"
          alt="Fond Hero Fallback"
          className="w-full h-[calc(100vh+20rem)] object-cover hidden"
        />

        {/* Overlay NEUF : Sombre/neutre pour valoriser la vidéo */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/70" /> {/* ← Gris foncé à noir, 50-70% opacité */}
      </div>

      {/* Contenu Hero (inchangé) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Protégez votre capteur de glycémie avec son cache <span className="text-accent">en silicone</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Souple, résistant, hypoallergénique. Conçu pour les diabétiques actifs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">
            Demander un devis
          </a>
          <a href="#produit" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition">
            Voir le produit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;









/* function Hero() {
  return (
    <section id="accueil" className="pt-20 bg-gradient-to-br from-primary to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Protégez votre capteur de glycémie <span className="text-accent">en silicone</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Souple, résistant, hypoallergénique. Conçu pour les diabétiques actifs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">
            Demander un devis
          </a>
          <a href="#produit" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition">
            Voir le produit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero; */