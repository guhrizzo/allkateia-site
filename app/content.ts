export const lightModeStorageKey = "allkateia-eco";
export const official = "https://www.allkateia.com.br";
export const instagram = "https://www.instagram.com/allkateiaprotecaoveicular/";
export const email = "atendimento@alkateia.com.br";
export const phone = "(14) 99612-7602";

export function whatsapp(message: string) {
  return "https://wa.me/5514996127602?text=" + encodeURIComponent(message);
}

export const quote = whatsapp("Olá! Gostaria de uma cotação de proteção veicular da Allkateia.");

export const steps = [
  {
    title: "Peça sua cotação",
    text: "Conte à equipe da Allkateia qual veículo você quer proteger e em qual cidade você está.",
    detail: "Para começar a conversa",
    items: ["Tenha o modelo e o ano do veículo à mão.", "Peça uma cotação pelo WhatsApp."],
  },
  {
    title: "Conheça as condições",
    text: "Converse com a equipe sobre os serviços, os valores e as regras da associação.",
    detail: "O que vale conferir",
    items: ["Consulte no regulamento os eventos previstos e os limites da assistência.", "Pergunte sobre a mensalidade e quando a proteção começa."],
  },
  {
    title: "Torne-se associado",
    text: "Se a proposta fizer sentido para você, a equipe orienta os próximos passos da adesão.",
    detail: "Para depois da adesão",
    items: ["Guarde o canal de atendimento para solicitar assistência.", "Use a área do associado para pedir boleto ou certificado digital."],
  },
];

export const benefits = [
  { title: "Reboque", text: "Conte com apoio para remover o veículo quando precisar de socorro." },
  { title: "Auxílio em caso de pane", text: "Solicite assistência se um problema mecânico ou elétrico interromper sua viagem." },
  { title: "Falta de combustível", text: "Peça auxílio quando o combustível acabar no meio do caminho." },
  { title: "Chaveiro automotivo", text: "Acione o atendimento se perder a chave ou deixá-la dentro do veículo." },
  { title: "Troca de pneu", text: "Receba auxílio se um pneu furado interromper seu trajeto." },
  { title: "Apoio emergencial", text: "Consulte as condições de transporte ou hospedagem emergencial." },
];

export const memberServices = [
  { title: "Solicitar assistência", message: "Olá! Sou associado e preciso de assistência para o meu veículo." },
  { title: "Pedir 2ª via de boleto", message: "Olá! Sou associado e gostaria de solicitar a 2ª via do boleto." },
  { title: "Pedir certificado digital", message: "Olá! Sou associado e gostaria de solicitar meu certificado digital." },
];

export const faq = [
  { question: "Como funciona a proteção veicular associativa?", answer: "Os associados participam de um grupo que compartilha custos conforme as regras da associação. A equipe explica a adesão e indica onde consultar o regulamento." },
  { question: "Como descubro o valor para o meu veículo?", answer: "Peça uma cotação pelo WhatsApp. A equipe solicita os dados necessários do veículo e apresenta as condições aplicáveis." },
  { question: "Quais serviços de assistência estão disponíveis?", answer: "A Allkateia divulga serviços como reboque, chaveiro automotivo e auxílio em caso de pane. Confirme a disponibilidade e os limites para seu veículo com a equipe." },
  { question: "Onde solicito boleto ou certificado digital?", answer: "Use os botões da área do associado. Eles abrem o WhatsApp oficial com uma mensagem para o serviço escolhido." },
];
export const partners = [
  { src: "/partners/romatec.webp", title: "Romatec Câmbio Automático", subtitle: "Câmbio automático" },
  { src: "/partners/alvorada.webp", title: "Auto Escola Alvorada", subtitle: "Autoescola e aulas práticas" },
  { src: "/partners/analise.webp", title: "Análise Vistorias", subtitle: "Vistoria veicular" },
  { src: "/partners/auto-freios.webp", title: "Auto Freios Jaú", subtitle: "Freios e embreagens" },
  { src: "/partners/leonardo.webp", title: "Leonardo Martelinho de Ouro", subtitle: "Estética automotiva" },
];