export function Faq() {
  const faqItems = [
    {
      q: "Qual o traje?",
      a: "Traje esporte fino. Evite branco, off-white e tons muito claros.",
      open: true,
    },
    {
      q: "Existe estacionamento?",
      a: "Sim, o local conta com estacionamento próprio e gratuito para os convidados.",
      open: false,
    },
    {
      q: "Posso levar acompanhante?",
      a: "Sim, basta informar no formulário de confirmação de presença.",
      open: false,
    },
    {
      q: "Crianças podem participar?",
      a: "Com certeza! Teremos um espaço kids durante a recepção.",
      open: false,
    },
    {
      q: "Qual o horário recomendado para chegar?",
      a: "Recomendamos chegar com 30 minutos de antecedência.",
      open: false,
    },
  ];

  return (
    <section id="faq" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        Perguntas frequentes
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-8">
        Tudo o que você precisa saber
      </h2>

      <div className="max-w-[600px] mx-auto text-left">
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            open={item.open}
            className="border-b border-[#8A9A80]/25 group"
          >
            <summary className="p-[18px_4px] cursor-pointer text-[15px] list-none flex justify-between items-center font-medium text-[#2E2A26] select-none">
              <span>{item.q}</span>
              <span className="text-[#C9A96E] text-[18px] group-open:hidden">+</span>
              <span className="text-[#C9A96E] text-[18px] hidden group-open:inline">−</span>
            </summary>
            <p className="m-0 pb-[18px] px-[4px] text-[14px] text-[#2E2A26]/75 font-light leading-relaxed">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
