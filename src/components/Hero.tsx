import React from "react";

interface HeroProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
  color: string;
}

const Hero: React.FC<HeroProps> = ({ darkMode, scrollToSection }) => {
  const socialLinks: SocialLink[] = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@nadegeyugain",
      color: "hover:text-red-500",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nadege-yugain-b901ba352/",
      color: "hover:text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://x.com/Nadegeyugain",
      color: "hover:text-blue-400",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nadege_yugain/",
      color: "hover:text-pink-500",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, ${
          darkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(17, 24, 39, 0.5)"
        }, ${
          darkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(17, 24, 39, 0.2)"
        }), url('https://readdy.ai/api/search-image?query=Professional%20journalism%20workspace%20with%20camera%2C%20notebook%2C%20laptop%2C%20and%20coffee%20cup%20on%20wooden%20desk%20with%20soft%20natural%20lighting%2C%20modern%20office%20environment%2C%20high%20quality%20professional%20setup&width=1440&height=600&seq=hero1&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        height: "100vh"
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Contenu principal avec marge à droite pour éviter les liens sociaux */}
        <div className="max-w-2xl pr-4 lg:pr-20 xl:pr-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Journaliste Professionnelle
          </h1>
          <p className="text-xl mb-8 text-white">
            Raconter des histoires qui inspirent, informent et transforment.
            Spécialiste en reportage et entretien.
          </p>
          <button
            onClick={() => scrollToSection("portfolio")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            Découvrir mon portfolio
          </button>
        </div>
      </div>

      {/* Social Media Links - Vertical positioning */}
      <div className="absolute bottom-8 right-4 sm:right-6 md:right-8 flex flex-col gap-3 sm:gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110
              flex items-center justify-center
              ${darkMode 
                ? "bg-white/10 text-white hover:bg-white/20" 
                : "bg-black/20 text-white hover:bg-black/30"
              }
              ${social.color}
            `}
            aria-label={`Suivez-moi sur ${social.name}`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
              {social.icon}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;