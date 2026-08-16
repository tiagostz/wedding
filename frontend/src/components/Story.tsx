interface StoryProps {
  storyText?: string;
}

export function Story({ storyText }: StoryProps) {
  const items = [
    {
      title: "Como nos conhecemos",
      desc: "Uma tarde qualquer que mudou tudo.",
    },
    {
      title: "Primeiro encontro",
      desc: "Um café que virou muitas conversas.",
    },
    {
      title: "Pedido de namoro",
      desc: "O começo oficial da nossa história.",
    },
    {
      title: "Pedido de casamento",
      desc: "O \"sim\" que selou o nosso futuro.",
    },
  ];

  return (
    <section id="historia" className="max-w-[900px] mx-auto py-24 px-6 text-center">
      <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A9A80] mb-3 font-medium">
        Nossa história
      </p>
      <h2 className="font-display text-3xl sm:text-[38px] font-medium text-[#2E2A26] mb-4">
        Do primeiro encontro ao "sim"
      </h2>
      <p className="max-w-[520px] mx-auto mb-10 text-[#2E2A26]/75 text-[15px] leading-[1.6] font-light">
        {storyText || "Uma pequena linha do tempo com os momentos que nos trouxeram até aqui."}
      </p>

      <div className="flex flex-col gap-7 text-left max-w-[560px] mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-5 items-start">
            <div className="w-[10px] h-[10px] rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
            <div>
              <h3 className="font-display text-xl text-[#2E2A26] font-medium mb-1">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#2E2A26]/70 font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
