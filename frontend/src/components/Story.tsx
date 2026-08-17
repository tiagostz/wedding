interface StoryProps {
  storyText?: string;
}

export function Story({ storyText }: StoryProps) {
  return (
    <section id="historia" className="preview-section story-section">
      <div className="container story-grid">
        <div
          className="story-photo"
          style={{ backgroundImage: "url('/images/wedding-hero.png')" }}
          role="img"
          aria-label="Tiago e Thayanne celebrando juntos"
        />

        <div className="story-copy">
          <p className="eyebrow">Nossa história</p>
          <h2>Uma história que merece ser celebrada</h2>
          <p>
            {storyText ||
              "Entre encontros, conversas, risadas e muitos momentos especiais, construímos uma história que nos trouxe até aqui."}
          </p>
          <p>
            Agora queremos dividir o próximo capítulo com as pessoas que fazem parte da nossa vida.
          </p>
          <div className="signature">Tiago &amp; Thayanne</div>
        </div>
      </div>
    </section>
  );
}
