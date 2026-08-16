import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Wedding } from "./types/wedding";

// Dado fictício usado apenas nesta Fase 1 (estrutura do projeto).
// A partir da Fase 5, este dado virá de GET /api/wedding/:slug.
const MOCK_WEDDING: Wedding = {
  id: "mock",
  slug: "tiago-e-nome",
  partner1Name: "Tiago",
  partner2Name: "Nome",
  tagline: "Vamos nos casar!",
  weddingDate: "2026-10-16T16:00:00",
  storyText: "",
};

export default function App() {
  return (
    <div id="inicio" className="overflow-x-hidden">
      <Navbar />
      <Hero wedding={MOCK_WEDDING} />

      {/* Seções reservadas — implementadas nas próximas fases:
          #historia -> Fase 5/7 (Nossa história + timeline)
          #fotos    -> Fase 7 (Galeria)
          #evento   -> Fase 5 (Cerimônia/Recepção + localização)
          #presentes-> Fase 8 (Lista de presentes)
          #rsvp     -> Fase 6 (Formulário de confirmação)
          #faq      -> Fase 5 (Accordion de perguntas frequentes) */}
    </div>
  );
}
