import React from "react";
import type { Service } from "../types";

interface ServicesProps {
  darkMode: boolean;
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ darkMode, services }) => (
  <section
    id="services"
    className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Mes Services</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Une expertise diversifiée pour répondre à tous vos besoins en matière
          de contenu journalistique et rédactionnel.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
                darkMode ? "bg-blue-600" : "bg-blue-500"
              } text-white`}
            >
              <i className={`fas ${service.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {service.title}
            </h3>
            <p className="text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
