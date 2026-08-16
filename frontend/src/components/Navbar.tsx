import { useState } from "react";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#historia", label: "Nossa história" },
  { href: "#fotos", label: "Fotos" },
  { href: "#evento", label: "Evento" },
  { href: "#presentes", label: "Presentes" },
  { href: "#rsvp", label: "Presença" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EE]/90 backdrop-blur-sm border-b border-[#EDE6D8]">
      <nav className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-display text-xl font-medium text-[#2E2A26]">
          T &amp; N
        </a>

        <ul className="hidden gap-8 font-body text-[13px] uppercase tracking-[0.12em] text-[#2E2A26]/80 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-[#8A9A80]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex flex-col gap-1 md:hidden cursor-pointer bg-none border-none p-1"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-[#2E2A26]" />
          <span className="h-0.5 w-6 bg-[#2E2A26]" />
          <span className="h-0.5 w-6 bg-[#2E2A26]" />
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-3 px-6 pb-6 pt-2 font-body text-[13px] uppercase tracking-[0.12em] text-[#2E2A26]/80 md:hidden bg-[#F7F4EE] border-b border-[#EDE6D8]">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-1 hover:text-[#8A9A80]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
