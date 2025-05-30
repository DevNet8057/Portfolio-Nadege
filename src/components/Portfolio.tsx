import React from "react";
import type { PortfolioItem } from "../types";

interface PortfolioProps {
  darkMode: boolean;
  activePortfolioFilter: string;
  setActivePortfolioFilter: (cat: string) => void;
  portfolioItems: PortfolioItem[];
}

const FILTERS = ["Tous", "Articles", "Vidéos", "Podcasts"];

const Portfolio: React.FC<PortfolioProps> = ({
  darkMode,
  activePortfolioFilter,
  setActivePortfolioFilter,
  portfolioItems,
}) => {
  return (
    <section
      id="portfolio"
      className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Portfolio</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes travaux les plus significatifs dans
            différents formats et médias.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioFilter(cat)}
                className={`px-4 py-2 rounded-md ${
                  activePortfolioFilter === cat
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span
                  className={`text-sm ${
                    darkMode ? "text-blue-300" : "text-blue-200"
                  } mb-2`}
                >
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => alert("Fonctionnalité en cours de développement")}
            className={`px-6 py-3 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors shadow-lg !rounded-button whitespace-nowrap cursor-pointer`}
          >
            Voir plus de projets
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
