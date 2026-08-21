import { useState } from "react";
import { PrivacyModal } from "./PrivacyModal";

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="site-footer">
      <div className="eyebrow">
        Obrigado por fazer parte da nossa história
      </div>
      <h2>
        Com amor, Tiago &amp; Thayanne
      </h2>
      <p>03 de outubro de 2026 · Valinhos — SP</p>
      <div className="footer-brand">
        T <span>&amp;</span> T
      </div>
      <p className="developed-by">Desenvolvido por Tiago, com ajuda da minha esposa rs</p>
      <div className="footer-links">
        <button type="button" onClick={() => setPrivacyOpen(true)}>
          Aviso de Privacidade
        </button>
      </div>
      <a className="back-to-top" href="#inicio" aria-label="Voltar ao início da página">
        ↑
      </a>
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </footer>
  );
}
