import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Product from './components/Product';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <Product />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;