import React from "react";

interface HeroProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ darkMode, scrollToSection }) => (
  <section
    id="hero"
    className="relative pt-20 overflow-hidden"
    style={{
      backgroundImage: `linear-gradient(to right, ${
        darkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.2)"
      }, ${
        darkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(255, 255, 255, 0.6)"
      }), url('https://readdy.ai/api/search-image?query=Professional%20journalism%20workspace%20with%20camera%2C%20notebook%2C%20laptop%2C%20and%20coffee%20cup%20on%20wooden%20desk%20with%20soft%20natural%20lighting%2C%20modern%20office%20environment%2C%20high%20quality%20professional%20setup&width=1440&height=600&seq=hero1&orientation=landscape')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "600px",
    
    }}
  >
    <div className="container mx-auto px-4 h-full flex  items-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}">
          Journaliste & Rédactrice Professionnelle
        </h1>
        <p className="text-xl mb-8">
          Raconter des histoires qui inspirent, informent et transforment.
          Spécialiste en journalisme d'investigation et reportages de terrain.
        </p>
        <button
          onClick={() => scrollToSection("portfolio")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg"
        >
          Découvrir mon portfolio
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
