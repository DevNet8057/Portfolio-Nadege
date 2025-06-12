"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import * as React from "react";
// Interface pour les témoignages
interface Testimonial {
  text: string;
  name: string;
  position: string;
  image: string;
}

// Import des images
import jean from "../assets/jean jacques ze.jpg";
import dieudonneImage from "../assets/dieudonne mven.jpg";
import vivianeImage from "../assets/viviane besala.jpg";
import pierreImage from "../assets/Pierre-Bleriot-Nyemeck-Mediatude-Info-TV-780x470.png";
import nadegeImage from "../assets/viviane besala.jpg";
import williamImage from "../assets/dieudonne mven.jpg";

// Données des témoignages intégrées
const testimonials: Testimonial[] = [
  {
    "text": "Nadège est une journaliste déterminée, au caractère bien trempé, qui avance toujours avec professionnalisme. Son adaptabilité et sa capacité à collaborer en font une interlocutrice précieuse. La qualité de ses reportages, toujours bien documentés et pertinents, en fait une collaboratrice de choix pour tout média exigeant.",
    "name": "Dieudonne Mven",
    "position": "PDG du groupe La Météo",
    "image": dieudonneImage
  },
  {
    "text": "Travailler avec Nadège a été une expérience enrichissante. Son approche méticuleuse et sa capacité à traduire des concepts complexes en récits accessibles ont donné une nouvelle dimension à notre campagne médiatique.",
    "name": "Viviane Andrea",
    "position": "Directrice commerciale à InfoTv",
    "image": vivianeImage
  },
  {
    "text": "J'apprécie particulièrement le travail de Nadège et sa détermination sans faille. Pour moi, elle incarne l'exemple même du journaliste engagé et passionné, un véritable modèle à suivre pour tous les jeunes qui aspirent à embrasser ce beau métier.",
    "name": "Pierre Bleriot",
    "position": "Directeur adjoint à InfoTv",
    "image": pierreImage
  },
  {
    "text": "Nadège possède un talent rare pour capturer l'authenticité des histoires humaines. Ses reportages sur notre chaîne ont été réalisés avec une sensibilité et une profondeur qui ont touché tous nos membres.",
    "name": "Nadege Foudjio",
    "position": "Chef de édition et de la programmation",
    "image": nadegeImage
  },
  {
    "text": "La série d'articles que Nadège a écrite pour notre rédaction a généré un engagement sans précédent. Sa plume incisive et son approche journalistique rigoureuse en font une collaboratrice exceptionnelle.",
    "name": "Jean Jacques Ze",
    "position": "Journaliste à InfoTv",
    "image": jean
  },
  {
    "text": "Les reportages de Nadège m'ont profondément marqué. Son talent pour raconter des histoires avec justesse et émotion fait d'elle une journaliste à suivre absolument.",
    "name": "Kamdem William",
    "position": "Téléspectateur de la chaîne InfoTv",
    "image": williamImage
  }
];

