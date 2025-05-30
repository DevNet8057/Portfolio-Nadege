import React from "react";

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => (
  <section
    id="about"
    className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 overflow-hidden rounded-lg shadow-xl">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20female%20journalist%20with%20notebook%20and%20camera%2C%20business%20casual%20attire%2C%20confident%20pose%2C%20neutral%20background%2C%20high%20quality%20professional%20portrait&width=500&height=600&seq=profile1&orientation=portrait"
            alt="Nadège Yugain"
            className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-6">À propos de moi</h2>
          <p className="text-lg mb-4">
            Journaliste passionnée avec plus de 10 ans d'expérience dans les
            médias nationaux et internationaux. Spécialisée dans le journalisme
            d'investigation et les reportages de terrain, je m'efforce de donner
            une voix à ceux qui n'en ont pas.
          </p>
          <p className="text-lg mb-6">
            Ma démarche journalistique est fondée sur la rigueur, l'éthique et
            l'empathie. Chaque histoire mérite d'être racontée avec précision et
            sensibilité, en respectant la complexité des situations et la
            dignité des personnes concernées.
          </p>
          <a
            href="/cv-nadege-yugain.pdf"
            download="CV_Nadege_Yugain.pdf"
            className={`inline-flex items-center gap-2 px-6 py-3 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors shadow-lg`}
          >
            <i className="fas fa-download"></i>
            Télécharger mon CV
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default About;
