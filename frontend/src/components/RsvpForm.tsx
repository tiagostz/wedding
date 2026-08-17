import { useState } from "react";
import { api, API_URL } from "../services/api";

interface RsvpFormProps {
  weddingSlug: string;
}

// URL do Webhook do Google Sheets (App Script)
const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbzWvMm9Dmr7ht6G6fAEXGyxKCAGVDqr167GdPUtoc4xJgWxBPm0yks2WNi7uQPVMmEJ/exec";

export function RsvpForm({ weddingSlug }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("CONFIRMED");
  const [companions, setCompanions] = useState<number | "">("");
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Permite apenas letras (incluindo acentos e ç) e espaços
    const lettersOnly = rawValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setName(lettersOnly);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numbersOnly = rawValue.replace(/\D/g, "").slice(0, 11);

    let formatted = numbersOnly;
    if (numbersOnly.length > 2) {
      formatted = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`;
    }
    if (numbersOnly.length > 7) {
      formatted = `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7, 11)}`;
    }

    setPhone(formatted);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value;
    setStatus(nextStatus);

    if (nextStatus === "DECLINED") {
      setCompanions("");
      setCompanionNames([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const companionsQty = typeof companions === "number"
      ? Math.min(Math.max(companions, 0), 20)
      : 0;
    const normalizedCompanionNames = companionNames
      .slice(0, companionsQty)
      .map((companionName) => companionName.trim());

    if (normalizedCompanionNames.some((companionName) => !companionName)) {
      setLoading(false);
      setError("Informe o nome de todos os acompanhantes.");
      return;
    }

    const companionNamesValue = normalizedCompanionNames.length
      ? normalizedCompanionNames.join("\n")
      : undefined;

    if (companionNamesValue && companionNamesValue.length > 500) {
      setLoading(false);
      setError("Os nomes dos acompanhantes excedem o limite permitido.");
      return;
    }

    const payload = {
      weddingSlug,
      fullName: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      status,
      companionsQty,
      companionNames: companionNamesValue,
      notes: notes.trim() || undefined,
    };

    const sheetsPayload = {
      ...payload,
      weddingId: weddingSlug,
      guestName: payload.fullName,
      name: payload.fullName,
      companions: companionsQty,
      guestsCount: companionsQty + 1,
    };

    const requests: Promise<boolean>[] = [];

    // 1. Enviar para a planilha do Google Sheets
    if (GOOGLE_SHEETS_URL) {
      requests.push(
        fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(sheetsPayload),
        })
          .then(() => true)
          .catch(() => false)
      );
    }

    // 2. Enviar para a API Backend quando ela estiver configurada
    if (API_URL) {
      requests.push(
        api
          .post("/rsvp", payload)
          .then(() => true)
          .catch(() => false)
      );
    }

    const results = await Promise.all(requests);
    const saved = results.some(Boolean);

    if (!saved) {
      setLoading(false);
      setError("Não foi possível enviar sua resposta. Tente novamente em instantes.");
      return;
    }

    // 3. Só confirmar na tela depois que pelo menos um destino aceitou o envio
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="presenca" className="preview-section rsvp-section">
      <div className="container rsvp-wrap">
      <div className="section-head">
        <p className="eyebrow">Confirmação de presença</p>
        <h2>Você vai estar com a gente?</h2>
        <p>Preencha o formulário abaixo até 30 dias antes da data.</p>
      </div>

      {submitted ? (
        <div className="rsvp-success">
          {status === "CONFIRMED" ? (
            <>
              <div className="rsvp-success-icon">
                ✓
              </div>
              <h3>
                Confirmação Recebida!
              </h3>
              <p>
                Obrigado por confirmar sua presença, {name}! Mal podemos esperar para celebrar esse dia tão especial juntos.
              </p>
            </>
          ) : (
            <>
              <div className="rsvp-success-icon">
                ♥
              </div>
              <h3>
                Resposta Registrada
              </h3>
              <p>
                Uma pena você não poder ir, {name}, mas agradecemos imensamente por nos avisar! Sentiremos sua falta nesse dia tão especial.
              </p>
            </>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setPhone("");
              setCompanions("");
              setCompanionNames([]);
              setNotes("");
              setError("");
            }}
            className="text-link-button"
          >
            Enviar outra resposta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          {error && (
            <p role="alert" className="form-alert">
              {error}
            </p>
          )}

          <div className="rsvp-field">
            <label>
              Nome completo *
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              required
              value={name}
              onChange={handleNameChange}
              className=""
            />
          </div>

          <div className="rsvp-field">
            <label>
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="(19) 99609-0920"
              required
              maxLength={15}
              value={phone}
              onChange={handlePhoneChange}
              className=""
            />
          </div>

          <div className="rsvp-field">
            <label>
              Presença *
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className=""
            >
              <option value="CONFIRMED">Sim, estarei presente</option>
              <option value="DECLINED">Não poderei comparecer</option>
            </select>
          </div>

          {status === "CONFIRMED" && (
            <>
              <div className="rsvp-field">
                <label>
                  Quantidade de acompanhantes
                </label>
                <input
                  type="text"
                  placeholder="Ex.: 2"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={companions}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 2);
                    const quantity = digitsOnly === "" ? "" : Math.min(Number(digitsOnly), 10);
                    setCompanions(quantity);
                    setCompanionNames((currentNames) =>
                      Array.from(
                        { length: quantity === "" ? 0 : quantity },
                        (_, index) => currentNames[index] || ""
                      )
                    );
                  }}
                  className=""
                />
              </div>

              {typeof companions === "number" && companions > 0 && (
                <div className="companion-fields">
                  <p className="companion-fields-title">
                    Nome dos acompanhantes
                  </p>
                  <div className="companion-fields-list">
                    {companionNames.map((companionName, index) => (
                      <input
                        key={index}
                        type="text"
                        required
                        placeholder={`Nome do acompanhante ${index + 1}`}
                        value={companionName}
                        onChange={(e) => {
                          const sanitizedName = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                          setCompanionNames((currentNames) =>
                            currentNames.map((currentName, currentIndex) =>
                              currentIndex === index ? sanitizedName : currentName
                            )
                          );
                        }}
                        className=""
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="rsvp-field">
            <label>
              Observações
            </label>
            <textarea
              rows={3}
              placeholder="Alguma restrição alimentar, alergias ou mensagem aos noivos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className=""
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="preview-button"
          >
            {loading ? "Enviando..." : "Enviar confirmação"}
          </button>
        </form>
      )}
      </div>
    </section>
  );
}
