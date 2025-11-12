function Product() {
  return (
    <section id="produit" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Le Protège-Capteur KittoFab</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
            📷 [Photo du produit ici]
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Caractéristiques techniques</h3>
            <ul className="space-y-3 text-gray-700">
              <li>✔️ Épaisseur : 1.2 mm</li>
              <li>✔️ Poids : 3.8 g</li>
              <li>✔️ Compatibilité : Freestyle Libre 1/2/3, Dexcom G6/G7</li>
              <li>✔️ Durée de vie : 6+ mois</li>
              <li>✔️ Fabriqué en France</li>
            </ul>
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <p className="font-bold text-primary text-xl">Prix : 14,90 €</p>
              <p className="text-sm text-gray-600">Livraison gratuite dès 3 unités</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;