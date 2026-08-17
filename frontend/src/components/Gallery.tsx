const PHOTOS = [
  {
    label: "Momentos do casal",
    src: "/images/wedding-hero.png",
    className: "large",
  },
  {
    label: "Momento especial",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop",
    className: "",
  },
  {
    label: "Celebração",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=900&auto=format&fit=crop",
    className: "",
  },
  {
    label: "Um dia para lembrar",
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1200&auto=format&fit=crop",
    className: "wide",
  },
];

export function Gallery() {
  return (
    <section id="fotos" className="preview-section gallery-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Memórias</p>
          <h2>Alguns dos nossos momentos</h2>
          <p>Um espaço mais visual para contar a nossa história sem deixar a página pesada.</p>
        </div>

        <div className="gallery-grid">
          {PHOTOS.map((photo) => (
            <div
              key={photo.label}
              className={`gallery-tile ${photo.className}`}
              style={{ backgroundImage: `url('${photo.src}')` }}
              role="img"
              aria-label={photo.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
