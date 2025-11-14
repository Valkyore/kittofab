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

  return (
    <section id="fonctionnalites" className="py-20 bg-[#80d2f2]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Pourquoi choisir KittoFab ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;