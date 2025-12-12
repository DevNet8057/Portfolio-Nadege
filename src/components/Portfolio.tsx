import * as React from "react";
import { useEffect, useState } from "react";
import type { PortfolioItem } from "../types";
import PortfolioFilters from "./PortfolioFilters";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioModals from "./PortfolioModals";

interface PortfolioProps {
  darkMode: boolean;
  activePortfolioFilter: string;
  setActivePortfolioFilter: (cat: string) => void;
  portfolioItems: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({
  darkMode,
  activePortfolioFilter,
  setActivePortfolioFilter,
  portfolioItems,
}) => {
  // États pour les modales
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [articleModal, setArticleModal] = useState<PortfolioItem | null>(null);
  const [photoModal, setPhotoModal] = useState<PortfolioItem | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Debug logging pour les items du portfolio
  useEffect(() => {
    console.log("🔍 PORTFOLIO DEBUG - Total items:", portfolioItems.length);
    portfolioItems.forEach((item, index) => {
      const imageSrc =
        item.category === "Vidéos" ? item.thumbnail || item.image : item.image;
      console.log(`📸 Item ${index + 1}:`, {
        id: item.id,
        title: item.title,
        category: item.category,
        hasImage: !!item.image,
        hasThumbnail: !!item.thumbnail,
        imageSrc: imageSrc,
        imageExists: imageSrc ? true : false,
      });
    });
  }, [portfolioItems]);

  // Gestionnaires d'événements pour les modales
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

        {/* Filtres */}
        <PortfolioFilters
          darkMode={darkMode}
          activePortfolioFilter={activePortfolioFilter}
          setActivePortfolioFilter={setActivePortfolioFilter}
        />

        {/* Grille du portfolio */}
        <PortfolioGrid
          darkMode={darkMode}
          portfolioItems={portfolioItems}
          activePortfolioFilter={activePortfolioFilter}
          onOpenVideo={handleOpenVideo}
          onOpenArticle={handleOpenArticle}
          onOpenPhoto={handleOpenPhoto}
        />

        {/* Modales */}
        <PortfolioModals
          darkMode={darkMode}
          videoModal={videoModal}
          articleModal={articleModal}
          photoModal={photoModal}
          likeCount={likeCount}
          comments={comments}
          commentInput={commentInput}
          showShareMenu={showShareMenu}
          setLikeCount={setLikeCount}
          setCommentInput={setCommentInput}
          onCloseVideo={handleCloseVideo}
          onCloseArticle={handleCloseArticle}
          onClosePhoto={handleClosePhoto}
          onShare={handleShare}
          onCommentSubmit={handleCommentSubmit}
        />
      </div>
    </section>
  );
};

export default Portfolio;
