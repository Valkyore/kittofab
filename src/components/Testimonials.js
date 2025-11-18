function Testimonials() {
  const testimonials = [
    { name: "Marie D.", text: "Enfin un protège-capteur qui tient vraiment ! Plus de décollement après le sport." },
    { name: "Lucas T.", text: "Mon fils ne l’enlève jamais. Discret et solide." },
    { name: "Sophie L.", text: "Service client au top, envoi rapide. Je recommande !" }
  ];

  return (
    <section 
      className="py-20 mx-6 md:mx-0 overflow-hidden relative" // Arrondi des coins + overflow pour clipper proprement
      style={{
        background: 'linear-gradient(to top, #80d2f2 0%, white 100%)' // Dégradé statique du bas (bleu clair) vers le haut (blanc)
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-600">Ils nous font confiance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p className="italic mb-4">"{t.text}"</p>
              <p className="font-semibold text-[#04bfad]">- {t.name}</p> {/* Couleur primary pour cohérence */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;