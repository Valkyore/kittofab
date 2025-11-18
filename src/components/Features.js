import { useState } from 'react';
import { motion } from 'framer-motion';

function Features() {
  const features = [
    { icon: "🛡️", title: "Protection 360°", desc: "Recouvre le capteur de façon ergonomique efficace" },
    { icon: "💧", title: "Résistant à l'eau", desc: "Baignade, douche, sport, pluie" },
    { icon: "🌿", title: "Matériaux premium", desc: "Silicone doux, spandex, sans BPA, Hypoallergénique, sans latex" },
    { icon: "🔄", title: "Facile à nettoyer", desc: "et réutilisable" },
    { icon: "🎨", title: "Divers choix de couleurs", desc: "Discret ou flashy, à votre style" },
    { icon: "📶", title: "Ne bloque pas le signal", desc: "Aucune interférence avec le capteur" },
    { icon: "🌬️", title: "Pas d'effet garrot", desc: "Confort sans constriction, circulation libre du sang grace à sa boucle ajustable" },
    { icon: "☀️", title: "Pour toutes les saisons", desc: "Confort et adaptabilité toute l'année" },
    { icon: "♻️", title: "Réutilisable", desc: "Compatibilité avec les capteurs FREESTYLE LIBRE 2 ET 2+, FREESTYLE SELECT" },
  ];

  // Variants pour les effets hover (subtils et desktop-only via classes)
  const cardVariants = {
    initial: { opacity: 1 },
    whileHover: { 
      scale: 1.10, 
      transition: { duration: 0.3, ease: 'easeOut' } 
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.1, 
      rotate: 5, // Petite rotation fun pour l'icône
      transition: { duration: 0.4, ease: 'easeOut' } 
    },
  };

  return (
    <motion.section
      id="fonctionnalites"
      className="py-20 relative overflow-hidden"
      initial={{ background: 'linear-gradient(135deg, #80d2f2 0%, #04bfad 100%)' }}
      animate={{
        background: [
          'linear-gradient(135deg, #80d2f2 0%, #04bfad 100%)',
          'linear-gradient(135deg, #04bfad 0%, #80d2f2 100%)',
          'linear-gradient(135deg, #80d2f2 0%, #04bfad 100%)',
        ],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Pourquoi choisir GlycoSafe ?</h2>
        
        {/* Version desktop : grille 3 colonnes avec hover animé */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-8 rounded-xl shadow-lg text-center md:hover:shadow-xl md:hover:shadow-[#04bfad]/20 transition-shadow duration-300 cursor-pointer" // Shadow boost desktop
              variants={cardVariants}
              whileHover="whileHover"
            >
              <motion.div 
                className="text-5xl mb-4"
                variants={iconVariants}
                whileHover="whileHover"
              >
                {f.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Version mobile : carousel horizontal swipeable infini (inchangé) */}
        <div className="md:hidden">
          <Carousel features={features} />
        </div>
      </div>
    </motion.section>
  );
}

// Composant séparé pour le carousel mobile infini (inchangé)
function Carousel({ features }) {
  const numSlides = features.length;
  const duplicatedSlides = [...features, ...features]; // Duplication pour loop seamless
  const totalSlides = duplicatedSlides.length; // 18
  const slideWidth = 100 / totalSlides; // ~5.55% par slide (pour que chaque prenne 100% du container)
  const [currentIndex, setCurrentIndex] = useState(numSlides); // Démarre au début de la 2e copie (index 9)

  const handleDragEnd = (e, info) => {
    const offset = info.offset.x / window.innerWidth;
    let newIndex = currentIndex;

    if (offset < -0.2) { // Swipe gauche : suivant
      newIndex = currentIndex + 1;
      if (newIndex === totalSlides) {
        newIndex = numSlides; // Reset au début de la 2e copie (équivaut au 1er)
      }
    } else if (offset > 0.2) { // Swipe droite : précédent
      newIndex = currentIndex - 1;
      if (newIndex === numSlides - 1) {
        newIndex = totalSlides - 1; // Aller à la fin de la 2e copie (équivaut au dernier)
      }
    }

    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(numSlides + index); // Navigue vers la 2e copie pour seamless
  };

  const dotIndex = currentIndex % numSlides; // Pour les dots : position réelle (0-8)

  return (
    <div className="overflow-hidden rounded-xl">
      <motion.div
        className="flex"
        style={{ width: `${totalSlides * 100}%` }} // Largeur totale du track
        drag="x"
        dragConstraints={false} // Libre pour swipe infini
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: `-${currentIndex * slideWidth}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        initial={{ x: `-${numSlides * slideWidth}%` }}
      >
        {duplicatedSlides.map((f, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 bg-white p-8 text-center"
            style={{ width: `${slideWidth}%` }} // Largeur de chaque slide
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Dots pour navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === dotIndex ? 'bg-[#04bfad]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;