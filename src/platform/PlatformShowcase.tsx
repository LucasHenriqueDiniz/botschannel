import { startTransition, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Background,
  BaseEdge,
  Controls,
  getSmoothStepPath,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Activity,
  BarChart3,
  ArrowRight,
  Bell,
  Bot,
  BriefcaseBusiness,
  Cable,
  CheckCircle2,
  Clock3,
  ChevronRight,
  GitBranch,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MoreHorizontal,
  PhoneCall,
  Plus,
  Puzzle,
  Search,
  Settings,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  UsersRound,
  Workflow,
  X,
  Zap
} from "lucide-react";

type BuilderNodeType = "trigger" | "logic" | "message" | "action" | "handoff" | "inbox";

type BuilderNodeData = {
  title: string;
  type: BuilderNodeType;
  note: string;
  details: string;
  inputs: string[];
  outputs: string[];
  proof: string;
  featured?: boolean;
};

type PlatformFlowPreset = {
  key: string;
  title: string;
  subtitle: string;
  summary: string;
  audience: string;
  outcome: string;
  stats: Array<{ label: string; value: string }>;
  channels: Array<{ name: string; detail: string; metric: string }>;
  integrations: Array<{ name: string; detail: string; metric: string }>;
  handoff: Array<{ title: string; detail: string; metric: string }>;
  queue: Array<{ name: string; channel: string; reason: string; status: string }>;
  chapterNotes: {
    overview: string;
    builder: string;
    channels: string;
    integrations: string;
    handoff: string;
  };
  highlightNodeIds: string[];
  nodes: Node<BuilderNodeData>[];
  edges: Edge[];
};

type QueueStatusFilter = "Todos" | "Qualificado" | "Handoff" | "Em andamento" | "Ticket aberto" | "Escalado" | "Respondido" | "Pronto para SDR" | "Follow-up";
type PlatformModal = "automation" | "operation" | "channel" | "publish" | "options" | "notifications" | "period" | "invite" | "workspace" | null;

const teamMembers = [
  {
    id: "camila-rocha",
    name: "Camila Rocha",
    initials: "CR",
    email: "camila@botschannel.com",
    role: "Supervisora de atendimento",
    status: "Online",
    workload: "4 conversas",
    permissions: ["Inbox e handoff", "Automações", "Relatórios", "Gerenciar equipe"]
  },
  {
    id: "marcos-lima",
    name: "Marcos Lima",
    initials: "ML",
    email: "marcos@botschannel.com",
    role: "Agente de suporte",
    status: "Em atendimento",
    workload: "7 conversas",
    permissions: ["Inbox e handoff", "Contatos", "Histórico"]
  },
  {
    id: "julia-martins",
    name: "Júlia Martins",
    initials: "JM",
    email: "julia@botschannel.com",
    role: "SDR",
    status: "Ausente",
    workload: "2 conversas",
    permissions: ["Inbox comercial", "Contatos", "CRM"]
  },
  {
    id: "renato-souza",
    name: "Renato Souza",
    initials: "RS",
    email: "renato@botschannel.com",
    role: "Administrador",
    status: "Online",
    workload: "Visão global",
    permissions: ["Acesso total", "Faturamento", "Segurança", "Gerenciar equipe"]
  }
];

const chapterItems = [
  {
    key: "overview",
    label: "Visão geral",
    question: "O que o platform resolvia no dia a dia?",
    description: "Uma camada operacional para receber conversa, decidir proximo passo e entregar contexto pronto ao time."
  },
  {
    key: "builder",
    label: "Automações",
    question: "Como o time desenhava a lógica do bot?",
    description: "O builder era o núcleo visual: entrada, decisão, resposta, integração e handoff em um mesmo canvas."
  },
  {
    key: "channels",
    label: "Canais",
    question: "De onde as conversas entravam?",
    description: "Os canais caiam no mesmo trilho com origem, contexto e prioridade antes de chegar na fila humana."
  },
  {
    key: "integrations",
    label: "Integrações",
    question: "Para onde o contexto seguia depois do bot?",
    description: "CRM, suporte e alertas recebiam informação pronta para evitar retrabalho no handoff."
  },
  {
    key: "handoff",
    label: "Handoff",
    question: "Como o time assumia a conversa sem perder contexto?",
    description: "A fila humana já recebia resumo, destino e próxima ação em vez de um chat cru."
  }
] as const;

type PlatformSection = (typeof chapterItems)[number]["key"] | "teams";

const builderNodeTone: Record<BuilderNodeType, string> = {
  trigger: "trigger",
  logic: "logic",
  message: "message",
  action: "action",
  handoff: "handoff",
  inbox: "inbox"
};

const typeLabel: Record<BuilderNodeType, string> = {
  trigger: "Entrada",
  logic: "Decisão",
  message: "Mensagem",
  action: "Acao",
  handoff: "Handoff",
  inbox: "Fila"
};

