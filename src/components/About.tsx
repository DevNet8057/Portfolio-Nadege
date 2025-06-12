import React, { useState } from "react";
import photoPortrait from "../assets/images/photoPortrait.jpeg"
import CVNadege from '../assets/CV Professionnel nadege yugain.pdf';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const [expandedParagraph, setExpandedParagraph] = useState(0);

  const paragraphs = [
    "Journaliste expérimentée avec plus de huit ans d’expérience dans les médias nationaux, je me suis spécialisée dans le reportage, les entretiens et l’analyse. Mon parcours m’a permis d’occuper des postes clés, tels que chargée des éditions et des programmes chez InfoTV, directrice de l’information à CSP TV, puis directrice des programmes à Afrique+ TV. Ces expériences ont renforcé ma capacité à produire des contenus à la fois rigoureux et inspirants, tout en développant une forte adaptabilité et un esprit critique aiguisé.",
    "Ma démarche journalistique repose sur la rigueur, l’éthique et l’empathie. Formée au BTS Journalisme à l’Institut Universitaire Siantou, j’ai débuté ma carrière en coordonnant les éditions de journaux à Radio‑Siantou, avant de collaborer avec des structures telles que Canal 2 International et Radio Royal TV. Mes compétences incluent la rédaction et l’édition, la conduite d’interviews, la réalisation de reportages de terrain, la vérification des faits, ainsi que la présentation et la réalisation de journaux. Chaque histoire est pour moi une opportunité de donner une voix à celles et ceux qui n’en ont pas, en la racontant avec précision et sensibilité.",
    "Parallèlement à ma carrière journalistique, je m’intéresse vivement à l’entrepreneuriat et au développement personnel. Bien que je n’aie pas encore eu l’occasion de participer activement à des événements de formation, de réseautage ou de collaboration, je suis ouverte à toute opportunité en ce sens. Je considère chaque interaction comme une chance d’apprentissage, convaincue que les échanges et les conseils sont essentiels pour progresser et enrichir ma pratique professionnelle."
  ];

  const handleExpandNext = () => {
    if (expandedParagraph < paragraphs.length - 1) {
      setExpandedParagraph(expandedParagraph + 1);
    }
  };

  const handleCollapsePrevious = () => {
    if (expandedParagraph > 0) {
      setExpandedParagraph(expandedParagraph - 1);
    }
  };

  return (
    <section
      id="about"
      className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 overflow-hidden rounded-lg shadow-xl">
            <img
              src={photoPortrait}
              alt="photo de Nadège Yugain"
              className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">À propos de moi</h2>
            
            {/* Version Desktop - Affichage normal */}
            <div className="hidden md:block">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Version Mobile - Affichage progressif */}
            <div className="block md:hidden">
              {paragraphs.slice(0, expandedParagraph + 1).map((paragraph, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg mb-2">{paragraph}</p>
                  
                  {/* Bouton "Lire la suite" pour le paragraphe actuel */}
                  {index === expandedParagraph && expandedParagraph < paragraphs.length - 1 && (
                    <button
                      onClick={handleExpandNext}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        darkMode 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      Lire la suite...
                    </button>
                  )}
                  
                  {/* Bouton "Réduire" pour revenir en arrière */}
                  {index === expandedParagraph && expandedParagraph > 0 && (
                    <button
                      onClick={handleCollapsePrevious}
                      className={`text-sm font-medium ml-4 transition-colors duration-200 ${
                        darkMode 
                          ? "text-gray-400 hover:text-gray-300" 
                          : "text-gray-600 hover:text-gray-700"
                      }`}
                    >
                      ← Réduire
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <a
              href={CVNadege}
              download="CV_Nadege_Yugain.pdf"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <i className="fas fa-download"></i>
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;