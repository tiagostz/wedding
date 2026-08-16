import { useCountdown } from "../hooks/useCountdown";
import { Wedding } from "../types/wedding";

interface HeroProps {
  wedding: Wedding;
}

export function Hero({ wedding }: HeroProps) {
  const weddingDate = new Date(wedding.weddingDate);
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  const formattedDate = weddingDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundImage: wedding.heroImageUrl ? `url(${wedding.heroImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-cream/70" />

      <div className="relative z-10 flex flex-col items-center gap-4 animate-[fadeIn_1.2s_ease-in-out]">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-sage">Estamos nos casando</p>

        <h1 className="font-display text-5xl font-medium text-charcoal sm:text-6xl md:text-7xl">
          {wedding.partner1Name} <span className="text-gold">&</span> {wedding.partner2Name}
        </h1>

        {wedding.tagline && (
          <p className="max-w-md font-body text-base text-charcoal/80 sm:text-lg">{wedding.tagline}</p>
        )}

        <p className="font-display text-xl text-charcoal/90 sm:text-2xl">{formattedDate}</p>

        <div className="mt-6 flex gap-4 sm:gap-6">
          {[
            { label: "dias", value: days },
            { label: "horas", value: hours },
            { label: "min", value: minutes },
            { label: "seg", value: seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex w-16 flex-col items-center rounded-lg border border-sage/30 bg-white/60 py-3 backdrop-blur-sm sm:w-20"
            >
              <span className="font-display text-2xl font-semibold text-charcoal sm:text-3xl">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-wide text-charcoal/60 sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#rsvp"
          className="mt-8 rounded-full bg-charcoal px-8 py-3 font-body text-sm uppercase tracking-wider text-cream transition-colors hover:bg-sage"
        >
          Confirmar presença
        </a>
      </div>
    </section>
  );
}
