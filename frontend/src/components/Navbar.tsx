import { useState } from "react";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#historia", label: "Nossa história" },
  { href: "#fotos", label: "Fotos" },
  { href: "#evento", label: "Evento" },
  { href: "#presentes", label: "Presentes" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-display text-lg text-charcoal">T & N</span>

        <ul className="hidden gap-8 font-body text-sm uppercase tracking-wide text-charcoal/80 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-sage">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Abrir menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-charcoal" />
          <span className="h-0.5 w-6 bg-charcoal" />
          <span className="h-0.5 w-6 bg-charcoal" />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 bg-cream px-6 pb-6 font-body text-sm uppercase tracking-wide text-charcoal/80 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
