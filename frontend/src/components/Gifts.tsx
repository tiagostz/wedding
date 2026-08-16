import { useState } from "react";

const GIFTS = [
  {
    id: 1,
    title: "Jantar romântico",
    price: "R$ 250",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Lua de mel",
    price: "R$ 500",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Café da manhã",
    price: "R$ 150",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop",
  },
];

export function Gifts() {
  const [selectedGift, setSelectedGift] = useState<{ title: string; price: string } | null>(null);

  return (
    <section id="presentes" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        Lista de presentes
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-4">
        Se quiser nos presentear
      </h2>
      <p className="max-w-[520px] mx-auto mb-10 text-[#2E2A26]/75 text-[15px] leading-[1.6] font-light">
        Sua presença já é o maior presente. Mas se quiser nos ajudar a começar essa nova fase, deixamos algumas sugestões.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
        {GIFTS.map((gift) => (
          <div
            key={gift.id}
            className="bg-white border border-[#8A9A80]/25 rounded-[14px] overflow-hidden flex flex-col justify-between"
          >
            <div className="h-[120px] bg-[#EDE6D8] overflow-hidden">
              <img src={gift.image} alt={gift.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-[18px]">
              <h4 className="font-display text-[18px] font-medium text-[#2E2A26] mb-1">
                {gift.title}
              </h4>
              <p className="text-[13px] text-[#8A9A80] mb-3 font-medium">
                {gift.price}
              </p>
              <button
                onClick={() => setSelectedGift(gift)}
                className="w-full py-[10px] border-none rounded-full bg-[#2E2A26] text-[#F7F4EE] text-[12px] uppercase tracking-[0.08em] cursor-pointer hover:bg-[#8A9A80] transition-colors"
              >
                Presentear
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gift Modal */}
      {selectedGift && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="bg-[#F7F4EE] p-6 sm:p-8 rounded-2xl max-w-sm w-full text-center border border-[#EDE6D8] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute top-3 right-3 text-lg font-bold text-[#2E2A26]/60 hover:text-[#2E2A26]"
            >
              ✕
            </button>
            <span className="text-[11px] uppercase tracking-widest text-[#8A9A80] font-semibold">
              Chave Pix dos Noivos
            </span>
            <h3 className="font-display text-2xl text-[#2E2A26] font-medium mt-1 mb-2">
              {selectedGift.title} ({selectedGift.price})
            </h3>
            <p className="text-xs text-[#2E2A26]/70 mb-4 font-light">
              Você pode realizar o presente via PIX escaneando o código ou copiando a chave abaixo:
            </p>
            <div className="bg-white p-3 rounded-xl inline-block mb-4 border border-[#8A9A80]/20">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TIAGOETHAYANNE`}
                alt="QR Code Pix"
                className="w-36 h-36"
              />
            </div>
            <p className="text-[11px] font-mono bg-white p-2.5 rounded-lg border border-[#8A9A80]/30 select-all text-[#2E2A26] break-all">
              pix@casamentotiagoethayanne.com.br
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText("pix@casamentotiagoethayanne.com.br");
                alert("Chave Pix copiada para a área de transferência!");
              }}
              className="mt-4 w-full py-2.5 rounded-full bg-[#8A9A80] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2E2A26] transition-colors"
            >
              Copiar Chave Pix
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
