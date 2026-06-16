import { useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  addEdge,
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  siHubspot,
  siInstagram,
  siMailchimp,
  siSlack,
  siWhatsapp,
  siZendesk
} from "simple-icons";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  ChevronDown,
  CircleDollarSign,
  CheckCircle2,
  Copy,
  Crown,
  GitBranch,
  Hand,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  MousePointer2,
  Plus,
  Play,
  Puzzle,
  RefreshCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Workflow,
  X,
  Zap
} from "lucide-react";
import {
  automationNodes,
  channelTypes,
  chatScenarios,
  conversationCards,
  heroStats,
  inboxRows,
  planComparisonRows,
  integrationTools,
  navigationItems,
  plans,
  useCases
} from "./data/botschannelData";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/platform" element={<PlatformPageShowcase />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LandingPage() {
  const [activeConversation, setActiveConversation] = useState(conversationCards[0]?.key ?? "engage");

  return (
    <div className="site-shell">
      <LandingHeader />

      <main>
        <section className="hero-section">
          <video className="hero-video" autoPlay loop muted playsInline poster="/assets/landing/hero-poster.webp">
            <source src="/assets/landing/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-badge">
              <span className="dot" />
              Inteligência conversacional · showcase
            </span>
            <h1>
              Bots <span className="accent">Channel</span>
            </h1>
            <p>
              Chatbots e atendimento centralizado para transformar conversas em vendas, suporte
              e relacionamento em escala.
            </p>
            <div className="hero-actions">
              <NavLink className="primary-button" to="/platform">
                <Play size={18} />
                Ver platform
              </NavLink>
              <a className="secondary-button" href="#products">
                Como funciona
              </a>
            </div>
            <div className="hero-stats" aria-label="Bots Channel highlights">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="conversation-section" id="products">
          <SectionIntro
            kicker="Conversation engine"
            title="Limpe o caminho entre conversa, contexto e venda"
            description="Capte demanda, entenda intencao e entregue contexto antes de passar para o time."
            align="left"
            className="conversation-copy"
          />
          <div className="conversation-grid">
            <div className="conversation-left">
              <div className="conversation-tabs">
                {conversationCards.map((card, index) => (
                  <motion.button
                    key={card.key}
                    type="button"
                    className={activeConversation === card.key ? "conversation-card active" : "conversation-card"}
                    onClick={() => setActiveConversation(card.key)}
                    layout
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  >
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="step-body">
                      <strong>{card.title}</strong>
                      <span>{card.text}</span>
                      <em>{card.trigger}</em>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="conversation-stage">
              <div className="stage-toolbar">
                <div>
                  <span>Automation studio</span>
                  <strong>{conversationCards.find((card) => card.key === activeConversation)?.trigger}</strong>
                </div>
                <div className="stage-status">Preview mode</div>
              </div>
              <div className="product-showcase">
                <AutomationBoard key={activeConversation} activeConversation={activeConversation} />
                <ChatWindow activeConversation={activeConversation} />
              </div>
            </div>
          </div>
        </section>

        <section className="integrations-section" id="integrations">
          <SectionIntro
            kicker="Ecossistema conectado"
            title="Integre as ferramentas que sua operacao ja usa"
            description="Um hub organiza entrada, contexto e handoff sem espalhar a conversa em cinco lugares."
            align="center"
          />
          <IntegrationShowcase />
        </section>

        <JourneyCoverage />

        <PricingTeaser />
      </main>

      <Footer />
    </div>
  );
}

function PlansPage() {
  return (
    <div className="site-shell">
      <LandingHeader />
      <main className="pricing-page">
        <section className="pricing-hero">
          <div className="pricing-hero-copy">
            <span className="section-kicker">Pricing</span>
            <h1>Planos para validar, operar e escalar atendimento</h1>
            <p>
              A landing fica mais limpa aqui e a comparacao detalhada vem para uma pagina propria.
              Escolha o plano pelo ritmo da sua operacao e avance quando o volume pedir mais estrutura.
            </p>
          </div>
        </section>
        <PricingDetails />
      </main>
      <Footer />
    </div>
  );
}

function ContactPage() {
  const teamContacts = [
    {
      name: "Lucas Diniz",
      role: "CTO e co-founder",
      email: "lucashdo@protonmail.com",
      github: "https://github.com/LucasHenriqueDiniz",
      website: "https://www.lucashdo.com",
      linkedin: "https://www.linkedin.com/in/lucas-diniz-ostroski/"
    },
    {
      name: "Gabriel Soares",
      role: "CEO e co-founder",
      email: "gabriel.lafayette@proton.me",
      github: "https://github.com/imgabrieldev",
      website: "https://imgabriel.dev",
      linkedin: "https://www.linkedin.com/in/soaresgabe"
    },
    {
      name: "Bruna",
      role: "Equipe Bots Channel",
      email: "bruna@botschannel.com",
      github: "https://github.com/bruna-botschannel",
      website: "https://brunabotschannel.com",
      linkedin: "https://www.linkedin.com/in/bruna-botschannel/"
    },
    {
      name: "Marina",
      role: "Equipe Bots Channel",
      email: "marina@botschannel.com",
      github: "https://github.com/marina-botschannel",
      website: "https://marinabotschannel.com",
      linkedin: "https://www.linkedin.com/in/marina-botschannel/"
    }
  ];

  return (
    <div className="site-shell">
      <LandingHeader />
      <main className="contact-page">
        <section className="contact-hero">
          <SectionIntro
            kicker="Contato"
            title="A Bots Channel encerrou as atividades"
            description="Esta pagina agora funciona como ponte para a equipe. Se voce precisa falar com alguem do projeto, use os contatos abaixo."
            align="left"
            className="contact-hero-copy"
          />
        </section>

        <section className="contact-section">
          <div className="contact-layout">
            <div className="contact-panel">
              <span className="section-kicker">Encerramento</span>
              <h2>O produto nao esta mais em operacao ativa</h2>
              <p>Se voce chegou ate aqui buscando o projeto, o melhor caminho agora e entrar em contato direto com a equipe para contexto, historico ou proximos passos.</p>
              <div className="contact-points">
                <div>
                  <strong>Projeto encerrado</strong>
                  <span>A pagina existe apenas como referencia e ponto de contato.</span>
                </div>
                <div>
                  <strong>Equipe responsavel</strong>
                  <span>Se quiser falar com alguem, use os perfis individuais ao lado.</span>
                </div>
                <div>
                  <strong>Perfis pessoais</strong>
                  <span>GitHub, site e LinkedIn levam para os canais ativos de cada pessoa.</span>
                </div>
              </div>
            </div>

            <div className="contact-team-grid">
              {teamContacts.map((person) => (
                <article className="contact-person-card" key={person.name}>
                  <span>{person.role}</span>
                  <strong>{person.name}</strong>
                  <p>{person.email}</p>
                  <div className="contact-person-links">
                    <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={person.website} target="_blank" rel="noreferrer">Website</a>
                    <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PricingTeaser() {
  return (
    <section className="pricing-teaser-section" id="plans">
      <div className="pricing-teaser-shell">
        <SectionIntro
          kicker="Pricing"
          title="Planos claros para cada etapa da operacao"
          description="Na landing fica so o essencial. O comparativo completo e os detalhes ficam em uma pagina propria."
          align="left"
          className="pricing-teaser-copy"
        />
        <div className="pricing-teaser-grid">
          {plans
            .filter((plan) => plan.featured)
            .map((plan) => (
              <article className="pricing-mini-card featured spotlight" key={plan.title}>
                <div className="pricing-mini-top">
                  <span>{plan.title}</span>
                  <em>Mais escolhido</em>
                </div>
                <strong>{plan.price}{plan.period}</strong>
                <p>{plan.highlight}</p>
              </article>
            ))}
          <div className="pricing-mini-stack">
            {plans
              .filter((plan) => !plan.featured)
              .map((plan) => (
                <article className="pricing-mini-card" key={plan.title}>
                  <div className="pricing-mini-top">
                    <span>{plan.title}</span>
                  </div>
                  <strong>{plan.price}{plan.period}</strong>
                  <p>{plan.highlight}</p>
                </article>
              ))}
          </div>
        </div>
        <div className="pricing-teaser-actions">
          <NavLink className="primary-button" to="/plans">
            Ver pagina de planos
          </NavLink>
          <NavLink className="secondary-button" to="/platform">
            Explorar platform
          </NavLink>
        </div>
      </div>
    </section>
  );
}

function PricingDetails() {
  return (
    <section className="plans-section pricing-page-section">
      <div className="plans-shell">
        <SectionIntro
          kicker="Comparacao"
          title="Ache o plano que se encaixa melhor na sua empresa"
          description="Leitura direta, cards alinhados e um comparativo curto puxado da pagina antiga de plans."
          align="left"
          className="plans-copy"
        />
      </div>
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <motion.article
            className={plan.featured ? "plan-card featured" : "plan-card"}
            key={plan.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
            whileHover={{ y: -8 }}
          >
            <div className="plan-card-top">
              <span>{plan.tier}</span>
              {plan.featured ? (
                <em>
                  <Crown size={14} />
                  Destaque
                </em>
              ) : null}
            </div>
            <h3>{plan.title}</h3>
            <p className="plan-highlight">{plan.highlight}</p>
            <div className="plan-price">
              <strong>{plan.price}</strong>
              {plan.period ? <span>{plan.period}</span> : null}
            </div>
            <p className="plan-subtitle">{plan.subtitle}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="plan-card-footer">
              <a className={plan.featured ? "primary-button plan-button" : "secondary-button plan-button"} href="#footer">
                {plan.cta}
              </a>
              <p>{plan.note}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="plans-compare">
        <div className="plans-compare-head">
          <span>Comparativo rapido</span>
          <p>Alguns pontos da pagina antiga de planos trazidos para ca, sem transformar esta pagina em uma tabela enorme.</p>
        </div>
        <div className="plans-compare-table" role="table" aria-label="Comparativo de planos">
          <div className="plans-compare-row plans-compare-row-head" role="row">
            <span role="columnheader">Recurso</span>
            <span role="columnheader">Free</span>
            <span role="columnheader">Starter</span>
            <span role="columnheader">Professional</span>
            <span role="columnheader">Business</span>
          </div>
          {planComparisonRows.map((row) => (
            <div className="plans-compare-row" role="row" key={row.feature}>
              <strong role="cell">{row.feature}</strong>
              <span role="cell">{row.free}</span>
              <span role="cell">{row.starter}</span>
              <span role="cell">{row.professional}</span>
              <span role="cell">{row.business}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const integrationCapabilities = ["Site + social", "CRM + suporte", "Handoff humano"];

  return (
    <motion.div
      className="integrations-showcase"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="integration-hub-glow" />
      <div className="integration-meta">
        <span>Passe o mouse nas integracoes para ver como cada uma entra no fluxo.</span>
        <div className="integration-capability-list">
          {integrationCapabilities.map((item) => (
            <strong className="integration-capability-chip" key={item}>{item}</strong>
          ))}
        </div>
      </div>

      <div className="integration-orbit">
        <motion.div
          className="integration-core"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="integration-core-badge">
            <Bot size={18} />
            Bots Channel
          </div>
          <strong>Inbox central</strong>
          <span>captura, triagem e handoff</span>
        </motion.div>

        {integrationTools.map((tool, index) => (
          <motion.div
            key={tool.key}
            className={`integration-float integration-float-${index + 1}`}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05, ease: "easeOut" }}
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
          >
            <button
              type="button"
              className={`integration-chip integration-chip-${tool.tone}`}
              aria-label={`${tool.name}: ${tool.support}`}
            >
              <span className="integration-chip-mark">{renderIntegrationBrandIcon(tool.key)}</span>
              <span className="integration-chip-name">{tool.name}</span>
            </button>
            <div className="integration-tooltip" role="tooltip">
              <strong>{tool.name}</strong>
              <p>{tool.support}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SectionIntro({
  kicker,
  title,
  description,
  align = "left",
  className
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const classes = ["section-intro", align === "center" ? "center" : "left", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function renderIntegrationBrandIcon(key: string) {
  const iconMap = {
    whatsapp: siWhatsapp,
    instagram: siInstagram,
    mailchimp: siMailchimp,
    hubspot: siHubspot,
    zendesk: siZendesk,
    slack: siSlack
  } as const;

  const icon = iconMap[key as keyof typeof iconMap];
  if (!icon) return null;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}

function JourneyCoverage() {
  const prefersReducedMotion = useReducedMotion();
  const iconMap = [ShieldCheck, CircleDollarSign, MessageCircle];

  return (
    <section className="usecase-section">
      <div className="journey-shell">
        <motion.div
          className="journey-copy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
        >
          <SectionIntro
            kicker="Atendimento automatizado"
            title="Atenda, qualifique e encaminhe conversas"
            description="Um bot simples para capturar contatos, responder duvidas comuns e avisar o time quando alguem precisa assumir."
            align="left"
          />
        </motion.div>

        <div className="journey-cards">
          {useCases.map((item, index) => {
            const Icon = iconMap[index] ?? Bot;

            return (
              <motion.article
                className="usecase-card"
                key={item.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.32, delay: prefersReducedMotion ? 0 : index * 0.06, ease: "easeOut" }}
              >
                <div className="usecase-icon">
                  <Icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.points[0]}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="journey-note"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          <div>
            <Bot size={20} />
            <strong>Resumo automatico para o time</strong>
          </div>
          <span>Canal, historico e intencao do cliente em um so lugar.</span>
        </motion.div>
      </div>
    </section>
  );
}

function LandingHeader() {
  return (
    <header className="landing-header">
      <NavLink to="/" className="landing-brand">
        <img src="/assets/landing/bots-channel-logo.svg" alt="Bots Channel" />
        <span>
          <strong>Bots</strong> Channel
        </span>
      </NavLink>
      <nav>
        {navigationItems.map((item) =>
          item.href.includes("#") ? (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ) : item.href.startsWith("/") ? (
            <NavLink key={item.label} to={item.href}>
              {item.label}
            </NavLink>
          ) : (
            <a key={item.label} href={item.href}>{item.label}</a>
          )
        )}
      </nav>
      <NavLink className="header-cta" to="/platform">
        Entrar na platform
      </NavLink>
    </header>
  );
}

function AutomationBoard({ activeConversation }: { activeConversation: string }) {
  const conversationOrder = ["engage", "nurture", "qualify", "convert"] as const;
  const activeIndex = Math.max(0, conversationOrder.indexOf(activeConversation as (typeof conversationOrder)[number]));

  return (
    <motion.section
      className="automation-board"
      aria-label="Automation workflow preview"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="automation-head">
        <div>
          <span>Flow builder</span>
          <strong>Lead qualification</strong>
        </div>
        <Workflow size={20} />
      </div>
      <div className="channel-row" aria-label="Supported channels">
        {channelTypes.map((channel) => (
          <span key={channel}>{channel}</span>
        ))}
      </div>
      <div className="node-flow">
        <motion.div
          className="node-flow-progress"
          initial={false}
          animate={{ height: `${(activeIndex / (automationNodes.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        />
        {automationNodes.map((node, index) => {
          const state = index < activeIndex ? "complete" : index === activeIndex ? "active" : "pending";

          return (
            <motion.article
              className={`flow-node ${state}`}
              key={node.key}
              layout
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.045, type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="node-icon">
                {state === "complete" ? <CheckCircle2 size={18} /> : state === "active" ? <Zap size={18} /> : <Bot size={18} />}
              </div>
              <div>
                <span>{node.title}</span>
                <strong>{node.label}</strong>
                <em>{node.meta}</em>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="automation-footer">
        <span>Score</span>
        <strong>{chatScenarios[activeConversation as keyof typeof chatScenarios]?.score ?? "82"}</strong>
        <span>Owner</span>
        <strong>{chatScenarios[activeConversation as keyof typeof chatScenarios]?.owner ?? "Bot"}</strong>
      </div>
    </motion.section>
  );
}

function ChatWindow({ activeConversation }: { activeConversation: string }) {
  const conversationOrder = ["engage", "nurture", "qualify", "convert"] as const;
  const activeIndex = Math.max(0, conversationOrder.indexOf(activeConversation as (typeof conversationOrder)[number]));
  const scenario = chatScenarios[activeConversation as keyof typeof chatScenarios] ?? chatScenarios.engage;
  const messages = conversationOrder
    .slice(0, activeIndex + 1)
    .flatMap((key) => chatScenarios[key].messages);

  return (
    <motion.div
      className="whatsapp-preview"
      key={activeConversation}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="phone-frame">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <header className="chat-topbar">
            <div className="chat-contact">
              <img src="/assets/landing/business-bot.webp" alt="Bots Channel bot" />
              <div>
                <strong>{scenario.contact}</strong>
                <span>online</span>
              </div>
            </div>
          </header>

          <section className="chat-thread" aria-label="Conversation preview">
            <div className="chat-messages">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                <motion.article
                  key={message.id}
                  className={message.side === "user" ? "chat-message user" : "chat-message bot"}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ delay: index * 0.045, type: "spring", stiffness: 300, damping: 28 }}
                  layout
                >
                  <div className="message-avatar">{message.side === "user" ? "V" : "BC"}</div>
                  <div className="message-content">
                    <p>{message.text}</p>
                  </div>
                </motion.article>
                ))}
              </AnimatePresence>
            </div>
            <div className="chat-composer">
              <span>Mensagem</span>
              <button type="button" aria-label="Send disabled in preview">
                <Send size={17} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

type BuilderNodeType = "trigger" | "logic" | "message" | "action" | "handoff" | "inbox";

type BuilderNodeData = {
  title: string;
  type: BuilderNodeType;
  note: string;
  details: string;
  metrics: string[];
};

const builderNodeTone: Record<BuilderNodeType, string> = {
  trigger: "trigger",
  logic: "logic",
  message: "message",
  action: "action",
  handoff: "handoff",
  inbox: "inbox"
};

const initialPlatformNodes: Node<BuilderNodeData>[] = [
  {
    id: "entry",
    type: "builder",
    position: { x: 60, y: 280 },
    data: {
      title: "Entrada multicanal",
      type: "trigger",
      note: "WhatsApp, site e Instagram",
      details: "A conversa entra no mesmo fluxo ja com origem, horario e canal preenchidos.",
      metrics: ["3 canais", "origem capturada", "primeira resposta < 10s"]
    }
  },
  {
    id: "triage",
    type: "builder",
    position: { x: 340, y: 90 },
    data: {
      title: "Triagem inicial",
      type: "logic",
      note: "Perguntas e tags",
      details: "O bot identifica intencao, urgencia e perfil antes de encaminhar para outro passo.",
      metrics: ["score do lead", "tag de assunto", "prioridade automatica"]
    }
  },
  {
    id: "faq",
    type: "builder",
    position: { x: 350, y: 420 },
    data: {
      title: "FAQ e opcoes",
      type: "message",
      note: "Respostas guiadas",
      details: "Perguntas comuns e atalhos de navegacao reduzem o trabalho do time antes do handoff.",
      metrics: ["base de respostas", "atalhos por intencao", "menu rapido"]
    }
  },
  {
    id: "crm",
    type: "builder",
    position: { x: 670, y: 86 },
    data: {
      title: "Atualiza CRM",
      type: "action",
      note: "HubSpot / Mailchimp",
      details: "Lead, score e interesse seguem para CRM e nutricao sem trabalho manual do operador.",
      metrics: ["lead criado", "score enviado", "origem sincronizada"]
    }
  },
  {
    id: "human",
    type: "builder",
    position: { x: 710, y: 360 },
    data: {
      title: "Handoff humano",
      type: "handoff",
      note: "Vendas ou suporte",
      details: "Quando a conversa pede gente, a plataforma entrega resumo, tags e proximo passo.",
      metrics: ["resumo pronto", "owner definido", "sla sugerido"]
    }
  },
  {
    id: "inbox",
    type: "builder",
    position: { x: 1020, y: 240 },
    data: {
      title: "Inbox central",
      type: "inbox",
      note: "Fila compartilhada",
      details: "O time assume do ponto certo, sem reabrir contexto em outra ferramenta.",
      metrics: ["fila unica", "contexto visivel", "historico completo"]
    }
  }
];

const initialPlatformEdges: Edge[] = [
  { id: "edge-entry-triage", source: "entry", target: "triage", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-entry-faq", source: "entry", target: "faq", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-triage-crm", source: "triage", target: "crm", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-triage-human", source: "triage", target: "human", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-faq-human", source: "faq", target: "human", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-crm-inbox", source: "crm", target: "inbox", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-human-inbox", source: "human", target: "inbox", markerEnd: { type: MarkerType.ArrowClosed } }
];

const supportPlatformNodes: Node<BuilderNodeData>[] = [
  {
    id: "support-entry",
    type: "builder",
    position: { x: 70, y: 240 },
    data: {
      title: "Entrada de suporte",
      type: "trigger",
      note: "Widget, email e WhatsApp",
      details: "Solicitacoes entram com canal, cliente e urgencia basica antes da triagem automatica.",
      metrics: ["3 entradas", "sla inicial", "cliente reconhecido"]
    }
  },
  {
    id: "support-triage",
    type: "builder",
    position: { x: 360, y: 120 },
    data: {
      title: "Classifica urgencia",
      type: "logic",
      note: "Prioridade e categoria",
      details: "O bot entende se e bug, financeiro, acesso ou onboarding para mandar ao lugar certo.",
      metrics: ["prioridade", "categoria", "tag automatica"]
    }
  },
  {
    id: "support-answer",
    type: "builder",
    position: { x: 360, y: 380 },
    data: {
      title: "Base de resposta",
      type: "message",
      note: "Macros e ajuda rapida",
      details: "Quando ha artigo ou macro pronta, o bot responde antes de envolver o time.",
      metrics: ["faq", "macro", "tempo poupado"]
    }
  },
  {
    id: "support-ticket",
    type: "builder",
    position: { x: 700, y: 120 },
    data: {
      title: "Abre ticket",
      type: "action",
      note: "Zendesk / Slack",
      details: "O ticket nasce com resumo, prioridade e cliente para nao perder tempo no handoff.",
      metrics: ["ticket criado", "time avisado", "resumo enviado"]
    }
  },
  {
    id: "support-human",
    type: "builder",
    position: { x: 700, y: 360 },
    data: {
      title: "Especialista assume",
      type: "handoff",
      note: "N1 ou N2",
      details: "O bot chama o humano apenas quando o caso exige validacao, excecao ou continuidade manual.",
      metrics: ["owner", "fila", "sla interno"]
    }
  },
  {
    id: "support-inbox",
    type: "builder",
    position: { x: 1030, y: 240 },
    data: {
      title: "Inbox de suporte",
      type: "inbox",
      note: "Fila priorizada",
      details: "A operacao enxerga a fila consolidada, com prioridade visual e contexto pronto.",
      metrics: ["fila priorizada", "historico", "proximo passo"]
    }
  }
];

const supportPlatformEdges: Edge[] = [
  { id: "edge-support-entry-triage", source: "support-entry", target: "support-triage", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-entry-answer", source: "support-entry", target: "support-answer", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-triage-ticket", source: "support-triage", target: "support-ticket", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-triage-human", source: "support-triage", target: "support-human", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-answer-human", source: "support-answer", target: "support-human", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-ticket-inbox", source: "support-ticket", target: "support-inbox", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-support-human-inbox", source: "support-human", target: "support-inbox", markerEnd: { type: MarkerType.ArrowClosed } }
];

const demoPlatformNodes: Node<BuilderNodeData>[] = [
  {
    id: "demo-entry",
    type: "builder",
    position: { x: 80, y: 260 },
    data: {
      title: "Pedido de demo",
      type: "trigger",
      note: "Site, ads e outbound",
      details: "O lead entra por formulario, campanha ou canal direto e inicia o fluxo comercial.",
      metrics: ["origem", "utm", "segmento"]
    }
  },
  {
    id: "demo-fit",
    type: "builder",
    position: { x: 370, y: 110 },
    data: {
      title: "Valida fit",
      type: "logic",
      note: "ICP e momento",
      details: "O bot identifica tamanho, momento e interesse para decidir prioridade comercial.",
      metrics: ["segmento", "maturidade", "score"]
    }
  },
  {
    id: "demo-qualify",
    type: "builder",
    position: { x: 360, y: 390 },
    data: {
      title: "Perguntas de contexto",
      type: "message",
      note: "Objetivo e operacao",
      details: "Antes da agenda, o bot coleta canais, volume e dores do lead.",
      metrics: ["volume", "time", "objetivo"]
    }
  },
  {
    id: "demo-crm",
    type: "builder",
    position: { x: 710, y: 110 },
    data: {
      title: "Empurra pro CRM",
      type: "action",
      note: "Lead e agenda",
      details: "O lead ja entra com etapa, resumo e owner sugerido no CRM.",
      metrics: ["owner", "etapa", "agenda"]
    }
  },
  {
    id: "demo-sales",
    type: "builder",
    position: { x: 710, y: 390 },
    data: {
      title: "SDR assume",
      type: "handoff",
      note: "Contato comercial",
      details: "Quando o lead esta pronto, o humano entra para confirmar contexto e seguir para demo.",
      metrics: ["sdr", "horario", "resumo"]
    }
  },
  {
    id: "demo-inbox",
    type: "builder",
    position: { x: 1030, y: 250 },
    data: {
      title: "Fila comercial",
      type: "inbox",
      note: "Pronto para follow-up",
      details: "A fila finaliza com lead qualificado e proxima acao pronta para o comercial.",
      metrics: ["fila", "cadencia", "responsavel"]
    }
  }
];

const demoPlatformEdges: Edge[] = [
  { id: "edge-demo-entry-fit", source: "demo-entry", target: "demo-fit", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-entry-qualify", source: "demo-entry", target: "demo-qualify", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-fit-crm", source: "demo-fit", target: "demo-crm", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-fit-sales", source: "demo-fit", target: "demo-sales", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-qualify-sales", source: "demo-qualify", target: "demo-sales", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-crm-inbox", source: "demo-crm", target: "demo-inbox", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "edge-demo-sales-inbox", source: "demo-sales", target: "demo-inbox", markerEnd: { type: MarkerType.ArrowClosed } }
];

const platformFlowPresets = [
  {
    key: "lead-qualification",
    title: "Lead qualification",
    subtitle: "Comercial",
    description: "Fluxo principal de qualificacao com triagem, CRM e handoff comercial.",
    nodes: initialPlatformNodes,
    edges: initialPlatformEdges
  },
  {
    key: "support-initial",
    title: "Suporte inicial",
    subtitle: "Atendimento",
    description: "Entrada de suporte com classificacao, resposta guiada e fila priorizada.",
    nodes: supportPlatformNodes,
    edges: supportPlatformEdges
  },
  {
    key: "demo-request",
    title: "Demo request",
    subtitle: "Pipeline",
    description: "Pedido de demo com fit, contexto e passagem pronta para o SDR.",
    nodes: demoPlatformNodes,
    edges: demoPlatformEdges
  }
] as const;

const builderSections = [
  {
    key: "overview",
    label: "Overview",
    subtitle: "Resumo do projeto",
    description: "Visao geral do bot, status do fluxo e proximos ajustes de operacao.",
    items: ["Performance semanal", "Saude dos canais", "Ultimos handoffs"]
  },
  {
    key: "flows",
    label: "Flows",
    subtitle: "Builder principal",
    description: "Onde o time desenhava a conversa com nodes, regras, mensagens e caminhos de decisao.",
    items: ["Lead qualification", "Suporte inicial", "Demo request"]
  },
  {
    key: "channels",
    label: "Channels",
    subtitle: "Entrada da conversa",
    description: "Conecta WhatsApp, widget, Instagram e outros canais em um mesmo trilho operacional.",
    items: ["WhatsApp oficial", "Widget web", "Instagram DM"]
  },
  {
    key: "integrations",
    label: "Integrations",
    subtitle: "Destino da operacao",
    description: "Ferramentas onde o contexto aterrissa depois do bot: CRM, suporte, alertas internos e nutricao.",
    items: ["HubSpot", "Zendesk", "Slack"]
  },
  {
    key: "team",
    label: "Team",
    subtitle: "Permissoes e filas",
    description: "Define quem atende cada caso, como funciona o handoff e quais filas cada time enxerga.",
    items: ["Sales queue", "Support queue", "Ops owners"]
  }
] as const;

const builderSectionContent = {
  overview: {
    title: "Resumo da operacao",
    description: "Leitura rapida do fluxo, da fila e do que o bot esta entregando antes do handoff.",
    cards: ["Fluxo principal ativo", "Fila centralizada", "Handoff com contexto"]
  },
  flows: {
    title: "Nodes do fluxo",
    description: "Estrutura principal do chatbot com entrada, decisao, acao e destino final.",
    cards: ["Lead qualification", "Suporte inicial", "Demo request"]
  },
  channels: {
    title: "Canais conectados",
    description: "Entradas que alimentavam o bot no produto antigo.",
    cards: ["WhatsApp oficial", "Widget de site", "Instagram DM"]
  },
  integrations: {
    title: "Ferramentas de destino",
    description: "Onde o contexto da conversa terminava depois do bot.",
    cards: ["HubSpot", "Zendesk", "Slack"]
  },
  team: {
    title: "Filas e ownership",
    description: "Como o time assumia a conversa quando o bot precisava escalar.",
    cards: ["Sales queue", "Support queue", "Ops owners"]
  }
} as const;

function BuilderFlowNode({ data, selected }: NodeProps<Node<BuilderNodeData>>) {
  const NodeIcon =
    data.type === "trigger"
      ? Zap
      : data.type === "logic"
        ? GitBranch
        : data.type === "message"
          ? MessageCircle
          : data.type === "action"
            ? Puzzle
            : data.type === "handoff"
              ? Users
              : Inbox;

  return (
    <div className={selected ? `builder-flow-node ${builderNodeTone[data.type]} selected` : `builder-flow-node ${builderNodeTone[data.type]}`}>
      {data.type !== "trigger" ? <Handle className="builder-flow-handle" type="target" position={Position.Left} /> : null}
      <div className="builder-flow-node-shell">
        <div className="builder-flow-node-top">
          <div className="builder-flow-node-type">
            <NodeIcon size={14} />
            <span>{data.type}</span>
          </div>
          {data.type === "trigger" ? <b className="builder-node-badge">Start</b> : data.type === "inbox" ? <b className="builder-node-badge end">End</b> : null}
        </div>
        <strong>{data.title}</strong>
        <em>{data.note}</em>
      </div>
      {data.type !== "inbox" ? <Handle className="builder-flow-handle" type="source" position={Position.Right} /> : null}
    </div>
  );
}

const builderNodeTypes = {
  builder: BuilderFlowNode
};

function PlatformPage() {
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const [mobileTab, setMobileTab] = useState<"flow" | "node" | "queue">("flow");
  const [builderNodes, setBuilderNodes, onNodesChange] = useNodesState(initialPlatformNodes);
  const [builderEdges, setBuilderEdges, onEdgesChange] = useEdgesState(initialPlatformEdges);
  const [selectedNode, setSelectedNode] = useState(initialPlatformNodes[1]?.id ?? "triage");
  const [activeNav, setActiveNav] = useState("flows");
  const [hasCanvasInteracted, setHasCanvasInteracted] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    flowNodes: false,
    quickActions: false,
    inspector: false,
    connections: false,
    queue: false
  });
  const [nodeMenu, setNodeMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null);
  const selectedFlowNode = builderNodes.find((node) => node.id === selectedNode) ?? builderNodes[0];
  const activeSectionData = builderSectionContent[activeNav as keyof typeof builderSectionContent] ?? builderSectionContent.flows;
  const resolveNodeTitle = (nodeId: string) => builderNodes.find((node) => node.id === nodeId)?.data.title ?? nodeId;

  const updateSelectedNode = (patch: Partial<BuilderNodeData>) => {
    setBuilderNodes((current) =>
      current.map((node) => (node.id === selectedNode ? { ...node, data: { ...node.data, ...patch } } : node))
    );
    setHasCanvasInteracted(true);
  };

  const toggleSection = (key: keyof typeof collapsedSections) => {
    setCollapsedSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const addNode = () => {
    const nextIndex = builderNodes.length + 1;
    const id = `custom-${nextIndex}`;
    const nextNode: Node<BuilderNodeData> = {
      id,
      type: "builder",
      position: {
        x: 220 + (nextIndex % 4) * 180,
        y: 140 + (nextIndex % 3) * 160
      },
      data: {
        title: `Novo node ${nextIndex}`,
        type: "message",
        note: "Mensagem editavel",
        details: "Edite este node para definir texto, logica ou destino do fluxo.",
        metrics: ["novo", "sem conexao", "rascunho"]
      }
    };
    setBuilderNodes((current) => [...current, nextNode]);
    setSelectedNode(id);
    setMobileTab("node");
    setHasCanvasInteracted(true);
  };

  const duplicateSelectedNode = () => {
    const sourceNode = builderNodes.find((node) => node.id === selectedNode);
    if (!sourceNode) return;

    const nextIndex = builderNodes.length + 1;
    const id = `custom-${nextIndex}`;
    const duplicatedNode: Node<BuilderNodeData> = {
      ...sourceNode,
      id,
      position: {
        x: sourceNode.position.x + 80,
        y: sourceNode.position.y + 60
      },
      data: {
        ...sourceNode.data,
        title: `${sourceNode.data.title} copia`
      }
    };

    setBuilderNodes((current) => [...current, duplicatedNode]);
    setSelectedNode(id);
    setNodeMenu(null);
    setHasCanvasInteracted(true);
  };

  const removeSelectedNode = () => {
    if (builderNodes.length <= 1) return;
    setBuilderNodes((current) => current.filter((node) => node.id !== selectedNode));
    setBuilderEdges((current) => current.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode));
    const fallbackNode = builderNodes.find((node) => node.id !== selectedNode);
    if (fallbackNode) {
      setSelectedNode(fallbackNode.id);
    }
    setNodeMenu(null);
    setHasCanvasInteracted(true);
  };

  const onConnect = (connection: Connection) => {
    setBuilderEdges((current) =>
      addEdge(
        {
          ...connection,
          id: `edge-${connection.source}-${connection.target}-${current.length + 1}`,
          markerEnd: { type: MarkerType.ArrowClosed }
        },
        current
      )
    );
    setHasCanvasInteracted(true);
  };

  const disconnectEdge = (edgeId: string) => {
    setBuilderEdges((current) => current.filter((edge) => edge.id !== edgeId));
    setHasCanvasInteracted(true);
  };

  const connectedEdges = builderEdges.filter((edge) => edge.source === selectedNode || edge.target === selectedNode);

  const resetFlow = () => {
    setBuilderNodes(initialPlatformNodes);
    setBuilderEdges(initialPlatformEdges);
    setSelectedNode(initialPlatformNodes[1]?.id ?? "triage");
    setMobileTab("flow");
    setNodeMenu(null);
    setHasCanvasInteracted(false);
  };

  if (!demoUnlocked) {
    return (
      <div className="platform-login-screen">
        <div className="platform-login-brand">
          <div className="platform-login-brand-copy">
            <h1>Bots Channel</h1>
            <p>Your channel to valuable client relationships.</p>
          </div>
          <img
            className="platform-login-mark"
            src="/assets/platform/bots-channel-logo.svg"
            alt="Bots Channel"
          />
        </div>

      <div className="platform-login-panel">
          <div className="platform-login-panel-head">
            <span># Login</span>
          </div>

          <div className="platform-legacy-form" aria-label="Login antigo desativado">
            <label className="platform-legacy-field">
              <span>Username</span>
              <input type="text" value="botschannel-demo" readOnly />
            </label>
            <label className="platform-legacy-field">
              <span>Password</span>
              <input type="password" value="123456789" readOnly />
            </label>
          </div>

          <div className="platform-legacy-error">
            <span>Login desativado. Use Enter demo para abrir a plataforma em modo showcase.</span>
          </div>

          <button type="button" className="platform-legacy-enter" onClick={() => setDemoUnlocked(true)}>
            Enter demo
            <Play size={18} />
          </button>

          <NavLink className="platform-legacy-secondary" to="/contact">
            Equipe
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-app-shell">
      <header className="platform-dashboard-topbar">
        <div className="platform-dashboard-brand">
          <img src="/assets/platform/bots-channel-logo.svg" alt="Bots Channel" />
          <div>
            <span>Bots Channel</span>
            <strong>Lead qualification</strong>
          </div>
        </div>
        <div className="platform-dashboard-actions">
          <button type="button" onClick={addNode}>Novo node</button>
          <button type="button" onClick={duplicateSelectedNode}>Duplicar</button>
          <NavLink to="/contact">Equipe</NavLink>
        </div>
      </header>

      <div className="platform-mobile-tabs">
        <button type="button" className={mobileTab === "flow" ? "active" : ""} onClick={() => setMobileTab("flow")}>Fluxo</button>
        <button type="button" className={mobileTab === "node" ? "active" : ""} onClick={() => setMobileTab("node")}>Node</button>
        <button type="button" className={mobileTab === "queue" ? "active" : ""} onClick={() => setMobileTab("queue")}>Fila</button>
      </div>

      <div className="platform-dashboard-body">
        <aside className={mobileTab === "flow" ? "platform-sidebar-panel active-mobile" : "platform-sidebar-panel"}>
          <div className="platform-sidebar-scroll">
            <nav className="platform-sidebar-nav">
              {builderSections.map((section) => (
                <button
                  key={section.key}
                  type="button"
                  className={activeNav === section.key ? "platform-sidebar-link active" : "platform-sidebar-link"}
                  onClick={() => setActiveNav(section.key)}
                >
                  <MenuIcon item={section.label} />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>

            <section className="platform-panel-block">
              <button type="button" className="platform-block-toggle" onClick={() => toggleSection("flowNodes")}>
                <span>{activeSectionData.title}</span>
                <ChevronDown size={16} className={collapsedSections.flowNodes ? "collapsed" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {!collapsedSections.flowNodes ? (
                  <motion.div
                    className="platform-block-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="platform-flow-summary">
                      <div>
                        <strong>{builderNodes.length}</strong>
                        <span>nodes</span>
                      </div>
                      <div>
                        <strong>{builderEdges.length}</strong>
                        <span>conexoes</span>
                      </div>
                      <div>
                        <strong>3</strong>
                        <span>canais</span>
                      </div>
                    </div>

                    <p className="platform-section-copy">{activeSectionData.description}</p>
                    {activeNav === "flows" ? (
                      <div className="flow-node-list">
                        {builderNodes.map((node) => (
                          <button
                            key={node.id}
                            type="button"
                            className={node.id === selectedNode ? "flow-node-list-item active" : "flow-node-list-item"}
                            onClick={() => {
                              setSelectedNode(node.id);
                              setMobileTab("node");
                              setHasCanvasInteracted(true);
                            }}
                          >
                            <div>
                              <strong>{node.data.title}</strong>
                              <span>{node.data.type}</span>
                            </div>
                            <em>{node.data.note}</em>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="platform-card-list">
                        {activeSectionData.cards.map((card) => (
                          <article key={card} className="platform-info-card">
                            <strong>{card}</strong>
                            <span>{activeNav === "channels" ? "entrada ativa" : activeNav === "integrations" ? "destino configurado" : activeNav === "team" ? "ownership definido" : "contexto operacional"}</span>
                          </article>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>

            <section className="platform-panel-block">
              <button type="button" className="platform-block-toggle" onClick={() => toggleSection("quickActions")}>
                <span>Operacao</span>
                <ChevronDown size={16} className={collapsedSections.quickActions ? "collapsed" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {!collapsedSections.quickActions ? (
                  <motion.div
                    className="platform-block-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="platform-card-list">
                      <article className="platform-info-card">
                        <strong>Fila central</strong>
                        <span>O time assume a conversa a partir do inbox com contexto completo.</span>
                      </article>
                      <article className="platform-info-card">
                        <strong>Qualificacao local</strong>
                        <span>Este showcase permite mexer no fluxo localmente sem salvar em backend.</span>
                      </article>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>
          </div>
        </aside>

        <main className="platform-canvas-panel">
          <section className="platform-canvas-card">
            <div className="platform-canvas-head">
              <div>
                <span>{activeSectionData.title}</span>
                <strong>Canvas do chatbot</strong>
              </div>
              {!hasCanvasInteracted ? <p>Clique, arraste ou conecte para editar o fluxo localmente.</p> : null}
            </div>

            <div className="platform-canvas-stage" onClick={() => setNodeMenu(null)}>
              <div className="builder-canvas-glow builder-canvas-glow-a" />
              <div className="builder-canvas-glow builder-canvas-glow-b" />
              <ReactFlow
                className="flow-reactflow"
                nodes={builderNodes}
                edges={builderEdges}
                nodeTypes={builderNodeTypes}
                onNodesChange={(changes) => {
                  onNodesChange(changes);
                  if (changes.length) setHasCanvasInteracted(true);
                }}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={(_, node) => {
                  setSelectedNode(node.id);
                  setMobileTab("node");
                  setHasCanvasInteracted(true);
                }}
                onNodeContextMenu={(event, node) => {
                  event.preventDefault();
                  setSelectedNode(node.id);
                  setNodeMenu({
                    nodeId: node.id,
                    x: event.clientX,
                    y: event.clientY
                  });
                  setHasCanvasInteracted(true);
                }}
                fitView
                fitViewOptions={{ padding: 0.18 }}
                defaultEdgeOptions={{
                  animated: false,
                  style: { strokeWidth: 2 }
                }}
                proOptions={{ hideAttribution: true }}
              >
                <defs>
                  <linearGradient id="builder-edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e92a67" />
                    <stop offset="50%" stopColor="#a853ba" />
                    <stop offset="100%" stopColor="#2a8af6" />
                  </linearGradient>
                </defs>
                <Background color="rgba(255,255,255,0.09)" gap={24} size={1} />
                <MiniMap
                  pannable
                  zoomable
                  className="builder-minimap"
                  nodeColor={(node) => {
                    const type = (node.data as BuilderNodeData).type;
                    if (type === "trigger") return "#ffc86f";
                    if (type === "handoff") return "#e92a67";
                    if (type === "action") return "#2a8af6";
                    return "#a853ba";
                  }}
                />
                <Controls className="flow-controls" showInteractive={false} />
              </ReactFlow>
              {nodeMenu ? (
                <div className="platform-node-menu" style={{ left: nodeMenu.x, top: nodeMenu.y }}>
                  <button type="button" onClick={() => {
                    setMobileTab("node");
                    setNodeMenu(null);
                  }}>
                    Ver node
                  </button>
                  <button type="button" onClick={duplicateSelectedNode}>
                    Duplicar
                  </button>
                  <button type="button" onClick={removeSelectedNode}>
                    Remover
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        </main>

        <aside className={mobileTab === "node" ? "platform-inspector-panel active-mobile" : "platform-inspector-panel"}>
          <div className="platform-inspector-scroll">
            <section className="platform-panel-block">
              <button type="button" className="platform-block-toggle" onClick={() => toggleSection("inspector")}>
                <span>Node selecionado</span>
                <ChevronDown size={16} className={collapsedSections.inspector ? "collapsed" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {!collapsedSections.inspector ? (
                  <motion.div
                    className="platform-block-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="builder-inspector-head">
                      <span>{selectedFlowNode.data.type}</span>
                      <strong>{selectedFlowNode.data.title}</strong>
                      <p>Edite o node selecionado. Tudo aqui e apenas local, como showcase.</p>
                    </div>

                    <div className="builder-form">
                      <label>
                        <span>Titulo</span>
                        <input value={selectedFlowNode.data.title} onChange={(event) => updateSelectedNode({ title: event.target.value })} />
                      </label>
                      <label>
                        <span>Tipo</span>
                        <select value={selectedFlowNode.data.type} onChange={(event) => updateSelectedNode({ type: event.target.value as BuilderNodeType })}>
                          <option value="trigger">Trigger</option>
                          <option value="logic">Logic</option>
                          <option value="message">Message</option>
                          <option value="action">Action</option>
                          <option value="handoff">Handoff</option>
                          <option value="inbox">Inbox</option>
                        </select>
                      </label>
                      <label>
                        <span>Resumo</span>
                        <input value={selectedFlowNode.data.note} onChange={(event) => updateSelectedNode({ note: event.target.value })} />
                      </label>
                      <label>
                        <span>Descricao</span>
                        <textarea value={selectedFlowNode.data.details} onChange={(event) => updateSelectedNode({ details: event.target.value })} />
                      </label>
                    </div>

                    <div className="builder-metrics-editor">
                      <span>Metrics</span>
                      <div className="builder-metrics">
                        {selectedFlowNode.data.metrics.map((metric, index) => (
                          <input
                            key={`${selectedFlowNode.id}-${index}`}
                            className="builder-metric-input"
                            value={metric}
                            onChange={(event) =>
                              updateSelectedNode({
                                metrics: selectedFlowNode.data.metrics.map((currentMetric, metricIndex) =>
                                  metricIndex === index ? event.target.value : currentMetric
                                )
                              })
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="builder-inspector-actions">
                      <button type="button" className="builder-primary-action" onClick={duplicateSelectedNode}>Duplicar node</button>
                      <button type="button" className="builder-danger-action" onClick={removeSelectedNode}>Remover node</button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>

            <section className="platform-panel-block">
              <button type="button" className="platform-block-toggle" onClick={() => toggleSection("connections")}>
                <span>Conexoes</span>
                <ChevronDown size={16} className={collapsedSections.connections ? "collapsed" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {!collapsedSections.connections ? (
                  <motion.div
                    className="platform-block-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="builder-connect-panel">
                      <span>Conectar</span>
                      <p className="builder-connect-hint">Use os handles no canvas para criar novas conexoes entre nodes.</p>
                    </div>
                    <div className="builder-edge-list">
                      <span>Conexoes do node</span>
                      {connectedEdges.map((edge) => (
                        <div key={edge.id} className="builder-edge-row">
                          <strong>{resolveNodeTitle(edge.source)}</strong>
                          <em>{resolveNodeTitle(edge.target)}</em>
                          <button type="button" onClick={() => disconnectEdge(edge.id)}>remover</button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>

            <section className={mobileTab === "queue" ? "platform-panel-block active-mobile" : "platform-panel-block"}>
              <button type="button" className="platform-block-toggle" onClick={() => toggleSection("queue")}>
                <span>Fila</span>
                <ChevronDown size={16} className={collapsedSections.queue ? "collapsed" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {!collapsedSections.queue ? (
                  <motion.div
                    className="platform-block-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="panel-title">
              <h2>Inbox preview</h2>
              <span>Live queue</span>
            </div>
                    <div className="flow-queue-list">
                      {inboxRows.map((row) => (
                        <div className="flow-queue-row" key={row.customer}>
                          <div>
                            <strong>{row.customer}</strong>
                            <span>{row.channel} · {row.topic}</span>
                          </div>
                          <em>{row.status === "Bot qualified" ? "Qualificado pelo bot" : row.status === "Human handoff" ? "Encaminhado ao time" : "Em andamento"}</em>
                        </div>
                      ))}
                    </div>
                    <NavLink className="platform-inline-link" to="/contact">
                      Ver equipe responsavel
                      <ArrowRight size={16} />
                    </NavLink>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}

function MenuIcon({ item }: { item: string }) {
  if (item === "Studio" || item === "Bots") {
    return <Bot size={16} />;
  }
  if (item === "Team") {
    return <Users size={16} />;
  }
  if (item === "Analytics" || item === "Reports" || item === "Monitoring") {
    return <BarChart3 size={16} />;
  }
  if (item === "Config" || item === "Integrations" || item === "Platforms") {
    return <Settings size={16} />;
  }
  return <MessageCircle size={16} />;
}

function PlatformStudioMenuIcon({ item }: { item: string }) {
  if (item === "Overview") {
    return <LayoutDashboard size={16} />;
  }
  if (item === "Flows") {
    return <GitBranch size={16} />;
  }
  if (item === "Channels") {
    return <Inbox size={16} />;
  }
  if (item === "Integrations") {
    return <Puzzle size={16} />;
  }
  if (item === "Team") {
    return <Users size={16} />;
  }
  return <Sparkles size={16} />;
}

function PlatformPageShowcase() {
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const [mobileTab, setMobileTab] = useState<"flow" | "node" | "queue">("flow");
  const [builderNodes, setBuilderNodes, onNodesChange] = useNodesState(initialPlatformNodes);
  const [builderEdges, setBuilderEdges, onEdgesChange] = useEdgesState(initialPlatformEdges);
  const [selectedNode, setSelectedNode] = useState(initialPlatformNodes[1]?.id ?? "triage");
  const [activeFlowKey, setActiveFlowKey] = useState<(typeof platformFlowPresets)[number]["key"]>("lead-qualification");
  const [activeNav, setActiveNav] = useState("flows");
  const [isFlowLoading, setIsFlowLoading] = useState(false);
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const [hasCanvasInteracted, setHasCanvasInteracted] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    inspector: false,
    connections: false,
    queue: false
  });
  const [nodeMenu, setNodeMenu] = useState<{ nodeId?: string; x: number; y: number } | null>(null);
  const selectedFlowNode = builderNodes.find((node) => node.id === selectedNode) ?? builderNodes[0];
  const activeSectionData = builderSectionContent[activeNav as keyof typeof builderSectionContent] ?? builderSectionContent.flows;
  const activeFlowPreset = platformFlowPresets.find((flow) => flow.key === activeFlowKey) ?? platformFlowPresets[0];
  const resolveNodeTitle = (nodeId: string) => builderNodes.find((node) => node.id === nodeId)?.data.title ?? nodeId;
  const connectedEdges = builderEdges.filter((edge) => edge.source === selectedNode || edge.target === selectedNode);
  const quickStats = [
    { label: "Nodes", value: String(builderNodes.length) },
    { label: "Conexoes", value: String(builderEdges.length) },
    { label: "Canais", value: "3" }
  ];
  const inspectorRuleLabel =
    selectedFlowNode.data.type === "logic"
      ? "Logic rules"
      : selectedFlowNode.data.type === "trigger"
        ? "Entrada monitorada"
        : selectedFlowNode.data.type === "handoff"
          ? "Condicoes de handoff"
          : "Parametros do node";
  const isFlowsView = activeNav === "flows";

  const updateSelectedNode = (patch: Partial<BuilderNodeData>) => {
    setBuilderNodes((current) =>
      current.map((node) => (node.id === selectedNode ? { ...node, data: { ...node.data, ...patch } } : node))
    );
    setHasCanvasInteracted(true);
  };

  const toggleSection = (key: keyof typeof collapsedSections) => {
    setCollapsedSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const addNode = () => {
    const nextIndex = builderNodes.length + 1;
    const id = `custom-${nextIndex}`;
    const nextNode: Node<BuilderNodeData> = {
      id,
      type: "builder",
      position: {
        x: 240 + (nextIndex % 4) * 220,
        y: 120 + (nextIndex % 3) * 180
      },
      data: {
        title: `Novo node ${nextIndex}`,
        type: "message",
        note: "Mensagem editavel",
        details: "Edite este node para definir texto, logica ou destino do fluxo.",
        metrics: ["novo", "sem conexao", "rascunho"]
      }
    };
    setBuilderNodes((current) => [...current, nextNode]);
    setSelectedNode(id);
    setMobileTab("node");
    setHasCanvasInteracted(true);
  };

  const duplicateSelectedNode = () => {
    const sourceNode = builderNodes.find((node) => node.id === selectedNode);
    if (!sourceNode) return;

    const nextIndex = builderNodes.length + 1;
    const id = `custom-${nextIndex}`;
    const duplicatedNode: Node<BuilderNodeData> = {
      ...sourceNode,
      id,
      position: {
        x: sourceNode.position.x + 80,
        y: sourceNode.position.y + 60
      },
      data: {
        ...sourceNode.data,
        title: `${sourceNode.data.title} copia`
      }
    };

    setBuilderNodes((current) => [...current, duplicatedNode]);
    setSelectedNode(id);
    setNodeMenu(null);
    setHasCanvasInteracted(true);
  };

  const removeSelectedNode = () => {
    if (builderNodes.length <= 1) return;
    setBuilderNodes((current) => current.filter((node) => node.id !== selectedNode));
    setBuilderEdges((current) => current.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode));
    const fallbackNode = builderNodes.find((node) => node.id !== selectedNode);
    if (fallbackNode) {
      setSelectedNode(fallbackNode.id);
    }
    setNodeMenu(null);
    setHasCanvasInteracted(true);
  };

  const onConnect = (connection: Connection) => {
    setBuilderEdges((current) =>
      addEdge(
        {
          ...connection,
          id: `edge-${connection.source}-${connection.target}-${current.length + 1}`,
          markerEnd: { type: MarkerType.ArrowClosed }
        },
        current
      )
    );
    setHasCanvasInteracted(true);
  };

  const disconnectEdge = (edgeId: string) => {
    setBuilderEdges((current) => current.filter((edge) => edge.id !== edgeId));
    setHasCanvasInteracted(true);
  };

  const resetFlow = () => {
    setBuilderNodes(activeFlowPreset.nodes);
    setBuilderEdges(activeFlowPreset.edges);
    setSelectedNode(activeFlowPreset.nodes[1]?.id ?? activeFlowPreset.nodes[0]?.id ?? "triage");
    setMobileTab("flow");
    setNodeMenu(null);
    setHasCanvasInteracted(false);
  };

  const loadFlowPreset = (flowKey: (typeof platformFlowPresets)[number]["key"]) => {
    const nextFlow = platformFlowPresets.find((flow) => flow.key === flowKey);
    if (!nextFlow) return;
    setActiveFlowKey(flowKey);
    setIsFlowLoading(true);
    setHasCanvasInteracted(false);
    window.setTimeout(() => {
      setBuilderNodes(nextFlow.nodes);
      setBuilderEdges(nextFlow.edges);
      setSelectedNode(nextFlow.nodes[1]?.id ?? nextFlow.nodes[0]?.id ?? "triage");
      setNodeMenu(null);
      setMobileTab("flow");
      setIsFlowLoading(false);
    }, 650);
  };

  const handleNavChange = (nextNav: string) => {
    if (nextNav === activeNav) return;
    setIsSectionLoading(true);
    window.setTimeout(() => {
      setActiveNav(nextNav);
      setMobileTab("flow");
      setNodeMenu(null);
      setIsSectionLoading(false);
    }, 320);
  };

  if (!demoUnlocked) {
    return (
      <div className="platform-login-screen">
        <div className="platform-login-brand">
          <div className="platform-login-brand-copy">
            <h1>Bots Channel</h1>
            <p>Your channel to valuable client relationships.</p>
          </div>
          <img className="platform-login-mark" src="/assets/platform/bots-channel-logo.svg" alt="Bots Channel" />
        </div>

        <div className="platform-login-panel">
          <div className="platform-login-panel-head">
            <span># Login</span>
          </div>

          <div className="platform-legacy-form" aria-label="Login antigo desativado">
            <label className="platform-legacy-field">
              <span>Username</span>
              <input type="text" value="botschannel-demo" readOnly />
            </label>
            <label className="platform-legacy-field">
              <span>Password</span>
              <input type="password" value="123456789" readOnly />
            </label>
          </div>

          <div className="platform-legacy-error">
            <span>Login desativado. Use Enter demo para abrir a plataforma em modo showcase.</span>
          </div>

          <button type="button" className="platform-legacy-enter" onClick={() => setDemoUnlocked(true)}>
            Enter demo
            <Play size={18} />
          </button>

          <NavLink className="platform-legacy-secondary" to="/contact">
            Equipe
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-app-shell platform-app-shell-stitch">
      <div className="platform-studio-layout">
        <aside className={mobileTab === "flow" ? "platform-studio-sidebar active-mobile" : "platform-studio-sidebar"}>
          <div className="platform-studio-sidebar-scroll">
            <div className="platform-studio-brand">
              <div className="platform-studio-brand-mark">
                <img src="/assets/platform/bots-channel-logo.svg" alt="Bots Channel" />
              </div>
              <div>
                <strong>Bots Channel</strong>
                <span>Platform showcase</span>
              </div>
            </div>

            <button type="button" className="platform-studio-cta" onClick={addNode}>
              <Plus size={18} />
              Novo fluxo logico
            </button>

            <nav className="platform-studio-nav">
              {builderSections.map((section) => (
                <button
                  key={section.key}
                  type="button"
                  className={activeNav === section.key ? "platform-studio-nav-link active" : "platform-studio-nav-link"}
                  onClick={() => handleNavChange(section.key)}
                >
                  <PlatformStudioMenuIcon item={section.label} />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>

            <section className="platform-studio-context">
              <span>{activeSectionData.title}</span>
              <p>{activeSectionData.description}</p>
              <div className="platform-studio-stats">
                {quickStats.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {activeNav === "flows" ? (
                <div className="platform-flow-preset-list">
                  {platformFlowPresets.map((flow) => (
                    <button
                      key={flow.key}
                      type="button"
                      className={activeFlowKey === flow.key ? "platform-flow-preset-card active" : "platform-flow-preset-card"}
                      onClick={() => loadFlowPreset(flow.key)}
                    >
                      <div>
                        <strong>{flow.title}</strong>
                        <span>{flow.subtitle}</span>
                      </div>
                      <em>{flow.description}</em>
                    </button>
                  ))}
                </div>
              ) : null}
            </section>

            <div className="platform-studio-user">
              <div className="platform-studio-user-avatar">LD</div>
              <div>
                <strong>Lucas Henrique Diniz</strong>
                <span>Legacy operator</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="platform-studio-main">
          <header className="platform-studio-topbar">
            <div className="platform-studio-search">
              <Search size={16} />
              <input type="text" value={selectedFlowNode.data.title} readOnly aria-label="Buscar node ou fluxo" />
            </div>

            <div className="platform-studio-title">
              <strong>Bots Channel Platform</strong>
              <span>{activeNav === "flows" ? activeFlowPreset.title : activeSectionData.title}</span>
            </div>

            <div className="platform-studio-topbar-actions">
              <button type="button" aria-label="Notificacoes">
                <Bell size={18} />
              </button>
              <button type="button" aria-label="Ajuda">
                <HelpCircle size={18} />
              </button>
              <NavLink to="/contact" aria-label="Equipe">
                <Users size={18} />
              </NavLink>
            </div>
          </header>

          <div className="platform-mobile-tabs">
            <button type="button" className={mobileTab === "flow" ? "active" : ""} onClick={() => setMobileTab("flow")}>Fluxo</button>
            <button type="button" className={mobileTab === "node" ? "active" : ""} onClick={() => setMobileTab("node")}>Node</button>
            <button type="button" className={mobileTab === "queue" ? "active" : ""} onClick={() => setMobileTab("queue")}>Fila</button>
          </div>

          <div className="platform-studio-workspace">
            <main className="platform-studio-canvas-wrap">
              {isSectionLoading ? (
                <section className="platform-section-loading">
                  <div className="platform-section-loading-bar" />
                  <strong>{activeSectionData.title}</strong>
                  <span>Carregando a experiencia desta area da plataforma.</span>
                </section>
              ) : isFlowsView ? (
                <section className="platform-studio-canvas-card">
                  <div className="platform-studio-canvas-header">
                    <div>
                      <span>Flow builder</span>
                      <strong>{activeFlowPreset.title}</strong>
                    </div>
                    {isFlowLoading ? <p>Carregando o fluxo selecionado...</p> : !hasCanvasInteracted ? <p>Use o canvas para ligar, mover e editar nodes localmente.</p> : null}
                  </div>

                  <div className="platform-studio-canvas-shell">
                    <div className="platform-studio-toolrail">
                      <button type="button" className="active" onClick={() => setMobileTab("flow")} aria-label="Canvas">
                        <MousePointer2 size={17} />
                      </button>
                      <button type="button" onClick={addNode} aria-label="Adicionar node">
                        <Plus size={17} />
                      </button>
                      <button type="button" onClick={duplicateSelectedNode} aria-label="Duplicar node">
                        <Copy size={17} />
                      </button>
                      <button type="button" onClick={resetFlow} aria-label="Resetar fluxo">
                        <RefreshCcw size={17} />
                      </button>
                      <button type="button" aria-label="Mover canvas">
                        <Hand size={17} />
                      </button>
                    </div>

                    <div className="platform-canvas-stage platform-canvas-stage-stitch" onClick={() => setNodeMenu(null)}>
                      <div className="builder-canvas-glow builder-canvas-glow-a" />
                      <div className="builder-canvas-glow builder-canvas-glow-b" />
                      {isFlowLoading ? (
                        <div className="platform-flow-loading">
                          <div className="platform-flow-loading-bar" />
                          <strong>{activeFlowPreset.title}</strong>
                          <span>Sincronizando nodes, conexoes e contexto do fluxo.</span>
                        </div>
                      ) : null}
                      <ReactFlow
                        className="flow-reactflow flow-reactflow-stitch"
                        nodes={builderNodes}
                        edges={builderEdges}
                        nodeTypes={builderNodeTypes}
                        onNodesChange={(changes) => {
                          onNodesChange(changes);
                          if (changes.length) setHasCanvasInteracted(true);
                        }}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={(_, node) => {
                          setSelectedNode(node.id);
                          setMobileTab("node");
                          setHasCanvasInteracted(true);
                        }}
                        onNodeContextMenu={(event, node) => {
                          event.preventDefault();
                          setSelectedNode(node.id);
                          setNodeMenu({
                            nodeId: node.id,
                            x: event.clientX,
                            y: event.clientY
                          });
                          setHasCanvasInteracted(true);
                        }}
                        onPaneContextMenu={(event) => {
                          event.preventDefault();
                          setNodeMenu({
                            x: event.clientX,
                            y: event.clientY
                          });
                        }}
                        fitView
                        fitViewOptions={{ padding: 0.2 }}
                        defaultEdgeOptions={{
                          type: "smoothstep",
                          animated: false,
                          style: { strokeWidth: 2.8 }
                        }}
                        proOptions={{ hideAttribution: true }}
                      >
                        <defs>
                          <linearGradient id="builder-edge-gradient-showcase" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f4d385" />
                            <stop offset="100%" stopColor="#e2b44a" />
                          </linearGradient>
                        </defs>
                        <Background color="rgba(236, 209, 144, 0.14)" gap={20} size={1.2} />
                        <MiniMap
                          pannable
                          zoomable
                          className="builder-minimap"
                          nodeColor={(node) => {
                            const type = (node.data as BuilderNodeData).type;
                            if (type === "trigger") return "#f4d385";
                            if (type === "handoff") return "#f38ba8";
                            if (type === "action") return "#74a7ff";
                            if (type === "inbox") return "#52d6a1";
                            return "#7d8597";
                          }}
                        />
                        <Controls className="flow-controls" showInteractive={false} />
                      </ReactFlow>

                      {nodeMenu ? (
                        <div className="platform-node-menu platform-node-menu-stitch" style={{ left: nodeMenu.x, top: nodeMenu.y }}>
                          {nodeMenu.nodeId ? (
                            <>
                              <button type="button" onClick={() => {
                                setMobileTab("node");
                                setNodeMenu(null);
                              }}>
                                Ver node
                              </button>
                              <button type="button" onClick={duplicateSelectedNode}>
                                Duplicar
                              </button>
                              <button type="button" onClick={removeSelectedNode}>
                                Remover
                              </button>
                            </>
                          ) : (
                            <>
                              <button type="button" onClick={() => {
                                addNode();
                                setNodeMenu(null);
                              }}>
                                Adicionar node
                              </button>
                              <button type="button" onClick={() => {
                                resetFlow();
                                setNodeMenu(null);
                              }}>
                                Resetar fluxo
                              </button>
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ) : (
                <section className="platform-screen-card">
                  <div className="platform-screen-header">
                    <div>
                      <span>{activeSectionData.title}</span>
                      <strong>{activeSectionData.description}</strong>
                    </div>
                    <div className="platform-screen-actions">
                      {activeSectionData.cards.map((card) => (
                        <span key={card}>{card}</span>
                      ))}
                    </div>
                  </div>

                  <div className={`platform-screen-grid platform-screen-grid-${activeNav}`}>
                    {activeNav === "overview" ? (
                      <>
                        <article className="platform-screen-panel hero">
                          <strong>Resumo executivo</strong>
                          <p>Volume, status dos canais e handoffs ativos em um painel que o time abria antes de mexer no fluxo.</p>
                          <div className="platform-kpi-row">
                            <div><b>184</b><span>Conversas abertas</span></div>
                            <div><b>63%</b><span>Resolvidas pelo bot</span></div>
                            <div><b>27</b><span>Fluxos ativos</span></div>
                          </div>
                        </article>
                        <article className="platform-screen-panel">
                          <strong>Fila viva</strong>
                          <ul className="platform-mini-list">
                            {inboxRows.slice(0, 3).map((row) => (
                              <li key={row.customer}><span>{row.customer}</span><em>{row.topic}</em></li>
                            ))}
                          </ul>
                        </article>
                        <article className="platform-screen-panel">
                          <strong>Saude da operacao</strong>
                          <div className="platform-health-stack">
                            <div><span>WhatsApp</span><b>Online</b></div>
                            <div><span>Instagram</span><b>Sem fila</b></div>
                            <div><span>CRM sync</span><b>Estavel</b></div>
                          </div>
                        </article>
                      </>
                    ) : null}

                    {activeNav === "channels" ? (
                      <>
                        <article className="platform-screen-panel hero">
                          <strong>Entradas conectadas</strong>
                          <p>Os canais entram no mesmo trilho e carregam origem, score e contexto antes do inbox.</p>
                        </article>
                        {["WhatsApp oficial", "Widget de site", "Instagram DM"].map((item, index) => (
                          <article key={item} className="platform-screen-panel">
                            <strong>{item}</strong>
                            <p>{index === 0 ? "Canal com maior volume e triagem inicial." : index === 1 ? "Capta lead e pedido de demo no site." : "Entrada social com FAQ e handoff."}</p>
                          </article>
                        ))}
                      </>
                    ) : null}

                    {activeNav === "integrations" ? (
                      <>
                        <article className="platform-screen-panel hero">
                          <strong>Integracoes do fluxo</strong>
                          <p>Contexto nao morria no bot: CRM, suporte e alertas recebiam dados prontos no momento certo.</p>
                        </article>
                        {["HubSpot", "Zendesk", "Slack"].map((item, index) => (
                          <article key={item} className="platform-screen-panel">
                            <strong>{item}</strong>
                            <p>{index === 0 ? "Lead, score e origem comercial." : index === 1 ? "Ticket com resumo e prioridade." : "Avisos internos para fila e excecao."}</p>
                          </article>
                        ))}
                      </>
                    ) : null}

                    {activeNav === "team" ? (
                      <>
                        <article className="platform-screen-panel hero">
                          <strong>Ownership e handoff</strong>
                          <p>A plataforma distribuia atendimento por fila, especialidade e urgencia sem perder historico.</p>
                        </article>
                        {["Sales queue", "Support queue", "Ops owners"].map((item, index) => (
                          <article key={item} className="platform-screen-panel">
                            <strong>{item}</strong>
                            <p>{index === 0 ? "Leads quentes e demos." : index === 1 ? "Casos com ticket ou continuidade." : "Aprovacoes, excecoes e monitoramento."}</p>
                          </article>
                        ))}
                      </>
                    ) : null}
                  </div>
                </section>
              )}
            </main>

            <aside className={mobileTab === "node" && isFlowsView ? "platform-studio-inspector active-mobile" : "platform-studio-inspector"}>
              <div className="platform-studio-inspector-scroll">
                {!isFlowsView ? (
                  <div className="platform-inspector-empty">
                    <strong>{activeSectionData.title}</strong>
                    <span>Abra `Flows` para selecionar um fluxo e editar nodes no builder.</span>
                  </div>
                ) : (
                  <>
                <div className="platform-studio-inspector-head">
                  <div>
                    <span>Node properties</span>
                    <strong>{selectedFlowNode.data.title}</strong>
                  </div>
                  <button type="button" onClick={() => setMobileTab("flow")} aria-label="Fechar painel">
                    <X size={18} />
                  </button>
                </div>

                <section className="platform-studio-inspector-section">
                  <button type="button" className="platform-block-toggle" onClick={() => toggleSection("inspector")}>
                    <span>Node selecionado</span>
                    <ChevronDown size={16} className={collapsedSections.inspector ? "collapsed" : ""} />
                  </button>
                  <AnimatePresence initial={false}>
                    {!collapsedSections.inspector ? (
                      <motion.div
                        className="platform-block-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="builder-form builder-form-stitch">
                          <label>
                            <span>Node name</span>
                            <input value={selectedFlowNode.data.title} onChange={(event) => updateSelectedNode({ title: event.target.value })} />
                          </label>
                          <label>
                            <span>Tipo</span>
                            <select value={selectedFlowNode.data.type} onChange={(event) => updateSelectedNode({ type: event.target.value as BuilderNodeType })}>
                              <option value="trigger">Trigger</option>
                              <option value="logic">Logic</option>
                              <option value="message">Message</option>
                              <option value="action">Action</option>
                              <option value="handoff">Handoff</option>
                              <option value="inbox">Inbox</option>
                            </select>
                          </label>
                          <label>
                            <span>Resumo</span>
                            <input value={selectedFlowNode.data.note} onChange={(event) => updateSelectedNode({ note: event.target.value })} />
                          </label>
                          <label>
                            <span>Descricao</span>
                            <textarea value={selectedFlowNode.data.details} onChange={(event) => updateSelectedNode({ details: event.target.value })} />
                          </label>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </section>

                <section className="platform-studio-inspector-section">
                  <button type="button" className="platform-block-toggle" onClick={() => toggleSection("connections")}>
                    <span>{inspectorRuleLabel}</span>
                    <ChevronDown size={16} className={collapsedSections.connections ? "collapsed" : ""} />
                  </button>
                  <AnimatePresence initial={false}>
                    {!collapsedSections.connections ? (
                      <motion.div
                        className="platform-block-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="builder-metrics-editor builder-metrics-editor-stitch">
                          <span>{selectedFlowNode.data.type === "logic" ? "Logic rules" : "Parametros rapidos"}</span>
                          <div className="builder-metrics">
                            {selectedFlowNode.data.metrics.map((metric, index) => (
                              <input
                                key={`${selectedFlowNode.id}-${index}`}
                                className="builder-metric-input"
                                value={metric}
                                onChange={(event) =>
                                  updateSelectedNode({
                                    metrics: selectedFlowNode.data.metrics.map((currentMetric, metricIndex) =>
                                      metricIndex === index ? event.target.value : currentMetric
                                    )
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="builder-edge-list builder-edge-list-stitch">
                          <span>Conexoes do node</span>
                          {connectedEdges.map((edge) => (
                            <div key={edge.id} className="builder-edge-row">
                              <strong>{resolveNodeTitle(edge.source)}</strong>
                              <em>{resolveNodeTitle(edge.target)}</em>
                              <button type="button" onClick={() => disconnectEdge(edge.id)}>remover</button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </section>

                <section className={mobileTab === "queue" ? "platform-studio-inspector-section active-mobile" : "platform-studio-inspector-section"}>
                  <button type="button" className="platform-block-toggle" onClick={() => toggleSection("queue")}>
                    <span>Inbox preview</span>
                    <ChevronDown size={16} className={collapsedSections.queue ? "collapsed" : ""} />
                  </button>
                  <AnimatePresence initial={false}>
                    {!collapsedSections.queue ? (
                      <motion.div
                        className="platform-block-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flow-queue-list flow-queue-list-stitch">
                          {inboxRows.map((row) => (
                            <div className="flow-queue-row" key={row.customer}>
                              <div>
                                <strong>{row.customer}</strong>
                                <span>{row.channel} · {row.topic}</span>
                              </div>
                              <em>{row.status === "Bot qualified" ? "Qualificado" : row.status === "Human handoff" ? "Handoff" : "Em andamento"}</em>
                            </div>
                          ))}
                        </div>

                        <div className="builder-inspector-actions builder-inspector-actions-stitch">
                          <button type="button" className="builder-secondary-action" onClick={duplicateSelectedNode}>
                            <Copy size={16} />
                            Duplicar
                          </button>
                          <button type="button" className="builder-danger-action" onClick={removeSelectedNode}>
                            <Trash2 size={16} />
                            Remover
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </section>
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-mark">
            <img src="/assets/landing/bots-channel-logo.svg" alt="Bots Channel" />
            <strong>Bots Channel</strong>
          </div>
          <p>Chatbots, automacao e atendimento centralizado para operacoes digitais.</p>
        </div>
        <div className="footer-column">
          <span>Produto</span>
          <div className="footer-link-list">
            <a href="/#products">Produtos</a>
            <a href="/#integrations">Integracoes</a>
            <NavLink to="/platform">Platform</NavLink>
          </div>
        </div>
        <div className="footer-column">
          <span>Planos</span>
          <div className="footer-link-list">
            <NavLink to="/plans">Ver planos</NavLink>
            <NavLink to="/plans">Comparativo</NavLink>
            <NavLink to="/contact">Contato</NavLink>
          </div>
        </div>
        <div className="footer-column">
          <span>Equipe</span>
          <div className="footer-link-list">
            <NavLink to="/contact">Lucas</NavLink>
            <NavLink to="/contact">Gabriel</NavLink>
            <NavLink to="/contact">Equipe</NavLink>
          </div>
        </div>
        <div className="footer-cta">
          <span>Precisa de contexto?</span>
          <p>Como o produto foi encerrado, o melhor caminho agora e falar direto com a equipe.</p>
          <div className="footer-actions">
            <NavLink className="secondary-button footer-button" to="/contact">
              Falar com o time
            </NavLink>
            <NavLink className="footer-platform-link" to="/platform">
              <Play size={15} />
              Abrir platform
            </NavLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© Bots Channel</small>
        <div>
          <a href="/#products">Produtos</a>
          <a href="/#integrations">Integracoes</a>
          <NavLink to="/plans">Plans</NavLink>
        </div>
      </div>
    </footer>
  );
}
