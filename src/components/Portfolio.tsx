import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../types";

interface PortfolioProps {
  darkMode: boolean;
  activePortfolioFilter: string;
  setActivePortfolioFilter: (cat: string) => void;
  portfolioItems: PortfolioItem[];
}

const FILTERS = ["Tous", "Articles", "Vidéos", "Photos"];

// Interface pour les patterns de formatage
interface FormatPattern {
  regex: RegExp;
  component: (...args: string[]) => React.JSX.Element;
}

// Fonction pour formater le texte avec la notation spéciale
const formatText = (text: string): React.JSX.Element[] => {
  if (!text) return [];

  const parts: React.JSX.Element[] = [];
  let keyIndex = 0;

  // Patterns de formatage avec typage correct
  const patterns: FormatPattern[] = [
    {
      regex: /\*\*(.*?)\*\*/g,
      component: (content: string) => (
        <strong key={keyIndex++} className="font-bold">
          {content}
        </strong>
      ),
    },
    {
      regex: /\*(.*?)\*/g,
      component: (content: string) => (
        <em key={keyIndex++} className="italic">
          {content}
        </em>
      ),
    },
    {
      regex: /__(.*?)__/g,
      component: (content: string) => (
        <span key={keyIndex++} className="underline">
          {content}
        </span>
      ),
    },
    {
      regex: /~~(.*?)~~/g,
      component: (content: string) => (
        <span key={keyIndex++} className="line-through">
          {content}
        </span>
      ),
    },
    {
      regex: /`(.*?)`/g,
      component: (content: string) => (
        <code
          key={keyIndex++}
          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono"
        >
          {content}
        </code>
      ),
    },
    {
      regex: /\[(.*?)\]\((.*?)\)/g,
      component: (text: string, url: string) => (
        <a
          key={keyIndex++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      regex: /\n\n/g,
      component: () => <br key={keyIndex++} className="block my-4" />,
    },
    {
      regex: /\n/g,
      component: () => <br key={keyIndex++} />,
    },
  ];

  const processedText = text;
  const replacements: {
    start: number;
    end: number;
    component: React.JSX.Element;
  }[] = [];

  // Traiter chaque pattern
  patterns.forEach((pattern) => {
    let match;
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);

    while ((match = regex.exec(processedText)) !== null) {
      const fullMatch = match[0];
      const groups = match.slice(1);

      let component: React.JSX.Element;

      // Gestion spéciale pour les liens [text](url)
      if (pattern.regex.source.includes("\\[.*?\\]\\(.*?\\)")) {
        component = pattern.component(groups[0] || "", groups[1] || "");
      } else if (groups.length > 0 && groups[0]) {
        component = pattern.component(groups[0]);
      } else {
        component = pattern.component("");
      }

      replacements.push({
        start: match.index,
        end: match.index + fullMatch.length,
        component,
      });
    }
  });

  // Trier les remplacements par position
  replacements.sort((a, b) => a.start - b.start);

  // Construire le résultat final
  let lastEnd = 0;
  replacements.forEach((replacement) => {
    // Ajouter le texte avant le remplacement
    if (replacement.start > lastEnd) {
      const textBefore = processedText.slice(lastEnd, replacement.start);
      if (textBefore) {
        parts.push(<span key={keyIndex++}>{textBefore}</span>);
      }
    }

    // Ajouter le composant de remplacement
    parts.push(replacement.component);
    lastEnd = replacement.end;
  });

  // Ajouter le texte restant
  if (lastEnd < processedText.length) {
    const remainingText = processedText.slice(lastEnd);
    if (remainingText) {
      parts.push(<span key={keyIndex++}>{remainingText}</span>);
    }
  }

  return parts.length > 0 ? parts : [<span key={0}>{text}</span>];
};

// Extension du type PortfolioItem pour inclure originalIndex
interface ExtendedPortfolioItem extends PortfolioItem {
  originalIndex?: number;
}
// Interface pour le lazy loading
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

// Composant LazyImage
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  style,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className} style={style}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } w-full h-full object-cover`}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          loading="lazy"
        />
      )}
      {!isLoaded && isInView && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">⏳</div>
        </div>
      )}
    </div>
  );
};
// Fonction pour générer une thumbnail à partir d'une URL vidéo
const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.currentTime = 1; // Prendre la frame à 1 seconde

    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 180;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL());
      } else {
        // Fallback: image par défaut
        resolve(
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMzc0MTUxIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTIwLDYwIDE4MCwxMjAgMTIwLDE4MCIgZmlsbD0iI0Y5RkFGQiIvPgo8L3N2Zz4K"
        );
      }
    };

    video.onerror = () => {
      // Fallback: image par défaut
      resolve(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMzc0MTUxIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTIwLDYwIDE4MCwxMjAgMTIwLDE4MCIgZmlsbD0iI0Y5RkFGQiIvPgo8L3N2Zz4K"
      );
    };

    video.src = videoUrl;
  });
};

const Portfolio: React.FC<PortfolioProps> = ({
  darkMode,
  activePortfolioFilter,
  setActivePortfolioFilter,
  portfolioItems,
}) => {
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [articleModal, setArticleModal] = useState<PortfolioItem | null>(null);
  const [photoModal, setPhotoModal] = useState<PortfolioItem | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(3);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<{
    [key: string]: string;
  }>({});
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

  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({ url, title });
    document.body.style.overflow = "hidden";
  };

  const handleCloseVideo = () => {
    setVideoModal(null);
    document.body.style.overflow = "";
  };

  const handleOpenArticle = (item: PortfolioItem) => {
    setArticleModal(item);
    document.body.style.overflow = "hidden";
    setComments([]);
    setCommentInput("");
    setShowShareMenu(false);
  };

  const handleCloseArticle = () => {
    setArticleModal(null);
    document.body.style.overflow = "";
    setShowShareMenu(false);
  };

  const handleOpenPhoto = (item: PortfolioItem) => {
    setPhotoModal(item);
    document.body.style.overflow = "hidden";
  };

  const handleClosePhoto = () => {
    setPhotoModal(null);
    document.body.style.overflow = "";
  };

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const title = articleModal?.title || "";
    const text = articleModal?.description || "";

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(title + " - " + url)}`,
        "_blank"
      );
      setShowShareMenu(false);
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
      setShowShareMenu(false);
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
      setShowShareMenu(false);
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
      setShowShareMenu(false);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url).then(() => {
        alert("Lien copié dans le presse-papiers!");
        setShowShareMenu(false);
      });
    } else if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  // Fonction pour gérer le clic sur un item avec vérification des URLs
  const handleItemClick = (item: PortfolioItem) => {
    if (item.category === "Vidéos") {
      // Vérifier que videoUrl existe avant d'ouvrir la vidéo
      if (item.videoUrl) {
        handleOpenVideo(item.videoUrl, item.title);
      } else {
        console.warn("URL de vidéo manquante pour:", item.title);
      }
    } else if (item.category === "Photos") {
      handleOpenPhoto(item);
    }
  };

  // Filtrer les items selon le filtre actif
  const filteredItems = portfolioItems.filter(
    (item) =>
      activePortfolioFilter === "Tous" ||
      item.category === activePortfolioFilter
  );

  const columns = getMasonryColumns(filteredItems.slice(0, displayedItems));

  const hasMoreItems = filteredItems.length > displayedItems;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => Math.min(prev + 6, filteredItems.length));
  };

  return (
    <section
      id="portfolio"
      className={`py-16 relative overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-750 to-[#252652]"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Portfolio
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Découvrez une sélection de mes travaux les plus significatifs dans
            différents formats et médias.
          </p>
        </div>

        {/* Filters */}
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

        {/* Pinterest-style Masonry Grid */}
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
                <div
                  key={`${columnIndex}-${itemIndex}`}
                  className={`group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                    darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
                  } w-full`}
                  onMouseEnter={() =>
                    setHoveredItem(item.originalIndex ?? null)
                  }
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Image/Video Container */}
                  <div className="relative">
                    <LazyImage
                      src={
                        item.category === "Vidéos"
                          ? item.thumbnail ||
                            generatedThumbnails[item.videoUrl || ""] ||
                            item.image
                          : item.image
                      }
                      alt={item.title || "Image portfolio"}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        height: "auto",
                        aspectRatio:
                          item.category === "Photos" ? "auto" : "16/9",
                      }}
                      onLoad={() => {
                        // Générer la thumbnail si c'est une vidéo sans thumbnail
                        if (
                          item.category === "Vidéos" &&
                          !item.thumbnail &&
                          item.videoUrl &&
                          !generatedThumbnails[item.videoUrl]
                        ) {
                          generateVideoThumbnail(item.videoUrl).then(
                            (thumbnail) => {
                              setGeneratedThumbnails((prev) => ({
                                ...prev,
                                [item.videoUrl!]: thumbnail,
                              }));
                            }
                          );
                        }
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
                            handleOpenArticle(item);
                          }}
                          className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-xs"
                        >
                          📖 Lire l'article
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Load More Button */}
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
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleCloseVideo}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-2 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseVideo}
              aria-label="Fermer la vidéo"
            >
              ✕
            </button>

            <div
              className="w-full bg-black rounded-lg overflow-hidden"
              style={{ height: "70vh", minHeight: "500px" }}
            >
              {/* Support pour différents types de vidéos */}
              {videoModal.url.includes("youtube.com") ||
              videoModal.url.includes("youtu.be") ? (
                <iframe
                  src={videoModal.url
                    .replace("watch?v=", "embed/")
                    .replace("youtu.be/", "youtube.com/embed/")}
                  title={videoModal.title}
                  className="w-full"
                  style={{ height: "70vh", minHeight: "500px" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : videoModal.url.includes("vimeo.com") ? (
                <iframe
                  src={videoModal.url.replace(
                    "vimeo.com/",
                    "player.vimeo.com/video/"
                  )}
                  title={videoModal.title}
                  className="w-full"
                  style={{ height: "70vh", minHeight: "500px" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : videoModal.url.includes("dailymotion.com") ? (
                <iframe
                  src={videoModal.url.replace(
                    "dailymotion.com/video/",
                    "dailymotion.com/embed/video/"
                  )}
                  title={videoModal.title}
                  className="w-full"
                  style={{ height: "70vh", minHeight: "500px" }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoModal.url}
                  controls
                  autoPlay
                  className="w-full object-contain"
                  style={{ height: "70vh", minHeight: "500px" }}
                  preload="metadata"
                />
              )}
            </div>

            {/* Titre de la vidéo */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold">
                {videoModal.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal - Press Article Style AMÉLIORÉ */}
      {articleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleCloseArticle}
        >
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } text-2xl hover:text-red-500 transition-colors z-20 bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm`}
              onClick={handleCloseArticle}
              aria-label="Fermer l'article"
            >
              ✕
            </button>

            {/* Header Image - Fixe */}
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <LazyImage
                src={articleModal.image}
                alt={articleModal.title || "Article image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-16">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full mb-2">
                  ARTICLE DE PRESSE
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {articleModal.title}
                </h3>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Header avec actions */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Rédacteur
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date().toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto relative">
                    <button
                      onClick={() => setLikeCount((prev) => prev + 1)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors text-sm"
                    >
                      ❤️ {likeCount}
                    </button>

                    <button
                      onClick={() => handleShare()}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm relative"
                    >
                      📤 Partager
                    </button>

                    {/* Share Menu */}
                    {showShareMenu && (
                      <div
                        className={`absolute top-full right-0 mt-2 ${
                          darkMode
                            ? "bg-gray-800 border-gray-600"
                            : "bg-white border-gray-200"
                        } border rounded-lg shadow-xl z-30 min-w-48`}
                      >
                        <div className="p-2">
                          <button
                            onClick={() => handleShare("whatsapp")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-green-500">📱</span> WhatsApp
                          </button>
                          <button
                            onClick={() => handleShare("facebook")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-blue-500">📘</span> Facebook
                          </button>
                          <button
                            onClick={() => handleShare("twitter")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-sky-100 dark:hover:bg-sky-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-sky-500">🐦</span> Twitter
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-blue-600">💼</span> LinkedIn
                          </button>
                          <hr
                            className={`my-2 ${
                              darkMode ? "border-gray-600" : "border-gray-200"
                            }`}
                          />
                          <button
                            onClick={() => handleShare("copy")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-gray-500">🔗</span> Copier le
                            lien
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenu de l'article avec formatage */}
                <div
                  className={`mb-8 leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <div className="text-lg leading-loose space-y-4">
                    {formatText(articleModal.description || "")}
                  </div>
                </div>

                {/* Section des commentaires */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4
                    className={`font-bold mb-4 text-xl ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    💬 Commentaires ({comments.length})
                  </h4>

                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Partagez votre réflexion sur cet article..."
                        className={`flex-1 px-4 py-3 rounded-xl border ${
                          darkMode
                            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-800"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span className="hidden sm:inline">Publier</span>
                      </button>
                    </div>
                  </form>

                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {comments.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">💭</div>
                        <p className="text-gray-400">
                          Aucun commentaire pour l'instant.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Soyez le premier à partager votre opinion!
                        </p>
                      </div>
                    ) : (
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 p-4 rounded-lg transition-all hover:shadow-md ${
                            darkMode
                              ? "bg-gray-800 hover:bg-gray-750"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">👤</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p
                                className={`font-medium ${
                                  darkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                Lecteur #{index + 1}
                              </p>
                              <span className="text-xs text-gray-500">
                                • Il y a quelques instants
                              </span>
                            </div>
                            <p
                              className={`text-sm leading-relaxed ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {comment}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {photoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={handleClosePhoto}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleClosePhoto}
              aria-label="Fermer la photo"
            >
              ✕
            </button>

            <div className="flex flex-col items-center justify-center w-full h-full">
              <LazyImage
                src={photoModal.image}
                alt={photoModal.title || "Photo"}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: "calc(90vh - 120px)" }}
              />

              {photoModal.title && (
                <div
                  className={`mt-4 p-4 ${
                    darkMode ? "bg-gray-800/90" : "bg-white/90"
                  } backdrop-blur-sm rounded-lg max-w-md text-center`}
                >
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {photoModal.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {photoModal.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
