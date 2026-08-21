const SHEET_NAME = "Respostas";
const COUPLE_NAME = "Tiago e Thayanne";
const WEDDING_DATE = "03 de outubro de 2026, às 11h";
const CEREMONY_LOCATION = "Paróquia Sant'Ana, Rua Mato Grosso, 305 — Vila Santana, Valinhos — SP";
const RECEPTION_LOCATION = "Macarronada Italiana, Av. Marechal Carmona, 738 — Vila João Jorge, Campinas — SP";
const CEREMONY_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Rua+Mato+Grosso%2C+305%2C+Valinhos%2C+SP";
const RECEPTION_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Macarronada+Italiana%2C+Avenida+Marechal+Carmona%2C+738%2C+Campinas%2C+SP";

// Execute esta função manualmente uma vez no editor para autorizar o envio de e-mails.
function authorizeEmailAccess() {
  const remaining = MailApp.getRemainingDailyQuota();
  Logger.log("Destinatários de e-mail restantes hoje: " + remaining);
}

function doPost(event) {
  const data = JSON.parse(event.postData.contents || "{}");
  const sheet = getResponseSheet();

  sheet.appendRow([
    new Date(),
    data.fullName || data.guestName || data.name || "",
    data.email || "",
    data.status || "",
    data.companionsQty ?? data.companions ?? 0,
    data.companionNames || "",
    data.notes || "",
    data.weddingSlug || data.weddingId || "",
  ]);

  if (data.email && isValidEmail(data.email)) {
    sendConfirmationEmail(data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getResponseSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Data de envio",
      "Nome",
      "E-mail",
      "Presença",
      "Acompanhantes",
      "Nomes dos acompanhantes",
      "Observações",
      "Casamento",
    ]);
  }

  return sheet;
}

function sendConfirmationEmail(data) {
  const name = data.fullName || data.guestName || data.name || "convidado(a)";
  const status = data.status === "CONFIRMED";
  const companions = data.companionNames || "Nenhum acompanhante";
  const calendarUrl = buildCalendarUrl(name, companions);
  const subject = status
    ? "Presença confirmada — " + COUPLE_NAME
    : "Resposta registrada — " + COUPLE_NAME;

  let textBody = status
    ? [
        "Olá, " + name + "!",
        "",
        "Sua presença no casamento de " + COUPLE_NAME + " foi confirmada.",
        "Data: " + WEDDING_DATE,
        "Cerimônia: " + CEREMONY_LOCATION,
        "Mapa da cerimônia: " + CEREMONY_MAP_URL,
        "Celebração: " + RECEPTION_LOCATION,
        "Mapa da celebração: " + RECEPTION_MAP_URL,
        "Acompanhantes: " + companions.replace(/\n/g, ", "),
        "",
        "Adicione o evento ao Google Agenda: " + calendarUrl,
        "",
        "Será um prazer celebrar com você!",
      ].join("\n")
    : [
        "Olá, " + name + "!",
        "",
        "Sua resposta foi registrada. Agradecemos por nos avisar.",
        "",
        "Com carinho,",
        COUPLE_NAME,
      ].join("\n");

  let htmlBody = status
    ? [
        "<p>Olá, " + escapeHtml(name) + "!</p>",
        "<p>Sua presença no casamento de <strong>" + COUPLE_NAME + "</strong> foi confirmada.</p>",
        "<p><strong>Data:</strong> " + WEDDING_DATE + "<br>",
        '<strong>Cerimônia:</strong> <a href="' + CEREMONY_MAP_URL + '">' + CEREMONY_LOCATION + "</a><br>",
        '<strong>Celebração:</strong> <a href="' + RECEPTION_MAP_URL + '">' + RECEPTION_LOCATION + "</a><br>",
        "<strong>Acompanhantes:</strong> " + escapeHtml(companions).replace(/\n/g, "<br>") + "</p>",
        '<p><a href="' + calendarUrl + '">Adicionar ao Google Agenda</a></p>',
        "<p>Será um prazer celebrar com você!</p>",
      ].join("")
    : [
        "<p>Olá, " + escapeHtml(name) + "!</p>",
        "<p>Sua resposta foi registrada. Agradecemos por nos avisar.</p>",
        "<p>Com carinho,<br>" + COUPLE_NAME + "</p>",
      ].join("");

  if (status && data.notes) {
    textBody += "\n\nObservações: " + data.notes;
    htmlBody += "<p><strong>Observações:</strong> " + escapeHtml(data.notes) + "</p>";
  }

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody,
    name: COUPLE_NAME,
  });
}

function buildCalendarUrl(name, companions) {
  const details = [
    "Presença confirmada de " + name + ".",
    "",
    "Cerimônia: " + CEREMONY_LOCATION,
    "Celebração: " + RECEPTION_LOCATION,
    "Acompanhantes: " + companions.replace(/\n/g, ", "),
  ].join("\n");

  const params = [
    "action=TEMPLATE",
    "text=" + encodeURIComponent("Casamento de " + COUPLE_NAME),
    "dates=20261003T110000/20261003T130000",
    "details=" + encodeURIComponent(details),
    "location=" + encodeURIComponent(CEREMONY_LOCATION),
    "ctz=America/Sao_Paulo",
  ];

  return "https://calendar.google.com/calendar/render?" + params.join("&");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
