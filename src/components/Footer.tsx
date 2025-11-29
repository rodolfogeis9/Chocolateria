const Footer = () => {
  return (
    <footer className="bg-chocolate text-cream py-6 mt-16">
      <div className="section-container flex flex-col md:flex-row items-center justify-between text-sm space-y-3 md:space-y-0">
        <span>© {new Date().getFullYear()} Chocolatería Temuco. Todos los derechos reservados.</span>
        <span className="text-cream/80">Hecho con cariño y chocolate.</span>
      </div>
    </footer>
  );
};

export default Footer;
