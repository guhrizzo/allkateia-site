import Image from "next/image";
import { ClipboardList, ArrowDown, ArrowDownRight, ArrowUpRight, BatteryCharging, CircleHelp, CircleStop, Fuel, Headphones, Instagram, KeyRound, MapPin, Menu, MessageCircle, Route, ShieldCheck, Truck } from "lucide-react";
import { benefits, email, faq, instagram, memberServices, official, partners, phone, quote, steps, whatsapp } from "./content";
import { Experience } from "./experience";
import { HeroVideo } from "./hero-video";
import { PartnerShowcase } from "./partner-showcase";

const links = [
  ["Como funciona", "#como-funciona"], ["Assistência", "#assistencia"], ["Vantagens", "#vantagens"],
];
const benefitIcons = [Truck, BatteryCharging, Fuel, KeyRound, CircleStop, Headphones];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#inicio" className="brand" aria-label="Allkateia, início">
    <Image className="brand-logo" src={inverse ? "/logo.png" : "/logo-blue.png"} alt="Allkateia Proteção Veicular e Benefícios" width={222} height={117} />
  </a>;
}

function Quote({ label = "Pedir cotação" }: { label?: string }) {
  return <a className="button button-main" href={quote}>{label}<ArrowUpRight size={19} aria-hidden="true" /></a>;
}

const journeyIcons = [MessageCircle, ClipboardList, ShieldCheck];

