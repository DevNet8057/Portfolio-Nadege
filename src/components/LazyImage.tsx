import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  style,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fonction pour générer les URLs optimisées
  const getOptimizedSrc = (baseSrc: string, width: number) => {
    // Simulation d'optimisation d'URL (remplacer par votre logique CDN)
    return `${baseSrc}?w=${width}&q=80&format=webp`;
  };

  const getOptimizedSrcFallback = (baseSrc: string, width: number) => {
    return `${baseSrc}?w=${width}&q=80`;
  };

  return (
    <div ref={imgRef} className={className} style={style}>
      {isInView && (
        <picture>
          {/* WebP pour les navigateurs modernes */}
          <source
            srcSet={`${getOptimizedSrc(src, 400)} 400w, ${getOptimizedSrc(
              src,
              800
            )} 800w, ${getOptimizedSrc(src, 1200)} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            type="image/webp"
          />
          {/* Fallback pour les anciens navigateurs */}
          <img
            src={getOptimizedSrcFallback(src, 800)}
            srcSet={`${getOptimizedSrcFallback(
              src,
              400
            )} 400w, ${getOptimizedSrcFallback(
              src,
              800
            )} 800w, ${getOptimizedSrcFallback(src, 1200)} 1200w`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } w-full h-full object-cover`}
            onLoad={() => {
              console.log(`✅ Image loaded successfully: ${src}`);
              setIsLoaded(true);
              onLoad?.();
            }}
            onError={(e) => {
              console.error(`❌ Image failed to load: ${src}`, e);
              setIsLoaded(true); // Still set loaded to hide loading state
            }}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
      {!isLoaded && isInView && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">⏳</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
