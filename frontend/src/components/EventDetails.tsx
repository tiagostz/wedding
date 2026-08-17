export function EventDetails() {
  return (
    <section id="evento" className="preview-section events-section">
      <div className="container">
      <div className="section-head">
      <p className="eyebrow">O grande dia</p>
      <h2>
        Cerimônia &amp; Celebração
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
          <p>Rua Mato Grosso, 305 — Vila Santana, Valinhos — SP
          </p>
          <div className="event-links">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Mato+Grosso%2C+305%2C+Valinhos%2C+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Ver localização no mapa →
            </a>
            <a
              href="https://www.instagram.com/santanavalinhos/"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Instagram da paróquia ↗
            </a>
          </div>
        </article>

        <article className="event-card">
          <div className="event-icon">✦</div>
          <h3>
            Celebração
          </h3>
          <p><strong>Macarronada Italiana</strong>
          </p>
          <p>Av. Marechal Carmona, 738 — Vila João Jorge, Campinas — SP
          </p>
          <div className="event-links">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Macarronada+Italiana%2C+Avenida+Marechal+Carmona%2C+738%2C+Campinas%2C+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Ver localização no mapa →
            </a>
            <a
              href="https://www.instagram.com/macarronadaitaliana/"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Instagram do restaurante ↗
            </a>
          </div>
        </article>
      </div>
      </div>
    </section>
  );
}
