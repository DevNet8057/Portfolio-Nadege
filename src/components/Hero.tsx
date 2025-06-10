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
        darkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(17, 24, 39, 0.5)"
      }, ${
        darkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(17, 24, 39, 0.2)"
      }), url('https://readdy.ai/api/search-image?query=Professional%20journalism%20workspace%20with%20camera%2C%20notebook%2C%20laptop%2C%20and%20coffee%20cup%20on%20wooden%20desk%20with%20soft%20natural%20lighting%2C%20modern%20office%20environment%2C%20high%20quality%20professional%20setup&width=1440&height=600&seq=hero1&orientation=landscape')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "600px",
    
    }}
  >
    <div className="container mx-auto px-4 h-full flex  items-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white ">
          Journaliste Professionnelle
        </h1>
        <p className="text-xl mb-8 text-white">
          Raconter des histoires qui inspirent, informent et transforment.
          Spécialiste en reportage et entretien .
        </p>
        <button
  onClick={() => scrollToSection("portfolio")}
  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
    darkMode
      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
  }`}
>
  Découvrir mon portfolio
</button>


      </div>
    </div>
  </section>
);

export default Hero;
