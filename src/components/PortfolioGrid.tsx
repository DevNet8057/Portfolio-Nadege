import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../types";
import PortfolioItemComponent from "./PortfolioItem";

interface ExtendedPortfolioItem extends PortfolioItem {
  originalIndex?: number;
}

interface PortfolioGridProps {
  darkMode: boolean;
  portfolioItems: PortfolioItem[];
  activePortfolioFilter: string;
  onOpenVideo: (url: string, title: string) => void;
  onOpenArticle: (item: PortfolioItem) => void;
  onOpenPhoto: (item: PortfolioItem) => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  darkMode,
  portfolioItems,
  activePortfolioFilter,
  onOpenVideo,
  onOpenArticle,
  onOpenPhoto,
}) => {
  const [columnCount, setColumnCount] = useState(3);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive column count
  useEffect(() => {
    const updateColumnCount = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Minimum 2 colonnes même sur mobile comme Pinterest
        if (width < 480) setColumnCount(2); // Très petit mobile: 2 colonnes
        else if (width < 640) setColumnCount(2); // Mobile: 2 colonnes
        else if (width < 768)
          setColumnCount(3); // Tablette portrait: 3 colonnes
        else if (width < 1024)
          setColumnCount(4); // Tablette paysage: 4 colonnes
        else if (width < 1280) setColumnCount(5); // Desktop: 5 colonnes
        else setColumnCount(6); // Grand écran: 6 colonnes
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  // Filtrer les items selon le filtre actif
  const filteredItems = portfolioItems.filter(
    (item) =>
      activePortfolioFilter === "Tous" ||
      item.category === activePortfolioFilter
  );

  // Masonry layout function
  const getMasonryColumns = (items: PortfolioItem[]) => {
    const columns: ExtendedPortfolioItem[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights = new Array(columnCount).fill(0);

    items.forEach((item, index) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columns[minHeightIndex].push({ ...item, originalIndex: index });

      // Calcul intelligent de la hauteur basé sur le contenu réel
      let estimatedHeight = 0;

      // Hauteur de l'image (responsive)
      const imageHeight =
        columnCount <= 2
          ? 160
          : columnCount <= 3
          ? 180
          : columnCount <= 4
          ? 200
          : 220;
      estimatedHeight += imageHeight;

      // Hauteur du contenu (padding + badge + titre + description + bouton)
      let contentHeight = columnCount <= 2 ? 80 : 100; // Base padding + badge

      // Calcul pour le titre
      if (item.title) {
        const titleCharPerLine =
          columnCount <= 2 ? 25 : columnCount <= 3 ? 30 : 35;
        const titleLines = Math.min(
          Math.ceil(item.title.length / titleCharPerLine),
          item.category === "Articles" ? 3 : 2
        );
        contentHeight += titleLines * (columnCount <= 2 ? 18 : 20) + 12;
      }

      // Calcul pour la description
      if (item.description) {
        const descCharPerLine =
          columnCount <= 2 ? 35 : columnCount <= 3 ? 40 : 45;
        const maxDescLines = item.category === "Articles" ? 4 : 3;
        const descLines = Math.min(
          Math.ceil(item.description.length / descCharPerLine),
          maxDescLines
        );
        contentHeight += descLines * (columnCount <= 2 ? 14 : 16) + 16;
      }

      // Hauteur du bouton pour les articles
      if (item.category === "Articles") {
        contentHeight += columnCount <= 2 ? 45 : 50;
      }

      estimatedHeight += contentHeight;

      // Ajout d'un gap entre les cartes
      estimatedHeight += columnCount <= 2 ? 4 : columnCount <= 4 ? 8 : 12;

      columnHeights[minHeightIndex] += estimatedHeight;
    });

    return columns;
  };

  // Gestionnaire pour les clics sur les items
  const handleItemClick = (item: PortfolioItem) => {
    if (item.category === "Vidéos") {
      if (item.videoUrl) {
        onOpenVideo(item.videoUrl, item.title);
      } else {
        console.warn("URL de vidéo manquante pour:", item.title);
      }
    } else if (item.category === "Photos") {
      onOpenPhoto(item);
    }
  };

  const columns = getMasonryColumns(filteredItems.slice(0, displayedItems));
  const hasMoreItems = filteredItems.length > displayedItems;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => Math.min(prev + 6, filteredItems.length));
  };

  return (
    <>
      {/* Conteneur des colonnes masonry */}
      <div
        ref={containerRef}
        className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 justify-center px-1 sm:px-2"
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4"
            style={{
              width: `calc(${100 / columnCount}% - ${
                (columnCount - 1) *
                (columnCount <= 2 ? 4 : columnCount <= 4 ? 8 : 12)
              }px / ${columnCount})`,
              minWidth: columnCount <= 2 ? "150px" : "180px",
            }}
          >
            {column.map((item, itemIndex) => (
              <PortfolioItemComponent
                key={`${columnIndex}-${itemIndex}`}
                item={item}
                darkMode={darkMode}
                hoveredItem={hoveredItem}
                onMouseEnter={setHoveredItem}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                onArticleClick={onOpenArticle}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bouton "Voir plus" en bas et centré */}
      {hasMoreItems && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl"
            }`}
          >
            Voir plus ({filteredItems.length - displayedItems} restants)
          </button>
        </div>
      )}
    </>
  );
};

export default PortfolioGrid;
