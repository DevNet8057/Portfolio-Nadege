import React from "react";

interface FooterProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, scrollToSection }) => (
  <footer
    className={`py-10 ${
      darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-gray-200"
    }`}
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Nadège Yugain</h2>
          <p className="mt-2">Journaliste & Rédactrice Professionnelle</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            onClick={() => scrollToSection("hero")}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Accueil
          </a>
          <a
            onClick={() => scrollToSection("about")}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            À propos
          </a>
          <a
            onClick={() => scrollToSection("services")}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Services
          </a>
          <a
            onClick={() => scrollToSection("portfolio")}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Portfolio
          </a>
          <a
            onClick={() => scrollToSection("contact")}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>
      <hr className="my-8 border-gray-700" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} Nadège Yugain. Tous droits réservés.
        </p>
        <div className="mt-4 md:mt-0">
          <div className="text-center md:text-right mb-2">
            <p className="text-sm font-medium">Développé par l'équipe DevNet</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 group">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <a
                href="mailto:contact@devcraft.com"
                className="text-sm hover:text-blue-400 transition-all duration-300 hover:scale-105 transform"
              >
                devnet8057@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <a
                href="https://nl.linkedin.com/in/benilde-njeutchou-3a60b926a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-blue-400 transition-all duration-300 hover:scale-105 transform flex items-center gap-1"
              >
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;