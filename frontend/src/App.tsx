import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Gallery } from "./components/Gallery";
import { EventDetails } from "./components/EventDetails";
import { Gifts } from "./components/Gifts";
import { RsvpForm } from "./components/RsvpForm";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Wedding } from "./types/wedding";

const WEDDING_DATA: Wedding = {
  id: "main-wedding",
  slug: "tiago-e-thayanne",
  partner1Name: "Tiago",
  partner2Name: "Thayanne",
  tagline: "Vamos nos casar! Contamos com a sua presença para celebrar esse dia com a gente.",
  weddingDate: "2026-10-16T16:00:00",
  storyText: "Uma pequena linha do tempo com os momentos que nos trouxeram até aqui.",
  heroImageUrl: "/images/hero_bg.jpg",
};

export default function App() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-[#F7F4EE]">
      <Navbar />
      <Hero wedding={WEDDING_DATA} />
      <Story />
      <Gallery />
      <EventDetails />
      <Gifts />
      <RsvpForm />
      <Faq />
      <Footer />
    </div>
  );
}
