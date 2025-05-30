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
}) => (
  <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Ce que disent mes collaborateurs et clients à propos de mon travail.
        </p>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={() =>
            changeTestimonial(
              (currentTestimonialIndex - 1 + testimonials.length) %
                testimonials.length
            )
          }
          className={`absolute left-0 z-10 w-10 h-10 rounded-full ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          } flex items-center justify-center shadow-lg transform -translate-x-5`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div ref={testimonialContainerRef} className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 w-1/${testimonials.length} px-2`}
              >
                <div
                  className={`p-6 rounded-lg shadow-lg h-full ${
                    darkMode ? "bg-gray-800" : "bg-gray-50"
                  } ${
                    index === currentTestimonialIndex
                      ? "scale-105"
                      : "scale-100"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic mb-6 line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() =>
            changeTestimonial(
              (currentTestimonialIndex + 1) % testimonials.length
            )
          }
          className={`absolute right-0 z-10 w-10 h-10 rounded-full ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          } flex items-center justify-center shadow-lg transform translate-x-5`}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => changeTestimonial(index)}
            className={`w-2 h-2 rounded-full ${
              currentTestimonialIndex === index
                ? darkMode
                  ? "bg-blue-600"
                  : "bg-blue-500"
                : darkMode
                ? "bg-gray-600"
                : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
