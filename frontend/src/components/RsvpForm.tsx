import { ChangeEvent, FormEvent, useState } from "react";
import { api, API_URL } from "../services/api";
import { PrivacyModal } from "./PrivacyModal";

interface RsvpFormProps {
  weddingSlug: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
}

type RsvpStatus = "CONFIRMED" | "DECLINED";

// URL do Webhook do Google Sheets (App Script)
const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbzWvMm9Dmr7ht6G6fAEXGyxKCAGVDqr167GdPUtoc4xJgWxBPm0yks2WNi7uQPVMmEJ/exec";

function formatCalendarDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

export function RsvpForm({
  weddingSlug,
  partner1Name,
  partner2Name,
  weddingDate,
}: RsvpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<RsvpStatus>("CONFIRMED");
  const [companions, setCompanions] = useState<number | "">("");
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lettersOnly = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setName(lettersOnly);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value as RsvpStatus;
    setStatus(nextStatus);

    if (nextStatus === "DECLINED") {
      setEmail("");
      setCompanions("");
      setCompanionNames([]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    if (GOOGLE_SHEETS_URL) {
      const sheetsController = new AbortController();
      const sheetsTimeout = window.setTimeout(() => sheetsController.abort(), 8000);

      requests.push(
        fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(sheetsPayload),
          signal: sheetsController.signal,
        })
          .then(() => true)
          .catch(() => false)
          .finally(() => window.clearTimeout(sheetsTimeout))
      );
    }

    if (API_URL) {
      requests.push(
        api
          .post("/rsvp", payload)
          .then(() => true)
          .catch(() => false)
      );
    }

    let saved = false;
    if (requests.length > 0) {
      saved = await new Promise<boolean>((resolve) => {
        let pending = requests.length;

        requests.forEach((request) => {
          request.then((accepted) => {
            if (accepted) {
              resolve(true);
              return;
            }

            pending -= 1;
            if (pending === 0) resolve(false);
          });
        });
      });
    }

    if (!saved) {
      setLoading(false);
      setError("Não foi possível enviar sua resposta. Tente novamente em instantes.");
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  const googleCalendarUrl = (() => {
    if (status !== "CONFIRMED") return "";

    const startDate = new Date(weddingDate);
    if (Number.isNaN(startDate.getTime())) return "";

    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const names = companionNames.filter((companionName) => companionName.trim());
    const companionsText = names.length ? names.join(", ") : "Nenhum acompanhante";
    const details = [
      `Presença confirmada de ${name.trim()}.`,
      "",
      "Cerimônia: Paróquia Sant'Ana",
      "Rua Mato Grosso, 305 — Vila Santana, Valinhos — SP",
      "",
      "Celebração: Macarronada Italiana",
      "Av. Marechal Carmona, 738 — Vila João Jorge, Campinas — SP",
      "",
      `Acompanhantes: ${companionsText}`,
    ].join("\n");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Casamento de ${partner1Name} e ${partner2Name}`,
      dates: `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`,
      details,
      location: "Paróquia Sant'Ana, Rua Mato Grosso, 305, Valinhos - SP",
      ctz: "America/Sao_Paulo",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const confirmationDate = (() => {
    const date = new Date(weddingDate);
    if (Number.isNaN(date.getTime())) return weddingDate;

    return `${date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })} às ${date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  })();
  const confirmationCompanions = companionNames.filter((companionName) => companionName.trim());

  return (
    <section id="presenca" className="preview-section rsvp-section">
      <div className="container rsvp-wrap">
        <div className="section-head">
          <p className="eyebrow">Confirmação de presença</p>
          <h2>Você estará conosco?</h2>
          <p>Preencha o formulário abaixo até dia 01/09/2026</p>
        </div>

        {submitted ? (
          <div className="rsvp-success">
            {status === "CONFIRMED" ? (
              <>
                <div className="rsvp-success-icon">✓</div>
                <h3>Confirmação recebida!</h3>
                <p>
                  Obrigado por confirmar sua presença, {name}! Mal podemos esperar para celebrar esse dia tão especial juntos.
                </p>
                {email && (
                  <p className="email-confirmation-help">
                    A confirmação também será enviada para {email}. Verifique a caixa de spam caso não encontre.
                  </p>
                )}
                <div className="confirmation-details" aria-label="Resumo da confirmação">
                  <div className="confirmation-detail-row">
                    <span>Data</span>
                    <strong>{confirmationDate}</strong>
                  </div>
                  <div className="confirmation-detail-row">
                    <span>Cerimônia</span>
                    <strong>Paróquia Sant'Ana</strong>
                    <small>Rua Mato Grosso, 305 — Vila Santana, Valinhos — SP</small>
                  </div>
                  <div className="confirmation-detail-row">
                    <span>Celebração</span>
                    <strong>Macarronada Italiana</strong>
                    <small>Av. Marechal Carmona, 738 — Vila João Jorge, Campinas — SP</small>
                  </div>
                  <div className="confirmation-detail-row">
                    <span>Acompanhantes</span>
                    <strong>
                      {confirmationCompanions.length
                        ? confirmationCompanions.join(", ")
                        : "Nenhum acompanhante"}
                    </strong>
                  </div>
                  {notes.trim() && (
                    <div className="confirmation-detail-row">
                      <span>Observações</span>
                      <strong>{notes.trim()}</strong>
                    </div>
                  )}
                </div>
                {googleCalendarUrl && (
                  <>
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="calendar-button"
                    >
                      Adicionar ao Google Agenda
                    </a>
                    <p className="calendar-help">
                      O evento abrirá preenchido. Basta salvá-lo na sua agenda.
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="rsvp-success-icon">♥</div>
                <h3>Resposta registrada</h3>
                <p>
                  Uma pena você não poder ir, {name}, mas agradecemos imensamente por nos avisar. Sentiremos sua falta nesse dia tão especial.
                </p>
              </>
            )}
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
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
              <label>Nome e Sobrenome *</label>
              <input
                type="text"
                placeholder="Nome e Sobrenome"
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="rsvp-field">
              <label>Presença *</label>
              <select value={status} onChange={handleStatusChange}>
                <option value="CONFIRMED">Sim, estarei presente</option>
                <option value="DECLINED">Não poderei comparecer</option>
              </select>
            </div>

            {status === "CONFIRMED" && (
              <>
                <div className="rsvp-field">
                  <label>E-mail (opcional)</label>
                  <input
                    type="email"
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <p className="field-help">
                    Informe seu e-mail caso queira receber uma cópia da sua confirmação de presença.
                  </p>
                </div>

                <div className="rsvp-field">
                  <label>Quantidade de acompanhantes</label>
                  <input
                    type="text"
                    placeholder="Ex.: 2"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={companions}
                    onChange={(event) => {
                      const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 2);
                      const quantity = digitsOnly === "" ? "" : Math.min(Number(digitsOnly), 10);
                      setCompanions(quantity);
                      setCompanionNames((currentNames) =>
                        Array.from(
                          { length: quantity === "" ? 0 : quantity },
                          (_, index) => currentNames[index] || ""
                        )
                      );
                    }}
                  />
                  <p className="field-help">
                    Em caso de dúvida sobre acompanhantes, consulte as <a href="#perguntas" className="field-help-link">perguntas abaixo</a>.
                  </p>
                </div>

                {typeof companions === "number" && companions > 0 && (
                  <div className="companion-fields">
                    <p className="companion-fields-title">Nome dos acompanhantes</p>
                    <div className="companion-fields-list">
                      {companionNames.map((companionName, index) => (
                        <input
                          key={index}
                          type="text"
                          required
                          placeholder={`Nome do acompanhante ${index + 1}`}
                          value={companionName}
                          onChange={(event) => {
                            const sanitizedName = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                            setCompanionNames((currentNames) =>
                              currentNames.map((currentName, currentIndex) =>
                                currentIndex === index ? sanitizedName : currentName
                              )
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="rsvp-field">
              <label>Observações</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="preview-button">
              {loading ? "Enviando..." : "Enviar confirmação"}
            </button>
            <p className="privacy-notice">
              Ao enviar sua confirmação, seus dados serão usados para registrar sua presença e organizar o evento. <button type="button" className="privacy-link-button" onClick={() => setPrivacyOpen(true)}>Leia nosso Aviso de Privacidade.</button>
            </p>
          </form>
        )}
      </div>
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </section>
  );
}
