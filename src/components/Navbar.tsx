import React from 'react';

interface NavbarProps {
  darkMode: boolean;
  scrollToSection: (section: string) => void;
  activeTab: string;
  toggleDarkMode: () => void;
}

const Navbar = ({
  darkMode,
  scrollToSection,
  activeTab,
  toggleDarkMode,
}: NavbarProps) => {
  const navLinkStyle = {
    position: 'relative' as const,
    display: 'inline-block',
    padding: '8px 4px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  const underlineStyle = (isActive: boolean) => ({
    position: 'absolute' as const,
    bottom: '0',
    left: '50%',
    width: isActive ? '100%' : '0',
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease-out'
  });

  const NavLink = ({ 
    section, 
    label, 
    tabName 
  }: { 
    section: string; 
    label: string; 
    tabName: string; 
  }) => {
    const isActive = activeTab === tabName;
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(section);
        }}
        style={navLinkStyle}
        className={
          isActive
            ? darkMode
              ? "text-blue-400"
              : "text-blue-600"
            : darkMode 
            ? "text-gray-300 hover:text-blue-400" 
            : "text-gray-700 hover:text-blue-600"
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
        <span 
          style={{
            ...underlineStyle(isActive),
            width: isActive ? '100%' : isHovered ? '100%' : '0'
          }}
        />
      </a>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Nadège Yugain
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink section="hero" label="Accueil" tabName="accueil" />
          <NavLink section="about" label="À propos" tabName="about" />
          <NavLink section="services" label="Services" tabName="services" />
          <NavLink section="portfolio" label="Portfolio" tabName="portfolio" />
          <NavLink section="contact" label="Contact" tabName="contact" />
        </nav>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <button className={`md:hidden ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;