function Product() {
  return (
    <section id="produit" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#04bfad]">Le Protège-Capteur Glycosafe</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Caractéristiques techniques</h3>
              <p className="text-gray-700 mb-4 font-semibold">
                Le protège-capteur <span className="text-[#80d2f2]">Glycosafe</span> est un dispositif conçu pour sécuriser un capteur glycémique fixé sur la peau, généralement au niveau du bras.
                Habituellement, ces capteurs utilisés dans le suivi du diabète ne sont maintenus que par une simple couche adhésive. <br/> <br/>

                Grâce à sa conception brevetée, le protège-capteur offre une protection fiable permettant à l’utilisateur de pratiquer des activités physiques,
                de se changer, de se doucher ou même de nager, sans craindre que le capteur ne se décolle ou ne s’endommage.
              </p>
            </div>
            <div className="mt-6 bg-gray-200 border-2 rounded-xl w-full h-96 flex items-center justify-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/6.JPG`}
                alt="Protège-Capteur KittoFab"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="order-first md:order-none"> {/* Optionnel : pour inverser sur mobile si besoin */}
            <div className=" bg-gray-100 rounded-xl w-full h-96 flex items-center justify-center mb-6">
              <img
                src={`${process.env.PUBLIC_URL}/images/1530550.jpg`}
                alt="Protège-Capteur KittoFab"
                className="max-w-full max-h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-700 font-semibold">
                Il contribue à prolonger la durée de vie du capteur en limitant les risques d’arrachement et améliore la liberté de mouvement au quotidien.
                Sa forme ergonomique épouse parfaitement les contours du capteur afin de le stabiliser efficacement, sans exercer de pression directe.
                <br/><br/>
                Fabriqué en silicone souple, flexible et doux, il assure un contact agréable avec la peau tout en évitant les irritations, même sur les peaux sensibles. 
                Il garantit ainsi un confort optimal, même lors d’une utilisation prolongée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;

/*
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
*/