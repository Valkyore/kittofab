import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Brevet() {
  // Paths des images – tes fichiers sont déjà bons
  const packagingImages = [
    { src: `${process.env.PUBLIC_URL}/images/boite16.jpg`, alt: 'Packaging petit format' },
    { src: `${process.env.PUBLIC_URL}/images/boite32.jpg`, alt: 'Packaging format moyen' },
    { src: `${process.env.PUBLIC_URL}/images/BOITESVRAC.jpg`, alt: 'Packaging grand format' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-transition fondu toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % packagingImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [packagingImages.length]);

  // Points vendeurs pour plus d'impact
  const sellingPoints = [
    "🔒 Breveté et Unique au Monde",
    "💎 Une Innovation pour une Protection Inégalée",
    "🏥 Exclusivement pour les Pharmacies & les Entreprises Médicales",
    "⭐ Amélioration et Evolution pour le developpement de nouveau produits",
  ];

  // Variants pour stagger sur les points vendeurs (déjà là, boosté)
  const sellingListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const sellingItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Variants pour stagger sur le titre (mots qui glissent de gauche à droite)
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }, // Délai 0.08s par mot, start après 0.2s
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -30 }, // Départ de gauche pour slide droite
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Helper pour animer le texte par caractères (effet écriture de gauche à droite)
  const animateText = (text) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0, x: -10 }} // Départ de gauche pour slide droite
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1, delay: i * 0.03 }} // Stagger 0.03s par char pour effet écriture fluide
      >
        {char === ' ' ? '\u00A0' : char} {/* Espace non-breaking pour éviter collapse */}
      </motion.span>
    ));
  };

  // Variants pour le paragraphe et points (slide-up simple)
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images avec fade enchaîné */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${packagingImages[currentImageIndex].src})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }} // Transition plus rapide (0.5s au lieu de 0.9s)
          />
        </AnimatePresence>
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Badge breveté flottant pour accroche visuelle */}
        <motion.div
          className="absolute top-8 right-8 bg-white/100 backdrop-blur-sm text-[#04bfad] font-bold px-4 py-2 rounded-full shadow-xl z-20 flex items-center space-x-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/verifie.gif`}
            alt="Arrow Spin"
            className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 object-contain"
          />
          BREVET EXCLUSIF
        </motion.div>
      </div>

      {/* Contenu principal centré, overlay attractif */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Déclenche au 30% visible
        variants={contentVariants}
      >
        {/* Titre accrocheur avec glow et stagger mots (de gauche à droite) */}
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-2xl"
          variants={titleContainerVariants}
        >
          {animateText('Notre Produit 100% Breveté')} {/* Changé en animateText pour chars */}
        </motion.h2>

        {/* Points vendeurs animés (stagger pour dynamisme) */}
        <motion.ul 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sellingListVariants}
        >
          {sellingPoints.map((point, i) => (
            <motion.li 
              key={i}
              className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              variants={sellingItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(4, 191, 173, 0.2)' }}
            >
              <span className="mr-3">{point.split(' ')[0]}</span>
              <span className="font-semibold">{point.split(' ').slice(1).join(' ')}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Texte descriptif vendeur avec stagger par caractères (effet écriture de gauche à droite) */}
        <motion.p 
          className="text-xl leading-relaxed mb-8 opacity-90"
          variants={contentVariants}
        >
          <span className="block mb-4">{animateText('GlycoSafe n\'est pas qu\'un produit : c\'est une innovation unique au monde qui protège vos capteurs avec élégance et efficacité.')}</span>
          <span>{animateText('Conçu pour la vie active comme celle de tous les jours, nous collaborons exclusivement avec pharmacies et entreprises médicales pour une distribution simple, rapide et fiable.')}</span>
                    <span className="block mt-4">{animateText('GlycoSafe evolue constament pour s\'adapter à la demande et aux nombreux modèle de capteur disponible sur le marché')}</span>
          <span className="block mt-4">{animateText('Transformez la routine en confiance absolue !')}</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Brevet;