function createLeadFlow(): PlatformFlowPreset {
  const nodes: Node<BuilderNodeData>[] = [
    {
      id: "lead-entry",
      type: "builder",
      position: { x: 40, y: 250 },
      data: {
        title: "Entrada multicanal",
        type: "trigger",
        note: "WhatsApp, site e Instagram",
        details: "O bot recebia a conversa com origem, horário e canal antes de qualquer decisão comercial.",
        inputs: ["Canal de origem", "Primeira mensagem", "Horario de entrada"],
        outputs: ["Canal normalizado", "Contexto inicial", "Sinal de urgência"],
        proof: "Primeira resposta em segundos"
      }
    },
    {
      id: "lead-triage",
      type: "builder",
      position: { x: 320, y: 88 },
      data: {
        title: "Triagem inicial",
        type: "logic",
        note: "Perguntas e tags",
        details: "A plataforma separava pedido de demo, dúvida comercial e suporte antes de gastar tempo humano.",
        inputs: ["Objetivo da conversa", "Segmento", "Urgencia percebida"],
        outputs: ["Tag de assunto", "Score do lead", "Rota sugerida"],
        proof: "Score automatico e regra de prioridade"
      }
    },
    {
      id: "lead-faq",
      type: "builder",
      position: { x: 330, y: 405 },
      data: {
        title: "Respostas guiadas",
        type: "message",
        note: "FAQ e proximos passos",
        details: "Perguntas recorrentes eram respondidas antes do handoff para o time focar no que exigia acao real.",
        inputs: ["Tag de assunto", "Biblioteca de respostas", "Canal"],
        outputs: ["Resposta contextual", "Atalho de acao", "Historico da orientacao"],
        proof: "Menos repeticao na fila"
      }
    },
    {
      id: "lead-crm",
      type: "builder",
      position: { x: 660, y: 88 },
      data: {
        title: "Atualiza CRM",
        type: "action",
        note: "Lead e score sincronizados",
        details: "O contexto ja aterrissava no CRM com interesse, canal e resumo comercial prontos.",
        inputs: ["Score do lead", "Resumo da conversa", "Origem"],
        outputs: ["Lead criado", "Owner sugerido", "Etapa inicial"],
        proof: "Sem copiar e colar contexto"
      }
    },
    {
      id: "lead-human",
      type: "builder",
      position: { x: 705, y: 352 },
      data: {
        title: "Handoff humano",
        type: "handoff",
        note: "Vendas ou suporte",
        details: "Quando o bot detectava oportunidade real, o time assumia com contexto e próxima ação sugerida.",
        inputs: ["Resumo do bot", "Tags", "Canal de origem"],
        outputs: ["Fila correta", "Responsavel", "SLA sugerido"],
        proof: "Resumo pronto no momento certo"
      }
    },
    {
      id: "lead-inbox",
      type: "builder",
      position: { x: 1030, y: 235 },
      data: {
        title: "Inbox central",
        type: "inbox",
        note: "Fila compartilhada",
        details: "A conversa chegava ao operador com trilha da automação, tags e status da oportunidade.",
        inputs: ["Resumo consolidado", "Destino", "Historico"],
        outputs: ["Fila viva", "Handoff registrado", "Owner visivel"],
        proof: "Operação assume do ponto certo"
      }
    }
  ];

  const edges: Edge[] = [
    { id: "lead-e1", source: "lead-entry", target: "lead-triage", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e2", source: "lead-entry", target: "lead-faq", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e3", source: "lead-triage", target: "lead-crm", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e4", source: "lead-triage", target: "lead-human", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e5", source: "lead-faq", target: "lead-human", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e6", source: "lead-crm", target: "lead-inbox", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "lead-e7", source: "lead-human", target: "lead-inbox", markerEnd: { type: MarkerType.ArrowClosed } }
  ];

  return {
    key: "lead-capture",
    title: "Captura de lead",
    subtitle: "Comercial",
    summary: "Fluxo principal para captar demanda, qualificar interesse e entregar contexto comercial sem fricção.",
    audience: "Operação comercial com alto volume de primeira conversa",
    outcome: "Lead entra na fila com score, canal e próxima ação definidos",
    stats: [
      { label: "Canais ativos", value: "3" },
      { label: "Nos do fluxo", value: "6" },
      { label: "Handoff com resumo", value: "100%" }
    ],
    channels: [
      { name: "WhatsApp oficial", detail: "Canal de maior volume, usado para triagem inicial e conversas quentes.", metric: "Entrada mais rápida" },
      { name: "Widget do site", detail: "Capturava lead em contexto de navegacao, planos e pedido de demo.", metric: "Origem comercial clara" },
      { name: "Instagram DM", detail: "Recebia interesse de social sem desmontar o processo comercial.", metric: "Mesmo trilho operacional" }
    ],
    integrations: [
      { name: "HubSpot", detail: "Recebia score, origem e resumo do que o bot ja descobriu.", metric: "CRM alimentado no ato" },
      { name: "Mailchimp", detail: "Continuava a conversa em nutricao quando o timing ainda nao era de vendas.", metric: "Lead nao morre no inbox" },
      { name: "Slack", detail: "Avisava o time quando um lead quente surgia fora do horario padrao.", metric: "Alerta imediato" }
    ],
    handoff: [
      { title: "Fila comercial", detail: "Leads prontos para SDR ou vendas com prioridade clara.", metric: "Score + owner sugerido" },
      { title: "Fila de suporte", detail: "Casos que pareciam comerciais, mas exigiam continuidade operacional.", metric: "Rota sem perder histórico" },
      { title: "Excecoes operacionais", detail: "Conversas ambíguas ou urgentes podiam ganhar tratamento especial.", metric: "SLA sugerido" }
    ],
    queue: [
      { name: "Ana Paula", channel: "WhatsApp", reason: "Pediu comparativo de planos e volume diario", status: "Qualificado" },
      { name: "Rafael Lima", channel: "Site", reason: "Solicitou demo com urgência comercial", status: "Handoff" },
      { name: "Natura Store", channel: "Instagram", reason: "Perguntou sobre integração com CRM", status: "Em andamento" }
    ],
    chapterNotes: {
      overview: "A plataforma fazia triagem e preparava o trabalho do time antes do primeiro handoff.",
      builder: "O builder mostrava a lógica do bot como fluxo visual, sem separar regra de execução em telas diferentes.",
      channels: "Os canais mudavam, mas o tratamento operacional era unificado.",
      integrations: "O valor estava em empurrar contexto pronto, nao apenas disparar webhook.",
      handoff: "O humano recebia conversa tratada, e nao uma transferencia cega."
    },
    highlightNodeIds: ["lead-entry", "lead-triage", "lead-crm", "lead-human", "lead-inbox"],
    nodes,
    edges
  };
}

function createSupportFlow(): PlatformFlowPreset {
  const nodes: Node<BuilderNodeData>[] = [
    {
      id: "support-entry",
      type: "builder",
      position: { x: 55, y: 250 },
      data: {
        title: "Entrada de suporte",
        type: "trigger",
        note: "Widget, email e WhatsApp",
        details: "Solicitacoes entravam com cliente reconhecido e urgencia inicial antes do atendimento humano.",
        inputs: ["Canal", "Cliente", "Primeira descricao"],
        outputs: ["Conta identificada", "Categoria inicial", "Sinal de urgencia"],
        proof: "Menos triagem manual"
      }
    },
    {
      id: "support-triage",
      type: "builder",
      position: { x: 332, y: 110 },
      data: {
        title: "Classifica urgencia",
        type: "logic",
        note: "Prioridade e categoria",
        details: "O bot separava bug, financeiro, acesso e onboarding para reduzir fila errada.",
        inputs: ["Texto do cliente", "Conta", "Canal"],
        outputs: ["Categoria", "Prioridade", "Fila sugerida"],
        proof: "Encaminhamento mais preciso"
      }
    },
    {
      id: "support-answer",
      type: "builder",
      position: { x: 336, y: 388 },
      data: {
        title: "Base de resposta",
        type: "message",
        note: "Macros e orientacao",
        details: "Quando a resposta era conhecida, o bot entregava contexto util antes de escalar o caso.",
        inputs: ["Categoria", "Base de respostas", "Canal"],
        outputs: ["Macro aplicada", "Orientacao enviada", "Historico salvo"],
        proof: "Tempo poupado para o time"
      }
    },
    {
      id: "support-ticket",
      type: "builder",
      position: { x: 680, y: 110 },
      data: {
        title: "Abre ticket",
        type: "action",
        note: "Ticket com resumo",
        details: "O ticket nascia com cliente, prioridade e historico de triagem ja organizados.",
        inputs: ["Categoria", "Resumo do bot", "Conta"],
        outputs: ["Ticket criado", "Aviso interno", "Fila certa"],
        proof: "Sem retrabalho de abertura"
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
        details: "O caso so escalava quando ja havia contexto suficiente para o humano agir.",
        inputs: ["Resumo", "Prioridade", "Historico"],
        outputs: ["Owner", "Fila", "Proxima acao"],
        proof: "Fila mais limpa"
      }
    },
    {
      id: "support-inbox",
      type: "builder",
      position: { x: 1030, y: 235 },
      data: {
        title: "Inbox de suporte",
        type: "inbox",
        note: "Fila priorizada",
        details: "A operacao via a fila consolidada com urgencia e contexto prontos para atendimento.",
        inputs: ["Ticket", "Resumo", "SLA"],
        outputs: ["Fila priorizada", "Owner visivel", "Historico completo"],
        proof: "Handoff orientado por prioridade"
      }
    }
  ];

  const edges: Edge[] = [
    { id: "support-e1", source: "support-entry", target: "support-triage", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e2", source: "support-entry", target: "support-answer", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e3", source: "support-triage", target: "support-ticket", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e4", source: "support-triage", target: "support-human", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e5", source: "support-answer", target: "support-human", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e6", source: "support-ticket", target: "support-inbox", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "support-e7", source: "support-human", target: "support-inbox", markerEnd: { type: MarkerType.ArrowClosed } }
  ];

  return {
    key: "support-triage",
    title: "Triagem de suporte",
    subtitle: "Atendimento",
    summary: "Fluxo desenhado para classificar urgência, responder o que era simples e abrir ticket com contexto.",
    audience: "Operação de suporte com grande variação de assuntos e SLA",
    outcome: "Caso chega ao especialista com ticket, prioridade e histórico já prontos",
    stats: [
      { label: "Entradas conectadas", value: "3" },
      { label: "Categorias tratadas", value: "4" },
      { label: "Fila priorizada", value: "Sim" }
    ],
    channels: [
      { name: "Widget de ajuda", detail: "Recebia incidentes, duvidas de uso e onboarding no proprio produto.", metric: "Contexto de pagina" },
      { name: "WhatsApp de suporte", detail: "Capturava casos urgentes ou operacionais vindos do cliente.", metric: "Canal de excecao" },
      { name: "Email de atendimento", detail: "Entrava no mesmo roteiro para nao criar fila paralela.", metric: "Inbox unificada" }
    ],
    integrations: [
      { name: "Zendesk", detail: "Ticket nascia com resumo e prioridade em vez de um campo vazio.", metric: "Abertura automatizada" },
      { name: "Slack", detail: "Equipe recebia alerta quando um caso sensivel exigia intervencao imediata.", metric: "Escalada operacional" },
      { name: "Base interna", detail: "Macros e orientacoes ajudavam o bot a absorver casos repetidos.", metric: "FAQ operacional" }
    ],
    handoff: [
      { title: "Fila N1", detail: "Casos de uso, acesso e duvida basica iam para operadores generalistas.", metric: "Triagem automatica" },
      { title: "Fila N2", detail: "Bugs e excecoes seguiam para especialistas com mais contexto tecnico.", metric: "Prioridade pronta" },
      { title: "Casos financeiros", detail: "Situacoes sensiveis podiam ser roteadas sem passar pela fila errada.", metric: "Categoria antes do humano" }
    ],
    queue: [
      { name: "Marina C.", channel: "Widget", reason: "Nao consegue acessar conta apos convite", status: "Ticket aberto" },
      { name: "Pedro A.", channel: "WhatsApp", reason: "Erro em integração com CRM", status: "Escalado" },
      { name: "Lia Souza", channel: "Email", reason: "Duvida sobre onboarding e permissao", status: "Respondido" }
    ],
    chapterNotes: {
      overview: "O objetivo era reduzir fila errada e evitar que o especialista tivesse de reabrir contexto do zero.",
      builder: "Regras, macros e handoff conviviam no mesmo fluxo visual.",
      channels: "Canal nao definia a operacao; o contexto definia a rota.",
      integrations: "Ticket e alerta recebiam informacao pronta desde a origem.",
      handoff: "Suporte assumia o caso ja com prioridade, categoria e historico."
    },
    highlightNodeIds: ["support-entry", "support-triage", "support-ticket", "support-human", "support-inbox"],
    nodes,
    edges
  };
}

function createDemoFlow(): PlatformFlowPreset {
  const nodes: Node<BuilderNodeData>[] = [
    {
      id: "demo-entry",
      type: "builder",
      position: { x: 50, y: 250 },
      data: {
        title: "Pedido de demo",
        type: "trigger",
        note: "Site, ads e outbound",
        details: "O interesse entrava de varios pontos e caia no mesmo roteiro de qualificacao comercial.",
        inputs: ["Origem", "Canal", "Mensagem inicial"],
        outputs: ["Origem normalizada", "Contexto inicial", "Lead ativo"],
        proof: "Sem canal paralelo para demo"
      }
    },
    {
      id: "demo-fit",
      type: "builder",
      position: { x: 320, y: 100 },
      data: {
        title: "Valida fit",
        type: "logic",
        note: "ICP e momento",
        details: "O bot entendia tamanho, necessidade e momento antes de gastar energia do SDR.",
        inputs: ["Segmento", "Volume", "Objetivo"],
        outputs: ["Fit comercial", "Score", "Prioridade"],
        proof: "SDR entra mais tarde"
      }
    },
    {
      id: "demo-questions",
      type: "builder",
      position: { x: 338, y: 395 },
      data: {
        title: "Perguntas de contexto",
        type: "message",
        note: "Canais, volume e meta",
        details: "Antes da agenda, o bot puxava as perguntas que ajudavam a tornar a demo util.",
        inputs: ["Volume de atendimento", "Equipe", "Dores"],
        outputs: ["Resumo comercial", "Cenario de uso", "Pauta sugerida"],
        proof: "Demo mais qualificada"
      }
    },
    {
      id: "demo-crm",
      type: "builder",
      position: { x: 675, y: 100 },
      data: {
        title: "Empurra para CRM",
        type: "action",
        note: "Owner e etapa",
        details: "A oportunidade entrava no CRM com owner sugerido e resumo do que o bot ja validou.",
        inputs: ["Resumo", "Score", "Agenda"],
        outputs: ["Owner", "Etapa", "Proxima acao"],
        proof: "Pipeline ja nasce organizado"
      }
    },
    {
      id: "demo-sdr",
      type: "builder",
      position: { x: 702, y: 360 },
      data: {
        title: "SDR assume",
        type: "handoff",
        note: "Contato comercial",
        details: "O SDR entrava quando ja existia sinal de fit, contexto e chance real de reuniao util.",
        inputs: ["Resumo comercial", "Horario", "Canal"],
        outputs: ["Contato humano", "Agendamento", "Follow-up"],
        proof: "Time comercial entra no momento certo"
      }
    },
    {
      id: "demo-inbox",
      type: "builder",
      position: { x: 1030, y: 235 },
      data: {
        title: "Fila comercial",
        type: "inbox",
        note: "Pronto para follow-up",
        details: "A conversa terminava em uma fila com owner, ritmo e pauta de demo praticamente definidos.",
        inputs: ["Owner", "Resumo", "Proxima acao"],
        outputs: ["Fila viva", "Agenda clara", "Historico completo"],
        proof: "Follow-up sem requalificar"
      }
    }
  ];

  const edges: Edge[] = [
    { id: "demo-e1", source: "demo-entry", target: "demo-fit", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e2", source: "demo-entry", target: "demo-questions", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e3", source: "demo-fit", target: "demo-crm", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e4", source: "demo-fit", target: "demo-sdr", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e5", source: "demo-questions", target: "demo-sdr", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e6", source: "demo-crm", target: "demo-inbox", markerEnd: { type: MarkerType.ArrowClosed } },
    { id: "demo-e7", source: "demo-sdr", target: "demo-inbox", markerEnd: { type: MarkerType.ArrowClosed } }
  ];

  return {
    key: "demo-request",
    title: "Pedido de demo",
    subtitle: "Pipeline",
    summary: "Fluxo voltado a validar fit, coletar contexto e entregar um pedido de demo pronto para seguir.",
    audience: "Times de vendas que precisavam qualificar antes de agendar",
    outcome: "Pedido chega ao comercial com fit, resumo e pauta sugerida",
    stats: [
      { label: "Origens tratadas", value: "3" },
      { label: "Etapas visiveis", value: "6" },
      { label: "Agenda com contexto", value: "Sim" }
    ],
    channels: [
      { name: "Formulario do site", detail: "Capturava leads no momento em que a intencao estava mais quente.", metric: "Origem comercial forte" },
      { name: "Campanhas pagas", detail: "UTM e proposta entravam no mesmo fluxo de qualificacao.", metric: "Cenario de aquisicao preservado" },
      { name: "Outbound manual", detail: "Mesmo conversa puxada pelo time podia entrar na mesma estrutura.", metric: "Pipeline coerente" }
    ],
    integrations: [
      { name: "CRM comercial", detail: "Lead ja nascia com etapa, owner e resumo pronto para o SDR.", metric: "Pipeline preconfigurado" },
      { name: "Agenda interna", detail: "Dados coletados pelo bot preparavam a conversa antes da reuniao.", metric: "Demo mais util" },
      { name: "Alertas internos", detail: "O time recebia sinal quando um pedido muito quente precisava acao rapida.", metric: "Reacao mais veloz" }
    ],
    handoff: [
      { title: "SDR", detail: "Assumia apenas os casos com contexto suficiente para conversao real.", metric: "Fit ja validado" },
      { title: "Vendas consultivas", detail: "Leads maiores podiam pular etapas operacionais com resumo pronto.", metric: "Handoff com pauta" },
      { title: "Follow-up automatico", detail: "Pedidos ainda frios continuavam em cadencia sem parar na fila errada.", metric: "Ritmo controlado" }
    ],
    queue: [
      { name: "Include Labs", channel: "Site", reason: "Pediu demo para operação com 200 conversas/dia", status: "Pronto para SDR" },
      { name: "Bruna C.", channel: "Ads", reason: "Quer comparar canais e integração com HubSpot", status: "Qualificado" },
      { name: "Grupo Atlas", channel: "Outbound", reason: "Interesse enterprise e rollout assistido", status: "Follow-up" }
    ],
    chapterNotes: {
      overview: "O fluxo evitava levar para o comercial uma conversa ainda crua.",
      builder: "As etapas ajudavam a separar curiosidade, fit e agenda real.",
      channels: "Origens diferentes continuavam coerentes dentro do mesmo pipeline.",
      integrations: "CRM e agenda eram preenchidos com contexto, nao so com contato bruto.",
      handoff: "A fila comercial recebia uma pauta de conversa, nao um lead opaco."
    },
    highlightNodeIds: ["demo-entry", "demo-fit", "demo-questions", "demo-sdr", "demo-inbox"],
    nodes,
    edges
  };
}

const flowPresets = [createLeadFlow(), createSupportFlow(), createDemoFlow()];

function BuilderFlowNode({ data, selected }: NodeProps<Node<BuilderNodeData>>) {
  const iconMap = {
    trigger: Zap,
    logic: GitBranch,
    message: MessageCircle,
    action: Puzzle,
    handoff: Users,
    inbox: Inbox
  } satisfies Record<BuilderNodeType, typeof Zap>;
  const NodeIcon = iconMap[data.type];
  const classes = [
    "builder-flow-node",
    builderNodeTone[data.type],
    data.featured ? "featured" : "",
    selected ? "selected" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {data.type !== "trigger" ? <Handle className="builder-flow-handle" type="target" position={Position.Left} isConnectable={false} /> : null}
      <div className="builder-flow-node-shell">
        <div className="builder-flow-node-top">
          <div className="builder-flow-node-type">
            <NodeIcon size={14} />
            <span>{typeLabel[data.type]}</span>
          </div>
          {selected ? <b className="builder-node-badge selected">Selecionado</b> : data.featured ? <b className="builder-node-badge">Ativo</b> : null}
        </div>
        <strong>{data.title}</strong>
        <em>{data.note}</em>
      </div>
      {data.type !== "inbox" ? <Handle className="builder-flow-handle" type="source" position={Position.Right} isConnectable={false} /> : null}
    </div>
  );
}

const builderNodeTypes = {
  builder: BuilderFlowNode
};

function AnimatedConnectorEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 18,
    offset: 24
  });
  const active = Boolean(data?.active);

  return (
    <g className={active ? "platform-native-edge active" : "platform-native-edge"}>
      <path className="platform-native-edge-underlay" d={edgePath} />
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} className="platform-native-edge-track" />
      <polygon className="platform-native-edge-particle" points="-6,-4 6,0 -6,4">
        <animateMotion dur={active ? "1.6s" : "2.4s"} repeatCount="indefinite" path={edgePath} rotate="auto" />
      </polygon>
      {active ? (
        <polygon className="platform-native-edge-particle secondary" points="-5,-3.5 5,0 -5,3.5">
          <animateMotion dur="1.6s" begin="-0.8s" repeatCount="indefinite" path={edgePath} rotate="auto" />
        </polygon>
      ) : null}
    </g>
  );
}

