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
        <div className="mt-4 md:mt-0 flex gap-4">
          <a
            href="#"
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Mentions légales
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Politique de confidentialité
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
