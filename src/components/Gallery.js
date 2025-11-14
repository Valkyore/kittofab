import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function Gallery() {
  const originalImages = [
    {
      src: `${process.env.PUBLIC_URL}/images/13.JPG`,
      alt: "Protège-capteur en silicone bleu, vue de face",
      caption: "Vue frontale – Protection 360°"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/5.JPG`,
      alt: "Protège-capteur porté au bras pendant le sport",
      caption: "En action – Résistant à l'eau"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/10.JPG`,
      alt: "Détail silicone médical, hypoallergénique",
      caption: "Matériau premium – Silicone médical"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/3.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: "Personnalisation – 6 couleurs disponibles"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/4.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: "Personnalisation – 6 couleurs disponibles"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/8.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: "Personnalisation – 6 couleurs disponibles"
    },
    {
      src: `${process.env.PUBLIC_URL}/images/12.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: "Personnalisation – 6 couleurs disponibles"
    }
  ];

  // Duplication pour la boucle infinie (mais on n'utilise que pour le rendu, sans reset brutal)
  const fullImages = [...originalImages, ...originalImages];

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Calcul de la largeur d'une carte sur desktop (w-96 = 384px + space-x-8 = 32px)
  const CARD_WIDTH = 384 + 32; // Ajuste si tu changes les classes Tailwind
  const ORIGINAL_WIDTH = originalImages.length * CARD_WIDTH;

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
    }
  };

  // Gestion du scroll pour la boucle infinie – version plus smooth avec debounce et sans reset instantané
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      // Debounce pour éviter les appels trop fréquents
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (scrollRef.current) {
          let { scrollLeft } = scrollRef.current;
          const { scrollWidth, clientWidth } = scrollRef.current;

          // Seuil plus précis pour la fin (juste avant la duplication visible)
          const endThreshold = ORIGINAL_WIDTH - (CARD_WIDTH / 2); // Buffer pour anticiper
          const startThreshold = CARD_WIDTH / 2; // Pour le début

          if (scrollLeft >= endThreshold) {
            // Reset smooth vers le début sans saut visible
            scrollRef.current.scrollLeft = scrollLeft - ORIGINAL_WIDTH;
          } else if (scrollLeft <= -startThreshold) {
            // Reset vers la fin pour scroll arrière
            scrollRef.current.scrollLeft = scrollLeft + ORIGINAL_WIDTH;
          }
        }
      }, 150); // Petit délai pour fluidité
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <section ref={ref} id="galerie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#04bfad]">Galerie : Découvrez KittoFab</h2>
        <div className="relative overflow-hidden">
          {/* Conteneur principal pour l'overlap */}
          <div
            ref={scrollRef}
            className="flex space-x-4 md:space-x-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          >
            {fullImages.map((img, i) => {
              // Index original pour les animations (évite duplication visuelle des delays)
              const originalIndex = i % originalImages.length;
              return (
                <motion.div
                  key={`${i}`} // Key unique avec duplication
                  className={`relative flex-shrink-0 w-80 md:w-96 snap-center transition-all duration-300 hover:scale-105 hover:z-10 group ${
                    originalIndex % 2 === 0 ? 'mt-0' : 'mt-4 md:mt-8' // Offset alterné pour chevauchement
                  }`}
                  initial={{ opacity: 0, x: 50, rotate: -5 }}  // État initial : invisible + décalé
                  animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 50, rotate: -5 }} // Animation déclenchée seulement quand visible
                  transition={{ duration: 0.6, delay: originalIndex * 0.2 }}  // Délai progressif (cascade) basé sur original
                  whileHover={{ scale: 1.05, rotate: 5, transition: { duration: 0.2 } }}      // Hover smooth (bonus)
                >
                  {/* Card image avec overlap – inchangée */}
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 group-hover:shadow-2xl">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay caption */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-semibold text-lg">{img.caption}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          
        </div>
        {/* Boutons de navigation – visibles seulement sur desktop, placés en dessous et centrés */}
          <div className="hidden md:flex justify-center space-x-6 mt-6">
            <button
              onClick={scrollToPrev}
              className="bg-primary/80 hover:bg-white rounded-full p-3 shadow-lg z-10 transition-all duration-200 hover:shadow-xl flex items-center justify-center w-12 h-12"
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              onClick={scrollToNext}
              className="bg-primary/80 hover:bg-white rounded-full p-3 shadow-lg z-10 transition-all duration-200 hover:shadow-xl flex items-center justify-center w-12 h-12"
              aria-label="Image suivante"
            >
              →
            </button>
          </div>
      </div>
    </section>
  );
}

export default Gallery;