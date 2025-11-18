import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Brevet() {
  // Paths des images – tes fichiers sont déjà bons
  const packagingImages = [
    { src: `${process.env.PUBLIC_URL}/images/boite16.jpg`, alt: 'Packaging petit format' },
    { src: `${process.env.PUBLIC_URL}/images/boite32.jpg`, alt: 'Packaging format moyen' },
    { src: `${process.env.PUBLIC_URL}/images/BOITESVRAC.jpg`, alt: 'Packaging grand format' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-transition fondu toutes les 5s (optimisé : deps seulement sur packagingImages.length)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % packagingImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [packagingImages.length]);

  // Points vendeurs memoïsés – emojis remplacés par images
  const sellingPoints = useMemo(() => [
    { icon: `${process.env.PUBLIC_URL}/images/certificate.svg`, text: "Breveté et Unique au Monde" },
    { icon: `${process.env.PUBLIC_URL}/images/innovation.svg`, text: "Une Innovation pour une Protection Inégalée" },
    { icon: `${process.env.PUBLIC_URL}/images/hospital.svg`, text: "Exclusivement pour les Pharmacies & les Entreprises Médicales" },
    { icon: `${process.env.PUBLIC_URL}/images/research.svg`, text: "Amélioration et Evolution pour le developpement de nouveau produits" },
  ], []);

  // Variants constants (déjà optimisés)
  const sellingListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const sellingItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Helper pour animer le texte par caractères (effet écriture) – memoïsé par texte pour perf
  const animateText = useMemo(() => (text) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1, delay: i * 0.03 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  }, []);

  // Textes pré-calculés pour éviter re-split à chaque render
  const titleText = useMemo(() => animateText('Notre Produit 100% Breveté'), [animateText]);
  const para1Text = useMemo(() => animateText('GlycoSafe n\'est pas qu\'un produit : c\'est une innovation unique au monde qui protège vos capteurs avec élégance et efficacité.'), [animateText]);
  const para2Text = useMemo(() => animateText('Conçu pour la vie active comme celle de tous les jours, nous collaborons exclusivement avec pharmacies et entreprises médicales pour une distribution simple, rapide et fiable.'), [animateText]);
  const para3Text = useMemo(() => animateText('GlycoSafe evolue constament pour s\'adapter à la demande et aux nombreux modèle de capteur disponible sur le marché'), [animateText]);
  const para4Text = useMemo(() => animateText('Transformez la routine en confiance absolue !'), [animateText]);

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
            transition={{ duration: 0.5, ease: 'easeInOut' }}
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
            className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 object-contain align-middle"
          />
          <span className="align-middle whitespace-nowrap">BREVET EXCLUSIF</span>
        </motion.div>
      </div>

      {/* Contenu principal centré, overlay attractif */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={contentVariants}
      >
        {/* Titre accrocheur avec glow et stagger mots (de gauche à droite) */}
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-2xl"
          variants={titleContainerVariants}
        >
          {titleText}
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
              <img
                src={point.icon}
                alt=""
                className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0 object-contain mr-3" // Agrandi : w-8 h-8 mobile, w-10 h-10 desktop
              />
              <span className="font-semibold">{point.text}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Texte descriptif vendeur avec stagger par caractères (effet écriture de gauche à droite) */}
        <motion.p 
          className="text-xl leading-relaxed mb-8 opacity-90"
          variants={contentVariants}
        >
          <span className="block mb-4">{para1Text}</span>
          <span>{para2Text}</span>
          <span className="block mt-4">{para3Text}</span>
          <span className="block mt-4">{para4Text}</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Brevet;