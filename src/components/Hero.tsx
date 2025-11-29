import { useEffect, useState } from 'react';
import { HERO_CONTENT } from '../config/settings';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const heroImages = [
  '/images/chocolate-250g.jpg',
  '/images/alfajores-12.jpg',
  '/images/chocolate-500g.jpg',
  '/images/alfajores-24.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex((index + heroImages.length) % heroImages.length);
  };

  return (
    <section id="inicio" className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt="Chocolate artesanal"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      <div className="absolute inset-0 section-container flex flex-col justify-center text-cream space-y-6">
        <p className="badge w-fit bg-cream/20 text-cream border border-cream/30">
          Hecho a mano en Temuco
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
          {HERO_CONTENT.title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-cream/90">
          {HERO_CONTENT.subtitle}
        </p>
        <div>
          <a href="#productos" className="button-gold inline-block">
            {HERO_CONTENT.ctaLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center space-x-3 text-cream/80">
        <button
          onClick={() => goTo(currentIndex - 1)}
          className="p-3 rounded-full bg-cream/20 hover:bg-cream/30 transition"
          aria-label="Anterior"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          className="p-3 rounded-full bg-cream/20 hover:bg-cream/30 transition"
          aria-label="Siguiente"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Hero;
