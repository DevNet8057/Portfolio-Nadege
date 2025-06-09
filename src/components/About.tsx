import React from "react";
import photoPortrait from "../assets/images/photoPortrait.jpeg"
import CVNadege from '../assets/CV Professionnel nadege yugain.pdf';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => (
  <section
    id="about"
    className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 overflow-hidden rounded-lg shadow-xl">
          <img
            src= {photoPortrait}
            alt="photo de Nadège Yugain"
            className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-6">À propos de moi</h2>
          <p className="text-lg mb-4">
            Journaliste expérimentée avec plus de 8 ans d'expérience dans les médias nationaux,je me suis spécialisée dans le reportage, l'entretien et l'analyse. Mon parcours m'a permis d'occuper des postes clés tels que Chargée des éditions et programmes chez Infotv, Directrice de l'information à CSPTV, et Directrice des programmes à Afrique+ TV. Ces expériences ont renforcé ma capacité à produire des contenus précis et inspirants, tout en développant une forte adaptabilité et un esprit critique aiguisé.
          </p>
          <p className="text-lg mb-6">
          Ma démarche journalistique repose sur la rigueur, l'éthique et l'empathie. Formée au BTS en Journalisme à l'Institut Universitaire Siantou, j'ai débuté ma carrière en coordonnant les éditions de journaux à Radio-Siantou, avant de collaborer avec des structures telles que Canal2 International et Radio-Royal TV. Mes compétences englobent la rédaction et l'édition, la conduite d'interviews, la réalisation de reportages de terrain, la vérification des faits, ainsi que la présentation et la réalisation de journaux. Chaque histoire est pour moi une opportunité de donner une voix à ceux qui n'en ont pas, en la racontant avec précision et sensibilité.
           
          </p>
          <p className="text-lg mb-6">En parallèle de mon activité journalistique, je m'intéresse vivement à l'entrepreneuriat et au développement personnel. Bien que je n'aie pas encore eu l'occasion de participer activement à des événements de formation, de réseautage ou de collaboration, je suis ouverte à toute opportunité en ce sens. Je considère chaque interaction comme une chance d'apprentissage, convaincue que les échanges et les conseils sont essentiels pour progresser et enrichir ma pratique professionnelle.


            </p> 
          
          <a
            href={CVNadege}
            download="CV_Nadege_Yugain.pdf"
            className={`inline-flex items-center gap-2 px-6 py-3 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors shadow-lg`}
          >
            <i className="fas fa-download"></i>
            Télécharger mon CV
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default About;
