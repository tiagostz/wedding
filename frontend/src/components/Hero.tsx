import { useCountdown } from "../hooks/useCountdown";
import { Wedding } from "../types/wedding";

interface HeroProps {
  wedding: Wedding;
}

export function Hero({ wedding }: HeroProps) {
  const weddingDate = new Date(wedding.weddingDate);
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);
  const formattedWeddingDate = weddingDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] flex-col items-center justify-center text-center p-6 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(247,244,238,0.55), rgba(247,244,238,0.75)), url('${wedding.heroImageUrl || "/images/hero_bg.jpg"
          }')`,
      }}
    >
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-2 font-medium">
        Estamos nos casando
      </p>

      <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#2E2A26] my-2">
        {wedding.partner1Name} <span className="text-[#C9A96E]">&amp;</span> {wedding.partner2Name}
      </h1>

      <p className="max-w-[420px] text-[17px] text-[#2E2A26]/80 mb-2 font-light leading-relaxed">
        {wedding.tagline || "Vamos nos casar! Contamos com a sua presença para celebrar esse dia com a gente."}
      </p>

      <p className="font-display text-[22px] text-[#2E2A26] mb-6 font-medium">
        {formattedWeddingDate}
      </p>

      <div className="flex gap-3 sm:gap-4 mb-8 flex-wrap justify-center">
        {[
          { num: String(days).padStart(2, "0"), lbl: "dias" },
          { num: String(hours).padStart(2, "0"), lbl: "horas" },
          { num: String(minutes).padStart(2, "0"), lbl: "min" },
          { num: String(seconds).padStart(2, "0"), lbl: "seg" },
        ].map((box) => (
          <div
            key={box.lbl}
            className="w-[68px] sm:w-[76px] py-3 sm:py-3.5 bg-white/60 border border-[#8A9A80]/30 rounded-[10px] backdrop-blur-[4px]"
          >
            <span className="block font-display text-2xl sm:text-[28px] font-semibold text-[#2E2A26]">
              {box.num}
            </span>
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#2E2A26]/60">
              {box.lbl}
            </span>
          </div>
        ))}
      </div>

      <a
        href="#rsvp"
        className="bg-[#2E2A26] text-[#F7F4EE] px-[34px] py-[14px] rounded-full text-[13px] uppercase tracking-[0.12em] transition-colors hover:bg-[#8A9A80] font-normal inline-block"
      >
        Confirmar presença
      </a>
    </section>
  );
}
