const PHOTOS = [
  { label: "Foto 1", src: "/images/hero_bg.jpg" },
  { label: "Foto 2", src: "/images/proposal.jpg" },
  { label: "Foto 3", src: "/images/rings.jpg" },
  { label: "Foto 4", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" },
  { label: "Foto 5", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" },
  { label: "Foto 6", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop" },
];

export function Gallery() {
  return (
    <section id="fotos" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        Galeria
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-4">
        Alguns dos nossos momentos
      </h2>
      <p className="max-w-[520px] mx-auto mb-10 text-[#2E2A26]/75 text-[15px] leading-[1.6] font-light">
        Registros dos momentos mais marcantes da nossa história.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PHOTOS.map((item, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-[10px] overflow-hidden bg-[#EDE6D8] relative group border border-[#EDE6D8]"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