export default function Home() {
  return <div id="smooth-wrapper"><div id="smooth-content">
    <a className="skip" href="#conteudo">Ir para o conteúdo</a>
    <header id="inicio" tabIndex={-1} className="site-header">
      <div className="wrap nav-row">
        <Brand />
        <nav aria-label="Navegação principal" className="nav-desktop">{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav>
        <div className="nav-actions"><a className="member-nav" href="#associado">Já sou associado</a><Quote /></div>
        <details className="mobile-nav">
          <summary><Menu size={21} aria-hidden="true" /> Menu</summary>
          <nav aria-label="Navegação móvel">{[...links, ["Já sou associado", "#associado"], ["Pedir cotação", quote]].map(([name, href]) => <a key={href} href={href}>{name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav>
        </details>
      </div>
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-photo">
          <picture>
            <source media="(max-width: 760px)" srcSet="/road-small.webp 350w, /road-mobile.webp 404w" sizes="100vw" />
            <source srcSet="/road-medium.webp 960w, /road.webp 1280w" sizes="100vw" /><Image data-hero-image src="/road.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
          </picture>
        </div>
        <HeroVideo />
        <div className="wrap hero-inner">
          <p className="eyebrow hero-kicker"><ShieldCheck size={16} aria-hidden="true" /> Proteção veicular associativa</p>
          <h1 id="hero-title">Proteção para<br /> seguir com <em>tranquilidade.</em></h1>
          <p className="hero-copy">Proteja seu veículo com a Allkateia e conte com assistência 24 horas, além de vantagens para associados.</p>
          <div className="hero-actions"><Quote label="Pedir cotação no WhatsApp" /><a className="button button-outline" href="#como-funciona">Como funciona <ArrowDown size={17} aria-hidden="true" /></a></div>
        </div>
      </section>

      <aside className="quick-strip" aria-label="Atalhos de atendimento">
        <div className="wrap quick-grid" data-reveal>
          <a href="#assistencia"><span className="quick-icon"><Headphones size={20} aria-hidden="true"/></span><span><strong>Assistência 24 horas</strong><small>Conheça os serviços</small></span><ArrowUpRight className="quick-arrow" size={17} aria-hidden="true"/></a>
          <a href="#associado"><span className="quick-icon"><ShieldCheck size={20} aria-hidden="true"/></span><span><strong>Área do associado</strong><small>Boleto, certificado e assistência</small></span><ArrowUpRight className="quick-arrow" size={17} aria-hidden="true"/></a>
          <a href="#contato"><span className="quick-icon"><MapPin size={20} aria-hidden="true"/></span><span><strong>Atendimento Allkateia</strong><small>Contatos e unidades</small></span><ArrowUpRight className="quick-arrow" size={17} aria-hidden="true"/></a>
        </div>
      </aside>

      <section id="como-funciona" tabIndex={-1} className="walk section-pad" aria-labelledby="journey-title">
        <div className="wrap journey-layout">
          <div className="journey-intro-column">
            <div className="journey-intro">
              <div data-reveal="fade">
                <p className="eyebrow"><Route size={17} aria-hidden="true" /> Como funciona</p>
                <h2 id="journey-title">Da cotação à adesão.</h2>
                <p className="section-copy">Na Allkateia, os associados compartilham custos de proteção do veículo conforme as regras da associação. Veja como começar.</p>
                <div className="journey-actions">
                  <Quote label="Pedir cotação no WhatsApp" />
                  <a className="text-link" href={official + "/quem-somos/"}>Conheça a Allkateia <ArrowUpRight size={18} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="journey-track">
            <svg className="journey-line" aria-hidden="true" focusable="false">
              <path className="journey-line-base" data-journey-base />
              <path className="journey-line-trace" pathLength={1} data-journey-trace />
            </svg>
            <svg className="journey-line journey-car-layer" aria-hidden="true" focusable="false">
              <g className="journey-car" data-journey-car>
                <path fill="#08243a" d="M-9-8h3v5h-3zm15 0h3v5H6zM-9 4h3v5h-3zm15 0h3v5H6z" />
                <path fill="#28b6df" stroke="#0c4563" strokeWidth={1.1} d="M-5-12h10l2.6 4v16L5 12H-5l-2.6-4V-8z" />
                <path fill="#123c5a" d="M-4.8-6.3 4.8-6.3 4.1-3.1h-8.2zm.6 9.9h8.4l.75 3H-5z" />
                <path fill="#a8ebfb" d="M-3.7-1.8h7.4v4h-7.4z" />
                <path fill="#f8fdff" d="M-5.1-10h2.4v1.2h-2.4zm7.8 0h2.4v1.2H2.7z" />
                <path fill="#ff797b" d="M-5.1 9.3h2.4v1.2h-2.4zm7.8 0h2.4v1.2H2.7z" />
              </g>
            </svg>
            <ol className="journey-steps" role="list">
              {steps.map((step, index) => {
                const Icon = journeyIcons[index];
                return (
                  <li className="journey-step" key={step.title}>
                    <span className="journey-marker" data-journey-marker aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <article className="journey-card" data-journey-card>
                      <div className="journey-card-head">
                        <div><h3>{step.title}</h3><p>{step.text}</p></div>
                        <span className="journey-card-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
                      </div>
                      <div className="journey-detail" data-journey-detail>
                        <p>{step.detail}</p>
                        <ul role="list">{step.items.map(item => <li key={item}>{item}</li>)}</ul>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section id="assistencia" tabIndex={-1} className="assistance section-pad" aria-labelledby="assist-title">
        <div className="wrap assist-top" data-reveal>
          <div><p className="eyebrow"><Headphones size={17} aria-hidden="true" /> Assistência 24 horas</p><h2 id="assist-title">Assistência quando<br /> você precisa.</h2></div>
          <p>Conheça os serviços divulgados pela Allkateia. Consulte com a equipe as condições e os limites de atendimento.</p>
        </div>
        <div className="wrap benefit-wrap" data-reveal="fade">
          <div className="benefit-viewport" data-viewport tabIndex={0} role="region" aria-label="Benefícios de assistência. Use as setas do teclado para navegar.">
            <ol className="benefit-track" data-track>
              {benefits.map((benefit, i) => {
                const Icon = benefitIcons[i];
                return <li className="benefit-card" data-card key={benefit.title}>
                  <span className="card-icon"><Icon size={29} strokeWidth={1.7} aria-hidden="true"/></span>
                  <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
                </li>;
              })}
            </ol>
          </div>
          <Experience />
        </div>
      </section>

      <section id="vantagens" tabIndex={-1} className="wrap section-pad extras">
        <div className="partners">
          <div className="partners-intro" data-reveal>
            <p className="eyebrow"><ShieldCheck size={17} aria-hidden="true"/> Convênios</p>
            <h2>Vantagens para associados.</h2>
            <p className="section-copy">Conheça alguns dos parceiros em Jaú. Consulte a rede completa e as condições de cada benefício.</p>
            <a href={official + "/parceiros/"} className="button button-dark">Consultar parceiros <ArrowUpRight size={19} aria-hidden="true"/></a>
          </div>
          <PartnerShowcase>
            <ul className="partner-grid" aria-label="Parceiros Allkateia em Jaú">
              {partners.map(partner => (
                <li key={partner.src}>
                  <Image src={partner.src} alt="" width={384} height={272} />
                  <div><strong>{partner.title}</strong><span>{partner.subtitle}</span></div>
                </li>
              ))}
            </ul>
          </PartnerShowcase>
        </div>
        <div id="associado" tabIndex={-1} className="members">
          <div data-reveal>
            <p className="eyebrow"><Headphones size={17} aria-hidden="true"/> Atendimento</p>
            <h2>Já sou associado.</h2>
          </div>
          <ul data-reveal>{memberServices.map(service => <li key={service.title}><a href={whatsapp(service.message)}><span>{service.title}<small>Pelo WhatsApp oficial</small></span><ArrowUpRight size={20} aria-hidden="true"/></a></li>)}</ul>
        </div>
      </section>

      <section className="faq-band section-pad">
        <div className="wrap faq-grid">
          <div data-reveal><p className="eyebrow"><CircleHelp size={17} aria-hidden="true" /> Perguntas frequentes</p><h2>Ficou com dúvidas?</h2></div>
          <div className="faq-list" data-reveal>{faq.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section id="contato" tabIndex={-1} className="wrap section-pad">
        <div className="contact">
          <div data-reveal><p className="eyebrow"><MessageCircle size={17} aria-hidden="true"/> Fale com a Allkateia</p><h2>Vamos conversar sobre seu veículo?</h2><Quote label="Pedir cotação no WhatsApp" /></div>
          <div className="contact-links" data-reveal>
            <a href={"tel:+5514996127602"}><span>Telefone<br/><strong>{phone}</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a>
            <a href={"mailto:" + email}><span>E-mail<br/><strong>{email}</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a>
            <a href={whatsapp("Olá! Qual é a unidade Allkateia mais próxima da minha cidade?")}><span>Unidades<br/><strong>Consulte a mais próxima</strong></span><ArrowUpRight size={18} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="wrap">
        <div className="foot-top"><Brand inverse/><div><a href={instagram}><Instagram size={18} aria-hidden="true"/> Instagram <ArrowUpRight size={15} aria-hidden="true"/></a><a href={official + "/politica-de-privacidade/"}>Política de privacidade <ArrowUpRight size={15} aria-hidden="true"/></a></div><a href="#inicio" className="back-top">Voltar ao topo <ArrowDownRight size={16} aria-hidden="true"/></a></div>
        <div className="foot-bottom"><p>Associação dos Trabalhadores Autônomos da Região de Jaú · CNPJ 45.826.473/0001-80</p><div id="performance-control"></div></div>
      </div>
    </footer>
  </div></div>;
}
