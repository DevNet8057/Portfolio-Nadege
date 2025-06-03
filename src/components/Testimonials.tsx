"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Star } from 'lucide-react'

// Import du type depuis votre fichier
import type { Testimonial } from "../types";
import { testimonials } from "../data/testimonial";

interface TestimonialsProps {
  darkMode?: boolean;
  testimonials?: Testimonial[];
  currentTestimonialIndex?: number;
  changeTestimonial?: (index: number) => void;
  testimonialContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function TestimonialsCarousel({ darkMode = false, testimonials: propTestimonials }: TestimonialsProps = {}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  const testimonialsData = propTestimonials || testimonials;

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-défilement
  React.useEffect(() => {
    if (!api || !isAutoPlaying) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api, isAutoPlaying])

  const goToPrevious = () => {
    api?.scrollPrev()
  }

  const goToNext = () => {
    api?.scrollNext()
  }

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'}`}>
            Témoignages
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ce que disent mes collaborateurs et clients à propos de mon travail.
          </p>
        </div>

        {/* Carrousel */}
        <div className="max-w-4xl mx-auto relative"
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
          
          {/* Bouton gauche */}
          <button
            onClick={goToPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1 ${
              darkMode
                ? 'bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600'
                : 'bg-white/95 hover:bg-white border border-gray-200/50 hover:border-gray-300 text-gray-700 hover:text-gray-900'
            } backdrop-blur-md flex items-center justify-center`}
            aria-label="Témoignage précédent"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Bouton droite */}
          <button
            onClick={goToNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-1 ${
              darkMode
                ? 'bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600'
                : 'bg-white/95 hover:bg-white border border-gray-200/50 hover:border-gray-300 text-gray-700 hover:text-gray-900'
            } backdrop-blur-md flex items-center justify-center`}
            aria-label="Témoignage suivant"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <Carousel
            setApi={setApi}
            className="w-full px-12"
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className={`h-full transition-all duration-300 ease-out hover:shadow-xl group cursor-pointer
                    ${darkMode 
                      ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800/95 hover:border-gray-600/80 hover:shadow-gray-900/30' 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200/40 shadow-lg hover:bg-white hover:border-gray-300/60 hover:shadow-slate-400/15'
                    }
                    hover:-translate-y-1`}
                  >
                    <CardContent className="p-6 h-full flex flex-col relative overflow-hidden">
                      {/* Effet de lueur subtile au hover */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg
                        ${darkMode 
                          ? 'bg-gradient-to-br from-slate-700/10 via-gray-700/5 to-slate-800/10' 
                          : 'bg-gradient-to-br from-slate-100/30 via-blue-50/20 to-gray-100/30'
                        }`}></div>
                      
                      {/* Contenu avec z-index pour rester au-dessus des effets */}
                      <div className="relative z-10">
                        {/* Étoiles */}
                        <div className="flex items-center mb-4 gap-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star 
                              key={starIndex} 
                              className={`h-4 w-4 fill-amber-400 text-amber-400 transition-all duration-300 group-hover:scale-105
                                ${darkMode ? 'group-hover:fill-amber-300 group-hover:text-amber-300' : 'group-hover:fill-amber-500 group-hover:text-amber-500'}
                              `}
                            />
                          ))}
                        </div>

                        {/* Texte du témoignage */}
                        <blockquote className={`text-sm italic mb-6 flex-grow leading-relaxed transition-all duration-300
                          ${darkMode 
                            ? 'text-gray-300 group-hover:text-gray-200' 
                            : 'text-gray-600 group-hover:text-gray-700'
                          }`}>
                          "{testimonial.text}"
                        </blockquote>

                        {/* Profil */}
                        <div className="flex items-center mt-auto">
                          <div className="relative">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className={`w-12 h-12 rounded-full object-cover transition-all duration-300 group-hover:scale-105
                                ${darkMode 
                                  ? 'ring-2 ring-slate-600 group-hover:ring-slate-500' 
                                  : 'ring-2 ring-slate-300 group-hover:ring-slate-400'
                                }
                              `}
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=${darkMode ? '475569' : '64748b'}&color=fff&size=48`;
                              }}
                            />
                          </div>
                          <div className="ml-4 transition-all duration-300">
                            <h4 className={`font-semibold text-sm transition-all duration-300
                              ${darkMode 
                                ? 'text-white group-hover:text-slate-200' 
                                : 'text-gray-900 group-hover:text-slate-800'
                              }`}>
                              {testimonial.name}
                            </h4>
                            <p className={`text-xs transition-all duration-300
                              ${darkMode 
                                ? 'text-gray-400 group-hover:text-gray-300' 
                                : 'text-gray-500 group-hover:text-gray-600'
                              }`}>
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
            
            <CarouselPrevious className={`-left-12 ${darkMode ? 'bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border-gray-700/50 hover:border-gray-600' : 'bg-white/95 hover:bg-white border-gray-200/50 hover:border-gray-300'} backdrop-blur-md shadow-lg`} />
            <CarouselNext className={`-right-12 ${darkMode ? 'bg-gray-800/90 hover:bg-gray-700/95 text-gray-300 hover:text-white border-gray-700/50 hover:border-gray-600' : 'bg-white/95 hover:bg-white border-gray-200/50 hover:border-gray-300'} backdrop-blur-md shadow-lg`} />
          </Carousel>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 transform hover:scale-125
                  ${current === index
                    ? darkMode
                      ? 'bg-slate-500 scale-125 shadow-lg shadow-slate-500/50'
                      : 'bg-slate-600 scale-125 shadow-lg shadow-slate-600/50'
                    : darkMode
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          {/* Compteur */}
          <div className={`text-center mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Témoignage {current + 1} sur {count}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel