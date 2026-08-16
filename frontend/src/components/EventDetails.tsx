export function EventDetails() {
  return (
    <section id="evento" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        O grande dia
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-[40px]">
        Cerimônia &amp; Recepção
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <div className="bg-[#EDE6D8] rounded-[16px] p-7">
          <h3 className="font-display text-[22px] font-medium text-[#2E2A26] mb-3">
            Cerimônia
          </h3>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            16 de outubro de 2026 — 16h
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Capela Santa Clara
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Rua das Flores, 123 — São Paulo, SP
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[12px] uppercase tracking-[0.1em] border-b border-[#8A9A80] pb-[2px] text-[#2E2A26]"
          >
            Ver localização →
          </a>
        </div>

        <div className="bg-[#EDE6D8] rounded-[16px] p-7">
          <h3 className="font-display text-[22px] font-medium text-[#2E2A26] mb-3">
            Recepção
          </h3>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            19h
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Espaço Jardim Sálvia
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Av. das Oliveiras, 456 — São Paulo, SP
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[12px] uppercase tracking-[0.1em] border-b border-[#8A9A80] pb-[2px] text-[#2E2A26]"
          >
            Ver localização →
          </a>
        </div>
      </div>
    </section>
  );
}
