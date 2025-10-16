import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import type { Service } from "../types";

interface ContactProps {
  darkMode: boolean;
  services: Service[];
}

interface NotificationProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  darkMode: boolean;
}

const Notification = ({ show, type, message, onClose, darkMode }: NotificationProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-auto p-6 rounded-xl shadow-2xl transform transition-all duration-300 ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${
          darkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            darkMode
              ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Icon */}
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
              type === 'success'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {type === 'success' ? (
              <i className="fas fa-check text-xl"></i>
            ) : (
              <i className="fas fa-exclamation-triangle text-xl"></i>
            )}
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              {type === 'success' ? 'Message envoyé !' : 'Erreur'}
            </h3>
          </div>
        </div>

        {/* Message */}
        <p
          className={`mb-6 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {message}
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            type === 'success'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

const Contact = ({ darkMode, services }: ContactProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsLoading(true);

    try {
      // Vérifiez que EmailJS est bien initialisé
      const result = await emailjs.sendForm(
        "service_qijsbca", // Votre Service ID
        "template_0e5bvui", // Votre Template ID
        form.current,
        "dUPFbEqVHIUny_IQb" // Votre Public Key
      );

      console.log("Email envoyé avec succès:", result);
      showNotification(
        'success', 
        'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
      );
      form.current.reset();
      
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'envoi du message.";
      
      // Messages d'erreur plus spécifiques
      if (error instanceof Error) {
        if (error.message.includes('Invalid service ID')) {
          errorMessage = "Erreur de configuration du service email. Veuillez contacter l'administrateur.";
        } else if (error.message.includes('Invalid template ID')) {
          errorMessage = "Erreur de template email. Veuillez contacter l'administrateur.";
        } else if (error.message.includes('Invalid public key')) {
          errorMessage = "Erreur d'authentification. Veuillez contacter l'administrateur.";
        } else if (error.message.includes('Network')) {
          errorMessage = "Problème de connexion. Vérifiez votre connexion internet et réessayez.";
        }
      }
      
      showNotification('error', errorMessage + " Vous pouvez aussi me contacter directement par email : nadegeyugain10@gmail.com");
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className={`min-h-screen py-16 relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        {/* Fond animé avec particules */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-20 animate-pulse ${
                darkMode ? "bg-blue-400" : "bg-purple-400"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-6 bg-gradient-to-r ${
                darkMode
                  ? "from-blue-400 via-purple-400 to-cyan-400"
                  : "from-blue-600 via-purple-600 to-indigo-600"
              } bg-clip-text text-transparent`}
            >
              Contactez-moi
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Vous avez un projet, un post, une collaboration ou toute autre idée à me proposer ?
              N’hésitez pas à me contacter par WhatsApp ou par e-mail !
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
            {/* Formulaire */}
            <div className="md:w-1/2">
              <div
                className={`p-8 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 border ${
                  darkMode
                    ? "bg-gray-900/90 text-gray-100 border-gray-700/60"
                    : "bg-white/90 text-gray-800 border-gray-200/60"
                }`}
              >
                <form className="space-y-6" ref={form} onSubmit={sendEmail}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block mb-2 font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Nom 
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="user_name"
                        className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                            : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                        }`}
                        placeholder="Votre nom"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block mb-2 font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email 
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="user_email"
                        className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                            : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                        }`}
                        placeholder="Votre email"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block mb-2 font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Sujet 
                    </label>
                    <select
                      name="subject"
                      id="subject"
                      className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                          : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                      }`}
                      required
                      disabled={isLoading}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block mb-2 font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message 
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        darkMode
                          ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                          : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                      }`}
                      placeholder="Votre message"
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="md:w-1/2">
              <div
                className={`h-full p-8 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 border ${
                  darkMode
                    ? "bg-gray-900/90 text-gray-100 border-gray-700/60"
                    : "bg-white/90 text-gray-800 border-gray-200/60"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 bg-gradient-to-r ${
                    darkMode
                      ? "from-blue-400 via-purple-400 to-cyan-400"
                      : "from-blue-600 via-purple-600 to-indigo-600"
                  } bg-clip-text text-transparent`}
                >
                  Informations de contact
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4 shadow-md ${
                        darkMode
                          ? "bg-gradient-to-br from-blue-600 to-purple-600"
                          : "bg-gradient-to-br from-blue-500 to-purple-500"
                      }`}
                    >
                      <i className="fas fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        nadegeyugain10@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4 shadow-md ${
                        darkMode
                          ? "bg-gradient-to-br from-blue-600 to-purple-600"
                          : "bg-gradient-to-br from-blue-500 to-purple-500"
                      }`}
                    >
                      <i className="fas fa-phone text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Téléphone</h4>
                      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        6 20 99 03 07
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4 shadow-md ${
                        darkMode
                          ? "bg-gradient-to-br from-blue-600 to-purple-600"
                          : "bg-gradient-to-br from-blue-500 to-purple-500"
                      }`}
                    >
                      <i className="fas fa-map-marker-alt text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Localisation</h4>
                      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        Yaoundé, Cameroun
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Suivez-moi</h4>
                  <div className="flex space-x-4">
                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@nadegeyugain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                        darkMode
                          ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-500 text-gray-300 hover:text-white"
                          : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 text-gray-700 hover:text-white"
                      }`}
                    >
                      <i className="fab fa-youtube text-lg"></i>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/nadege-yugain-b901ba352/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                        darkMode
                          ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 text-gray-300 hover:text-white"
                          : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white"
                      }`}
                    >
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>

                    {/* Twitter */}
                    <a
                      href="https://x.com/Nadegeyugain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                        darkMode
                          ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-300 text-gray-300 hover:text-white"
                          : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 text-gray-700 hover:text-white"
                      }`}
                    >
                      <i className="fab fa-twitter text-lg"></i>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/nadege_yugain/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                        darkMode
                          ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-pink-600 hover:to-purple-600 text-gray-300 hover:text-white"
                          : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 text-gray-700 hover:text-white"
                      }`}
                    >
                      <i className="fab fa-instagram text-lg"></i>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/profile.php?id=61580281211865"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                        darkMode
                          ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 text-gray-300 hover:text-white"
                          : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white"
                      }`}
                    >
                      <i className="fab fa-facebook-f text-lg"></i>
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Popup */}
      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={hideNotification}
        darkMode={darkMode}
      />
    </>
  );
};

export default Contact;