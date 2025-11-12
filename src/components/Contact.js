function Contact() {
  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactez-nous</h2>
        <p className="text-lg mb-8">
          Une question ? Besoin d’un devis pro ? Écrivez-nous !
        </p>
        <form className="space-y-6 max-w-xl mx-auto">
          <input type="text" placeholder="Nom" className="w-full p-4 rounded-lg text-gray-900" />
          <input type="email" placeholder="Email" className="w-full p-4 rounded-lg text-gray-900" />
          <textarea placeholder="Votre message" rows="5" className="w-full p-4 rounded-lg text-gray-900"></textarea>
          <button type="submit" className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition w-full">
            Envoyer
          </button>
        </form>
        <p className="mt-8 text-sm">
          📧 contact@silicoguard.fr | 📞 06 12 34 56 78
        </p>
      </div>
    </section>
  );
}

export default Contact;
