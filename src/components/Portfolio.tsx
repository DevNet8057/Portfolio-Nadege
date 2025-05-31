import React, { useState } from "react";
import type { PortfolioItem } from "../types";

interface PortfolioProps {
  darkMode: boolean;
  activePortfolioFilter: string;
  setActivePortfolioFilter: (cat: string) => void;
  portfolioItems: PortfolioItem[];
}

const FILTERS = ["Tous", "Articles", "Vidéos", "Photos"];

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
    setLikeCount(0);
    setComments([]);
    setCommentInput("");
  };

  const handleCloseArticle = () => {
    setArticleModal(null);
    document.body.style.overflow = "";
  };

  const handleOpenPhoto = (item: PortfolioItem) => {
    setPhotoModal(item);
    document.body.style.overflow = "hidden";
  };

  const handleClosePhoto = () => {
    setPhotoModal(null);
    document.body.style.overflow = "";
  };

  const handleLike = () => setLikeCount((c) => c + 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: articleModal?.title,
        text: articleModal?.description,
        url: window.location.href,
      });
    } else {
      alert("Partage non supporté sur ce navigateur.");
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
                src={
                  item.category === "Vidéos" && item.thumbnail
                    ? item.thumbnail
                    : item.image
                }
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
                <p className="text-white/80 text-sm mb-4">
                  {item.description.slice(0, 60)}...
                </p>
                {item.category === "Vidéos" && item.videoUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenVideo(item.videoUrl!, item.title);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg"
                  >
                    Voir le projet
                  </button>
                )}
                {item.category === "Articles" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenArticle(item);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg"
                  >
                    Voir l'article
                  </button>
                )}
                {item.category === "Photos" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPhoto(item);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg"
                  >
                    Voir la photo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
      </div>
      {/* Modal vidéo */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={handleCloseVideo}
        >
          <div
            className="bg-transparent rounded-lg shadow-xl max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl z-10"
              onClick={handleCloseVideo}
              aria-label="Fermer la vidéo"
            >
              &times;
            </button>
            <div className="w-full">
              <video
                src={videoModal.url}
                controls
                autoPlay
                className="w-full h-96 rounded-lg bg-black"
              />
            </div>
          </div>
        </div>
      )}
      {/* Modal article */}
      {articleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={handleCloseArticle}
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full relative flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 dark:text-white text-2xl z-10"
              onClick={handleCloseArticle}
              aria-label="Fermer l'article"
            >
              &times;
            </button>
            <img
              src={articleModal.image}
              alt={articleModal.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{articleModal.title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                {articleModal.description}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded transition-colors"
                >
                  <i className="fas fa-heart"></i> {likeCount}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  <i className="fas fa-share"></i> Partager
                </button>
              </div>
              <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="flex-1 px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Commenter
                </button>
              </form>
              <div className="flex-1 overflow-y-auto max-h-32">
                {comments.length === 0 && (
                  <p className="text-sm text-gray-400">
                    Aucun commentaire pour l'instant.
                  </p>
                )}
                {comments.map((c, i) => (
                  <div
                    key={i}
                    className="mb-2 text-sm text-gray-800 dark:text-gray-100"
                  >
                    <i className="fas fa-user-circle mr-2"></i>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal photo */}
      {photoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={handleClosePhoto}
        >
          <div
            className="bg-transparent rounded-lg shadow-xl max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl z-10"
              onClick={handleClosePhoto}
              aria-label="Fermer la photo"
            >
              &times;
            </button>
            <img
              src={photoModal.image}
              alt={photoModal.title}
              className="w-full max-h-[80vh] object-contain rounded-lg bg-black"
            />
            {photoModal.title && (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">{photoModal.title}</h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {photoModal.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
