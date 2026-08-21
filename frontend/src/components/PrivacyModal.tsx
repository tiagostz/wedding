import { useEffect } from "react";

interface PrivacyModalProps {
  onClose: () => void;
}

export function PrivacyModal({ onClose }: PrivacyModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="privacy-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title">
        <div className="privacy-modal-header">
          <div>
            <p className="eyebrow">Privacidade</p>
            <h2 id="privacy-modal-title">Aviso de Privacidade</h2>
          </div>
          <button type="button" className="privacy-modal-close" onClick={onClose} aria-label="Fechar aviso de privacidade">
            ×
          </button>
        </div>

        <div className="privacy-modal-body">
          <p className="privacy-updated">Última atualização: 20 de agosto de 2026</p>

          <section>
            <h3>1. Quem somos</h3>
            <p>
              Este site é mantido por Tiago e Thayanne para organizar as informações e as confirmações de presença do nosso casamento.
            </p>
          </section>

          <section>
            <h3>2. Quais dados coletamos</h3>
            <p>Quando você preenche o formulário, podemos coletar:</p>
            <ul>
              <li>nome e sobrenome;</li>
              <li>confirmação ou recusa de presença;</li>
              <li>quantidade e nomes dos acompanhantes;</li>
              <li>e-mail, quando informado para receber uma cópia da confirmação;</li>
              <li>observações enviadas voluntariamente.</li>
            </ul>
            <p>
              Evite enviar informações desnecessárias nas observações. Caso mencione alergias ou outras informações de saúde, elas serão tratadas apenas para ajudar na organização do evento.
            </p>
          </section>

          <section>
            <h3>3. Para que usamos os dados</h3>
            <p>Usamos essas informações para:</p>
            <ul>
              <li>registrar e organizar as confirmações de presença;</li>
              <li>planejar a cerimônia e a celebração;</li>
              <li>identificar acompanhantes autorizados;</li>
              <li>enviar a confirmação por e-mail, quando solicitado.</li>
            </ul>
            <p>Não usamos os dados para publicidade, venda de informações ou criação de perfis comerciais.</p>
          </section>

          <section>
            <h3>4. Onde os dados podem ser armazenados</h3>
            <p>
              As respostas podem ser enviadas ao Google Apps Script/Google Sheets para registro e envio da confirmação por e-mail. Quando a API do site estiver configurada, os dados também poderão ser armazenados no banco de dados responsável pelo sistema.
            </p>
            <p>Esses serviços podem tratar dados conforme suas próprias políticas e infraestrutura de segurança.</p>
          </section>

          <section>
            <h3>5. Por quanto tempo guardamos os dados</h3>
            <p>
              Os dados serão mantidos pelo período necessário para organizar o casamento e atender solicitações relacionadas ao evento. Depois disso, poderão ser eliminados ou anonimizados.
            </p>
          </section>

          <section>
            <h3>6. Cookies e tecnologias semelhantes</h3>
            <p>
              No estado atual, este site não configura cookies não essenciais, ferramentas de analytics, pixels de publicidade ou tecnologias de rastreamento para criar perfis. A infraestrutura de hospedagem pode utilizar recursos técnicos necessários para entregar e proteger o site.
            </p>
          </section>

          <section>
            <h3>7. Segurança</h3>
            <p>
              Adotamos medidas para proteger as informações contra acesso, alteração ou divulgação indevida. Nenhum serviço conectado à internet é completamente livre de riscos, por isso também pedimos que você não envie dados além do necessário.
            </p>
          </section>

          <section>
            <h3>8. Seus direitos</h3>
            <p>
              Você pode solicitar informações sobre o uso dos seus dados, correção, atualização ou eliminação, quando aplicável. Para isso, entre em contato com os noivos pelo mesmo canal utilizado para receber o convite.
            </p>
          </section>

          <section>
            <h3>9. Alterações neste aviso</h3>
            <p>
              Este aviso pode ser atualizado quando houver mudança no funcionamento do site ou na forma de tratamento dos dados. A versão mais recente estará sempre disponível neste aviso.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
