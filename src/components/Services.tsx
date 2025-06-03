import React, { useState } from "react";

// Types pour les services
interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesProps {
  darkMode?: boolean;
  services?: Service[];
}

// Services de démonstration
const demoServices: Service[] = [
  {
    icon: "fa-newspaper",
    title: "Rédaction d'articles",
    description:
      "Vérification rigoureuse des faits pour garantir l'exactitude des informations publiées.",
  },
  {
    icon: "fa-microphone",
    title: "Interviews",
    description:
      "Entretiens avec des personnalités et experts dans divers domaines.",
  },
  {
    icon: "fa-video",
    title: "Reportages",
    description:
      "Couverture complète d'événements avec analyse approfondie et perspectives multiples.",
  },
  {
    icon: "fa-edit",
    title: "Révision éditoriale",
    description:
      "Amélioration de la qualité rédactionnelle et correction de vos contenus existants.",
  },
  {
    icon: "fa-bullhorn",
    title: "Communication digitale",
    description:
      "Stratégies de contenu pour optimiser votre présence sur les réseaux sociaux.",
  },
  {
    icon: "fa-search",
    title: "Enquêtes journalistiques",
    description:
      "Investigations approfondies sur des sujets complexes avec rigueur professionnelle.",
  },
  {
    icon: "fa-camera",
    title: "Photojournalisme",
    description:
      "Capture d'images percutantes pour accompagner vos articles et reportages.",
  },
  {
    icon: "fa-podcast",
    title: "Création de podcasts",
    description:
      "Production de contenu audio professionnel pour élargir votre audience.",
  },
  {
    icon: "fa-globe",
    title: "Correspondance internationale",
    description:
      "Couverture d'événements internationaux avec une perspective locale.",
  },
  {
    icon: "fa-chart-line",
    title: "Analyse de données",
    description:
      "Interprétation de statistiques et données pour des articles informatifs.",
  },
  {
    icon: "fa-users",
    title: "Relations publiques",
    description: "Gestion de l'image et communication avec les médias.",
  },
  {
    icon: "fa-pen-fancy",
    title: "Rédaction créative",
    description:
      "Création de contenus originaux et engageants pour tous supports.",
  },
];

const Services: React.FC<ServicesProps> = ({
  darkMode = false,
  services = demoServices,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [visibleServicesCount, setVisibleServicesCount] = useState(3);

  // Fonction pour diviser les services en groupes de 3
  const getServiceRows = (servicesList: Service[], count: number) => {
    const visibleServices = servicesList.slice(0, count);
    const rows = [];
    for (let i = 0; i < visibleServices.length; i += 3) {
      rows.push(visibleServices.slice(i, i + 3));
    }
    return rows;
  };

  // Pour le carrousel, créer des groupes de 3 services
  const serviceGroups = [];
  for (let i = 0; i < services.length; i += 3) {
    serviceGroups.push(services.slice(i, i + 3));
  }

  // Tripler les groupes pour un carrousel fluide
  const duplicatedGroups = [
    ...serviceGroups,
    ...serviceGroups,
    ...serviceGroups,
  ];

  const handleVoirPlus = () => {
    const newCount = Math.min(visibleServicesCount + 3, services.length);
    setVisibleServicesCount(newCount);
  };

  const handleVoirMoins = () => {
    setVisibleServicesCount(3);
  };

  const visibleRows = getServiceRows(services, visibleServicesCount);
  const canShowMore = visibleServicesCount < services.length;

  return (
    <>
      {/* Ajout de Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <section
        id="services"
        className={`min-h-screen py-16 relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        {/* Fond animé avec particules */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-20 animate-pulse ${
                darkMode ? "bg-blue-400" : "bg-purple-400"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-6 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-400 via-purple-400 to-cyan-400"
                  : "from-blue-600 via-purple-600 to-indigo-600"
              } bg-clip-text text-transparent`}
            >
              Mes Services
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Une expertise diversifiée pour répondre à tous vos besoins en
              matière de contenu journalistique et rédactionnel.
            </p>
          </div>

          {/* Carrousel de groupes de 3 services */}
          <div
            className="relative mb-12 h-32 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex absolute whitespace-nowrap gap-8 ${
                isPaused ? "pause-animation" : "animate-scroll-groups"
              }`}
              style={{
                width: `${duplicatedGroups.length * 1000}px`,
              }}
            >
              {duplicatedGroups.map((group, groupIndex) => (
                <div
                  key={`group-${groupIndex}`}
                  className="inline-flex gap-4"
                  style={{ width: "980px" }}
                >
                  {group.map((service, serviceIndex) => (
                    <div
                      key={`card-${groupIndex}-${serviceIndex}`}
                      className={`w-80 h-24 p-4 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:scale-105 border ${
                        darkMode
                          ? "bg-gray-900/90 text-gray-100 border-gray-700/60 hover:bg-gray-800/95"
                          : "bg-white/90 text-gray-800 border-gray-200/60 hover:bg-white/95"
                      }`}
                    >
                      <div className="flex items-center space-x-3 h-full">
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${
                            darkMode
                              ? "bg-gradient-to-br from-blue-600 to-purple-600"
                              : "bg-gradient-to-br from-blue-500 to-purple-500"
                          } text-white shadow-md`}
                        >
                          <i className={`fas ${service.icon} text-sm`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                            {service.title}
                          </h3>
                          <p className="text-xs leading-relaxed opacity-90 line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Grille progressive des services */}
          <div className="max-w-6xl mx-auto">
            {visibleRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ${
                  rowIndex >= 1 ? "animate-slideIn" : ""
                }`}
                style={{
                  animationDelay: `${(rowIndex - 1) * 0.1}s`,
                }}
              >
                {row.map((service, index) => (
                  <div
                    key={`grid-${rowIndex}-${index}`}
                    className={`p-5 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:scale-105 border ${
                      darkMode
                        ? "bg-gray-900/90 text-gray-100 border-gray-700/60 hover:bg-gray-800/95"
                        : "bg-white/90 text-gray-800 border-gray-200/60 hover:bg-white/95"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                          darkMode
                            ? "bg-gradient-to-br from-blue-600 to-purple-600"
                            : "bg-gradient-to-br from-blue-500 to-purple-500"
                        } text-white shadow-md`}
                      >
                        <i className={`fas ${service.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Boutons Voir plus/Voir moins - Maintenant après la grille */}
          <div className="text-center mt-8 flex justify-center gap-4">
            {canShowMore && (
              <button
                onClick={handleVoirPlus}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                <i className="fas fa-chevron-down mr-2"></i>
                Voir plus ({Math.min(
                  3,
                  services.length - visibleServicesCount
                )}{" "}
                de plus)
              </button>
            )}

            {visibleServicesCount > 3 && (
              <button
                onClick={handleVoirMoins}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                <i className="fas fa-chevron-up mr-2"></i>
                Voir moins
              </button>
            )}
          </div>
        </div>

        {/* Styles CSS pour les animations */}
        <style>{`
          @keyframes scroll-groups {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes slideIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-scroll-groups {
            animation: scroll-groups 150s linear infinite;
          }
          .pause-animation {
            animation-play-state: paused;
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out both;
          }
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>
    </>
  );
};

export default Services;
