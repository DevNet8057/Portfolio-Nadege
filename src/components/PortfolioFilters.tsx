import * as React from "react";

interface PortfolioFiltersProps {
  darkMode: boolean;
  activePortfolioFilter: string;
  setActivePortfolioFilter: (cat: string) => void;
}

const FILTERS = ["Tous", "Articles", "Vidéos", "Photos"];

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  darkMode,
  activePortfolioFilter,
  setActivePortfolioFilter,
}) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActivePortfolioFilter(cat)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              activePortfolioFilter === cat
                ? darkMode
                  ? "bg-gradient-to-r from-purple-800 to-blue-600 hover:from-purple-800 hover:to-blue-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-purple-800 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                : darkMode
                ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-lg hover:shadow-xl"
            } whitespace-nowrap cursor-pointer`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioFilters;
