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
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(34,29,25,.58), rgba(34,29,25,.18) 55%, rgba(34,29,25,.48)), url('${wedding.heroImageUrl || "/images/wedding-hero.png"}')`,
      }}
    >
      <div className="hero-content">
      <p className="eyebrow">
        Estamos nos casando
      </p>

      <h1>
        {wedding.partner1Name} <span>&amp;</span> {wedding.partner2Name}
      </h1>

      <p className="hero-sub">
        {wedding.tagline || "Contamos com a sua presença para celebrar esse dia com a gente."}
      </p>

      <p className="hero-date">
        {formattedWeddingDate}
      </p>

      <div className="countdown">
        {[
          { num: String(days).padStart(2, "0"), lbl: "dias" },
          { num: String(hours).padStart(2, "0"), lbl: "horas" },
          { num: String(minutes).padStart(2, "0"), lbl: "min" },
          { num: String(seconds).padStart(2, "0"), lbl: "seg" },
        ].map((box) => (
          <div
            key={box.lbl}
            className="time-box"
          >
            <strong>
              {box.num}
            </strong>
            <small>
              {box.lbl}
            </small>
          </div>
        ))}
      </div>

      <a
        href="#presenca"
        className="preview-button light"
      >
        Confirmar presença
      </a>
      </div>
    </section>
  );
}
