import { useState } from "react";
import { api } from "../services/api";

// URL do Webhook do Google Sheets (App Script)
const GOOGLE_SHEETS_URL =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbzWvMm9Dmr7ht6G6fAEXGyxKCAGVDqr167GdPUtoc4xJgWxBPm0yks2WNi7uQPVMmEJ/exec";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("CONFIRMED");
  const [companions, setCompanions] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      weddingId: "main-wedding",
      guestName: name,
      name,
      email,
      phone,
      status,
      companions: Number(companions),
      guestsCount: Number(companions) + 1,
      notes,
    };

    // 1. Enviar para a planilha do Google Sheets
    if (GOOGLE_SHEETS_URL) {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors", // Requisito do Google Apps Script
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.log("Erro no envio para Google Sheets:", err);
      }
    }

    // 2. Enviar para a API Backend em segundo plano
    api.post("/rsvp", payload).catch(() => {});

    // 3. Concluir imediatamente e exibir a mensagem de confirmação
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        Confirmação de presença
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-4">
        Você vai estar com a gente?
      </h2>
      <p className="max-w-[520px] mx-auto mb-10 text-[#2E2A26]/75 text-[15px] leading-[1.6] font-light">
        Preencha o formulário abaixo até 30 dias antes da data.
      </p>

      {submitted ? (
        <div className="max-w-[480px] mx-auto bg-white p-8 rounded-2xl border border-[#8A9A80]/40 shadow-sm text-center">
          {status === "CONFIRMED" ? (
            <>
              <div className="w-12 h-12 rounded-full bg-[#8A9A80]/20 text-[#8A9A80] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-display text-2xl text-[#2E2A26] font-medium mb-2">
                Confirmação Recebida!
              </h3>
              <p className="text-sm text-[#2E2A26]/80 font-light leading-relaxed">
                Obrigado por confirmar sua presença, {name}! Mal podemos esperar para celebrar esse dia tão especial juntos.
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ♥
              </div>
              <h3 className="font-display text-2xl text-[#2E2A26] font-medium mb-2">
                Resposta Registrada
              </h3>
              <p className="text-sm text-[#2E2A26]/80 font-light leading-relaxed">
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
              setNotes("");
            }}
            className="mt-6 text-xs uppercase tracking-wider text-[#8A9A80] border-b border-[#8A9A80] pb-0.5 cursor-pointer hover:text-[#2E2A26]"
          >
            Enviar outra resposta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto text-left flex flex-col gap-[14px]">
          <div>
            <label className="text-[12px] uppercase tracking-[0.08em] text-[#2E2A26]/60 mb-[4px] block font-medium">
              Nome completo *
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-[12px_14px] rounded-[8px] border border-[#8A9A80]/35 font-body text-[14px] bg-white outline-none focus:border-[#8A9A80]"
            />
          </div>

          <div>
            <label className="text-[12px] uppercase tracking-[0.08em] text-[#2E2A26]/60 mb-[4px] block font-medium">
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="(19) 99999-9999"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-[12px_14px] rounded-[8px] border border-[#8A9A80]/35 font-body text-[14px] bg-white outline-none focus:border-[#8A9A80]"
            />
          </div>

          <div>
            <label className="text-[12px] uppercase tracking-[0.08em] text-[#2E2A26]/60 mb-[4px] block font-medium">
              Presença *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-[12px_14px] rounded-[8px] border border-[#8A9A80]/35 font-body text-[14px] bg-white outline-none focus:border-[#8A9A80]"
            >
              <option value="CONFIRMED">Sim, estarei presente</option>
              <option value="DECLINED">Não poderei comparecer</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] uppercase tracking-[0.08em] text-[#2E2A26]/60 mb-[4px] block font-medium">
              Quantidade de acompanhantes
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={companions}
              onChange={(e) => setCompanions(Number(e.target.value))}
              className="w-full p-[12px_14px] rounded-[8px] border border-[#8A9A80]/35 font-body text-[14px] bg-white outline-none focus:border-[#8A9A80]"
            />
          </div>

          <div>
            <label className="text-[12px] uppercase tracking-[0.08em] text-[#2E2A26]/60 mb-[4px] block font-medium">
              Observações
            </label>
            <textarea
              rows={3}
              placeholder="Alguma restrição alimentar, alergias ou mensagem aos noivos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-[12px_14px] rounded-[8px] border border-[#8A9A80]/35 font-body text-[14px] bg-white outline-none focus:border-[#8A9A80]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#2E2A26] text-[#F7F4EE] p-[14px_34px] rounded-full text-[13px] uppercase tracking-[0.12em] transition-colors hover:bg-[#8A9A80] font-normal cursor-pointer disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar confirmação"}
          </button>
        </form>
      )}
    </section>
  );
}
