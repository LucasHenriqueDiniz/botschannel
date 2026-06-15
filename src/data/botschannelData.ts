export const navigationItems = [
  { label: "Produtos", href: "/#products" },
  { label: "Integracoes", href: "/#integrations" },
  { label: "Planos", href: "/plans" },
  { label: "Platform", href: "/platform" }
];

export const heroStats = [
  { value: "24/7", label: "atendimento inicial" },
  { value: "3 canais", label: "web, social e chat" },
  { value: "1 painel", label: "para operar conversas" }
];

export const conversationCards = [
  {
    key: "engage",
    title: "Engajar",
    text: "Mensagem inicial no canal onde o cliente chegou.",
    trigger: "Website widget"
  },
  {
    key: "nurture",
    title: "Nutrir",
    text: "Contexto e opcoes para manter a conversa viva.",
    trigger: "Resposta guiada"
  },
  {
    key: "qualify",
    title: "Qualificar",
    text: "Volume, canal, objetivo e urgencia do lead.",
    trigger: "Lead scoring"
  },
  {
    key: "convert",
    title: "Converter",
    text: "Resumo pronto para o time comercial assumir.",
    trigger: "Sales handoff"
  }
];

export const conversationMetrics = [
  { label: "Lead capturado", value: "R$ 18.4k" },
  { label: "Tempo ate triagem", value: "42s" },
  { label: "Handoff humano", value: "18%" }
];

export const chatScenarios = {
  engage: {
    contact: "Natura Store",
    channel: "Website widget",
    intent: "Novo lead",
    owner: "Bot",
    score: "82",
    messages: [
      { id: "engage-1", sender: "Bot", text: "Ola! Vi que voce esta olhando os planos para atendimento. Posso te ajudar a escolher?", side: "bot" },
      { id: "engage-2", sender: "Visitor", text: "Quero entender se isso funciona com WhatsApp e site.", side: "user" },
      { id: "engage-3", sender: "Bot", text: "Funciona nos dois. Voce quer capturar leads, suporte ou acompanhar pedidos?", side: "bot" }
    ]
  },
  nurture: {
    contact: "Rafael Lima",
    channel: "WhatsApp",
    intent: "Comparando opcoes",
    owner: "Bot",
    score: "76",
    messages: [
      { id: "nurture-1", sender: "Bot", text: "Pelo seu volume, o melhor comeco e automatizar perguntas frequentes e separar leads quentes.", side: "bot" },
      { id: "nurture-2", sender: "Visitor", text: "Hoje meu time responde tudo manualmente.", side: "user" },
      { id: "nurture-3", sender: "Bot", text: "Entendi. Posso montar um fluxo com triagem inicial, tags de interesse e handoff para vendas.", side: "bot" }
    ]
  },
  qualify: {
    contact: "Ana Paula",
    channel: "Instagram",
    intent: "Qualificacao",
    owner: "Bot + Sales",
    score: "91",
    messages: [
      { id: "qualify-1", sender: "Bot", text: "Qual canal recebe mais mensagens hoje?", side: "bot" },
      { id: "qualify-2", sender: "Visitor", text: "WhatsApp. Sao umas 200 conversas por dia.", side: "user" },
      { id: "qualify-3", sender: "Bot", text: "Volume alto. Vou marcar como lead prioritario e enviar resumo para o comercial.", side: "bot" }
    ]
  },
  convert: {
    contact: "Include Labs",
    channel: "Website widget",
    intent: "Solicitou demo",
    owner: "Sales",
    score: "96",
    messages: [
      { id: "convert-1", sender: "Bot", text: "Tenho as informacoes iniciais. Posso agendar uma demo com o time?", side: "bot" },
      { id: "convert-2", sender: "Visitor", text: "Pode ser amanha de tarde.", side: "user" },
      { id: "convert-3", sender: "Bot", text: "Perfeito. Vou transferir para vendas com canal, volume e objetivo da conversa.", side: "bot" }
    ]
  }
};

export const automationNodes = [
  {
    key: "engage",
    title: "Entrada",
    label: "Detecta canal e saudacao",
    meta: "WhatsApp, site, Instagram"
  },
  {
    key: "nurture",
    title: "Contexto",
    label: "Responde e oferece caminho",
    meta: "FAQ, produtos, planos"
  },
  {
    key: "qualify",
    title: "Qualificacao",
    label: "Coleta dados comerciais",
    meta: "Volume, segmento, urgencia"
  },
  {
    key: "convert",
    title: "Handoff",
    label: "Entrega para vendas",
    meta: "Resumo + score + owner"
  }
];

export const channelTypes = ["WhatsApp", "Website", "Instagram", "Messenger"];

export const useCases = [
  {
    title: "Suporte ao Cliente",
    points: [
      "Resolva perguntas comuns com um agente virtual",
      "Crie tickets de suporte",
      "Transfira conversas para agentes ao vivo"
    ]
  },
  {
    title: "Vendas",
    points: [
      "Inicialize conversas proativamente",
      "Colete leads e passe para o CRM",
      "Eduque clientes sobre produtos e servicos"
    ]
  },
  {
    title: "Marketing",
    points: [
      "Qualifique e segmente leads",
      "Crie ofertas personalizadas",
      "Agende reunioes e follow-ups"
    ]
  }
];

