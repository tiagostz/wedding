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
            Cerimônia Religiosa
          </h3>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            03 de outubro de 2026 — 11h da manhã
          </p>
          <p className="text-[14px] font-medium text-[#2E2A26] my-1">
            Paróquia Sant'Ana
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Valinhos - SP
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Par%C3%B3quia+Sant%27Ana+Valinhos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[12px] uppercase tracking-[0.1em] border-b border-[#8A9A80] pb-[2px] text-[#2E2A26] hover:text-[#8A9A80] transition-colors"
          >
            Ver localização no mapa →
          </a>
        </div>

        <div className="bg-[#EDE6D8] rounded-[16px] p-7">
          <h3 className="font-display text-[22px] font-medium text-[#2E2A26] mb-3">
            Recepção
          </h3>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Após a cerimônia — 13h
          </p>
          <p className="text-[14px] font-medium text-[#2E2A26] my-1">
            Recepção dos Noivos
          </p>
          <p className="text-[14px] text-[#2E2A26]/80 my-1 font-light">
            Valinhos - SP
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Valinhos+SP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[12px] uppercase tracking-[0.1em] border-b border-[#8A9A80] pb-[2px] text-[#2E2A26] hover:text-[#8A9A80] transition-colors"
          >
            Ver localização no mapa →
          </a>
        </div>
      </div>
    </section>
  );
}
