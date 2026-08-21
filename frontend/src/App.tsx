import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EventDetails } from "./components/EventDetails";
import { RsvpForm } from "./components/RsvpForm";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { PhotoCarousel } from "./components/PhotoCarousel";
import { Wedding } from "./types/wedding";
import { API_URL, fetchWeddingBySlug } from "./services/api";

const WEDDING_DATA: Wedding = {
  id: "main-wedding",
  slug: "tiago-e-thayanne",
  partner1Name: "Tiago",
  partner2Name: "Thayanne",
  tagline: "Contamos com a sua presença para celebrar esse dia especial com a gente.",
  weddingDate: "2026-10-03T11:00:00",
  storyText: "Uma pequena linha do tempo com os momentos que nos trouxeram até aqui.",
  heroImageUrl: "/images/wedding-hero.png",
};

export default function App() {
  const { slug } = useParams<{ slug: string }>();
  const [wedding, setWedding] = useState<Wedding | null>(slug ? null : WEDDING_DATA);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setWedding(WEDDING_DATA);
      setError("");
      return;
    }

    if (!API_URL) {
      setWedding(null);
      setError("A URL da API não está configurada para esta página de casamento.");
      return;
    }

    let active = true;
    setWedding(null);
    setError("");

    fetchWeddingBySlug(slug)
      .then((data) => {
        if (active) setWedding(data);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os dados deste casamento.");
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (error) {
    return <p className="p-8 text-center text-[#2E2A26]">{error}</p>;
  }

  if (!wedding) {
    return <p className="p-8 text-center text-[#2E2A26]">Carregando...</p>;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <Hero wedding={wedding} />
      <EventDetails />
      <PhotoCarousel />
      <RsvpForm
        weddingSlug={wedding.slug}
        partner1Name={wedding.partner1Name}
        partner2Name={wedding.partner2Name}
        weddingDate={wedding.weddingDate}
      />
      <Faq />
      <Footer />
    </div>
  );
}