const builderEdgeTypes = {
  animatedConnector: AnimatedConnectorEdge
};

function chapterIcon(key: (typeof chapterItems)[number]["key"]) {
  if (key === "overview") return <Sparkles size={16} />;
  if (key === "builder") return <Workflow size={16} />;
  if (key === "channels") return <PhoneCall size={16} />;
  if (key === "integrations") return <Cable size={16} />;
  return <Users size={16} />;
}

function LegacyPlatformShowcase() {
  const [activeFlowKey, setActiveFlowKey] = useState(flowPresets[0].key);
  const [activeChapter, setActiveChapter] = useState<(typeof chapterItems)[number]["key"]>("overview");
  const activePreset = flowPresets.find((item) => item.key === activeFlowKey) ?? flowPresets[0];
  const [selectedNodeId, setSelectedNodeId] = useState(activePreset.highlightNodeIds[1] ?? activePreset.nodes[0].id);
  const [queueFilter, setQueueFilter] = useState<QueueStatusFilter>("Todos");
  const [selectedQueueName, setSelectedQueueName] = useState(activePreset.queue[0]?.name ?? "");

  const selectedNode =
    activePreset.nodes.find((node) => node.id === selectedNodeId) ??
    activePreset.nodes.find((node) => node.id === activePreset.highlightNodeIds[1]) ??
    activePreset.nodes[0];

  const builderNodes = useMemo(
    () =>
      activePreset.nodes.map((node) => ({
        ...node,
        position: {
          x: node.position.x * 0.82,
          y: node.position.y
        },
        selected: node.id === selectedNode.id,
        data: {
          ...node.data,
          featured: activePreset.highlightNodeIds.includes(node.id)
        }
      })),
    [activePreset, selectedNode.id]
  );

  const builderEdges = useMemo(
    () =>
      activePreset.edges.map((edge) => {
        const edgeActive =
          activePreset.highlightNodeIds.includes(edge.source) &&
          activePreset.highlightNodeIds.includes(edge.target);
        return {
          ...edge,
          animated: false,
          type: "smoothstep",
          style: {
            strokeWidth: edgeActive ? 3.2 : 1.6,
            stroke: edgeActive ? "rgba(244, 211, 133, 0.95)" : "rgba(140, 152, 170, 0.3)"
          }
        };
      }),
    [activePreset]
  );

  const activeChapterMeta = chapterItems.find((item) => item.key === activeChapter) ?? chapterItems[0];
  const queueStatusOptions = useMemo<QueueStatusFilter[]>(
    () => ["Todos", ...Array.from(new Set(activePreset.queue.map((item) => item.status))) as QueueStatusFilter[]],
    [activePreset]
  );
  const visibleQueue = useMemo(
    () => activePreset.queue.filter((item) => queueFilter === "Todos" || item.status === queueFilter),
    [activePreset, queueFilter]
  );
  const selectedQueueItem =
    visibleQueue.find((item) => item.name === selectedQueueName) ??
    visibleQueue[0] ??
    activePreset.queue[0];
  const dashboardSignals = [
    {
      title: "Operacao ativa",
      value: activePreset.outcome,
      detail: "Resumo do que este fluxo entrega para o time"
    },
    {
      title: "Node em foco",
      value: selectedNode.data.title,
      detail: selectedNode.data.proof
    },
    {
      title: "Fila visivel",
      value: `${visibleQueue.length} itens`,
      detail: queueFilter === "Todos" ? "Sem filtro de status" : `Filtrada por ${queueFilter}`
    }
  ];

  const selectPreset = (flowKey: string) => {
    const nextPreset = flowPresets.find((item) => item.key === flowKey);
    if (!nextPreset) return;
    startTransition(() => {
      setActiveFlowKey(flowKey);
      setSelectedNodeId(nextPreset.highlightNodeIds[1] ?? nextPreset.nodes[0].id);
      setSelectedQueueName(nextPreset.queue[0]?.name ?? "");
      setQueueFilter("Todos");
    });
  };

  const renderChapterContent = () => {
    if (activeChapter === "overview") {
      return (
        <div className="platform-showcase-card-grid">
          <article className="platform-showcase-info-card hero">
            <span>Leitura executiva</span>
            <strong>{activePreset.summary}</strong>
            <p>{activePreset.chapterNotes.overview}</p>
          </article>
          <article className="platform-showcase-info-card">
            <span>Para quem</span>
            <strong>{activePreset.audience}</strong>
            <p>O foco era organizar a primeira camada de conversa antes do trabalho humano.</p>
          </article>
          <article className="platform-showcase-info-card">
            <span>Resultado esperado</span>
            <strong>{activePreset.outcome}</strong>
            <p>O ganho principal era contexto pronto, e nao apenas automacao visual.</p>
          </article>
        </div>
      );
    }

    if (activeChapter === "builder") {
      const featuredNodes = activePreset.nodes.filter((node) => activePreset.highlightNodeIds.includes(node.id));
      return (
        <div className="platform-showcase-card-grid">
          {featuredNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={node.id === selectedNode.id ? "platform-showcase-info-card clickable active" : "platform-showcase-info-card clickable"}
              onClick={() => setSelectedNodeId(node.id)}
            >
              <span>{typeLabel[node.data.type]}</span>
              <strong>{node.data.title}</strong>
              <p>{node.data.details}</p>
            </button>
          ))}
        </div>
      );
    }

    if (activeChapter === "channels") {
      return (
        <div className="platform-showcase-card-grid">
          {activePreset.channels.map((item) => (
            <article key={item.name} className="platform-showcase-info-card">
              <span>{item.metric}</span>
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      );
    }

    if (activeChapter === "integrations") {
      return (
        <div className="platform-showcase-card-grid">
          {activePreset.integrations.map((item) => (
            <article key={item.name} className="platform-showcase-info-card">
              <span>{item.metric}</span>
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="platform-showcase-card-grid">
        {activePreset.handoff.map((item) => (
          <article key={item.title} className="platform-showcase-info-card">
            <span>{item.metric}</span>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="platform-showcase-page">
      <header className="platform-showcase-hero">
        <div className="platform-showcase-hero-top">
          <NavLink className="platform-showcase-brand" to="/">
            <img src="/assets/platform/bots-channel-logo.svg" alt="Bots Channel" />
            <div>
              <strong>Bots Channel</strong>
              <span>Platform archive showcase</span>
            </div>
          </NavLink>
          <div className="platform-showcase-hero-actions">
            <div className="platform-showcase-live-pill">
              <span />
              Demo ativa
            </div>
            <NavLink className="secondary-button" to="/contact">
              Falar com a equipe
            </NavLink>
          </div>
        </div>

        <div className="platform-showcase-hero-body">
          <div className="platform-showcase-hero-copy">
            <span className="platform-showcase-kicker">Dashboard legado em modo demo</span>
            <h1>Bots Channel Platform</h1>
            <p>
              Showcase funcional do dashboard antigo: fluxo visual, operacao centralizada, handoff com contexto
              e leitura rapida do que acontecia no dia a dia.
            </p>
            <div className="platform-showcase-summary-row">
              <article>
                <span>O que era</span>
                <strong>Um painel para operar conversa, bot e fila humana no mesmo lugar.</strong>
              </article>
              <article>
                <span>Como funcionava</span>
                <strong>Canal entra, builder decide, integracao recebe contexto e o time assume pronto.</strong>
              </article>
            </div>
          </div>
          <div className="platform-showcase-metric-strip">
            {activePreset.stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="platform-showcase-layout">
        <aside className="platform-showcase-rail">
          <section className="platform-showcase-rail-card">
            <span>Capitulos</span>
            <div className="platform-showcase-chapter-list">
              {chapterItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={activeChapter === item.key ? "platform-showcase-chapter active" : "platform-showcase-chapter"}
                  onClick={() => setActiveChapter(item.key)}
                >
                  {chapterIcon(item.key)}
                  <div>
                    <strong>{item.label}</strong>
                    <em>{item.question}</em>
                  </div>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </section>

          <section className="platform-showcase-rail-card">
            <span>Fluxos narrados</span>
            <div className="platform-showcase-preset-list">
              {flowPresets.map((flow) => (
                <button
                  key={flow.key}
                  type="button"
                  className={activeFlowKey === flow.key ? "platform-showcase-preset active" : "platform-showcase-preset"}
                  onClick={() => selectPreset(flow.key)}
                >
                  <strong>{flow.title}</strong>
                  <em>{flow.subtitle}</em>
                  <p>{flow.summary}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="platform-showcase-rail-card">
            <span>Leitura da area</span>
            <strong>{activeChapterMeta.question}</strong>
            <p>{activeChapterMeta.description}</p>
            <div className="platform-showcase-note">
              <ShieldCheck size={16} />
              <p>{activePreset.chapterNotes[activeChapter]}</p>
            </div>
          </section>
        </aside>

        <main className="platform-showcase-main">
          <section className="platform-showcase-dashboard-bar">
            <div className="platform-showcase-dashboard-head">
              <div>
                <span>Painel operacional</span>
                <strong>{activePreset.title}</strong>
              </div>
              <div className="platform-showcase-toolbar">
                <button type="button" className={activeChapter === "overview" ? "active" : ""} onClick={() => setActiveChapter("overview")}>
                  <BarChart3 size={15} />
                  Resumo
                </button>
                <button type="button" className={activeChapter === "builder" ? "active" : ""} onClick={() => setActiveChapter("builder")}>
                  <Workflow size={15} />
                  Builder
                </button>
                <button type="button" className={activeChapter === "handoff" ? "active" : ""} onClick={() => setActiveChapter("handoff")}>
                  <Clock3 size={15} />
                  Handoff
                </button>
              </div>
            </div>
            <div className="platform-showcase-dashboard-grid">
              {dashboardSignals.map((signal) => (
                <article key={signal.title} className="platform-showcase-dashboard-tile">
                  <span>{signal.title}</span>
                  <strong>{signal.value}</strong>
                  <p>{signal.detail}</p>
                </article>
              ))}
            </div>
            <div className="platform-showcase-activity-row">
              <article className="platform-showcase-activity-card">
                <span>Canal dominante</span>
                <strong>{activePreset.channels[0]?.name}</strong>
                <p>{activePreset.channels[0]?.detail}</p>
              </article>
              <article className="platform-showcase-activity-card">
                <span>Integracao central</span>
                <strong>{activePreset.integrations[0]?.name}</strong>
                <p>{activePreset.integrations[0]?.detail}</p>
              </article>
              <article className="platform-showcase-activity-card">
                <span>Fila principal</span>
                <strong>{activePreset.handoff[0]?.title}</strong>
                <p>{activePreset.handoff[0]?.detail}</p>
              </article>
            </div>
          </section>

          <section className="platform-showcase-stage-card">
            <div className="platform-showcase-stage-head">
              <div>
                <span>Canvas central</span>
                <strong>{activePreset.title}</strong>
                <p>{activePreset.summary}</p>
              </div>
              <div className="platform-showcase-stage-tags">
                <b>{activePreset.subtitle}</b>
                <b>{activeChapterMeta.label}</b>
              </div>
            </div>

            <div className="platform-canvas-stage platform-canvas-stage-showcase">
              <div className="builder-canvas-glow builder-canvas-glow-a" />
              <div className="builder-canvas-glow builder-canvas-glow-b" />
              <ReactFlow
                className="flow-reactflow flow-reactflow-showcase"
                nodes={builderNodes}
                edges={builderEdges}
                nodeTypes={builderNodeTypes}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable
                fitView
                fitViewOptions={{ padding: 0.18 }}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                proOptions={{ hideAttribution: true }}
              >
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
            </div>
          </section>

          <section className="platform-showcase-chapter-card">
            <div className="platform-showcase-stage-head compact">
              <div>
                <span>{activeChapterMeta.label}</span>
                <strong>{activeChapterMeta.question}</strong>
              </div>
            </div>
            {renderChapterContent()}
          </section>
        </main>

        <aside className="platform-showcase-inspector">
          <section className="platform-showcase-inspector-card">
            <span>No selecionado</span>
            <strong>{selectedNode.data.title}</strong>
            <p>{selectedNode.data.details}</p>

            <div className="platform-showcase-inspector-block">
              <b>Entradas que ele usa</b>
              <ul>
                {selectedNode.data.inputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="platform-showcase-inspector-block">
              <b>Saidas que ele entrega</b>
              <ul>
                {selectedNode.data.outputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="platform-showcase-proof">
              <Bot size={16} />
              <span>{selectedNode.data.proof}</span>
            </div>
          </section>

          <section className="platform-showcase-inspector-card">
            <span>Preview da fila</span>
            <strong>Como o handoff chegava para o time</strong>
            <div className="platform-showcase-filter-row">
              {queueStatusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={queueFilter === option ? "active" : ""}
                  onClick={() => setQueueFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flow-queue-list">
              {visibleQueue.map((row) => (
                <button
                  type="button"
                  className={selectedQueueItem?.name === row.name ? "flow-queue-row active" : "flow-queue-row"}
                  key={`${row.name}-${row.channel}`}
                  onClick={() => setSelectedQueueName(row.name)}
                >
                  <div>
                    <strong>{row.name}</strong>
                    <span>{row.channel} · {row.reason}</span>
                  </div>
                  <em>{row.status}</em>
                </button>
              ))}
            </div>
            {selectedQueueItem ? (
              <div className="platform-showcase-queue-detail">
                <span>Item em foco</span>
                <strong>{selectedQueueItem.name}</strong>
                <p>{selectedQueueItem.reason}</p>
                <div>
                  <b>{selectedQueueItem.channel}</b>
                  <b>{selectedQueueItem.status}</b>
                </div>
              </div>
            ) : null}
            <NavLink className="platform-inline-link" to="/contact">
              Ver contexto com a equipe
              <ArrowRight size={16} />
            </NavLink>
          </section>

          <section className="platform-showcase-inspector-card accent">
            <span>Ponto central do showcase</span>
            <strong>O valor do platform estava no contexto operacional.</strong>
            <p>
              O builder visual era importante, mas o diferencial era fazer a conversa chegar ao CRM,
              ao ticket ou ao operador com informacao suficiente para agir.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default function PlatformShowcase() {
  const [activeFlowKey, setActiveFlowKey] = useState(flowPresets[0].key);
  const [activeChapter, setActiveChapter] = useState<PlatformSection>("overview");
  const activePreset = flowPresets.find((item) => item.key === activeFlowKey) ?? flowPresets[0];
  const [selectedNodeId, setSelectedNodeId] = useState(activePreset.highlightNodeIds[1] ?? activePreset.nodes[0].id);
  const [queueFilter, setQueueFilter] = useState<QueueStatusFilter>("Todos");
  const [selectedQueueName, setSelectedQueueName] = useState(activePreset.queue[0]?.name ?? "");
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(teamMembers[0].id);
  const [activeModal, setActiveModal] = useState<PlatformModal>(null);

  const selectedNode =
    activePreset.nodes.find((node) => node.id === selectedNodeId) ??
    activePreset.nodes.find((node) => node.id === activePreset.highlightNodeIds[1]) ??
    activePreset.nodes[0];

  const builderNodes = useMemo(
    () =>
      activePreset.nodes.map((node) => ({
        ...node,
        position: {
          x: node.position.x * 0.82,
          y: node.position.y
        },
        selected: node.id === selectedNode.id,
        data: { ...node.data, featured: activePreset.highlightNodeIds.includes(node.id) }
      })),
    [activePreset, selectedNode.id]
  );

  const builderEdges = useMemo(
    () =>
      activePreset.edges.map((edge) => {
        const isActive =
          activePreset.highlightNodeIds.includes(edge.source) &&
          activePreset.highlightNodeIds.includes(edge.target);
        return {
          ...edge,
          animated: false,
          type: "animatedConnector",
          zIndex: 3,
          data: { active: isActive },
          className: isActive ? "platform-flow-edge active" : "platform-flow-edge",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isActive ? "#f6c945" : "#566174",
            width: 18,
            height: 18
          },
          style: { stroke: isActive ? "#f6c945" : "#7b8798" }
        };
      }),
    [activePreset]
  );

  const activeChapterMeta =
    activeChapter === "teams"
      ? {
          key: "teams",
          label: "Equipe",
          question: "Quem opera as conversas e o que cada pessoa pode acessar?",
          description: "Usuários, papéis, permissões e disponibilidade da equipe em uma única área."
        }
      : chapterItems.find((item) => item.key === activeChapter) ?? chapterItems[0];
  const selectedTeamMember =
    teamMembers.find((member) => member.id === selectedTeamMemberId) ?? teamMembers[0];
  const queueStatusOptions = useMemo<QueueStatusFilter[]>(
    () => ["Todos", ...Array.from(new Set(activePreset.queue.map((item) => item.status))) as QueueStatusFilter[]],
    [activePreset]
  );
  const visibleQueue = useMemo(
    () => activePreset.queue.filter((item) => queueFilter === "Todos" || item.status === queueFilter),
    [activePreset, queueFilter]
  );
  const selectedQueueItem =
    visibleQueue.find((item) => item.name === selectedQueueName) ??
    visibleQueue[0] ??
    activePreset.queue[0];
  const activeAgent =
    teamMembers[Math.max(0, activePreset.queue.findIndex((item) => item.name === selectedQueueItem?.name)) % 3] ??
    teamMembers[0];

  const selectPreset = (flowKey: string) => {
    const nextPreset = flowPresets.find((item) => item.key === flowKey);
    if (!nextPreset) return;
    startTransition(() => {
      setActiveFlowKey(flowKey);
      setSelectedNodeId(nextPreset.highlightNodeIds[1] ?? nextPreset.nodes[0].id);
      setSelectedQueueName(nextPreset.queue[0]?.name ?? "");
      setQueueFilter("Todos");
    });
  };

  const renderBuilder = () => (
    <div className="platform-saas-builder-layout">
      <section className="platform-saas-panel platform-saas-canvas-panel">
        <div className="platform-saas-panel-head">
          <div>
            <span>Editor de fluxo</span>
            <strong>{activePreset.title}</strong>
          </div>
          <div className="platform-saas-head-actions">
            <b>Versão 1.8</b>
            <button type="button" aria-label="Mais opções" onClick={() => setActiveModal("options")}><MoreHorizontal size={17} /></button>
            <button type="button" className="primary" onClick={() => setActiveModal("publish")}><CheckCircle2 size={15} /> Publicado</button>
          </div>
        </div>
        <div className="platform-canvas-stage platform-canvas-stage-showcase">
          <ReactFlow
            className="flow-reactflow flow-reactflow-showcase"
            nodes={builderNodes}
            edges={builderEdges}
            nodeTypes={builderNodeTypes}
            edgeTypes={builderEdgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            elevateEdgesOnSelect
            fitView
            fitViewOptions={{ padding: 0.28, minZoom: 0.35, maxZoom: 0.75 }}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="rgba(148, 163, 184, 0.16)" gap={22} size={1} />
            <MiniMap
              pannable
              zoomable
              className="builder-minimap"
              maskColor="rgba(4, 8, 13, 0.62)"
              nodeBorderRadius={5}
              nodeStrokeColor="#101720"
              nodeStrokeWidth={3}
              position="bottom-right"
              nodeColor={(node) => {
                const type = (node.data as BuilderNodeData).type;
                if (type === "trigger") return "#f4d385";
                if (type === "handoff") return "#f38ba8";
                if (type === "action") return "#74a7ff";
                if (type === "inbox") return "#52d6a1";
                return "#7d8597";
              }}
            />
            <svg className="platform-saas-minimap-map" viewBox="0 0 1240 560" aria-hidden="true">
              {activePreset.edges.map((edge) => {
                const source = activePreset.nodes.find((node) => node.id === edge.source);
                const target = activePreset.nodes.find((node) => node.id === edge.target);
                if (!source || !target) return null;
                return (
                  <line
                    key={edge.id}
                    x1={source.position.x + 180}
                    y1={source.position.y + 42}
                    x2={target.position.x}
                    y2={target.position.y + 42}
                  />
                );
              })}
              {activePreset.nodes.map((node) => (
                <g key={node.id} className={node.id === selectedNode.id ? "active" : ""}>
                  <rect x={node.position.x} y={node.position.y} width="180" height="84" rx="12" />
                  <text x={node.position.x + 12} y={node.position.y + 48}>{node.data.title}</text>
                </g>
              ))}
            </svg>
            <div className="platform-saas-minimap-label">
              <span>Mapa do fluxo</span>
              <b>{builderNodes.length} blocos · {builderEdges.length} conexões</b>
            </div>
            <Controls className="flow-controls" showInteractive={false} />
          </ReactFlow>
        </div>
      </section>

      <aside className="platform-saas-panel platform-saas-node-panel">
        <div className="platform-saas-panel-head">
          <div>
            <span>Nó selecionado</span>
            <strong>{selectedNode.data.title}</strong>
          </div>
          <Settings size={17} />
        </div>
        <div className="platform-saas-node-type">
          <Bot size={17} />
          <div>
            <span>{typeLabel[selectedNode.data.type]}</span>
            <strong>{selectedNode.data.proof}</strong>
          </div>
        </div>
        <p className="platform-saas-node-description">{selectedNode.data.details}</p>
        <div className="platform-saas-config-block">
          <span>Dados de entrada</span>
          {selectedNode.data.inputs.map((item) => <b key={item}>{item}</b>)}
        </div>
        <div className="platform-saas-config-block">
          <span>Saídas configuradas</span>
          {selectedNode.data.outputs.map((item) => <b key={item}>{item}</b>)}
        </div>
        <div className="platform-saas-health">
          <CheckCircle2 size={17} />
          <div><strong>Configuração válida</strong><span>Última execução há 2 min</span></div>
        </div>
      </aside>
    </div>
  );

  const renderInbox = () => (
    <section className="platform-saas-panel platform-saas-inbox">
      <div className="platform-saas-panel-head">
        <div>
          <span>Caixa de entrada compartilhada</span>
          <strong>Conversas aguardando atendimento</strong>
        </div>
        <div className="platform-showcase-filter-row">
          {queueStatusOptions.map((option) => (
            <button key={option} type="button" className={queueFilter === option ? "active" : ""} onClick={() => setQueueFilter(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="platform-saas-inbox-grid">
        <div className="platform-saas-conversation-list">
          {visibleQueue.map((row, index) => (
            <button
              type="button"
              className={selectedQueueItem?.name === row.name ? "active" : ""}
              key={`${row.name}-${row.channel}`}
              onClick={() => setSelectedQueueName(row.name)}
            >
              <span className="platform-saas-avatar">{row.name.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>{row.name}</strong>
                <p>{row.reason}</p>
                <span>{row.channel} · há {index + 2} min</span>
              </div>
              <em>{row.status}</em>
            </button>
          ))}
        </div>
        {selectedQueueItem ? (
          <div className="platform-saas-conversation">
            <div className="platform-saas-conversation-head">
              <div><strong>{selectedQueueItem.name}</strong><span>{selectedQueueItem.channel} · online agora</span></div>
              <button type="button" aria-label="Ações da conversa" onClick={() => setActiveModal("options")}><MoreHorizontal size={18} /></button>
            </div>
            <div className="platform-saas-attendant">
              <span className="platform-saas-avatar">{activeAgent.initials}</span>
              <div>
                <span>Sendo atendido por</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTeamMemberId(activeAgent.id);
                    setActiveChapter("teams");
                  }}
                >
                  {activeAgent.name}
                  <ArrowRight size={14} />
                </button>
              </div>
              <b><i /> Em atendimento</b>
            </div>
            <div className="platform-saas-chat">
              <p className="incoming">Olá, preciso de ajuda. {selectedQueueItem.reason}.</p>
              <p className="bot">Entendi. Já organizei seu contexto e encaminhei para o time responsável.</p>
              <div className="platform-saas-handoff-card">
                <span>Resumo automático</span>
                <strong>{selectedQueueItem.reason}</strong>
                <div><b>{selectedQueueItem.channel}</b><b>{selectedQueueItem.status}</b></div>
              </div>
            </div>
            <div className="platform-saas-compose">
              <span>Responder como operador...</span>
              <button type="button" aria-label="Enviar resposta"><Send size={16} /></button>
            </div>
          </div>
        ) : null}
        <aside className="platform-saas-contact">
          <span>Contexto do contato</span>
          <div className="platform-saas-contact-avatar">{selectedQueueItem?.name.slice(0, 2).toUpperCase()}</div>
          <strong>{selectedQueueItem?.name}</strong>
          <p>{selectedQueueItem?.reason}</p>
          <dl>
            <div><dt>Canal</dt><dd>{selectedQueueItem?.channel}</dd></div>
            <div><dt>Status</dt><dd>{selectedQueueItem?.status}</dd></div>
            <div><dt>Responsável</dt><dd>Fila {activePreset.subtitle}</dd></div>
            <div><dt>SLA</dt><dd>12 minutos</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );

  const renderCatalog = () => {
    const items = activeChapter === "channels" ? activePreset.channels : activePreset.integrations;
    return (
      <section className="platform-saas-panel platform-saas-catalog">
        <div className="platform-saas-panel-head">
          <div>
            <span>{activeChapterMeta.label}</span>
            <strong>{activeChapter === "channels" ? "Canais conectados" : "Integrações da operação"}</strong>
          </div>
          <button type="button" className="platform-saas-add" onClick={() => setActiveModal("channel")}><Plus size={16} /> Adicionar</button>
        </div>
        <div className="platform-saas-catalog-grid">
          {items.map((item, index) => (
            <article key={item.name}>
              <div className="platform-saas-catalog-icon">
                {activeChapter === "channels" ? <MessageCircle size={20} /> : <Cable size={20} />}
              </div>
              <div><span>{index === 0 ? "Principal" : "Ativo"}</span><strong>{item.name}</strong><p>{item.detail}</p></div>
              <b><CheckCircle2 size={14} /> {item.metric}</b>
            </article>
          ))}
        </div>
        <div className="platform-saas-log">
          <div><Activity size={17} /><strong>Atividade recente</strong></div>
          {items.map((item, index) => (
            <p key={item.name}><span>{String(10 - index).padStart(2, "0")}:2{index}</span><b>{item.name}</b> sincronização concluída sem erros</p>
          ))}
        </div>
      </section>
    );
  };

  const renderTeams = () => (
    <div className="platform-saas-team-layout">
      <section className="platform-saas-panel platform-saas-team-list">
        <div className="platform-saas-panel-head">
          <div><span>Usuários do workspace</span><strong>{teamMembers.length} membros ativos</strong></div>
          <button type="button" className="platform-saas-add" onClick={() => setActiveModal("invite")}><UserPlus size={16} /> Convidar usuário</button>
        </div>
        <div className="platform-saas-team-table-head">
          <span>Usuário</span><span>Função</span><span>Status</span><span>Carga atual</span>
        </div>
        {teamMembers.map((member) => (
          <button
            type="button"
            key={member.id}
            className={selectedTeamMember.id === member.id ? "active" : ""}
            onClick={() => setSelectedTeamMemberId(member.id)}
          >
            <span className="platform-saas-team-avatar">{member.initials}</span>
            <div><strong>{member.name}</strong><em>{member.email}</em></div>
            <span>{member.role}</span>
            <b className={member.status === "Ausente" ? "away" : ""}><i /> {member.status}</b>
            <span>{member.workload}</span>
          </button>
        ))}
      </section>

      <aside className="platform-saas-panel platform-saas-member-detail">
        <div className="platform-saas-panel-head">
          <div><span>Perfil do usuário</span><strong>Detalhes e permissões</strong></div>
          <button type="button" aria-label="Opções do usuário" onClick={() => setActiveModal("options")}><MoreHorizontal size={17} /></button>
        </div>
        <div className="platform-saas-member-profile">
          <span>{selectedTeamMember.initials}</span>
          <strong>{selectedTeamMember.name}</strong>
          <p>{selectedTeamMember.role}</p>
          <b><i /> {selectedTeamMember.status}</b>
        </div>
        <div className="platform-saas-member-meta">
          <div><Mail size={15} /><span><b>E-mail</b>{selectedTeamMember.email}</span></div>
          <div><UsersRound size={15} /><span><b>Equipe</b>{activePreset.subtitle}</span></div>
          <div><KeyRound size={15} /><span><b>Último acesso</b>Hoje, 10:42</span></div>
        </div>
        <div className="platform-saas-permissions">
          <div><span>Permissões</span><button type="button" onClick={() => setActiveModal("options")}>Editar</button></div>
          {["Inbox e handoff", "Automações", "Relatórios", "Contatos", "Gerenciar equipe"].map((permission) => {
            const enabled =
              selectedTeamMember.permissions.includes(permission) ||
              selectedTeamMember.permissions.includes("Acesso total");
            return (
              <label key={permission}>
                <span><Shield size={14} /> {permission}</span>
                <input type="checkbox" checked={enabled} readOnly />
                <i />
              </label>
            );
          })}
        </div>
      </aside>
    </div>
  );

  const modalContent: Record<Exclude<PlatformModal, null>, { eyebrow: string; title: string; description: string }> = {
    automation: {
      eyebrow: "Nova automação",
      title: "Criar fluxo automatizado",
      description: "Escolha um modelo, defina o canal de entrada e configure a primeira ação do fluxo."
    },
    operation: {
      eyebrow: "Nova operação",
      title: "Adicionar operação ao workspace",
      description: "Operações separam fluxos, filas, métricas e responsáveis por objetivo de negócio."
    },
    channel: {
      eyebrow: activeChapter === "channels" ? "Novo canal" : "Nova integração",
      title: activeChapter === "channels" ? "Conectar canal de atendimento" : "Conectar sistema externo",
      description: "Selecione o provedor e configure as credenciais para iniciar a sincronização."
    },
    publish: {
      eyebrow: "Versão publicada",
      title: "Fluxo ativo em produção",
      description: "A versão 1.8 está publicada em três canais e processou 1.284 conversas hoje."
    },
    options: {
      eyebrow: "Configurações",
      title: "Opções avançadas",
      description: "Duplicar, arquivar, transferir propriedade ou revisar o histórico de alterações."
    },
    notifications: {
      eyebrow: "Central de notificações",
      title: "3 atualizações pendentes",
      description: "Novo handoff comercial, alerta de SLA e sincronização concluída com o CRM."
    },
    period: {
      eyebrow: "Período do relatório",
      title: "Filtrar dados operacionais",
      description: "Compare volume, resolução e tempo de resposta em um intervalo personalizado."
    },
    invite: {
      eyebrow: "Gerenciar equipe",
      title: "Convidar novo usuário",
      description: "Defina o e-mail, a função e as permissões iniciais para o novo membro."
    },
    workspace: {
      eyebrow: "Workspace atual",
      title: "Bots Channel",
      description: "Conta principal com três operações, cinco canais conectados e quatro membros ativos."
    }
  };

  const renderModal = () => {
    if (!activeModal) return null;
    const content = modalContent[activeModal];
    const isInvite = activeModal === "invite";
    const isAutomation = activeModal === "automation";
    const isChannel = activeModal === "channel";
    return (
      <div className="platform-saas-modal-backdrop" role="presentation" onMouseDown={() => setActiveModal(null)}>
        <section className="platform-saas-modal" role="dialog" aria-modal="true" aria-label={content.title} onMouseDown={(event) => event.stopPropagation()}>
          <div className="platform-saas-modal-head">
            <div><span>{content.eyebrow}</span><strong>{content.title}</strong></div>
            <button type="button" aria-label="Fechar modal" onClick={() => setActiveModal(null)}><X size={18} /></button>
          </div>
          <p>{content.description}</p>
          {isInvite ? (
            <div className="platform-saas-modal-form">
              <label><span>E-mail corporativo</span><input value="novo.usuario@empresa.com" readOnly /></label>
              <label><span>Função</span><div className="platform-saas-fake-select">Agente de atendimento <ChevronRight size={15} /></div></label>
              <div className="platform-saas-modal-permissions">
                <span>Permissões iniciais</span>
                <label><input type="checkbox" checked readOnly /> Inbox e handoff</label>
                <label><input type="checkbox" checked readOnly /> Contatos e histórico</label>
                <label><input type="checkbox" readOnly /> Gerenciar automações</label>
              </div>
            </div>
          ) : isAutomation ? (
            <div className="platform-saas-modal-options">
              {["Captura e qualificação", "Suporte e triagem", "Agendamento comercial"].map((item, index) => (
                <button type="button" className={index === 0 ? "active" : ""} key={item}><Workflow size={18} /><span><strong>{item}</strong><em>Modelo pronto para personalizar</em></span></button>
              ))}
            </div>
          ) : isChannel ? (
            <div className="platform-saas-modal-options grid">
              {["WhatsApp", "Instagram", "Widget do site", "HubSpot"].map((item) => (
                <button type="button" key={item}><MessageCircle size={18} /><span><strong>{item}</strong><em>Configuração disponível</em></span></button>
              ))}
            </div>
          ) : (
            <div className="platform-saas-modal-summary">
              <div><CheckCircle2 size={18} /><span><strong>Status operacional</strong><em>Nenhuma ação necessária agora</em></span></div>
              <div><Clock3 size={18} /><span><strong>Última atualização</strong><em>Hoje, há 2 minutos</em></span></div>
              <div><ShieldCheck size={18} /><span><strong>Permissões verificadas</strong><em>Administrador do workspace</em></span></div>
            </div>
          )}
          <div className="platform-saas-modal-actions">
            <button type="button" onClick={() => setActiveModal(null)}>Cancelar</button>
            <button type="button" className="primary" onClick={() => setActiveModal(null)}>
              {activeModal === "publish" ? "Fechar" : "Continuar"}
            </button>
          </div>
        </section>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="platform-saas-overview">
      <section className="platform-saas-kpis">
        <article><span>Conversas hoje</span><strong>1.284</strong><b>+18,4% esta semana</b><BarChart3 size={20} /></article>
        <article><span>Resolvidas pelo bot</span><strong>74,2%</strong><b>953 conversas</b><Bot size={20} /></article>
        <article><span>Tempo de resposta</span><strong>8s</strong><b>meta abaixo de 15s</b><Clock3 size={20} /></article>
        <article><span>Handoffs pendentes</span><strong>{activePreset.queue.length}</strong><b>fila dentro do SLA</b><Inbox size={20} /></article>
      </section>

      <div className="platform-saas-overview-grid">
        <section className="platform-saas-panel platform-saas-performance">
          <div className="platform-saas-panel-head">
            <div><span>Volume de atendimento</span><strong>Conversas nos últimos 7 dias</strong></div>
            <b>Todos os canais</b>
          </div>
          <div className="platform-saas-chart">
            {[42, 63, 52, 78, 68, 91, 76].map((height, index) => (
              <div key={height + index}><span style={{ height: `${height}%` }} /><b>{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][index]}</b></div>
            ))}
          </div>
        </section>

        <section className="platform-saas-panel platform-saas-operation-health">
          <div className="platform-saas-panel-head">
            <div><span>Saúde da operação</span><strong>Sistemas conectados</strong></div>
            <span className="platform-saas-online">Operacional</span>
          </div>
          {activePreset.channels.map((channel, index) => (
            <div className="platform-saas-health-row" key={channel.name}>
              <span><CheckCircle2 size={15} /></span>
              <div><strong>{channel.name}</strong><p>{channel.metric}</p></div>
              <b>{index === 0 ? "99,9%" : "Ativo"}</b>
            </div>
          ))}
        </section>
      </div>

      <div className="platform-saas-overview-grid lower">
        <section className="platform-saas-panel platform-saas-automation-preview">
          <div className="platform-saas-panel-head">
            <div><span>Automação em destaque</span><strong>{activePreset.title}</strong></div>
            <button type="button" onClick={() => setActiveChapter("builder")}>Abrir builder <ArrowRight size={15} /></button>
          </div>
          <div className="platform-saas-flow-track">
            {activePreset.nodes.slice(0, 5).map((node, index) => (
              <button type="button" key={node.id} onClick={() => { setSelectedNodeId(node.id); setActiveChapter("builder"); }}>
                <span>{index + 1}</span><strong>{node.data.title}</strong><em>{typeLabel[node.data.type]}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="platform-saas-panel platform-saas-recent">
          <div className="platform-saas-panel-head">
            <div><span>Fila em tempo real</span><strong>Últimos handoffs</strong></div>
            <button type="button" onClick={() => setActiveChapter("handoff")}>Ver inbox</button>
          </div>
          {activePreset.queue.map((row) => (
            <button type="button" key={row.name} onClick={() => { setSelectedQueueName(row.name); setActiveChapter("handoff"); }}>
              <span className="platform-saas-avatar">{row.name.slice(0, 2).toUpperCase()}</span>
              <div><strong>{row.name}</strong><p>{row.channel} · {row.reason}</p></div>
              <em>{row.status}</em>
            </button>
          ))}
        </section>
      </div>
    </div>
  );

  const renderWorkspace = () => {
    if (activeChapter === "builder") return renderBuilder();
    if (activeChapter === "handoff") return renderInbox();
    if (activeChapter === "teams") return renderTeams();
    if (activeChapter === "channels" || activeChapter === "integrations") return renderCatalog();
    return renderOverview();
  };

  return (
    <div className="platform-saas">
      <aside className="platform-saas-sidebar">
        <NavLink className="platform-saas-logo" to="/">
          <img src="/assets/platform/bots-channel-logo.svg" alt="Bots Channel" />
          <div><strong>Bots Channel</strong><span>Platform</span></div>
        </NavLink>

        <div className="platform-saas-workspace">
          <span>Workspace</span>
          <button type="button" onClick={() => setActiveModal("workspace")}>
            <b>BC</b><div><strong>Bots Channel</strong><em>Conta principal</em></div><ChevronRight size={15} />
          </button>
        </div>

        <nav className="platform-saas-nav">
          <span>Operação</span>
          {chapterItems.map((item) => (
            <button key={item.key} type="button" className={activeChapter === item.key ? "active" : ""} onClick={() => setActiveChapter(item.key)}>
              {item.key === "overview" ? <LayoutDashboard size={17} /> : chapterIcon(item.key)}
              <strong>{item.label}</strong>
              {item.key === "handoff" ? <b>{activePreset.queue.length}</b> : null}
            </button>
          ))}
          <button type="button" className={activeChapter === "teams" ? "active" : ""} onClick={() => setActiveChapter("teams")}>
            <UsersRound size={17} />
            <strong>Equipe</strong>
            <b>{teamMembers.length}</b>
          </button>
        </nav>

        <div className="platform-saas-flows">
          <div><span>Operações</span><button type="button" aria-label="Nova operação" onClick={() => setActiveModal("operation")}><Plus size={14} /></button></div>
          {flowPresets.map((flow) => (
            <button key={flow.key} type="button" className={activeFlowKey === flow.key ? "active" : ""} onClick={() => selectPreset(flow.key)}>
              <span /><div><strong>{flow.title}</strong><em>{flow.subtitle}</em></div>
            </button>
          ))}
        </div>

        <div className="platform-saas-sidebar-foot">
          <div><CheckCircle2 size={16} /><span><strong>Todos os sistemas</strong><em>Operacionais</em></span></div>
          <NavLink to="/contact"><span>LC</span><div><strong>Lucas</strong><em>Administrador</em></div><Settings size={15} /></NavLink>
        </div>
      </aside>

      <div className="platform-saas-shell">
        <header className="platform-saas-topbar">
          <div className="platform-saas-breadcrumb">
            <span>{activeChapterMeta.label}</span><ChevronRight size={14} /><strong>{activePreset.title}</strong>
          </div>
          <label className="platform-saas-search">
            <Search size={16} />
            <input aria-label="Buscar no dashboard" placeholder="Buscar conversas, fluxos ou contatos..." />
            <kbd>⌘ K</kbd>
          </label>
          <div className="platform-saas-top-actions">
            <button type="button" aria-label="Notificações" onClick={() => setActiveModal("notifications")}><Bell size={18} /><b>3</b></button>
            <NavLink to="/contact">Falar com a equipe</NavLink>
          </div>
        </header>

        <main className="platform-saas-content">
          <div className="platform-saas-page-head">
            <div>
              <span>{activePreset.subtitle} · operação ativa</span>
              <h1>{activeChapterMeta.label}</h1>
              <p>{activeChapter === "overview" ? activePreset.summary : activeChapterMeta.description}</p>
            </div>
            <div className="platform-saas-page-actions">
              <button type="button" onClick={() => setActiveModal("period")}><Clock3 size={15} /> Últimos 7 dias</button>
              <button type="button" className="primary" onClick={() => setActiveModal("automation")}><Plus size={15} /> Nova automação</button>
            </div>
          </div>
          {renderWorkspace()}
        </main>
      </div>
      {renderModal()}
    </div>
  );
}