export const integrationTools = [
  {
    key: "whatsapp",
    name: "WhatsApp",
    shortName: "WA",
    description: "Capta demanda, responde rapido e envia contexto para o time.",
    support: "Recebe mensagens, aplica triagem inicial e envia a conversa com tags para o inbox central.",
    tone: "orange"
  },
  {
    key: "instagram",
    name: "Instagram",
    shortName: "IG",
    description: "Agrupa direct, comentarios e respostas em uma so operacao.",
    support: "Centraliza direct e comentarios para o time responder sem trocar de canal o tempo todo.",
    tone: "blue"
  },
  {
    key: "mailchimp",
    name: "Mailchimp",
    shortName: "MC",
    description: "Leads qualificados podem seguir para jornadas e campanhas segmentadas.",
    support: "Empurra contato, interesse e etapa da conversa para nutricao e automacoes de email.",
    tone: "green"
  },
  {
    key: "hubspot",
    name: "HubSpot",
    shortName: "HS",
    description: "Entrega score, resumo comercial e proximo passo no mesmo handoff.",
    support: "Cria ou atualiza lead no CRM com score, origem e resumo pronto para vendas assumir.",
    tone: "green"
  },
  {
    key: "zendesk",
    name: "Zendesk",
    shortName: "ZD",
    description: "Abre ticket, anexa historico da conversa e roteia por fila.",
    support: "Transforma atendimento em ticket com prioridade, dono e historico da conversa anexado.",
    tone: "slate"
  },
  {
    key: "slack",
    name: "Slack",
    shortName: "SL",
    description: "Notifica o time quando uma conversa precisa de acao humana.",
    support: "Dispara alerta em canal interno quando o bot detecta urgencia, venda quente ou falha de fluxo.",
    tone: "slate"
  }
];

export const plans = [
  {
    tier: "Entrada",
    title: "Free",
    price: "R$0",
    period: "/mes",
    subtitle: "Para testar um primeiro fluxo.",
    highlight: "Comece sem atrito",
    cta: "Testar agora",
    note: "Melhor para validar o canal antes de estruturar o time.",
    featured: false,
    features: ["1 chatbot", "Widget web", "Historico basico"]
  },
  {
    tier: "Operacao",
    title: "Starter",
    price: "R$229",
    period: "/mes",
    subtitle: "Para pequenos times comerciais.",
    highlight: "Primeiro time em producao",
    cta: "Escolher Starter",
    note: "Equilibra automacao, inbox compartilhado e integracoes essenciais.",
    featured: false,
    features: ["3 chatbots", "Roteamento simples", "Integracoes essenciais"]
  },
  {
    tier: "Escala",
    title: "Professional",
    price: "R$688",
    period: "/mes",
    subtitle: "Para operacoes com mais canais.",
    highlight: "Plano mais procurado",
    cta: "Falar com vendas",
    note: "Pensado para times que precisam de mais governanca e leitura da operacao.",
    featured: true,
    features: ["Fluxos avancados", "Times e permissoes", "Analytics"]
  },
  {
    tier: "Enterprise",
    title: "Business",
    price: "Custom",
    period: "",
    subtitle: "Para empresas com rollout dedicado.",
    highlight: "Rollout assistido",
    cta: "Montar proposta",
    note: "Inclui implantacao acompanhada, governanca e suporte prioritario.",
    featured: false,
    features: ["Onboarding", "Governanca", "Suporte prioritario"]
  }
];

export const planComparisonRows = [
  {
    feature: "Chatbots ativos",
    free: "1",
    starter: "5",
    professional: "Ilimitado",
    business: "Ilimitado"
  },
  {
    feature: "Mensagens por mes",
    free: "500",
    starter: "1.000",
    professional: "5.000",
    business: "Personalizado"
  },
  {
    feature: "Instagram e Telegram",
    free: "Nao",
    starter: "Sim",
    professional: "Sim",
    business: "Sim"
  },
  {
    feature: "Integracoes personalizadas",
    free: "Nao",
    starter: "Nao",
    professional: "Sim",
    business: "Sim"
  },
  {
    feature: "Analytics avancado",
    free: "Basico",
    starter: "Padrao",
    professional: "Completo",
    business: "Completo"
  }
];

export const platformMenu = [
  {
    group: "Dashboard",
    items: ["Monitoring", "Analytics", "Reports"]
  },
  {
    group: "Interactions",
    items: ["Chats", "Templates", "Tickets"]
  },
  {
    group: "ChatBot",
    items: ["Studio", "Bots", "Platforms", "Integrations"]
  },
  {
    group: "Admin",
    items: ["Team", "Config"]
  }
];

export const platformStats = [
  { label: "Open chats", value: "184", change: "+12%" },
  { label: "Bot resolution", value: "63%", change: "+8%" },
  { label: "Avg. response", value: "4m 18s", change: "-21%" },
  { label: "Active flows", value: "27", change: "+3" }
];

export const teamRows = [
  { team: "Sales", owner: "Lucas H.", members: 12, status: "Active" },
  { team: "Support", owner: "Marina C.", members: 18, status: "Active" },
  { team: "Marketing", owner: "Pedro A.", members: 8, status: "Setup" }
];

export const inboxRows = [
  { customer: "Ana Paula", channel: "WhatsApp", topic: "Planos", status: "Bot qualified" },
  { customer: "Rafael Lima", channel: "Website", topic: "Demo", status: "Human handoff" },
  { customer: "Natura Store", channel: "Instagram", topic: "Integracao", status: "In progress" }
];
