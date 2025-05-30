import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useRef, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import { portfolioItems } from "./data/portfolioItems";
import { services } from "./data/services";
import { testimonials } from "./data/testimonial";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  const toggleDarkMode = () => setDarkMode(!darkMode);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Votre message a été envoyé !");
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
      <Contact darkMode={darkMode} handleSubmit={handleSubmit} />
      <Footer darkMode={darkMode} scrollToSection={scrollToSection} />
    </div>
  );
};

export default App;
