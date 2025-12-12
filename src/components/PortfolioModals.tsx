import * as React from "react";
import type { PortfolioItem } from "../types";
import LazyImage from "./LazyImage";

interface PortfolioModalsProps {
  darkMode: boolean;
  videoModal: { url: string; title: string } | null;
  articleModal: PortfolioItem | null;
  photoModal: PortfolioItem | null;
  likeCount: number;
  comments: string[];
  commentInput: string;
  showShareMenu: boolean;
  setLikeCount: (count: number | ((prev: number) => number)) => void;
  setCommentInput: (input: string) => void;
  onCloseVideo: () => void;
  onCloseArticle: () => void;
  onClosePhoto: () => void;
  onShare: (platform?: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

const PortfolioModals: React.FC<PortfolioModalsProps> = ({
  darkMode,
  videoModal,
  articleModal,
  photoModal,
  likeCount,
  comments,
  commentInput,
  showShareMenu,
  setLikeCount,
  setCommentInput,
  onCloseVideo,
  onCloseArticle,
  onClosePhoto,
  onShare,
  onCommentSubmit,
}) => {
  const formatText = (text: string): React.JSX.Element[] => {
    if (!text) return [<span key={0}>{text}</span>];

    // Simple text formatting - replace **bold** with <strong>
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");

    return [<span key={0} dangerouslySetInnerHTML={{ __html: formatted }} />];
  };

  return (
    <>
      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onCloseVideo}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-2 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={onCloseVideo}
              aria-label="Fermer la vidéo"
            >
              ✕
            </button>

            <div
              className="w-full bg-black rounded-lg overflow-hidden"
              style={{ height: "70vh", minHeight: "500px" }}
            >
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

            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold">
                {videoModal.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {articleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onCloseArticle}
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
              onClick={onCloseArticle}
              aria-label="Fermer l'article"
            >
              ✕
            </button>

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

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
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
                      onClick={() => onShare()}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm relative"
                    >
                      📤 Partager
                    </button>

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
                            onClick={() => onShare("whatsapp")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-green-500">📱</span> WhatsApp
                          </button>
                          <button
                            onClick={() => onShare("facebook")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-blue-500">📘</span> Facebook
                          </button>
                          <button
                            onClick={() => onShare("twitter")}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-sky-100 dark:hover:bg-sky-800 transition-colors text-sm flex items-center gap-2`}
                          >
                            <span className="text-sky-500">🐦</span> Twitter
                          </button>
                          <button
                            onClick={() => onShare("linkedin")}
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
                            onClick={() => onShare("copy")}
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

                <div
                  className={`mb-8 leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <div className="text-lg leading-loose space-y-4">
                    {formatText(articleModal.description || "")}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4
                    className={`font-bold mb-4 text-xl ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    💬 Commentaires ({comments.length})
                  </h4>

                  <form onSubmit={onCommentSubmit} className="mb-6">
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
          onClick={onClosePhoto}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={onClosePhoto}
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
    </>
  );
};

export default PortfolioModals;
