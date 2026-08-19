import { useEffect, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

const PHOTOS: Photo[] = [
  {
    src: "/images/carousel/DSC_5451.jpg",
    alt: "Foto do casal",
  },
  {
    src: "/images/carousel/DSC_5550.jpg",
    alt: "Momento especial do casal",
  },
  {
    src: "/images/carousel/whatsapp-2026-08-16.jpeg",
    alt: "Registro especial do casal",
  },
  {
    src: "/images/carousel/DSC9763.jpg",
    alt: "Foto do casal em um momento especial",
  },
];

const AUTOPLAY_DELAY = 5000;

export function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index: number) => {
    setCurrent((index + PHOTOS.length) % PHOTOS.length);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % PHOTOS.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="fotos" className="moments-section">
      <div className="moments-wrap">
        <h2>Nossos Momentos</h2>

        <div
          className="photo-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="photo-frame" aria-live="polite">
            {PHOTOS.map((photo, index) => (
              <div
                key={photo.src}
                className={`photo-slide ${index === current ? "active" : ""}`}
                aria-hidden={index !== current}
              >
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="carousel-nav carousel-prev"
            onClick={() => goTo(current - 1)}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-nav carousel-next"
            onClick={() => goTo(current + 1)}
            aria-label="Próxima foto"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots" aria-label="Selecionar foto">
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={`carousel-dot ${index === current ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ir para a foto ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
