import { useState } from "react";

const PIX_KEY = "acef839b-85c1-4437-bf93-19aca4dd9467";

export function Gifts() {
  const [copied, setCopied] = useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="presentes" className="preview-section gifts-section">
      <div className="container pix-wrap">
        <div className="section-head">
          <p className="eyebrow">Se quiser nos presentear</p>
          <h2>Sua presença já é o maior presente</h2>
          <p>
            Vamos deixar nossa chave Pix abaixo caso vocês queiram nos presentear, agradecemos de coração ❤️
          </p>
        </div>

        <div className="pix-card">
          <p className="pix-label">Chave Pix</p>
          <code className="pix-key">{PIX_KEY}</code>
          <button type="button" className="preview-button" onClick={copyPixKey}>
            {copied ? "Chave copiada" : "Copiar chave Pix"}
          </button>
        </div>
      </div>
    </section>
  );
}
