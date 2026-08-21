type FaqItem = {
  q: string;
  a?: string;
  list?: string[];
  outro?: string;
  open: boolean;
};

export function Faq() {
  const faqItems: FaqItem[] = [
    {
      q: "Qual traje devo usar?",
      a: "Escolha o traje que fizer você se sentir bem. O mais importante é estar confortável para celebrar esse dia especial conosco.",
      open: true,
    },
    {
      q: "Os locais possuem estacionamento?",
      a: "Paróquia Sant'Ana: não há estacionamento exclusivo. Caso considere estacionar na rua, informamos que o bairro é um lugar seguro, tranquilo e pouco movimentado.\n\nRestaurante Macarronada Italiana: o estabelecimento possui estacionamento exclusivo e gratuito.",
      open: false,
    },
    {
      q: "Posso levar acompanhante?",
      a: "Sim! São considerados acompanhantes:",
      list: ["Namorado(a)", "Noivo(a)", "Marido", "Esposa", "Filhos(as)"],
      outro: "Pedimos, por gentileza, que o convite seja restrito a essas pessoas.",
      open: false,
    },
  ];

  return (
    <section id="perguntas" className="preview-section faq-section">
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
              <div className="faq-answer">
                {item.a && <p>{item.a}</p>}
                {item.list && (
                  <ul>
                    {item.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                )}
                {item.outro && <p>{item.outro}</p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
