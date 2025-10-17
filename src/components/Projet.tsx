import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import img_nadege from "@/assets/nadege page1.jpg"


interface ProjetProps {
  darkMode: boolean;
}

function Projet({ darkMode }: ProjetProps) {
  const [expandedParagraph, setExpandedParagraph] = useState(2);
  const [expandedArticles, setExpandedArticles] = useState(10);



  const paragraphs = [
    "Faire briller le continent à travers ses talents, ses idées et ses réussites.",
    "Lumières d'Afrique est un projet initié par Nadège Yugain, journaliste passionnée par les histoires qui font battre le cœur du continent. Son objectif est simple : mettre en lumière celles et ceux qui réinventent l'Afrique,jeunes entrepreneurs, innovateurs, artistes, chercheurs, éducateurs ou leaders engagés tous ces visages qui bâtissent, chaque jour, l'avenir du continent.",
    "À travers la newsletter \"Lumières d'Afrique\" et ses déclinaisons sur les réseaux, le projet raconte les réussites, les initiatives locales, les innovations et les solutions africaines qui méritent d'être connues, partagées et célébrées.",
    "Mais Lumières d'Afrique est bien plus qu'un média. C'est un mouvement d'espoir et de fierté, une plateforme qui veut :",
    "Parce que l'Afrique n'a pas besoin qu'on la sauve : elle a besoin qu'on la voie telle qu'elle est, pleine de promesses, d'énergie et de génie.",
    "Lumières d'Afrique, c'est l'espace où brillent celles et ceux qui construisent le futur du continent."
  ];

  const bulletPoints = [
    "Valoriser le talent et la créativité africaine ;",
    "Inspirer la jeunesse à croire en ses rêves et en ses capacités ;",
    "Encourager la collaboration entre Africains du continent et de la diaspora ;",
    "Promouvoir une image positive, forte et authentique de l'Afrique dans le monde."
  ];

  const handleExpandNext = () => {
    setExpandedParagraph(paragraphs.length - 1);
  };

  const handleExpandArticles = () => {
    if (expandedArticles === 3) {
      setExpandedArticles(7);
    } else {
      setExpandedArticles(10);
    }
  };

  const handleCollapseArticles = () => {
    setExpandedArticles(3);
  };


  const scrollToSection = (sectionId: string) => {
    // Since we're on the projet page, scroll to sections within this page
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <Header
        darkMode={darkMode}
        activeTab=""
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className={`relative py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-blue-400">Lumières</span> <span className="text-yellow-500">d'Afrique</span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-3/5 overflow-hidden rounded-lg shadow-xl">
                <img
                  src={img_nadege}
                  alt="photo de Nadège Yugain"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
              <div className="md:w-4/5">
                <h3 className="text-2xl font-semibold mb-4">Lumières d'Afrique</h3>

                {/* Version Desktop - Affichage normal */}
                <div className="hidden md:block">
                  {paragraphs.slice(0, 4).map((paragraph, index) => (
                    <p key={index} className="text-lg mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  <ul className="text-lg mb-4 leading-relaxed list-disc list-inside">
                    {bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  {paragraphs.slice(4).map((paragraph, index) => (
                    <p key={index + 4} className="text-lg mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Version Mobile - Affichage progressif */}
                <div className="block md:hidden">
                  {paragraphs.slice(0, expandedParagraph + 1).map((paragraph, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-lg leading-relaxed mb-2">{paragraph}</p>

                      {/* Afficher les puces après le 4ème paragraphe */}
                      {index === 3 && expandedParagraph >= 3 && (
                        <ul className="text-lg mb-4 leading-relaxed list-disc list-inside">
                          {bulletPoints.map((point, bulletIndex) => (
                            <li key={bulletIndex}>{point}</li>
                          ))}
                        </ul>
                      )}

                      {/* Bouton "Lire la suite" pour le paragraphe actuel */}
                      {index === expandedParagraph && expandedParagraph < paragraphs.length - 1 && (
                        <button
                          onClick={handleExpandNext}
                          className={`text-sm font-medium transition-colors duration-200 ${
                            darkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          Lire la suite...
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Publications LinkedIn */}
      <section
        id="portfolio"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Publications récentes
          </h3>
          {/* Version Desktop et Tablette - Toutes les cartes */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "article-0",
                title: "Paul Kammogne Fokam : le banquier qui a mis son génie au service de l'Afrique.",
                excerpt: "un homme dont le parcours incarne la vision, la rigueur et l'amour du continent africain : Dr Paul K. Fokam  ....",
                date: "16 octobre 2025",
                url: "https://www.linkedin.com/pulse/paul-kammogne-fokam-le-banquier-qui-mis-son-g%C3%A9nie-au-service-yugain-aqjdf",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQG-lyVoCBcJ_w/article-cover_image-shrink_600_2000/B4DZnsidnQHsAQ-/0/1760610083633?e=1763596800&v=beta&t=KEpFuU2OrXFczWAza-6A_F9ph1Yp2tRCzg3zQpc2z8I"
              },
              {
                id: "article-1",
                title: "La Togolaise qui révolutionne la banque grâce à l'intelligence artificielle.",
                excerpt: "Elle fait partie de cette nouvelle génération d'entrepreneures africaines qui façonnent le futur grâce à la technologie. ....",
                date: "09 octobre 2025",
                url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_lumiaeyresdafrique-entrepreneuriatafricain-activity-7382005581265588224-fcdO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQE6Tr6GGIQxKw/feedshare-shrink_1280/B4DZnIm8dBJcAs-/0/1760007280779?e=1763596800&v=beta&t=tI-iBAmDbTVGt5gY5JH2OPA5EFlEqYHG60vWP30V3_A"
              },
              {
                id: "article-2",
                title: "L'ascension d'Aminata DIALLO, Générale et leader en Guinée",
                excerpt: "Fille de Fatoumata Binta Diallo, plus connue sous le nom de Binta Pilote , première femme pilote d'hélicoptère en Afrique noire . Aminata DIALLO a grandi...",
                date: "15 Juin 2025",
                url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_parcours-inspirant-lascension-daminata-activity-7365663042983837696-ul78?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEbjObeqLX4Dg/article-cover_image-shrink_600_2000/B4DZjgWBl3GkAU-/0/1756110528620?e=1763596800&v=beta&t=iuebUF7IX3Ti4ydA_3OM5ANoqMuFa3G1xBJEivOf2Lk"
              },
              {
                id: "article-3",
                title: "expert reconnu en cybersécurité et cofondateur d'Africa CyberSec.",
                excerpt: "Eric Ngabonziza , expert reconnu en cybersécurité et cofondateur d'Africa CyberSec....",
                date: "1 Octobre 2025",
                url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_cybersaezcuritaez-innovationafricaine-leadership-activity-7378439619421487104-UhF0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQFBaEZbcaGLmg/feedshare-shrink_800/B4DZmV7sw0H4Ag-/0/1759157088762?e=1763596800&v=beta&t=-LwQ6yLQqaqJTlEXTM_0Quly_oJOSghq6vPcwEtxtsU"
              },
              {
                id: "article-4",
                title: "Babacar Charles Ndoye, expert en Gouvernance, Risque et Conformité (GRC).",
                excerpt: "Avec plus de 20 ans d'expérience internationale dans les technologies de l'information et la cybersécurité...",
                date: "25 Septembre 2025",
                url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_cybersaezcuritaez-afrique-leadership-activity-7376255578756681729-bFUj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQHxTUvfM9NgZw/feedshare-shrink_800/B4DZl25VX8JMAk-/0/1758636372538?e=1763596800&v=beta&t=wzBz1NMLLpAWracWdrUKTGosbKXZrAV6pRmIHREE2YA"
              },
              {
                id: "article-5",
                title: "De la data à la blockchain : le parcours visionnaire de Nelly Chatue-Diop",
                excerpt: " informaticienne camerounaise et entrepreneure à la tête de Ejara, une plateforme qui révolutionne l'investissement en Afrique grâce à la blockchain....",
                date: "15 Août  2025",
                url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_de-la-data-%C3%A0-la-blockchain-le-parcours-activity-7359252434872872960-Ezc7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQHbH0Y98tul8g/article-cover_image-shrink_423_752/B4DZiFOOpMHYAU-/0/1754581766420?e=1763596800&v=beta&t=--dFF-057L6uT9xgrA76I1BRv7nWEC0Fi3kWsv3Q0cU"
              },
              {
                id: "article-6",
                title: "Henri-Claude Oyima : bâtisseur d'une finance africaine souveraine",
                excerpt: "Henri-Claude Oyima ministre d'État de l'Économie et des Finances du Gabon et PDG du groupe BGFIBank...",
                date: "23 Juillet 2025",
                url: "https://www.linkedin.com/pulse/henri-claude-oyima-ministre-d%C3%A9tat-de-l%C3%A9conomie-et-des-nadege-yugain-wxiof",
                backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEH5zvrqcO2sQ/article-cover_image-shrink_720_1280/B4DZmlsAPWIcAI-/0/1759421401193?e=1763596800&v=beta&t=WcQ3_pACMiLNmO3e69Fe3TrDjBFP93gleOHwTvVshBs"
              },
                {
                 id: "article-7",
                 title: "Olufemi Otedola : bâtisseur et mentor des générations",
                 excerpt: " Olufemi Peter Otedola CON , une figure emblématique de l'entrepreneuriat nigérian et africain. Son histoire est celle d'un homme qui a bâti un empire dans l'énergie...",
                 date: "2 septembre 2025",
                 url: "https://www.linkedin.com/pulse/olufemi-peter-otedola-un-parcours-qui-%C3%A9lectrise-lafrique-yugain-zvnpf",
                 backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQE01l3aQFaKRA/article-cover_image-shrink_600_2000/B4DZkJStDFGgAQ-/0/1756797523001?e=1763596800&v=beta&t=yc5z7Pz5Jpbb3bLpBButtQ1kXxlXg6_-MONIQuXtlYs"
               },
               {
                 id: "article-8",
                 title: "Bertrand Mbouck : Un parcours de rigueur, d'excellence et d'inspiration pour la jeunesse africaine",
                 excerpt: " Né le 12 mai 1978 à Marseille, Bertrand Mbouck grandit à Douala dans une famille de cinq enfants. Très tôt, il fait preuve d'un esprit brillant et d'une discipline rigoureuse....",
                 date: "15 Août  2025",
                 url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_bertrand-mbouck-un-parcours-de-rigueur-activity-7353050117450403840-Rx9Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                 backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEvpMc8yk-NRw/article-cover_image-shrink_180_320/B4DZgtFupQGkAY-/0/1753103133797?e=1763596800&v=beta&t=-rZvP7hmAn6DhTFauXUQks2oyaPEMpIeTq9uHD1f3fU"
               },
               {
                 id: "article-9",
                 title: "un entrepreneur visionnaire, Godefroy Kouokam ",
                 excerpt: "Avec plus de 20 ans d'expérience internationale dans la gestion d'entreprises et de projets stratégiques, Godefroy Kouokam s'impose...",
                 date: "14 Octobre 2025",
                 url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_lumiaeyresdafrique-entrepreneuriatafricain-activity-7383818877916446720-l2Tl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                 backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQH9Ar1DtpsHDw/feedshare-shrink_800/B4DZne9HwYGkAk-/0/1760382209059?e=1763596800&v=beta&t=U6_oWU0cG2HF1S4zLHkv0jvE4PZfC1e222VBsRP7N6Q"
               }

            ].slice(0, expandedArticles).map((article) => (
              <div
                key={article.id}
                className={`rounded-lg p-6 border transition-all duration-300 hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 hover:border-blue-500 hover:shadow-blue-500/20"
                    : "bg-white border-gray-200 hover:border-blue-500 hover:shadow-blue-500/20"
                }`}
              >
                <div
                  className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundImage: (article as any).backgroundImage ? `url(${(article as any).backgroundImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {!(article as any).backgroundImage && (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {(article as any).backgroundImage && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className={`text-sm mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{article.date}</div>
                <h4 className="text-xl font-semibold mb-3">{article.title}</h4>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{article.excerpt}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={`font-medium inline-flex items-center gap-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                  Lire sur LinkedIn
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* Paragraphe final - Version Desktop */}
          <div className={`mt-12 p-6 rounded-lg border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}>
            <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Découvrez davantage de contenu de Lumières d'Afrique sur LinkedIn et vous avez aussi la possibilité de voir mes reportages principalement sur YouTube et d'autres réseaux sociaux. N'hésitez pas à me contacter via WhatsApp ou par e-mail pour vos projets, collaborations, suggestions ou toute autre idée. Je suis à votre disposition pour échanger et partager !
            </p>
          </div>

          {/* Version Mobile - Affichage progressif */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  id: "article-0",
                  title: "Paul Kammogne Fokam : le banquier qui a mis son génie au service de l'Afrique.",
                  excerpt: "un homme dont le parcours incarne la vision, la rigueur et l'amour du continent africain : Dr Paul K. Fokam  ....",
                  date: "16 octobre 2025",
                  url: "https://www.linkedin.com/pulse/paul-kammogne-fokam-le-banquier-qui-mis-son-g%C3%A9nie-au-service-yugain-aqjdf",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQG-lyVoCBcJ_w/article-cover_image-shrink_600_2000/B4DZnsidnQHsAQ-/0/1760610083633?e=1763596800&v=beta&t=KEpFuU2OrXFczWAza-6A_F9ph1Yp2tRCzg3zQpc2z8I"
                },
                {
                  id: "article-1",
                  title: "La Togolaise qui révolutionne la banque grâce à l'intelligence artificielle.",
                  excerpt: "Elle fait partie de cette nouvelle génération d'entrepreneures africaines qui façonnent le futur grâce à la technologie. ....",
                  date: "09 octobre 2025",
                  url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_lumiaeyresdafrique-entrepreneuriatafricain-activity-7382005581265588224-fcdO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQE6Tr6GGIQxKw/feedshare-shrink_800/B4DZnIm8dBJcAg-/0/1760007280600?e=1763596800&v=beta&t=4_qkuQDXmzT32MNcb72KBTYKzjsP0F9QihqVj9juR7g"
                },
                {
                  id: "article-2",
                  title: "L'ascension d'Aminata DIALLO, Générale et leader en Guinée",
                  excerpt: "Fille de Fatoumata Binta Diallo, plus connue sous le nom de Binta Pilote , première femme pilote d'hélicoptère en Afrique noire . Aminata DIALLO a grandi...",
                  date: "15 Juin 2025",
                  url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_parcours-inspirant-lascension-daminata-activity-7365663042983837696-ul78?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEbjObeqLX4Dg/article-cover_image-shrink_600_2000/B4DZjgWBl3GkAU-/0/1756110528620?e=1763596800&v=beta&t=iuebUF7IX3Ti4ydA_3OM5ANoqMuFa3G1xBJEivOf2Lk"
                },
                {
                  id: "article-3",
                  title: "expert reconnu en cybersécurité et cofondateur d'Africa CyberSec.",
                  excerpt: "Eric Ngabonziza , expert reconnu en cybersécurité et cofondateur d'Africa CyberSec....",
                  date: "1 Octobre 2025",
                  url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_cybersaezcuritaez-innovationafricaine-leadership-activity-7378439619421487104-UhF0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQFBaEZbcaGLmg/feedshare-shrink_800/B4DZmV7sw0H4Ag-/0/1759157088762?e=1763596800&v=beta&t=-LwQ6yLQqaqJTlEXTM_0Quly_oJOSghq6vPcwEtxtsU"
                },
                {
                  id: "article-4",
                  title: "Babacar Charles Ndoye, expert en Gouvernance, Risque et Conformité (GRC).",
                  excerpt: "Avec plus de 20 ans d'expérience internationale dans les technologies de l'information et la cybersécurité...",
                  date: "25 Septembre 2025",
                  url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_cybersaezcuritaez-afrique-leadership-activity-7376255578756681729-bFUj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQHxTUvfM9NgZw/feedshare-shrink_800/B4DZl25VX8JMAk-/0/1758636372538?e=1763596800&v=beta&t=wzBz1NMLLpAWracWdrUKTGosbKXZrAV6pRmIHREE2YA"
                },
                {
                  id: "article-5",
                  title: "De la data à la blockchain : le parcours visionnaire de Nelly Chatue-Diop",
                  excerpt: " informaticienne camerounaise et entrepreneure à la tête de Ejara, une plateforme qui révolutionne l'investissement en Afrique grâce à la blockchain....",
                  date: "15 Août  2025",
                  url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_de-la-data-%C3%A0-la-blockchain-le-parcours-activity-7359252434872872960-Ezc7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQHbH0Y98tul8g/article-cover_image-shrink_423_752/B4DZiFOOpMHYAU-/0/1754581766420?e=1763596800&v=beta&t=--dFF-057L6uT9xgrA76I1BRv7nWEC0Fi3kWsv3Q0cU"
                },
                {
                  id: "article-6",
                  title: "Henri-Claude Oyima : bâtisseur d'une finance africaine souveraine",
                  excerpt: "Henri-Claude Oyima ministre d'État de l'Économie et des Finances du Gabon et PDG du groupe BGFIBank...",
                  date: "23 Juillet 2025",
                  url: "https://www.linkedin.com/pulse/henri-claude-oyima-ministre-d%C3%A9tat-de-l%C3%A9conomie-et-des-nadege-yugain-wxiof",
                  backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEH5zvrqcO2sQ/article-cover_image-shrink_720_1280/B4DZmlsAPWIcAI-/0/1759421401193?e=1763596800&v=beta&t=WcQ3_pACMiLNmO3e69Fe3TrDjBFP93gleOHwTvVshBs"
                },
                  {
                   id: "article-7",
                   title: "Olufemi Otedola : bâtisseur et mentor des générations",
                   excerpt: " Olufemi Peter Otedola CON , une figure emblématique de l'entrepreneuriat nigérian et africain. Son histoire est celle d'un homme qui a bâti un empire dans l'énergie...",
                   date: "2 septembre 2025",
                   url: "https://www.linkedin.com/pulse/olufemi-peter-otedola-un-parcours-qui-%C3%A9lectrise-lafrique-yugain-zvnpf",
                   backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQE01l3aQFaKRA/article-cover_image-shrink_600_2000/B4DZkJStDFGgAQ-/0/1756797523001?e=1763596800&v=beta&t=yc5z7Pz5Jpbb3bLpBButtQ1kXxlXg6_-MONIQuXtlYs"
                 },
                 {
                   id: "article-8",
                   title: "Bertrand Mbouck : Un parcours de rigueur, d'excellence et d'inspiration pour la jeunesse africaine",
                   excerpt: " Né le 12 mai 1978 à Marseille, Bertrand Mbouck grandit à Douala dans une famille de cinq enfants. Très tôt, il fait preuve d'un esprit brillant et d'une discipline rigoureuse....",
                   date: "15 Août  2025",
                   url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_bertrand-mbouck-un-parcours-de-rigueur-activity-7353050117450403840-Rx9Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                   backgroundImage: "https://media.licdn.com/dms/image/v2/D4D12AQEvpMc8yk-NRw/article-cover_image-shrink_180_320/B4DZgtFupQGkAY-/0/1753103133797?e=1763596800&v=beta&t=-rZvP7hmAn6DhTFauXUQks2oyaPEMpIeTq9uHD1f3fU"
                 },
                 {
                   id: "article-9",
                   title: "un entrepreneur visionnaire, Godefroy Kouokam ",
                   excerpt: "Avec plus de 20 ans d'expérience internationale dans la gestion d'entreprises et de projets stratégiques, Godefroy Kouokam s'impose...",
                   date: "14 Octobre 2025",
                   url: "https://www.linkedin.com/posts/nadege-yugain-b901ba352_lumiaeyresdafrique-entrepreneuriatafricain-activity-7383818877916446720-l2Tl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFfzcRwBAv8IlhvIa-IB3Xj6Kbl9YrywJD4",
                   backgroundImage: "https://media.licdn.com/dms/image/v2/D4D22AQH9Ar1DtpsHDw/feedshare-shrink_800/B4DZne9HwYGkAk-/0/1760382209059?e=1763596800&v=beta&t=U6_oWU0cG2HF1S4zLHkv0jvE4PZfC1e222VBsRP7N6Q"
                 }
                
              ].slice(0, expandedArticles).map((article) => (
                <div
                  key={article.id}
                  className={`rounded-lg p-6 border transition-all duration-300 hover:shadow-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 hover:border-blue-500 hover:shadow-blue-500/20"
                      : "bg-white border-gray-200 hover:border-blue-500 hover:shadow-blue-500/20"
                  }`}
                >
                  <div
                    className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md mb-4 flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundImage: (article as any).backgroundImage ? `url(${(article as any).backgroundImage})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center top',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {!(article as any).backgroundImage && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                    {(article as any).backgroundImage && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className={`text-sm mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{article.date}</div>
                  <h4 className="text-xl font-semibold mb-3">{article.title}</h4>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{article.excerpt}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={`font-medium inline-flex items-center gap-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                    Lire sur LinkedIn
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Boutons pour mobile */}
            <div className="text-center mt-8">
              {expandedArticles < 10 && (
                <button
                  onClick={handleExpandArticles}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Voir la suite...
                </button>
              )}
              {expandedArticles > 3 && (
                <button
                  onClick={handleCollapseArticles}
                  className={`text-sm font-medium ml-4 transition-colors duration-200 ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  ← Réduire
                </button>
              )}
            </div>

            {/* Paragraphe final */}
            <div className={`mt-12 p-6 rounded-lg border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
            }`}>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Découvrez davantage de contenu de Lumières d'Afrique sur LinkedIn et vous avez aussi la possibilité de voir mes reportages principalement sur YouTube et d'autres réseaux sociaux. N'hésitez pas à me contacter via WhatsApp ou par e-mail pour vos projets, collaborations, suggestions ou toute autre idée. Je suis à votre disposition pour échanger et partager !
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section Soutenir le projet */}
      <section
        id="services"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              <span className={darkMode ? "text-gray-100" : "text-gray-900"}>Soutenez</span> <span className="text-blue-400">Lumières</span> <span className="text-yellow-500">d'Afrique</span>
            </h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Votre soutien peut faire grandir Lumières d'Afrique : de simple newsletter, nous voulons devenir un média de référence et, à terme, une maison d'édition africaine engagée à révéler les talents du continent.
              Ensemble, faisons briller les voix de l'Afrique.
            </p>
          </div>

          <div className={`max-w-2xl mx-auto rounded-xl p-8 border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}>
            <h4 className="text-2xl font-semibold mb-6">Faire un don</h4>

            {/* Informations de paiement statiques */}
            <div className={`mb-8 p-6 rounded-lg border-2 ${
              darkMode ? "bg-gray-600 border-orange-500" : "bg-orange-50 border-orange-500"
            }`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"/>
                  </svg>
                </div>
                <h5 className="text-lg font-semibold mb-4 text-orange-600">Orange Money</h5>
                <div className="space-y-3">
                  <div>
                    <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                      Numéro de téléphone
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      690 420 336
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                      Nom du compte
                    </div>
                    <div className="text-xl font-semibold text-orange-600">
                      MOYIM EPSE KAMDEM
                    </div>
                  </div>
                </div>
                <div className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Envoyez votre don directement à ce numéro via Orange Money
                </div>
              </div>
            </div>

            {/* Bouton simple */}
            <button
              onClick={() => {
                const message = `Informations de don pour Lumières d'Afrique :\n\nNuméro : 690 420 336\nNom : MOYIM EPSE KAMDEM\nMéthode : Orange Money\n\nMerci pour votre soutien !`;
                navigator.clipboard.writeText(message).then(() => {
                  alert('Informations de paiement copiées dans le presse-papiers !');
                }).catch(() => {
                  alert(message);
                });
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copier les informations de paiement
            </button>
          </div>
        </div>
      </section>


      <Footer darkMode={darkMode} scrollToSection={scrollToSection} />

    </div>
  );
}
export default Projet;
