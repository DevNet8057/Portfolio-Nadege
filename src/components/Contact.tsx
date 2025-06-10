import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import type { Service } from "../types";

interface ContactProps {
  darkMode: boolean;
  services: Service[];
}

const Contact = ({ darkMode, services }: ContactProps) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_qijsbca", // Remplace par ton service ID
        "template_0e5bvui", // Remplace par ton template ID
        form.current,
        {
          publicKey: "dUPFbEqVHIUny_IQb", // Remplace par ta clé publique
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Votre message a été envoyé !");
          form.current?.reset();
        },
        (error: unknown) => {
          if (typeof error === "object" && error && "text" in error) {
            console.log("FAILED...", (error as { text: string }).text);
          } else {
            console.log("FAILED...", error);
          }
        }
      );
  };

  return (
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
            Vous avez un projet journalistique ou une collaboration à proposer ?
            N'hésitez pas à me contacter.
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
                      className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                          ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                          : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                      }`}
                      placeholder="Votre nom"
                      required
                      name="user_name"
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
                  >
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
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      darkMode
                        ? "bg-gray-800/80 border-gray-600/60 text-gray-100 focus:border-blue-400"
                        : "bg-white/80 border-gray-300/60 text-gray-800 focus:border-blue-500"
                    }`}
                    placeholder="Votre message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    darkMode
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  }`}
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Envoyer le message
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
                      +237 6 99 64 90 23
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
                  <a
                    href="https://x.com/Nadegeyugain"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                      darkMode
                        ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-gray-300 hover:text-white"
                        : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-white"
                    }`}
                  >
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nadege-yugain-b901ba352/"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                      darkMode
                        ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-gray-300 hover:text-white"
                        : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-white"
                    }`}
                  >
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@nadegeyugain"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md ${
                      darkMode
                        ? "bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-gray-300 hover:text-white"
                        : "bg-gray-100/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-white"
                    }`}
                  >
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;