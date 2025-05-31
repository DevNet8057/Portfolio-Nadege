import React from "react";
import type { Testimonial } from "../types";

interface TestimonialsProps {
  darkMode: boolean;
  testimonials: Testimonial[];
  currentTestimonialIndex: number;
  changeTestimonial: (index: number) => void;
  testimonialContainerRef: React.RefObject<HTMLDivElement | null>;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  darkMode,
  testimonials,
  currentTestimonialIndex,
  changeTestimonial,
  testimonialContainerRef,
}) => {
  // Responsive: 1 slide on mobile, 3 on desktop
  const slidesToShow = 3;

  // Calcul du bon index pour le carrousel circulaire
  const getVisibleTestimonials = () => {
    const arr = [];
    for (let i = 0; i < slidesToShow; i++) {
      arr.push(
        testimonials[(currentTestimonialIndex + i) % testimonials.length]
      );
    }
    return arr;
  };

  const visibleTestimonials = getVisibleTestimonials();

 return (
  <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Ce que disent mes collaborateurs et clients à propos de mon travail.
        </p>
      </div>

      {/* Carrousel */}
      <div className="relative max-w-6xl mx-auto">
        {/* Bouton précédent */}
        <button
          onClick={() =>
            changeTestimonial(
              (currentTestimonialIndex - 1 + testimonials.length) %
                testimonials.length
            )
          }
          className={`absolute left-0 z-10 w-12 h-12 rounded-full top-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg transition-transform hover:-translate-x-1 ${
            darkMode
              ? 'bg-gray-700 hover:bg-blue-600 text-white'
              : 'bg-white hover:bg-blue-500 hover:text-white text-gray-800'
          }`}
          aria-label="Précédent"
        >
          <i className="fas fa-chevron-left text-xl"></i>
        </button>

        {/* Conteneur du carrousel */}
        <div ref={testimonialContainerRef} className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: "100%",
              gap: "1.5rem",
              justifyContent: "center",
            }}
          >
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-0 md:max-w-[32%] lg:max-w-[31%] snap-start"
              >
                <div
                  className={`p-6 rounded-xl shadow-lg h-full flex flex-col ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } border-l-4 border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-105`}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, starIdx) => (
                        <i key={starIdx} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic mb-6 line-clamp-4 text-gray-600 dark:text-gray-300">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-auto flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-blue-400">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton suivant */}
        <button
          onClick={() =>
            changeTestimonial(
              (currentTestimonialIndex + 1) % testimonials.length
            )
          }
          className={`absolute right-0 z-10 w-12 h-12 rounded-full top-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg transition-transform hover:translate-x-1 ${
            darkMode
              ? 'bg-gray-700 hover:bg-blue-600 text-white'
              : 'bg-white hover:bg-blue-500 hover:text-white text-gray-800'
          }`}
          aria-label="Suivant"
        >
          <i className="fas fa-chevron-right text-xl"></i>
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => changeTestimonial(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentTestimonialIndex === index
                ? darkMode
                  ? 'bg-blue-500'
                  : 'bg-blue-600'
                : darkMode
                ? 'bg-gray-600 hover:bg-gray-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Page ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  </section>
);
};

export default Testimonials;
