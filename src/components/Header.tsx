import { FaWhatsapp } from 'react-icons/fa';
import { GENERAL_QUERY_MESSAGE, WHATSAPP_NUMBER } from '../config/settings';
import WhatsAppButton from './WhatsAppButton';

const Header = () => {
  const links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#productos', label: 'Productos' },
    { href: '#quienes-somos', label: 'Quiénes somos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur shadow-sm">
      <div className="section-container flex items-center justify-between py-4">
        <div className="text-2xl font-bold text-chocolate">Chocolatería Temuco</div>
        <nav className="hidden md:flex space-x-6 text-sm font-semibold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-dark hover:text-chocolate transition"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <WhatsAppButton
            label="WhatsApp"
            message={GENERAL_QUERY_MESSAGE}
            number={WHATSAPP_NUMBER}
            variant="outline"
            icon={<FaWhatsapp />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
