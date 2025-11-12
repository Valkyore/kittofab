import { motion } from 'framer-motion';

function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=entropy",
      alt: "Protège-capteur en silicone bleu, vue de face",
      caption: "Vue frontale – Protection 360°"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=entropy",
      alt: "Protège-capteur porté au bras pendant le sport",
      caption: "En action – Résistant à l'eau"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=entropy",
      alt: "Détail silicone médical, hypoallergénique",
      caption: "Matériau premium – Silicone médical"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=entropy",
      alt: "Protège-capteur en plusieurs couleurs",
      caption: "Personnalisation – 6 couleurs disponibles"
    }
  ];

  return (
    <section id="galerie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Galerie : Découvrez KittoFab</h2>
        <div className="relative overflow-hidden">
          {/* Conteneur principal pour l'overlap */}
          <div className="flex space-x-4 md:space-x-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {images.map((img, i) => (
              // ← ICI : Remplace <div> par <motion.div> pour l'animation !
              <motion.div
                key={i}
                className={`relative flex-shrink-0 w-80 md:w-96 snap-center transition-all duration-300 hover:scale-105 hover:z-10 group ${
                  i % 2 === 0 ? 'mt-0' : 'mt-4 md:mt-8' // Offset alterné pour chevauchement
                }`}
                initial={{ opacity: 0, x: 50, rotate: -5 }}  // Départ : invisible + décalé droite
                animate={{ opacity: 1, x: 0, rotate: 0 }}    // Arrivée : visible + centrée
                transition={{ duration: 0.6, delay: i * 0.2 }}  // Délai progressif (cascade)
                whileHover={{ scale: 1.05, rotate:5,transition: { duration: 0.2 } }}      // Hover smooth (bonus)
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
            ))}
          </div>
        </div>
        {/* Bouton pour plus d'images (optionnel) */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition"
          >
            Voir plus de photos
          </a>
        </div>
      </div>
    </section>
  );
}

export default Gallery;