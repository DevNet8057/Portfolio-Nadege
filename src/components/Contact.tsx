import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

interface ContactProps {
  darkMode: boolean;
}

const Contact = ({ darkMode }: ContactProps) => {
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
      className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contactez-moi</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Vous avez un projet journalistique ou une collaboration à proposer ?
            N'hésitez pas à me contacter.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <form className="space-y-4" ref={form} onSubmit={sendEmail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                        : "bg-white border-gray-300 focus:border-blue-500"
                    } focus:outline-none`}
                    placeholder="Votre nom"
                    required
                    name="user_name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className={`w-full px-4 py-2 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                        : "bg-white border-gray-300 focus:border-blue-500"
                    } focus:outline-none`}
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>
              <div>
  <label className="block mb-2 font-medium">Comment m'avez-vous connu ?</label>
  <div className="space-y-2">
    <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <input 
        type="radio" 
        name="contact_source" 
        value="Réseaux sociaux" 
        className="mr-2"
        required
      />
      Via les réseaux sociaux
    </label>
    <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <input 
        type="radio" 
        name="contact_source" 
        value="Site web" 
        className="mr-2"
      />
      Via mon site web
    </label>
    <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <input 
        type="radio" 
        name="contact_source" 
        value="Recommandation" 
        className="mr-2"
      />
      Par recommandation
    </label>
    <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <input 
        type="radio" 
        name="contact_source" 
        value="Autre" 
        className="mr-2"
      />
      Autre
    </label>
  </div>
</div>
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`w-full px-4 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:border-blue-500"
                  } focus:outline-none`}
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:border-blue-500"
                  } focus:outline-none`}
                  placeholder="Votre message"
                  name="message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full px-6 py-3 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-md transition-colors shadow-lg`}
              >
                Envoyer le message
              </button>
            </form>
          </div>
          <div className="md:w-1/2">
            <div
              className={`h-full p-8 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-white"
              } shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-6">
                Informations de contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } flex items-center justify-center text-white mr-4`}
                  >
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p>nadegeyugain10@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } flex items-center justify-center text-white mr-4`}
                  >
                    <i className="fas fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p>+237 6 99 64 90 23</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      darkMode ? "bg-blue-600" : "bg-blue-500"
                    } flex items-center justify-center text-white mr-4`}
                  >
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Localisation</h4>
                    <p>Yaoundé, Cameroun</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Suivez-moi</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/Nadegeyugain"
                    className={`w-10 h-10 rounded-full ${
                      darkMode
                        ? "bg-gray-600 hover:bg-blue-600"
                        : "bg-gray-200 hover:bg-blue-500"
                    } flex items-center justify-center transition-colors cursor-pointer`}
                  >
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nadege-yugain-b901ba352/"
                    className={`w-10 h-10 rounded-full ${
                      darkMode
                        ? "bg-gray-600 hover:bg-blue-600"
                        : "bg-gray-200 hover:bg-blue-500"
                    } flex items-center justify-center transition-colors cursor-pointer`}
                  >
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@nadegeyugain"
                    className={`w-10 h-10 rounded-full ${
                      darkMode
                        ? "bg-gray-600 hover:bg-blue-600"
                        : "bg-gray-200 hover:bg-blue-500"
                    } flex items-center justify-center transition-colors cursor-pointer`}
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
