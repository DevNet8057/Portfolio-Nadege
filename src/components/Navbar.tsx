import '@fortawesome/fontawesome-free/css/all.min.css';



interface NavbarProps {
  // Déclare ici tes props
}

const Navbar = (props: NavbarProps) => {
  return (
     <header className={`fixed w-full z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Nadège Yugain</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection('hero')}
              className={`${activeTab === 'accueil' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`${activeTab === 'about' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`${activeTab === 'services' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`${activeTab === 'portfolio' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${activeTab === 'contact' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button className="md:hidden !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Navbar;