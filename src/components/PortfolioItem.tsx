import * as React from "react";
import type { PortfolioItem as PortfolioItemType } from "../types";
import LazyImage from "./LazyImage.tsx";

interface PortfolioItemProps {
  item: PortfolioItemType & { originalIndex?: number };
  darkMode: boolean;
  hoveredItem: number | null;
  onMouseEnter: (index: number | null) => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onArticleClick: (item: PortfolioItemType) => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  item,
  darkMode,
  hoveredItem,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onArticleClick,
}) => {
  const imageSrc =
    item.category === "Vidéos" ? item.thumbnail || item.image : item.image;

  console.log(`🎯 Rendering item:`, {
    id: item.id,
    title: item.title,
    category: item.category,
    imageSrc: imageSrc,
    hasValidImage: !!imageSrc,
  });

  return (
    <div
      className={`group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
        darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
      } w-full`}
      onMouseEnter={() => onMouseEnter(item.originalIndex ?? null)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Image/Video Container */}
      <div className="relative">
        <LazyImage
          src={imageSrc}
          alt={item.title || "Image portfolio"}
          className="w-full transition-transform duration-700 group-hover:scale-105"
          style={{
            height: "auto",
            ...(item.category !== "Photos" && { aspectRatio: "16/9" }),
          }}
        />

        {/* Video Play Icon */}
        {item.category === "Vidéos" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110">
              <svg
                className="w-5 h-5 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Overlay for hover effect */}
        <div
          className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            item.category === "Photos" ? "rounded-xl" : ""
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4">
        {/* Category Badge */}
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
            item.category === "Articles"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : item.category === "Vidéos"
              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
          }`}
        >
          {item.category}
        </span>

        {item.title && (
          <h3
            className={`text-xs sm:text-sm md:text-base font-bold mb-2 leading-tight ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: item.category === "Articles" ? 3 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.title}
          </h3>
        )}

        {item.description && (
          <p
            className={`text-xs sm:text-sm mb-3 leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: item.category === "Articles" ? 4 : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.description}
          </p>
        )}

        {/* Action Button - Only for Articles */}
        {item.category === "Articles" && (
          <div
            className={`transition-all duration-300 ${
              hoveredItem === item.originalIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArticleClick(item);
              }}
              className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-xs"
            >
              📖 Lire l'article
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioItem;
