// src/types/index.ts
export interface Testimonial {
  text: string;
  name: string;
  position: string;
  image: string;
}

export interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}
