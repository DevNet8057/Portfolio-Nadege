import React, { useRef, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Testimonials from "./Testimonials";
import { portfolioItems } from "../data/portfolioItems";
import { services } from "../data/services";
import { testimonials } from "../data/testimonial";

interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState("accueil");
  const [activePortfolioFilter, setActivePortfolioFilter] = useState("Tous");
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  const filteredPortfolioItems =
    activePortfolioFilter === "Tous"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category === activePortfolioFilter
        );

  const changeTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
    if (testimonialContainerRef.current) {
      const container = testimonialContainerRef.current;
      const testimonialWidth = container.scrollWidth / testimonials.length;
      container.scrollTo({
        left: testimonialWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeTab={activeTab}
        scrollToSection={scrollToSection}
      />
      <Hero darkMode={darkMode} scrollToSection={scrollToSection} />
      <About darkMode={darkMode} />
      <Services darkMode={darkMode} services={services} />
      <Portfolio
        darkMode={darkMode}
        activePortfolioFilter={activePortfolioFilter}
        setActivePortfolioFilter={setActivePortfolioFilter}
        portfolioItems={filteredPortfolioItems}
      />
      <Testimonials
        darkMode={darkMode}
        testimonials={testimonials}
        currentTestimonialIndex={currentTestimonialIndex}
        changeTestimonial={changeTestimonial}
        testimonialContainerRef={testimonialContainerRef}
      />
      <Contact darkMode={darkMode} services={services} />
      <Footer darkMode={darkMode} scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;