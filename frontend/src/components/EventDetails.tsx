export function EventDetails() {
  return (
    <section id="evento" className="preview-section events-section">
      <div className="container">
      <div className="section-head">
      <p className="eyebrow">O grande dia</p>
      <h2>
        Cerimônia &amp; Recepção
      </h2>
      <p>Confira os horários e locais para se programar com tranquilidade.</p>
      </div>

      <div className="event-grid">
        <article className="event-card">
          <div className="event-icon">♡</div>
          <h3>
            Cerimônia Religiosa
          </h3>
          <p><strong>03 de outubro de 2026 — 11h</strong>
          </p>
          <p><strong>Paróquia Sant'Ana</strong>
          </p>
          <p>Valinhos — SP
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Par%C3%B3quia+Sant%27Ana+Valinhos"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Ver localização no mapa →
          </a>
        </article>

        <article className="event-card">
          <div className="event-icon">✦</div>
          <h3>
            Recepção
          </h3>
          <p><strong>Após a cerimônia — 13h</strong>
          </p>
          <p><strong>Recepção dos Noivos</strong>
          </p>
          <p>Valinhos — SP
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Valinhos+SP"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Ver localização no mapa →
          </a>
        </article>
      </div>
      </div>
    </section>
  );
}
