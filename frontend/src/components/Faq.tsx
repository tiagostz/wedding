export function Faq() {
  const faqItems = [
    {
      q: "Qual o traje?",
      a: "Escolha o traje que fizer você se sentir bem. O mais importante é estar confortável para celebrar esse dia especial conosco.",
      open: true,
    },
    {
      q: "Existe estacionamento?",
      a: "Paróquia Sant'Ana: não há estacionamento exclusivo. Caso considere estacionar na rua, informamos que o bairro é um lugar seguro, tranquilo e pouco movimentado.\n\nRestaurante Macarronada Italiana: o estabelecimento possui estacionamento exclusivo e gratuito.",
      open: false,
    },
    {
      q: "Posso levar acompanhante?",
      a: "Sim! São considerados acompanhantes namorado(a), marido ou esposa e filhos(as). Pedimos, por gentileza, que o convite seja restrito a essas pessoas.\n\nAlém disso, é importante cadastrar seu acompanhante no formulário de confirmação de presença.",
      open: false,
    },
  ];

  return (
    <section id="faq" className="preview-section faq-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Perguntas</p>
          <h2>Tudo o que você precisa saber</h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.q} open={item.open} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <span className="faq-plus">+</span>
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
