import { useState } from "react";

const LINKS = [
  { href: "#evento", label: "Evento" },
  { href: "#presenca", label: "Presença" },
  { href: "#perguntas", label: "Perguntas" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-nav">
        <a href="#inicio" className="brand" aria-label="Tiago e Thayanne">
          T <span>&amp;</span> T
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="menu-button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Navegação móvel">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