interface TestimonialsProps {
  darkMode?: boolean;
  testimonials?: Testimonial[];
  currentTestimonialIndex?: number;
  changeTestimonial?: (index: number) => void;
  testimonialContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function TestimonialsCarousel({
  darkMode = false,
  testimonials: propTestimonials = testimonials,
}: TestimonialsProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  const testimonialsData = propTestimonials || testimonials;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-défilement
  React.useEffect(() => {
    if (!api || !isAutoPlaying) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isAutoPlaying]);

  const goToNext = () => {
    api?.scrollNext();
  };

  const goToPrevious = () => {
    api?.scrollPrev();
  };

  return (
    <section
      className={`py-16 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode
                ? "text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            Témoignages
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ce que disent mes collaborateurs et clients à propos de mon travail.
          </p>
        </div>

        {/* Carrousel */}
        <div
          className="max-w-6xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Bouton gauche */}
          <button
            onClick={goToPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1 ${
              darkMode
                ? "bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600"
                : "bg-white/95 hover:bg-white border border-gray-200/50 hover:border-gray-300 text-gray-700 hover:text-gray-900"
            } backdrop-blur-md flex items-center justify-center`}
            aria-label="Témoignage précédent"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Bouton droite */}
          <button
            onClick={goToNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-1 ${
              darkMode
                ? "bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600"
                : "bg-white/95 hover:bg-white border border-gray-200/50 hover:border-gray-300 text-gray-700 hover:text-gray-900"
            } backdrop-blur-md flex items-center justify-center`}
            aria-label="Témoignage suivant"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <Carousel
            setApi={setApi}
            className="w-full px-16"
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`transition-all duration-300 ease-out hover:shadow-xl group cursor-pointer
                    ${
                      darkMode
                        ? "bg-gray-800/80 border-gray-700/50 hover:bg-gray-800/95 hover:border-gray-600/80 hover:shadow-gray-900/30"
                        : "bg-white/90 backdrop-blur-sm border-gray-200/40 shadow-lg hover:bg-white hover:border-gray-300/60 hover:shadow-slate-400/15"
                    }
                    hover:-translate-y-1 h-80`}
                  >
                    <CardContent className="p-6 h-full flex flex-col relative overflow-hidden">
                      {/* Effet de lueur subtile au hover */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg
                        ${
                          darkMode
                            ? "bg-gradient-to-br from-slate-700/10 via-gray-700/5 to-slate-800/10"
                            : "bg-gradient-to-br from-slate-100/30 via-blue-50/20 to-gray-100/30"
                        }`}
                      ></div>

                      {/* Contenu avec z-index pour rester au-dessus des effets */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Étoiles */}
                        <div className="flex items-center mb-4 gap-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className={`h-4 w-4 fill-amber-400 text-amber-400 transition-all duration-300 group-hover:scale-105
                                ${
                                  darkMode
                                    ? "group-hover:fill-amber-300 group-hover:text-amber-300"
                                    : "group-hover:fill-amber-500 group-hover:text-amber-500"
                                }
                              `}
                            />
                          ))}
                        </div>

                        {/* Texte du témoignage avec hauteur fixe et overflow */}
                        <blockquote
                          className={`text-[12px] md:text-sm italic mb-1 flex-grow leading-relaxed transition-all duration-300 overflow-hidden
                          ${
                            darkMode
                              ? "text-gray-300 group-hover:text-gray-200"
                              : "text-gray-600 group-hover:text-gray-700"
                          }`}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            lineHeight: "1.3",
                            maxHeight: "8rem",
                          }}
                        >
                          "{testimonial.text}"
                        </blockquote>

                        {/* Profil - toujours en bas */}
                        <div className="flex items-center mt-auto pt-1">
                          <div className="relative">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className={`w-12 h-12 rounded-full object-cover transition-all duration-300 group-hover:scale-105
                                ${
                                  darkMode
                                    ? "ring-2 ring-slate-600 group-hover:ring-slate-500"
                                    : "ring-2 ring-slate-300 group-hover:ring-slate-400"
                                }
                              `}
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  testimonial.name
                                )}&background=${
                                  darkMode ? "475569" : "64748b"
                                }&color=fff&size=48`;
                              }}
                            />
                          </div>
                          <div className="ml-4 transition-all duration-300 min-w-0 flex-1">
                            <h4
                              className={`font-semibold text-[12px] md:text-sm  transition-all duration-300 truncate
                              ${
                                darkMode
                                  ? "text-white group-hover:text-slate-200"
                                  : "text-gray-900 group-hover:text-slate-800"
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            <p
                              className={`text-[9px] md:text-xs  transition-all duration-300
                              ${
                                darkMode
                                  ? "text-gray-400 group-hover:text-gray-300"
                                  : "text-gray-500 group-hover:text-gray-600"
                              }`}
                            >
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 transform hover:scale-125
                  ${
                    current === index
                      ? darkMode
                        ? "bg-slate-500 scale-125 shadow-lg shadow-slate-500/50"
                        : "bg-slate-600 scale-125 shadow-lg shadow-slate-600/50"
                      : darkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          {/* Compteur */}
          <div
            className={`text-center mt-4 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Témoignage {current + 1} sur {count}
          </div>
        </div>
      </div>
    </section>
  );
}