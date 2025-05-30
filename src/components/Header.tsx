import React, { useState } from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  scrollToSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  activeTab,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed w-full z-50 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Nadège Yugain</h1>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${
                activeTab === item.id
                  ? darkMode
                    ? "text-blue-400"
                    : "text-blue-600"
                  : ""
              } hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            } !rounded-button whitespace-nowrap cursor-pointer`}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          {/* Mobile menu button */}
          <button
            className="md:hidden !rounded-button whitespace-nowrap cursor-pointer"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Ouvrir le menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav
          className={`md:hidden px-4 pb-4 pt-2 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded ${
                  activeTab === item.id
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
