import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import { ABOUT_TEXT, CONTACT_INFO, GENERAL_QUERY_MESSAGE, WHATSAPP_NUMBER } from '../config/settings';
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import WhatsAppButton from '../components/WhatsAppButton';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const { items } = useCart();
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingCart(window.innerWidth < 1024 && window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-cream min-h-screen text-text-dark">
      <Header />
      <Hero />
      <main className="section-container">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <ProductList />
            <section id="quienes-somos" className="py-16 space-y-4">
              <h2 className="text-3xl font-bold text-chocolate">Quiénes somos</h2>
              <p className="leading-relaxed text-text-dark/80 whitespace-pre-line">
                {ABOUT_TEXT}
              </p>
            </section>

            <section id="contacto" className="py-16 space-y-4">
              <h2 className="text-3xl font-bold text-chocolate">Contacto</h2>
              <div className="bg-white rounded-2xl p-6 card-shadow space-y-3">
                <p className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-chocolate" />
                  <span>{CONTACT_INFO.address}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-chocolate" />
                  <a href={CONTACT_INFO.phoneLink} className="text-chocolate font-semibold">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p className="text-text-dark/80">{CONTACT_INFO.note}</p>
                <WhatsAppButton
                  label="Escríbenos"
                  message={GENERAL_QUERY_MESSAGE}
                  number={WHATSAPP_NUMBER}
                  icon={<FaWhatsapp />}
                />
              </div>
            </section>
          </div>

          <div className="hidden lg:block">
            <Cart />
          </div>
        </div>
      </main>

      {showFloatingCart && (
        <div className="fixed bottom-6 right-6 lg:hidden">
          <a
            href="#productos"
            className="flex items-center space-x-2 bg-chocolate text-cream px-4 py-3 rounded-full shadow-lg"
          >
            <span>Carro ({items.length})</span>
          </a>
        </div>
      )}

      <div className="lg:hidden section-container pb-12">
        <Cart />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
