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
    <section id="faq" className="preview-section faq-section">
      <div className="container">
      <div className="section-head">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>Tudo o que você precisa saber</h2>
      </div>

      <div className="faq-list">
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            open={item.open}
            className="faq-item"
          >
            <summary>
              <span>{item.q}</span>
              <span className="faq-plus">+</span>
            </summary>
            <p className="faq-answer">
              {item.a}
            </p>
          </details>
        ))}
      </div>
      </div>
    </section>
  );
}
