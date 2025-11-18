import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery() {
  const originalImages = [
    {
      src: `${process.env.PUBLIC_URL}/images/13.JPG`,
      alt: "Protège-capteur en silicone bleu, vue de face",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/5.JPG`,
      alt: "Protège-capteur porté au bras pendant le sport",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/10.JPG`,
      alt: "Détail silicone médical, hypoallergénique",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/3.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/4.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/8.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
    {
      src: `${process.env.PUBLIC_URL}/images/12.JPG`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
        {
      src: `${process.env.PUBLIC_URL}/images/BOITE16.jpg`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
        {
      src: `${process.env.PUBLIC_URL}/images/BOITE32.jpg`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    },
        {
      src: `${process.env.PUBLIC_URL}/images/BOITESVRAC.jpg`,
      alt: "Protège-capteur en plusieurs couleurs",
      caption: ""
    }
  ];

  // Duplication pour la boucle infinie
  const fullImages = [...originalImages, ...originalImages];

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // État pour modal (desktop only)

  // Calcul de la largeur d'une carte (responsive : full sur mobile, 384+32 sur desktop)
  const CARD_WIDTH = window.innerWidth < 768 ? window.innerWidth : 384 + 32; // Dynamic pour mobile full-width
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

  // Gestion du scroll pour la boucle infinie
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (scrollRef.current) {
          let { scrollLeft } = scrollRef.current;
          const { scrollWidth, clientWidth } = scrollRef.current;

          const endThreshold = ORIGINAL_WIDTH - (CARD_WIDTH / 2);
          const startThreshold = CARD_WIDTH / 2;

          if (scrollLeft >= endThreshold) {
            scrollRef.current.scrollLeft = scrollLeft - ORIGINAL_WIDTH;
          } else if (scrollLeft <= -startThreshold) {
            scrollRef.current.scrollLeft = scrollLeft + ORIGINAL_WIDTH;
          }
        }
      }, 150);
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [CARD_WIDTH, ORIGINAL_WIDTH]);

  // Fermer modal au clic ou ESC
  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

  // Condition pour desktop modal ( > 767px)
  const isDesktop = window.innerWidth >= 768;

  return (
    <section ref={ref} id="galerie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#04bfad]">Découvrez la gamme GlycoSafe</h2>
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
                <div
                  key={`${i}`} // Key unique avec duplication
                  className={`relative flex-shrink-0 w-full md:w-80 md:w-96 snap-center transition-all duration-300 hover:scale-105 hover:z-10 group cursor-pointer ${
                    originalIndex % 2 === 0 ? 'mt-0' : 'mt-4 md:mt-8' // Offset alterné pour chevauchement
                  }`}
                  onClick={() => isDesktop && setSelectedImage(img)} // Modal seulement sur desktop
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
                </div>
              );
            })}
          </div>

          
        </div>
        {/* Boutons de navigation – visibles seulement sur desktop, placés en dessous et centrés */}
          <div className="hidden md:flex justify-center space-x-6 mt-6">
            <button
              onClick={scrollToPrev}
              className="bg-[#04bfad]/80 hover:bg-white rounded-full p-3 shadow-lg z-10 transition-all duration-200 hover:shadow-xl flex items-center justify-center w-12 h-12"
              aria-label="Image précédente"
            >
              ←
            </button>
            <button
              onClick={scrollToNext}
              className="bg-[#04bfad]/80 hover:bg-white rounded-full p-3 shadow-lg z-10 transition-all duration-200 hover:shadow-xl flex items-center justify-center w-12 h-12"
              aria-label="Image suivante"
            >
              →
            </button>
          </div>
      </div>

      {/* Modal pour zoom (desktop only) */}
      <AnimatePresence>
        {selectedImage && isDesktop && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            onKeyDown={closeModal}
            tabIndex={-1}
          >
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            {/* Bouton close */}
            <motion.button
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={closeModal}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>
            {/* Caption en bas de modal si y'en a */}
            {selectedImage.caption && (
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-3 rounded-lg max-w-md text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
              >
                <p className="font-semibold text-sm">{selectedImage.caption}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;