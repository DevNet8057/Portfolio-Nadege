// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef } from 'react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('accueil');
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('Tous');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionId);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const testimonials = [
    {
      text: "Nadège a réalisé un reportage exceptionnel sur notre initiative environnementale. Sa capacité à saisir l'essence de notre projet et à le communiquer de manière claire et engageante a dépassé toutes nos attentes. Son professionnalisme et sa rigueur journalistique sont remarquables.",
      name: "Thomas Dupont",
      position: "Directeur, Fondation EcoPlanète",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20man%20in%20business%20attire%2C%20neutral%20background%2C%20confident%20expression%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=testimonial1&orientation=squarish"
    },
    {
      text: "Travailler avec Nadège a été une expérience enrichissante. Son approche méticuleuse et sa capacité à traduire des concepts complexes en récits accessibles ont donné une nouvelle dimension à notre campagne médiatique.",
      name: "Sophie Moreau",
      position: "Responsable Communication, Institut Culturel",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20woman%20with%20short%20hair%20in%20business%20attire%2C%20neutral%20background%2C%20friendly%20smile%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=testimonial2&orientation=squarish"
    },
    {
      text: "Le podcast que Nadège a produit pour notre série sur l'innovation sociale a reçu un accueil extraordinaire. Sa narration captivante et son sens aigu du détail ont transformé notre vision en une histoire puissante qui résonne auprès de notre public.",
      name: "Marc Lefevre",
      position: "Fondateur, Innovations Sociales",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20man%20with%20glasses%20in%20casual%20business%20attire%2C%20neutral%20background%2C%20thoughtful%20expression%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=testimonial3&orientation=squarish"
    },
    {
      text: "Nadège possède un talent rare pour capturer l'authenticité des histoires humaines. Son reportage sur notre communauté a été réalisé avec une sensibilité et une profondeur qui ont touché tous nos membres.",
      name: "Émilie Laurent",
      position: "Présidente, Association Solidarité",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20woman%20with%20elegant%20business%20attire%2C%20neutral%20background%2C%20warm%20smile%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=testimonial4&orientation=squarish"
    },
    {
      text: "La série d'articles que Nadège a écrite pour notre magazine a généré un engagement sans précédent. Sa plume incisive et son approche journalistique rigoureuse en font une collaboratrice exceptionnelle.",
      name: "Pierre Moreau",
      position: "Rédacteur en chef, Magazine Perspectives",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20senior%20man%20with%20glasses%20in%20formal%20attire%2C%20neutral%20background%2C%20serious%20expression%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=testimonial5&orientation=squarish"
    }
  ];

  const portfolioItems = [
    {
      image: "https://readdy.ai/api/search-image?query=Dense%20rainforest%20with%20diverse%20flora%20and%20fauna%2C%20sunlight%20filtering%20through%20canopy%2C%20vibrant%20green%20environment%2C%20misty%20atmosphere%2C%20high%20quality%20nature%20photography&width=400&height=300&seq=portfolio1&orientation=landscape",
      title: "La déforestation en Amazonie",
      category: "Articles",
      description: "Une enquête sur les conséquences environnementales et sociales de la déforestation."
    },
    {
      image: "https://readdy.ai/api/search-image?query=Urban%20street%20with%20people%20protesting%2C%20holding%20signs%2C%20diverse%20crowd%2C%20city%20background%2C%20journalistic%20documentary%20style%20photography&width=400&height=300&seq=portfolio2&orientation=landscape",
      title: "Mouvements sociaux contemporains",
      category: "Articles",
      description: "Analyse des nouveaux mouvements sociaux et leur impact politique."
    },
    {
      image: "https://readdy.ai/api/search-image?query=Modern%20technology%20devices%20on%20desk%2C%20smartphone%2C%20tablet%2C%20laptop%2C%20tech%20gadgets%20with%20glowing%20screens%2C%20clean%20minimal%20setup%2C%20professional%20product%20photography&width=400&height=300&seq=portfolio3&orientation=landscape",
      title: "L'influence des réseaux sociaux",
      category: "Podcasts",
      description: "Comment les plateformes numériques transforment notre société."
    },
    {
      image: "https://readdy.ai/api/search-image?query=Traditional%20food%20market%20with%20local%20vendors%2C%20colorful%20produce%20displays%2C%20bustling%20atmosphere%2C%20authentic%20cultural%20scene%2C%20documentary%20style%20photography&width=400&height=300&seq=portfolio4&orientation=landscape",
      title: "Traditions culinaires en danger",
      category: "Vidéos",
      description: "Exploration des traditions culinaires menacées par la mondialisation."
    },
    {
      image: "https://readdy.ai/api/search-image?query=Urban%20night%20cityscape%20with%20tall%20buildings%2C%20city%20lights%2C%20modern%20architecture%2C%20dramatic%20sky%2C%20professional%20cityscape%20photography&width=400&height=300&seq=portfolio5&orientation=landscape",
      title: "Métamorphoses urbaines",
      category: "Articles",
      description: "Comment les villes se transforment face aux défis contemporains."
    },
    {
      image: "https://readdy.ai/api/search-image?query=Healthcare%20workers%20in%20hospital%20setting%2C%20medical%20staff%20in%20protective%20equipment%2C%20caring%20for%20patients%2C%20professional%20healthcare%20documentary%20photography&width=400&height=300&seq=portfolio6&orientation=landscape",
      title: "Système de santé en crise",
      category: "Vidéos",
      description: "Les défis auxquels font face les systèmes de santé modernes."
    }
  ];

  const filteredPortfolioItems = activePortfolioFilter === 'Tous'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activePortfolioFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Votre message a été envoyé avec succès!");
    // Reset form fields here if needed
  };

  const changeTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
    
    if (testimonialContainerRef.current) {
      const container = testimonialContainerRef.current;
      const testimonialWidth = container.scrollWidth / testimonials.length;
      container.scrollTo({
        left: testimonialWidth * index,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Nadège Yugain</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection('hero')}
              className={`${activeTab === 'accueil' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`${activeTab === 'about' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`${activeTab === 'services' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`${activeTab === 'portfolio' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${activeTab === 'contact' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''} hover:text-blue-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} !rounded-button whitespace-nowrap cursor-pointer`}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button className="md:hidden !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="relative pt-20 overflow-hidden" style={{
        backgroundImage: `linear-gradient(to right, ${darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, ${darkMode ? 'rgba(17, 24, 39, 0.6)' : 'rgba(255, 255, 255, 0.6)'}), url('https://readdy.ai/api/search-image?query=Professional%20journalism%20workspace%20with%20camera%2C%20notebook%2C%20laptop%2C%20and%20coffee%20cup%20on%20wooden%20desk%20with%20soft%20natural%20lighting%2C%20modern%20office%20environment%2C%20high%20quality%20professional%20setup&width=1440&height=600&seq=hero1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '600px'
      }}>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Journaliste & Rédactrice Professionnelle
            </h1>
            <p className="text-xl mb-8">
              Raconter des histoires qui inspirent, informent et transforment. Spécialiste en journalisme d'investigation et reportages de terrain.
            </p>
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors shadow-lg !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Découvrir mon portfolio
            </button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
                Journaliste passionnée avec plus de 10 ans d'expérience dans les médias nationaux et internationaux. Spécialisée dans le journalisme d'investigation et les reportages de terrain, je m'efforce de donner une voix à ceux qui n'en ont pas.
              </p>
              <p className="text-lg mb-6">
                Ma démarche journalistique est fondée sur la rigueur, l'éthique et l'empathie. Chaque histoire mérite d'être racontée avec précision et sensibilité, en respectant la complexité des situations et la dignité des personnes concernées.
              </p>
              <a
                href="/cv-nadege-yugain.pdf"
                download="CV_Nadege_Yugain.pdf"
                className={`inline-flex items-center gap-2 px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors shadow-lg !rounded-button whitespace-nowrap cursor-pointer`}
              >
                <i className="fas fa-download"></i>
                Télécharger mon CV
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mes Services</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Une expertise diversifiée pour répondre à tous vos besoins en matière de contenu journalistique et rédactionnel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-newspaper',
                title: 'Rédaction d\'articles',
                description: 'Articles de fond, enquêtes et analyses pour la presse écrite et numérique.'
              },
              {
                icon: 'fa-microphone',
                title: 'Interviews',
                description: 'Entretiens avec des personnalités et experts dans divers domaines.'
              },
              {
                icon: 'fa-video',
                title: 'Reportages vidéo',
                description: 'Conception et réalisation de reportages audiovisuels complets.'
              },
              {
                icon: 'fa-podcast',
                title: 'Podcasts',
                description: 'Création de contenus audio narratifs et documentaires sonores.'
              },
              {
                icon: 'fa-edit',
                title: 'Rédaction web',
                description: 'Contenu optimisé pour le web, respectant les normes SEO actuelles.'
              },
              {
                icon: 'fa-chalkboard-teacher',
                title: 'Formation',
                description: 'Ateliers et cours sur les techniques journalistiques et la communication.'
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
                  <i className={`fas ${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portfolio</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes travaux les plus significatifs dans différents formats et médias.
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActivePortfolioFilter('Tous')}
                className={`px-4 py-2 rounded-md ${activePortfolioFilter === 'Tous' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} !rounded-button whitespace-nowrap cursor-pointer`}
              >
                Tous
              </button>
              <button
                onClick={() => setActivePortfolioFilter('Articles')}
                className={`px-4 py-2 rounded-md ${activePortfolioFilter === 'Articles' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} !rounded-button whitespace-nowrap cursor-pointer`}
              >
                Articles
              </button>
              <button
                onClick={() => setActivePortfolioFilter('Vidéos')}
                className={`px-4 py-2 rounded-md ${activePortfolioFilter === 'Vidéos' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} !rounded-button whitespace-nowrap cursor-pointer`}
              >
                Vidéos
              </button>
              <button
                onClick={() => setActivePortfolioFilter('Podcasts')}
                className={`px-4 py-2 rounded-md ${activePortfolioFilter === 'Podcasts' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')} !rounded-button whitespace-nowrap cursor-pointer`}
              >
                Podcasts
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolioItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-200'} mb-2`}>{item.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => alert("Fonctionnalité en cours de développement")}
              className={`px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors shadow-lg !rounded-button whitespace-nowrap cursor-pointer`}
            >
              Voir plus de projets
            </button>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Ce que disent mes collaborateurs et clients à propos de mon travail.
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <button 
              onClick={() => changeTestimonial((currentTestimonialIndex - 1 + testimonials.length) % testimonials.length)}
              className={`absolute left-0 z-10 w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center shadow-lg transform -translate-x-5 !rounded-button whitespace-nowrap cursor-pointer`}>
              <i className="fas fa-chevron-left"></i>
            </button>

            <div 
              ref={testimonialContainerRef}
              className="overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-500"
                style={{ width: `${testimonials.length * 100}%` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={`p-6 w-1/${testimonials.length} px-2`}
                  >
                    <div className={`p-6 rounded-lg shadow-lg h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} ${index === currentTestimonialIndex ? 'scale-105' : 'scale-100'} transition-all duration-300`}>
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
                          <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                          <p className="text-xs">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => changeTestimonial((currentTestimonialIndex + 1) % testimonials.length)}
              className={`absolute right-0 z-10 w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center shadow-lg transform translate-x-5 !rounded-button whitespace-nowrap cursor-pointer`}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => changeTestimonial(index)}
                className={`w-2 h-2 rounded-full ${currentTestimonialIndex === index ? (darkMode ? 'bg-blue-600' : 'bg-blue-500') : (darkMode ? 'bg-gray-600' : 'bg-gray-300')} !rounded-button whitespace-nowrap cursor-pointer`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contactez-moi</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Vous avez un projet journalistique ou une collaboration à proposer ? N'hésitez pas à me contacter.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Nom</label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none`}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none`}
                      placeholder="Votre email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none`}
                    placeholder="Sujet de votre message"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none`}
                    placeholder="Votre message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors shadow-lg !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  Envoyer le message
                </button>
              </form>
            </div>
            <div className="md:w-1/2">
              <div className={`h-full p-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white mr-4`}>
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p>contact@nadegeyugain.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white mr-4`}>
                      <i className="fas fa-phone text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Téléphone</h4>
                      <p>+33 6 12 34 56 78</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white mr-4`}>
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Localisation</h4>
                      <p>Paris, France</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Suivez-moi</h4>
                  <div className="flex space-x-4">
                    <a href="#" className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500'} flex items-center justify-center transition-colors cursor-pointer`}>
                      <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a href="#" className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500'} flex items-center justify-center transition-colors cursor-pointer`}>
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a href="#" className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500'} flex items-center justify-center transition-colors cursor-pointer`}>
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500'} flex items-center justify-center transition-colors cursor-pointer`}>
                      <i className="fab fa-youtube text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className={`py-10 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Nadège Yugain</h2>
              <p className="mt-2">Journaliste & Rédactrice Professionnelle</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a onClick={() => scrollToSection('hero')} className="hover:text-blue-400 transition-colors cursor-pointer">Accueil</a>
              <a onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors cursor-pointer">À propos</a>
              <a onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors cursor-pointer">Services</a>
              <a onClick={() => scrollToSection('portfolio')} className="hover:text-blue-400 transition-colors cursor-pointer">Portfolio</a>
              <a onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">Contact</a>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Nadège Yugain. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors cursor-pointer">Mentions légales</a>
              <a href="#" className="hover:text-blue-400 transition-colors cursor-pointer">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
