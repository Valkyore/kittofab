function Features() {
  const features = [

    { icon: "🛡️", title: "Protection 360°", desc: "Absorbe les chocs, protège des rayures" },
    { icon: "💧", title: "Résistant à l'eau", desc: "Baignade, douche, sport, pluie" },
    { icon: "🌿", title: "Silicone médical", desc: "Hypoallergénique, sans latex" },
    { icon: "🔄", title: "Facile à nettoyer", desc: "Rinçable à l’eau savonneuse" },
    { icon: "🎨", title: "6 couleurs", desc: "Discret ou flashy, à votre style" },
    { icon: "⚡", title: "Ne bloque pas le signal", desc: "Compatibilité totale capteur" }

  ];

  return (
    <section id="fonctionnalites" className="py-20 bg-primary">
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