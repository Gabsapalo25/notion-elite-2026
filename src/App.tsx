import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Brain, Target, Sparkles, Zap, Play, ArrowRight,
  Check, ChevronDown, ChevronUp, Star, MessageCircle,
  ExternalLink, Menu, X, Shield, Send, CheckCircle2,
  Crown, Eye, Activity, Coins, Flame,
  Quote, Lock, Copy
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// IMPORTAÇÃO DO CHATBOT
// ═══════════════════════════════════════════════════════════
import SalesChatBot from './components/ui/SalesChatBot';

// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorTitle: "Estrategista & Especialista em Gestão de Sistemas de Informação",
  authorBio: "Campeão Nacional Absoluto de Xadrez de Angola 2024.",
  
  authorPhoto: "/images/Gabriel_Sapalo_kp0dhm.png",
  productLogo: "/images/Logotipo_Notion_Elite_2026_kiwhgx.png",
  glowscaleLogo: "/images/Logotipo_da_Glowscalepro_fusgtw.png",
  
  notionMockup: "/images/MOCKUP_NOTION_FINAL_1_zc7jj0.png",
  antesDepoisMockup: "/images/Mockup_2_antes_e_depois_nr6xmh.png",
  mockupExtra1: "/images/Imagem_interna_do_notion_20260507_jutslr.png",
  mockupExtra2: "/images/Mockup_3_antes_e_depois_varhb4.png",
  internalView: "/images/MOCKUP_NOTION_FINAL_1_zc7jj0.png",
  
  laptopOffer: "/images/Laptop_e_preço_de_224_usd_cortado_t8cyvj.png",
  productHero: "/images/Notion_Elite_Starter_Kit_2026_20260528_1_lo4ytu.png",
  productIntro: "/images/notion_elite_starter_Kit_Intro_1_gh5aaa.png",
  productDashboard: "/images/notion_elite_starter_Kit_Dashboard_1_ooj75k.png",
  productGestorProjeto: "/images/notion_elite_starter_Kit_Gestor_de_Projecto_1_gxg4ev.png",
  productGestorFinanceiro: "/images/notion_elite_starter_Kit_Gestor_Financeiro_1_z1ztb3.png",
  productCerebroDigital: "/images/notion_elite_starter_Kit_Cérebro_digital.png",
  productExamesProvas: "/images/notion_elite_starter_Kit_Exames_e_Provas_1_bxhic1.png",
  productHabitTracker: "/images/notion_elite_starter_Kit_Habit_Tracker_1_hb4xtx.png",
  
  fideProof: "/images/Campeonato_Nacional_Absoluto_2024_FIDE_results.png",
  
  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  videoDemonstracaoReal: "https://www.youtube.com/embed/qfKGywfh05A",
  
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappSupport: "https://wa.me/244923379486?text=Ol%C3%A1%20Gabriel%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Notion%20Elite%20Kit",
  communityLink: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  telegramSupport: "https://t.me/+n_hkEVYAeO9lNDIx",
  supportEmail: "suporte@glowscalepro.com",
  paymentEmail: "glowscalepro@gmail.com",
  expressPhone: "+244 923 379 486",
  expressName: "Gabriel António Armando Sapalo",
  termsOfUse: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyPolicy: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
  cookiePolicy: "https://drive.google.com/file/d/1owleKJFrC-MVOjMx7BKMuuqrhroSZqY1/view",
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxOso56CGBKX22B9z22WQN8gx6E5rEvdsEfWpMnLZCnEc8fcOLuqvYqHCasfDap6YHs/exec",
  kitDriveLink: "https://drive.google.com/file/d/1xu-vl4n1iVouFHXTv8Dbhj_H2V3AGSXz/view?usp=sharing",
};

// ═══════════════════════════════════════════════════════════
// TESTEMUNHOS
// ═══════════════════════════════════════════════════════════
const TESTIMONIALS = [
  { 
    name: "Tomás Ferreira", 
    role: "Dupla Licenciatura", 
    location: "Porto, Portugal", 
    avatar: "/images/Tomás_Ferreira_-Porto_-_Portugal_goriez.png", 
    text: "Mano, nem eu acredito. Faço dupla licenciatura e ainda trabalho num café. Antes vivia em pânico, a dormir 4 horas por noite e a apagar incêndios todos os dias. Agora sento-me 10 minutos ao domingo, planeio a semana toda, e já não penso mais nisso até domingo seguinte. Isto devolveu-me a vida.", 
    metric: "10 min/sem" 
  },
  { 
    name: "Mariana Costa", 
    role: "Estudante Universitária", 
    location: "Lisboa, Portugal", 
    avatar: "/images/Mariana_-_Lisboa_Portugal_uerhir.png", 
    text: "Média de 12 para 15 em dois meses — e sem estudar mais horas, só melhor. O cérebro digital tirou-me aquele peso constante de ter apontamentos perdidos por todo o lado. Sinto que finalmente tenho o controlo de volta.", 
    metric: "12 → 15" 
  },
  { 
    name: "Ana Luísa Mendes", 
    role: "Gestora de Projetos", 
    location: "Luanda, Angola", 
    avatar: "/images/Ana_Luisa_-_Luanda_Angola_vae6mt.png", 
    text: "Já usei uma dezena de sistemas de produtividade. Nenhum aguentava a minha rotina real. Este aguenta. As matrizes relacionais e os atalhos de base de dados funcionam sem qualquer latência, mesmo em dias cheios. É um verdadeiro cockpit de comando, não um brinquedo bonito.", 
    metric: "0 latência" 
  },
  { 
    name: "João Pedro Silva", 
    role: "Profissional & Estudante", 
    location: "São Paulo, Brasil", 
    avatar: "/images/João_Pedro_-_São_Paulo_-_Brasil_inzjna.png", 
    text: "Trabalhar e estudar ao mesmo tempo estava a consumir-me por dentro. Este setup devolveu-me 2 horas por dia — tempo que hoje uso para dormir, treinar, respirar. Pagou-se a si mesmo logo no primeiro dia.", 
    metric: "2h/dia" 
  },
  { 
    name: "Sofia Rodrigues", 
    role: "Mestranda e Pesquisadora", 
    location: "Coimbra, Portugal", 
    avatar: "/images/Sofia_Rodrigues_-_Coimbra_-Portugal_tlbepm.png", 
    text: "Adeus 17 separadores abertos e notas soltas em cinco apps diferentes. Setup concluído numa tarde, zero atrito, execução imediata. Sinceramente? É God Mode para quem escreve tese.", 
    metric: "17 abas → 1 sistema" 
  },
  { 
    name: "Beatriz Mendonça", 
    role: "Consultora Júnior", 
    location: "Maputo, Moçambique", 
    avatar: "/images/Beatriz_Mendoça_-_Maputo_Moçambique_qjsbtm.png", 
    text: "A verdade dói: ou montas um ecossistema que trabalha por ti, ou continuas a perder prazos e a mentir a ti mesma sobre 'amanhã eu organizo-me'. A metodologia de 24h obrigou-me a executar, sem desculpas nem adiamentos.", 
    metric: "Setup em 4h" 
  }
];

// ═══════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════
const FAQ_DATA = [
  { 
    q: "Nunca usei o Notion. Consigo usar este kit?", 
    a: "Sim — e é exactamente para isso que o kit foi feito. Não precisas de saber absolutamente nada de Notion antes de começar: o vídeo de setup guiado leva-te pela mão, passo a passo, até teres tudo a funcionar em menos de 24 horas. Milhares de pessoas que nunca tinham aberto o Notion na vida usam hoje este sistema todos os dias." 
  },
  { 
    q: "Funciona bem em telemóvel e com internet lenta?", 
    a: "Sim, sem excepções. O sistema foi construído e testado para funcionar bem mesmo com ligações instáveis, em qualquer telemóvel. Consultas os teus prazos e tarefas onde quer que estejas — mesmo sem wifi por perto." 
  },
  { 
    q: "Preciso pagar mensalidade ao Notion?", 
    a: "Não, nunca. A versão gratuita do Notion é mais do que suficiente para correr o sistema inteiro. Pagas uma única vez pelo kit — e mais nada, para sempre." 
  },
  { 
    q: "Quanto tempo demora o setup?", 
    a: "A maioria das pessoas termina entre 3 a 6 horas, seguindo o vídeo passo a passo. Já vimos pessoas sem qualquer experiência prévia terminar tudo num único domingo à tarde." 
  },
  { 
    q: "É só para estudantes ou também serve para profissionais e professores?", 
    a: "Serve perfeitamente para os três — e é usado hoje por estudantes, profissionais e também professores que gerem turmas, avaliações e materiais ao mesmo tempo. Tens módulos separados para a vida académica e para os projetos pessoais ou profissionais, sem nunca misturares as informações." 
  },
  { 
    q: "E se não gostar? Posso pedir reembolso?", 
    a: "Claro. Tens 30 dias de garantia total. Se sentires que, por qualquer razão, não é para ti, devolvemos-te 100% do valor — sem perguntas, sem complicações, sem letras pequenas." 
  },
  { 
    q: "Como funciona o pagamento?", 
    a: "Escolhes a tua opção no checkout e recebes de imediato os dados para transferência ou pagamento com cartão. Assim que confirmamos o pagamento, o kit chega ao teu email automaticamente, em poucos minutos." 
  }
];

// ═══════════════════════════════════════════════════════════
// CONTAGEM DE PROVA SOCIAL
// ═══════════════════════════════════════════════════════════
const SOCIAL_PROOF_COUNT = 3247;

const FEATURE_FLAGS = {
  enableActivityNotifications: false,
};

// ═══════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════
type HeroContent = {
  tag: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  badge: string;
};

// ═══════════════════════════════════════════════════════════
// CONTEÚDO DO HERO — SISTEMA VITALÍCIO ADAPTATIVO
// ═══════════════════════════════════════════════════════════
const getHeroContent = (): HeroContent => {
  try {
    const now = new Date();
    const month = now.getMonth();
    const params = new URLSearchParams(window.location.search);
    const campaign = params.get("utm_campaign") || "";

    if (campaign.startsWith("angola")) {
      return {
        tag: "🇦🇴 Feito para estudantes angolanos que recusam ficar para trás",
        headline: "Julho de 2026. A época de exames já começou a apertar o cerco.",
        headlineHighlight: "A pergunta é: vais entrar preparado — ou vais improvisar mais uma vez e torcer para dar certo?",
        subtitle: "Imagina abrir o telemóvel e veres, num único ecrã, tudo o que precisas de estudar hoje, os prazos que se aproximam e as revisões já organizadas por prioridade. Sem procurar. Sem adivinhar. Sem pânico às 23h da véspera. O Notion Elite Kit já transformou mais de 3.247 estudantes sobrecarregados em estudantes que entram em cada exame sabendo exactamente o que fazer. Configuras tudo em menos de 24 horas — e nunca mais voltas ao caos.",
        badge: "⚡ Setup em 24h · +3.247 estudantes já mudaram de vida"
      };
    }

    if (month === 0 || month === 1) {
      return {
        tag: "🎯 Início de Ano — o Momento em Que Tudo se Decide",
        headline: "Janeiro de 2026. Fizeste as promessas do costume.",
        headlineHighlight: "A questão é: este ano vais mesmo cumpri-las — ou vais deixar o caos vencer outra vez, como sempre?",
        subtitle: "Sabes bem como a história acaba se nada mudar: as boas intenções de Janeiro dissolvem-se em Março, e em Junho estás outra vez a apagar incêndios. Desta vez pode ser diferente. Um sistema silencioso, no fundo do teu telemóvel, que organiza o calendário, as tarefas, os prazos e as revisões por ti — para que o teu foco vá apenas para uma coisa: avançar. Isto é o Notion Elite Kit. E está prestes a mudar o teu ano inteiro.",
        badge: "⚡ Setup em 24h · +3.247 estudantes já mudaram de vida"
      };
    } 
    else if (month >= 2 && month <= 4) {
      return {
        tag: "⚠️ Estamos a Meio do Semestre",
        headline: "Estamos a meio do semestre.",
        headlineHighlight: "E o caos já bateu à tua porta, não foi?",
        subtitle: "Trabalhos empilhados, provas a aproximarem-se sem aviso, e aquela sensação incómoda de estar sempre um passo atrás. Não é falta de capacidade — é falta de sistema. O Notion Elite Kit devolve-te o controlo em poucas horas: organiza tudo num único lugar e mostra-te exactamente por onde começar amanhã de manhã.",
        badge: "⚡ Recupera o foco em 24h · +3.247 estudantes já mudaram de vida"
      };
    } 
    else if (month >= 5 && month <= 7) {
      return {
        tag: "🔥 Época de Exames — o Momento Que Decide o Semestre",
        headline: "Julho de 2026. Os exames já não estão a chegar — estão à tua porta.",
        headlineHighlight: "A única pergunta que importa agora: vais entrar preparado, ou vais improvisar mais uma vez?",
        subtitle: "Este é o momento mais importante do teu semestre — e não há tempo para tentativa e erro. O Notion Elite Kit organiza as tuas revisões, os teus prazos e as tuas provas com uma clareza que só quem já usou entende de facto. Milhares de estudantes lusófonos já trocaram o pânico da véspera pela confiança de saber exactamente o que estudar, quando e porquê.",
        badge: "⚡ Ideal para exames · +3.247 estudantes já mudaram de vida"
      };
    } 
    else if (month === 8 || month === 9) {
      return {
        tag: "🌱 Novo Ciclo — a Página Está em Branco",
        headline: "Setembro de 2026. Um novo ciclo começa — e a folha está em branco.",
        headlineHighlight: "A pergunta não é se vais repetir os erros do semestre passado. É: vais deixar?",
        subtitle: "Tens agora, neste exacto momento, a oportunidade mais barata de todas: implementar o sistema antes de o caos voltar a instalar-se. O Notion Elite Kit prepara-te para um semestre onde organizas tudo em minutos, não em noites perdidas.",
        badge: "⚡ Recomeço organizado · +3.247 estudantes já mudaram de vida"
      };
    } 
    else {
      return {
        tag: "📊 Fecho de Ano — a Hora da Verdade",
        headline: "Novembro de 2026. Antes de fechares o ano, responde a uma pergunta.",
        headlineHighlight: "O que fizeste realmente com este semestre — e o que queres que seja diferente no próximo?",
        subtitle: "Antes de virares a página, organiza tudo o que ainda está solto. O Notion Elite Kit ajuda-te a fazer um balanço honesto do ano e a entrar no próximo já com vantagem sobre quem vai continuar a improvisar.",
        badge: "⚡ Fecho estratégico · +3.247 estudantes já mudaram de vida"
      };
    }
  } catch {
    return {
      tag: "Para Estudantes e Profissionais Lusófonos",
      headline: "Cansado de viver a apagar incêndios académicos?",
      headlineHighlight: "Tens um segundo cérebro à tua espera — e ele já ajudou mais de 3.247 pessoas como tu.",
      subtitle: "O Notion Elite Kit 2026 organiza toda a tua vida académica e profissional num só lugar, para deixares de reagir ao caos e começares a controlá-lo.",
      badge: "⚡ Setup em 24h · +3.247 estudantes já mudaram de vida"
    };
  }
};

// ═══════════════════════════════════════════════════════════
// FUNÇÃO PARA DETETAR CAMPANHA ANGOLA
// ═══════════════════════════════════════════════════════════
function isAngolaCampaign(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign = params.get("utm_campaign") || "";
    const source = params.get("utm_source") || "";
    return campaign.startsWith("angola") || source === "angola";
  } catch {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════
// DADOS ESTÁTICOS
// ═══════════════════════════════════════════════════════════
const MANIFESTO_PHRASES = [
  "Clareza é poder.",
  "O caos custa futuros.",
  "Disciplina que se vê.",
  "Organizados vencem."
];

const BONUSES = [
  { title: "Comunidade Elite Minds 2026", desc: "O lugar onde estudantes sérios se apoiam uns aos outros: desafios semanais, estratégias partilhadas e alguém sempre pronto a responder-te.", value: 97 },
  { title: "Hub de Prompts de IA (20+)", desc: "Mais de 20 prompts já testados que resumem matéria, criam planos de estudo e poupam-te horas inteiras de trabalho manual.", value: 67 },
  { title: "Atualizações Vitalícias 2026/2027", desc: "O sistema evolui — e tu evoluis com ele, sem pagar mais nada, para sempre. Acesso perpétuo, sem surpresas.", value: 120 },
  { title: "Setup Guiado em 24h", desc: "Um vídeo, passo a passo, que te leva pela mão até teres tudo pronto — mesmo que nunca tenhas aberto o Notion na vida.", value: 57 }
];

const NOTIFICATIONS_POOL = [
  { name: "Lucas R.", item: "Ativou o sistema" },
  { name: "Marta S.", item: "Reset organizacional" },
  { name: "Tiago M.", item: "Ativou o sistema" },
  { name: "Inês P.", item: "Entrou para Elite" },
  { name: "Rui C.", item: "Ativou o sistema" },
  { name: "Ana F.", item: "Comprou o Kit" },
  { name: "Carlos M.", item: "Reset organizacional" },
  { name: "Fernanda L.", item: "Ativou o sistema" },
  { name: "José A.", item: "Entrou na Comunidade" },
  { name: "Paula S.", item: "Comprou o Kit" },
  { name: "Miguel R.", item: "Ativou o sistema" },
  { name: "Sara T.", item: "Reset organizacional" }
];

const shuffled = [...NOTIFICATIONS_POOL];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

const NOTIFICATIONS = shuffled.map((n, index) => ({
  ...n,
  time: `${index === 0 ? 1 : index * 4 + 2} min`
}));

// ═══════════════════════════════════════════════════════════
// TELEMETRIA
// ═══════════════════════════════════════════════════════════
const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmKeys.forEach(k => {
        if (urlParams.has(k)) localStorage.setItem(`ne_${k}`, urlParams.get(k) || "");
      });

      const payload: Record<string, unknown> = {
        action: eventAction,
        ts: new Date().toISOString(),
        ...metadata
      };
      utmKeys.forEach(k => { payload[k] = localStorage.getItem(`ne_${k}`) || ""; });

      const stack = JSON.parse(localStorage.getItem("ne_stack") || "[]");
      stack.push(payload);
      if (stack.length > 50) stack.shift();
      localStorage.setItem("ne_stack", JSON.stringify(stack));

      if (typeof (window as any).trackEvent === "function") {
        (window as any).trackEvent(eventAction, { ...metadata });
      }
    } catch { /* silencioso */ }
  }
};

// ═══════════════════════════════════════════════════════════
// PÁGINA DE CHECKOUT ANGOLA
// ═══════════════════════════════════════════════════════════
const AngolaCheckoutPage = memo(() => {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateRef = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `ELITE-${num}`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setLoading(true);

    const clientRef = generateRef();
    setRef(clientRef);

    try {
      await fetch(CONFIG.appsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          ref: clientRef,
          name: name.trim(),
          email: email.trim(),
          date: new Date().toISOString()
        })
      });
    } catch {
      Telemetry.emit("lead_registration_failed", { ref: clientRef });
    }

    Telemetry.emit("Lead", {
      content_name: "Notion Elite OS 2026 — Angola",
      currency: "AOA",
      value: 10000
    });

    setLoading(false);
    setStep("payment");
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (step === "form") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={CONFIG.productLogo} alt="Elite OS" className="w-14 h-14 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-bold text-white mb-2">Falta um passo. Vamos ativar o teu acesso.</h1>
            <p className="text-sm text-[#A1A1AA]">Preenche os dados abaixo e recebe já as instruções de pagamento</p>
          </div>

          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="O teu nome"
                className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-base placeholder-[#555] outline-none focus:border-[#D4AF37]/40 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider block mb-2">Email (para receber o kit)</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="teu@email.com"
                className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-base placeholder-[#555] outline-none focus:border-[#D4AF37]/40 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !name.trim() || !email.trim()}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] text-base"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Ver os dados de pagamento agora
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-[#A1A1AA] mt-4">🔒 Os teus dados são usados apenas para entregar o teu acesso</p>
        </div>
      </div>
    );
  }

  const expressDetails = [
    { label: "Multicaixa Express", value: CONFIG.expressPhone, key: "express_phone" },
    { label: "Titular", value: CONFIG.expressName, key: "express_titular" },
    { label: "Valor", value: "10.000 AKZ", key: "valor" },
    { label: "Referência", value: ref, key: "ref" }
  ];

  const bankDetails = [
    { label: "Banco", value: "BAI", key: "banco" },
    { label: "Titular", value: "Gabriel António Armando Sapalo", key: "titular" },
    { label: "IBAN", value: "AO06 0040 0000 1859 5631 1019 4", key: "iban" },
    { label: "Valor", value: "10.000 AKZ", key: "valor" },
    { label: "Referência", value: ref, key: "ref" }
  ];

  const marqueeTexts = [
    "✦ Menos que uma saída ao fim de semana",
    "✦ Mais que um semestre inteiro de clareza",
    "✦ Clareza é poder",
    "✦ O caos custa caro",
    "✦ 30 dias de garantia incondicional"
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="overflow-hidden mb-4 py-2 bg-[#0A0A0A]/50 rounded-xl border border-[#D4AF37]/20">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
            style={{ width: "fit-content" }}
          >
            {[...marqueeTexts, ...marqueeTexts].map((text, idx) => (
              <span key={idx} className="text-sm font-mono text-[#D4AF37] tracking-wide mx-4 shrink-0">
                {text} <span className="text-white/30 mx-1">♟</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Estás a um passo de mudar o teu semestre</h1>
          <p className="text-sm text-[#A1A1AA]">Transfere o valor e envia-nos o comprovativo — o resto tratamos nós</p>
        </div>

        <div className="bg-[#141414] border-2 border-[#00E5FF] rounded-2xl p-5 mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300">
          <div className="text-center mb-3 pb-2 border-b border-[#00E5FF]/30">
            <span className="text-[11px] font-mono text-[#00E5FF] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <span>⚡</span> Multicaixa Express <span className="text-[#25D366] text-[9px] bg-[#25D366]/10 px-2 py-0.5 rounded-full">RECOMENDADO</span>
            </span>
          </div>
          
          {expressDetails.map((d) => (
            <div key={d.key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-xs text-[#A1A1AA] font-mono">{d.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-mono font-bold ${d.key === "ref" ? "text-[#00E5FF]" : d.key === "valor" ? "text-[#25D366]" : "text-white"}`}>{d.value}</span>
                <button onClick={() => copy(d.value, d.key)} className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">
                  {copied === d.key ? <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> : <span className="text-[10px] border border-white/20 rounded px-1.5 py-0.5 font-mono">copiar</span>}
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-3 pt-2 text-center border-t border-[#00E5FF]/20">
            <span className="text-[9px] font-mono text-[#25D366] flex items-center justify-center gap-1">✅ Pagamento imediato, sem esperas bancárias</span>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-4 mb-4">
          <div className="text-center mb-2 pb-2 border-b border-white/[0.05]">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">🏦 Transferência IBAN</span>
          </div>
          
          {bankDetails.map((d) => (
            <div key={d.key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-xs text-[#A1A1AA] font-mono">{d.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-mono font-bold ${d.key === "ref" ? "text-[#00E5FF]" : d.key === "valor" ? "text-[#25D366]" : "text-white"}`}>{d.value}</span>
                <button onClick={() => copy(d.value, d.key)} className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">
                  {copied === d.key ? <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> : <span className="text-[10px] border border-white/20 rounded px-1.5 py-0.5 font-mono">copiar</span>}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-2xl p-5 mb-4">
          <p className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-3 font-bold">📧 Após a transferência</p>
          <p className="text-sm text-white mb-3">Envia o comprovativo por email para:</p>
          <div className="flex items-center justify-between bg-[#1A1A1A] rounded-xl px-4 py-3 border border-white/[0.06]">
            <span className="text-sm font-mono text-[#00E5FF] font-bold">{CONFIG.paymentEmail}</span>
            <button onClick={() => copy(CONFIG.paymentEmail, "email2")} className="text-[10px] border border-white/20 rounded px-1.5 py-0.5 font-mono text-[#A1A1AA] hover:text-white">
              {copied === "email2" ? "✓" : "copiar"}
            </button>
          </div>

          <div className="mt-3 p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl">
            <p className="text-xs text-[#D4AF37] font-mono font-bold mb-1">⚠️ Assunto do email obrigatório:</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-white font-bold">{ref}</span>
              <button onClick={() => copy(ref, "ref2")} className="text-[10px] border border-white/20 rounded px-1.5 py-0.5 font-mono text-[#A1A1AA] hover:text-white">
                {copied === "ref2" ? "✓" : "copiar"}
              </button>
            </div>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-3 leading-relaxed">O assunto com a tua referência permite ao sistema identificar o teu pagamento e entregar o kit automaticamente.</p>
        </div>

        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5 mb-4">
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">O que acontece a seguir</p>
          <div className="space-y-3">
            {[
              { t: "Agora", d: "Transferes 10.000 AKZ via Multicaixa Express ou IBAN", c: "#25D366" },
              { t: "2 minutos", d: `Envias o comprovativo para ${CONFIG.paymentEmail} com assunto ${ref} — kit entregue automaticamente em menos de 10 min. WhatsApp +244 923 379 486 também disponível.`, c: "#00E5FF" },
              { t: "Até 10 min", d: "Recebes o link do kit no teu email em menos de 10 minutos", c: "#D4AF37" }
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.c }} />
                <div>
                  <span className="text-xs font-mono font-bold" style={{ color: s.c }}>{s.t}</span>
                  <p className="text-xs text-[#A1A1AA]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            <strong className="text-white">Garantia 30 dias.</strong> Se não ficares satisfeito, devolvemos 100% do teu dinheiro. Sem perguntas.
          </p>
        </div>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// PÁGINA DE AGRADECIMENTO
// ═══════════════════════════════════════════════════════════
const ThankYouPage = memo(() => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const seg = urlParams.get("seg");
    const ref = urlParams.get("ref");
    const raw = sessionStorage.getItem("ne_conversion");

    const firedKey = `ne_purchase_fired_${ref || seg || "unknown"}`;
    if (sessionStorage.getItem(firedKey)) return;

    if (!raw && seg === "angola") {
      if (!ref) return;

      const convData = {
        value: 10000,
        currency: "AOA",
        content_name: "Notion Elite OS 2026",
        transaction_id: ref,
      };

      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "purchase", {
          transaction_id: convData.transaction_id,
          value: convData.value,
          currency: convData.currency,
          items: [{ item_name: convData.content_name, price: convData.value, quantity: 1 }]
        });
      }
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Purchase", {
          value: convData.value,
          currency: convData.currency,
          content_name: convData.content_name,
          content_type: "product"
        });
      }
      sessionStorage.setItem(firedKey, "1");
      Telemetry.emit("purchase_confirmed", { segment: "angola", ...convData });
      return;
    }

    if (!raw) return;
    try {
      const conv = JSON.parse(raw);
      sessionStorage.removeItem("ne_conversion");

      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "purchase", {
          transaction_id: conv.transaction_id || `ne_${Date.now()}`,
          value: conv.value,
          currency: conv.currency,
          items: [{ item_name: conv.content_name, price: conv.value, quantity: 1 }]
        });
      }
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Purchase", {
          value: conv.value,
          currency: conv.currency,
          content_name: conv.content_name,
          content_type: "product"
        });
      }
      sessionStorage.setItem(firedKey, "1");
      Telemetry.emit("purchase_confirmed", {
        value: conv.value,
        currency: conv.currency,
        segment: conv.segment
      });
    } catch { /* silencioso */ }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
      </div>
      <img src={CONFIG.productLogo} alt="Elite OS" className="w-12 h-12 object-contain mb-4" />
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Acesso confirmado!</h1>
      <p className="text-[#A1A1AA] max-w-md mb-2 leading-relaxed">Bem-vindo à Elite. O teu sistema já está a caminho do teu email.</p>
      <p className="text-xs text-[#A1A1AA] mb-8">Verifica também a pasta de spam.</p>

      <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-5 max-w-sm w-full text-left mb-6">
        <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-3 font-bold">Primeiro passo</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          Abre o kit e vai à <strong className="text-white">Página 36</strong> — lá encontras o link de duplicação do sistema e todos os bónus.
        </p>
      </div>

      <a href={CONFIG.communityLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] mb-4">
        <MessageCircle className="w-5 h-5 fill-white" />
        Entrar na Comunidade Elite Minds
      </a>

      <p className="text-xs text-[#A1A1AA]">Dúvidas? <a href={`mailto:${CONFIG.supportEmail}`} className="text-[#00E5FF] hover:underline">{CONFIG.supportEmail}</a></p>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// CABEÇALHO
// ═══════════════════════════════════════════════════════════
const Header = memo(({ onCTA }: { onCTA: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "header-glass py-3" : "bg-[#050505] py-4"}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      
      <div className="bg-[#080808] border-b border-white/[0.06] overflow-hidden">
        <div className="marquee-track py-2.5" style={{ animation: "marqueeScroll 20s linear infinite" }}>
          {[
            "⚡ ÚLTIMAS VAGAS · Preço especial — sobe em breve",
            "🔥 Founder Batch 01 · Oferta limitada",
            "⚡ Estudantes como tu já garantiram o acesso — e tu?",
            "♟ Clareza é poder · O caos custa caro",
          ].map((text, i) => {
            return (
              <span key={i} className="text-[11px] font-mono text-[#FF007A] font-semibold tracking-wide shrink-0 px-8 whitespace-nowrap">
                {text}
              </span>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between mt-3">
        <a href="/" className="flex items-center gap-3 group">
          <img src={CONFIG.productLogo} alt="Elite OS" className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-[13px] text-white tracking-tight">Notion Elite OS</span>
            <span className="text-[9.5px] font-mono text-[#D4AF37] tracking-widest uppercase">Founder 2026</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#A1A1AA]">
          <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
          <a href="#caos" className="hover:text-white transition-colors">O Problema</a>
          <a href="#pilares" className="hover:text-white transition-colors">O Sistema</a>
          <a href="#bonus" className="hover:text-white transition-colors">Bónus</a>
          <a href="#provas" className="hover:text-white transition-colors">Elite Minds</a>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => { Telemetry.emit("header_cta"); onCTA(); }} className="btn-founder-gold text-xs px-4 py-2 rounded-md flex items-center gap-1.5 cursor-pointer animate-pulse-gold">
            <span>Founder Batch 01 · Oferta Especial</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#A1A1AA] hover:text-white p-1.5 outline-none">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/[0.06] bg-[#080808] mt-3 px-6 py-5 space-y-4 text-xs overflow-hidden">
            <a href="#manifesto" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Manifesto</a>
            <a href="#caos" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Problema</a>
            <a href="#pilares" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Sistema</a>
            <a href="#bonus" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Bónus</a>
            <a href="#provas" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Elite Minds</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

// ═══════════════════════════════════════════════════════════
// BOTÕES CTA (COMPONENTE REUTILIZÁVEL COM CTAS DUPLOS)
// ═══════════════════════════════════════════════════════════
const CTAButtons = memo(({ onConvert, size = "lg", variant = "default" }: {
  onConvert: (seg: "international" | "angola") => void;
  size?: "sm" | "lg";
  variant?: "default" | "gold" | "green";
}) => {
  const angola = isAngolaCampaign();
  const py = size === "sm" ? "py-3 px-4 text-sm" : "py-4 text-base sm:text-lg";

  const getMainButtonStyle = () => {
    if (variant === "gold") {
      return "bg-gradient-to-r from-[#D4AF37] to-[#F4D77A] text-black hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)]";
    }
    if (variant === "green") {
      return "bg-gradient-to-r from-[#25D366] to-[#1EBE5A] text-white hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)]";
    }
    return "bg-gradient-to-r from-[#25D366] to-[#1EBE5A] text-white hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)]";
  };

  return (
    <div className="w-full space-y-3">
      <button 
        onClick={() => onConvert(angola ? "angola" : "international")}
        className={`w-full ${getMainButtonStyle()} font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] ${py}`}
      >
        {angola ? (
          <>
            <MessageCircle className="w-5 h-5 fill-current" />
            Angola · 10.000 AKZ — Ativar Agora
          </>
        ) : (
          <>
            <Crown className="w-5 h-5" />
            Sim, quero o meu sistema agora — $10
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      
      <button 
        onClick={() => onConvert(angola ? "international" : "angola")}
        className="w-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.12] text-white/70 hover:text-white font-medium rounded-2xl flex items-center justify-center gap-2 transition-all text-sm py-3 px-4"
      >
        {angola ? (
          <>
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            Pagamento Internacional · $10 USD
          </>
        ) : (
          <>
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Angola · 10.000 AKZ
          </>
        )}
      </button>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO HERO - VERSÃO 100% PORTUGUÊS
// ═══════════════════════════════════════════════════════════
const HeroSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const hero = getHeroContent();
  const isAngola = isAngolaCampaign();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="hero-section" className="relative pt-36 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center overflow-x-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 bg-white/[0.05] border border-[#D4AF37]/30 rounded-full px-5 py-2 mb-8"
      >
        <span className="text-xs sm:text-sm font-mono tracking-widest text-[#D4AF37]">
          ♟ O sistema que estudantes lusófonos usam para dominar o caos académico
        </span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[-1.6px] leading-[1.05] max-w-5xl mx-auto mb-6 font-bold"
      >
        {hero.headline}<br />
        <span className="text-gradient-magnetic" dangerouslySetInnerHTML={{ __html: hero.headlineHighlight }} />
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-3xl mx-auto mb-8 leading-relaxed"
      >
        <span className="text-white font-medium">Eu sei exatamente como te sentes.</span><br />
        Apontamentos espalhados por dez sítios diferentes. Prazos que aparecem do nada, como se tivessem combinado apanhar-te desprevenido. Noites inteiras perdidas só a tentar pôr ordem no caos...<br />
        E no dia seguinte, o caos recomeça do zero.<br />
        <span className="text-white font-medium">Eu vivi isso durante muito tempo.</span>
      </motion.p>

      <motion.p 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 font-medium"
      >
        Até criar um sistema que mudou tudo.<br />
        Um verdadeiro <span className="text-[#25D366]">"segundo cérebro"</span> — que guarda, organiza e te avisa de tudo o que importa, antes de te esqueceres.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 5 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] mx-auto mb-10"
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          ))}
        </div>
        <span className="text-sm text-[#D4D4D8]">
          +{SOCIAL_PROOF_COUNT.toLocaleString("pt-PT")} estudantes e profissionais já trocaram o caos por clareza · 4.8/5
        </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="max-w-xl mx-auto mb-10"
      >
        <button 
          onClick={() => document.getElementById("caos")?.scrollIntoView({ behavior: "smooth" })}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D77A] text-black font-bold py-5 rounded-2xl text-lg sm:text-xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <span>Quero ver exactamente como isto funciona</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[10px] text-[#A1A1AA] mt-3 font-mono">
          ⚡ Setup em menos de 24h · Suporte real, humano, sempre que precisares
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="max-w-4xl mx-auto mb-10"
      >
        <div className="video-luxury-container">
          {!playing ? (
            <button 
              onClick={() => { setPlaying(true); Telemetry.emit("vsl_hero_play", { src: "hero" }); }}
              className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]"
            >
              <img 
                src={CONFIG.laptopOffer} 
                alt="VSL Preview" 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D77A] text-[#050505] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-400">
                <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
              </div>
              <p className="relative z-10 text-xs font-bold text-white mt-4 tracking-wide group-hover:text-[#D4AF37] transition-colors drop-shadow-lg">
                ▶ Vê como isto funciona, em 3 minutos
              </p>
              <span className="relative z-10 text-[10px] text-[#D4AF37] mt-1 font-mono font-semibold drop-shadow-lg">
                Liga o som — vale a pena
              </span>
            </button>
          ) : (
            <iframe 
              src={`${CONFIG.heroVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="VSL" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen 
              className="w-full h-full absolute inset-0 border-0"
            />
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="relative max-w-5xl mx-auto mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <img src={CONFIG.productHero} alt="Notion Elite Starter Kit 2026" className="w-full h-auto" loading="eager" />
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.45 }}
        className="text-xs md:text-sm text-[#A1A1AA] max-w-3xl mx-auto mb-8 leading-relaxed"
      >
        {isAngola ? (
          <>
            Este sistema foi construído para sobreviver à tua realidade: <strong className="text-[#25D366]">internet lenta</strong>, apagões inesperados, dias imprevisíveis. Funciona mesmo quando tudo o resto falha — adaptado à
            <strong className="text-[#D4AF37]"> realidade angolana</strong>. 
            E agora está pronto para ti.
          </>
        ) : (
          <>
            Este sistema foi construído para a vida real de quem estuda, trabalha e ainda tenta ter uma vida — não para o mundo perfeito dos tutoriais. 
            E agora está pronto para ti.
          </>
        )}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.2 }}
        className="mt-8 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("caos")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">A parte mais importante vem a seguir ↓</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-8 rounded-full border border-[#D4AF37]/40 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// CONTADOR ANIMADO
// ═══════════════════════════════════════════════════════════
const AnimatedCounter = memo(({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">{count.toLocaleString("pt-PT")}{suffix}</p>
      <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO DE CONTADORES
// ═══════════════════════════════════════════════════════════
const CountersSection = memo(() => (
  <section className="py-16 px-4 sm:px-6 border-b border-white/[0.05] bg-[#070707]">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      <AnimatedCounter end={SOCIAL_PROOF_COUNT} suffix="+" label="Vidas Académicas Transformadas" />
      <AnimatedCounter end={9} label="Países Lusófonos Já Alcançados" />
      <AnimatedCounter end={24} suffix="h" label="Tempo Até à Clareza Total" />
      <AnimatedCounter end={98} suffix="%" label="Continuam a Usar Todos os Dias" />
    </div>
  </section>
));

// ═══════════════════════════════════════════════════════════
// SECÇÃO DE CONTEXTO LUSÓFONO
// ═══════════════════════════════════════════════════════════
const AngolaContextSection = memo(() => {
  const isAngola = isAngolaCampaign();
  
  return (
    <section className="py-20 px-4 sm:px-6 border-b border-white/[0.05] bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 md:p-10 rounded-3xl border border-[#25D366]/30 bg-[#050505] relative overflow-hidden shadow-[0_20px_60px_rgba(37,211,102,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono text-[#25D366] font-bold uppercase tracking-widest mb-4 bg-[#25D366]/10 px-3 py-1.5 rounded-lg border border-[#25D366]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                {isAngola ? "Construído Para a Tua Realidade, Não Para a Ideal" : "Construído Para a Comunidade Lusófona, Não Para o Mundo Perfeito"}
              </span>
              <h2 className="text-2xl sm:text-3xl text-white mb-4 leading-tight">
                {isAngola ? (
                  <>Funciona mesmo quando a <span className="text-[#25D366]">internet trai</span>.</>
                ) : (
                  <>Um sistema que se dobra à <span className="text-[#25D366]">tua realidade</span> — nunca o contrário.</>
                )}
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {isAngola ? (
                  "Enquanto outros sistemas exigem a internet perfeita que ninguém tem, o teu sistema continua a funcionar mesmo quando a rede cai. Foi pensado desde o primeiro dia para simplicidade, velocidade e controlo real — não importa o que aconteça à tua volta."
                ) : (
                  "Este sistema foi desenhado para funcionar em qualquer contexto — com ou sem internet, em telemóvel ou computador, adaptado à rotina de cada estudante e profissional lusófono."
                )}
              </p>
              <div className="grid grid-cols-2 gap-3 text-left">
                {isAngola ? (
                  ["Internet lenta", "Dados móveis limitados", "Rotina caótica", "Múltiplos projetos", "Telemóvel ou Desktop", "Apagões inesperados"]
                ) : (
                  ["Telemóvel ou Desktop", "Rotina pesada", "Múltiplos projetos", "Conectividade variável", "Organização total", "Foco garantido"]
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#D4D4D8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 shrink-0 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-[#25D366]/20 flex items-center justify-center bg-[#0A0A0A] relative shadow-[0_0_40px_rgba(37,211,102,0.15)]">
                <div className="absolute inset-0 rounded-full border border-[#25D366]/40 animate-pulse-ring" />
                <Zap className="w-12 h-12 text-[#25D366]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO PROBLEMA-SOLUÇÃO
// ═══════════════════════════════════════════════════════════
const ProblemSolutionSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();

  return (
    <section id="caos" className="py-24 px-4 sm:px-6 border-b border-white/[0.05] bg-gradient-to-b from-[#070707] to-[#050505]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#FF007A] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] animate-pulse" />
            A VERDADE QUE NINGUÉM TE DIZ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Já sentiste que estudas o dobro <br />
            <span className="text-[#FF007A]">e avanças metade?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] mt-4 leading-relaxed">
            {isAngola ? (
              <>
                Não é falta de inteligência. Não é falta de esforço. <br />
                É a ausência de um sistema que aguente <strong className="text-white">a tua realidade</strong> — internet lenta, apagões, dias que nunca correm como planeaste.
              </>
            ) : (
              <>
                Não é falta de inteligência. Não é falta de esforço. <br />
                É a ausência de um sistema que aguente <strong className="text-white">a tua realidade</strong> — rotina pesada, múltiplas tarefas e pressão constante.
              </>
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-red-500/20 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-[9px] font-mono font-bold px-4 py-1.5 rounded-bl-xl">
              ANTES
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-sm font-mono text-red-400 font-bold uppercase tracking-wider">O QUE ESTÁ A ACONTECER</span>
            </div>

            <ul className="space-y-4">
              {[
                "Materiais e apontamentos espalhados por dez sítios diferentes",
                "Prazos que aparecem do nada e te apanham sempre desprevenido",
                "Aquele nó no estômago de estares sempre um passo atrás",
                "Notas medianas, apesar de todas as horas que investes",
                "Fechas o semestre exausto — e sem saber o que correu mal"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-[#A1A1AA] text-sm sm:text-base border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                  <span className="text-red-400 text-lg shrink-0 mt-0.5">✘</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-xs font-mono text-center font-bold">⚠️ Este é o preço que pagas, mesmo sem perceberes</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-[#25D366]/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_20px_60px_rgba(37,211,102,0.05)]"
          >
            <div className="absolute top-0 right-0 bg-[#25D366]/10 text-[#25D366] text-[9px] font-mono font-bold px-4 py-1.5 rounded-bl-xl">
              DEPOIS
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#25D366]" />
              </div>
              <span className="text-sm font-mono text-[#25D366] font-bold uppercase tracking-wider">A SOLUÇÃO QUE MUDA TUDO</span>
            </div>

            <ul className="space-y-4">
              {[
                "Um sistema que se lembra de tudo, para que tu não precises",
                "Calendário inteligente que te avisa antes de ser tarde demais",
                "Sabes, todas as manhãs, exactamente por onde começar",
                "Vês o teu progresso a acontecer — não apenas sentes que devia estar a acontecer",
                "Resultados reais, com uma fração do stress de antes"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-white text-sm sm:text-base border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                  <span className="text-[#25D366] text-lg shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl">
              <p className="text-[#25D366] text-xs font-mono text-center font-bold">
                🚀 Testado por milhares na vida real
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3 p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Quote className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-[10px] text-[#D4AF37] leading-relaxed">
                <span className="font-bold">"Eu vivi isso durante anos."</span>
                <br />
                <span className="text-[#A1A1AA]">— Gabriel Sapalo</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <p className="text-center text-sm text-[#A1A1AA] mb-4">
            <span className="text-white font-medium">E se te dissesse que já não precisas de viver assim?</span>
          </p>
          <CTAButtons onConvert={onConvert} size="lg" variant="green" />
          <p className="text-[10px] text-[#A1A1AA] mt-3 font-mono text-center">
            ⚡ Pagamento seguro · Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO PILARES - COM MOCKUPS
// ═══════════════════════════════════════════════════════════
const PilaresSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();

  const pilares = [
    { 
      label: "Pilar 01", 
      title: "Dashboard — Centro de Comando", 
      desc: "Abres o Notion e, em três segundos, já sabes o que importa hoje. Sem procurar. Sem adivinhar. Sem distrações a roubar-te o foco.", 
      img: CONFIG.productDashboard 
    },
    { 
      label: "Pilar 02", 
      title: "Gestor de Projetos — Método Kanban", 
      desc: "Aquele trabalho que já adiaste três vezes? O método Kanban visual torna impossível perdê-lo de vista — e ainda mais impossível continuar a fugir dele.", 
      img: CONFIG.productGestorProjeto 
    },
    { 
      label: "Pilar 03", 
      title: "Gestor Financeiro — Controlo Total", 
      desc: "Sabes para onde vai o teu dinheiro até ao último cêntimo. Sem surpresas a meio do mês, sem aquele aperto na conta bancária.", 
      img: CONFIG.productGestorFinanceiro 
    },
    { 
      label: "Pilar 04", 
      title: "Cérebro Digital — Arquivo de Conhecimento", 
      desc: "Cada ideia, cada apontamento, cada descoberta importante — guardada, ligada e pronta a usar quando mais precisares dela. Nunca mais \"onde é que eu vi isto?\"", 
      img: CONFIG.productCerebroDigital,
      ctaAfter: true 
    },
    { 
      label: "Pilar 05", 
      title: "Exames e Provas — Planeamento Estratégico", 
      desc: "Enquanto os outros descobrem a data da prova três dias antes, tu já sabes, há semanas, exactamente o que revisar e quando.", 
      img: CONFIG.productExamesProvas 
    },
    { 
      label: "Pilar 06", 
      title: "Habit Tracker — Rotinas que Compõem", 
      desc: "Pequenos hábitos, seguidos todos os dias, tornam-se a diferença gigante entre quem promete mudar e quem muda de facto.", 
      img: CONFIG.productHabitTracker 
    }
  ];

  return (
    <section id="pilares" className="py-24 px-4 sm:px-6 bg-[#050505] border-b border-white/[0.05] relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            OS 6 PILARES DE ALTA PERFORMANCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Não é promessa. <br />
            <span className="text-[#D4AF37]">É o sistema, peça por peça.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-4">
            Seis módulos. Cada um resolve um problema real que já viveste. Junta-os, e o caos deixa de ter onde se esconder.
          </p>
        </div>

        <div className="space-y-10">
          {pilares.map((p, i) => (
            <div key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} 
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <img src={p.img} alt={p.title} className="w-full h-auto rounded-xl object-cover block" loading="lazy" />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">{p.label}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{p.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{p.desc}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="text-xs text-[#D4D4D8] font-mono">Incluído no Founder Batch 01</span>
                  </div>
                </div>
              </motion.div>
              {p.ctaAfter && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-10 p-6 rounded-2xl border-gradient-gold bg-[#0A0A0A] max-w-2xl mx-auto text-center"
                >
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">A SOLUÇÃO ESTÁ AQUI</p>
                  <p className="text-sm text-white mb-4">
                    Já viste o suficiente para saber que isto funciona. Se estás cansado do caos, age agora — o resto da página só confirma o que já sabes.
                  </p>
                  <CTAButtons onConvert={onConvert} size="sm" variant="gold" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO TRANSFORMAÇÃO - COM IMAGENS ANTES/DEPOIS
// ═══════════════════════════════════════════════════════════
const TransformationSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();

  return (
    <section id="transformacao" className="py-24 px-4 sm:px-6 border-b border-white/[0.05] bg-[#050505] relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#D4AF37]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            A DIFERENÇA QUE O SISTEMA FAZ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            De estudante à beira do esgotamento <br />
            <span className="text-[#D4AF37]">a estudante no controlo total</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-4">
            A diferença nunca esteve em quantas horas estudas. <br />
            <span className="text-white">Está em como organizas essas horas.</span>
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0A] p-2 max-w-4xl mx-auto mb-12">
          <img src={CONFIG.antesDepoisMockup} alt="Antes e Depois" className="w-full h-auto rounded-xl object-cover block" loading="lazy" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-red-500/20 rounded-3xl p-8 md:p-10 relative group hover:border-red-500/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-sm font-mono text-red-400 font-bold uppercase tracking-wider">A REALIDADE ATUAL</span>
            </div>

            <ul className="space-y-4">
              {[
                "Acordas sem saber por onde começar",
                "Perdes horas preciosas só à procura de um documento",
                "Prazos que te apanham sempre de surpresa",
                "Notas que não reflectem todo o esforço que investes",
                "Chegas ao fim do semestre a arrastar-te"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-[#A1A1AA] text-sm sm:text-base border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                  <span className="text-red-400 text-lg shrink-0">✘</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-center">
              <p className="text-red-400 text-xs font-mono font-bold">⬤ VIDA REATIVA · STRESS CONSTANTE</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-[#25D366]/30 rounded-3xl p-8 md:p-10 relative group hover:border-[#25D366]/60 transition-colors shadow-[0_20px_60px_rgba(37,211,102,0.05)]"
          >
            <div className="absolute -top-3 -right-3 bg-[#25D366] text-black text-[10px] font-bold px-4 py-1.5 rounded-xl shadow-lg rotate-3">
              🏆 A SUA NOVA REALIDADE
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#25D366]" />
              </div>
              <span className="text-sm font-mono text-[#25D366] font-bold uppercase tracking-wider">A NOVA REALIDADE</span>
            </div>

            <ul className="space-y-4">
              {[
                "Sabes exatamente o que estudar cada dia",
                "Encontras qualquer material em segundos",
                "Prazos sob controlo total",
                "Vês as tuas notas a subir, com metade do stress",
                "Terminas o semestre com orgulho"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm sm:text-base border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                  <span className="text-[#25D366] text-lg shrink-0">✓</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl text-center">
              <p className="text-[#25D366] text-xs font-mono font-bold">⬤ VIDA PROATIVA · CLAREZA MENTAL</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <p className="text-center text-sm text-[#A1A1AA] mb-4">
            <span className="text-white font-medium">Isto não é sorte. É um sistema. E pode ser a tua próxima semana.</span>
          </p>
          <CTAButtons onConvert={onConvert} size="lg" variant="gold" />
          <p className="text-[10px] text-[#A1A1AA] mt-3 font-mono text-center">
            ⚡ Acesso imediato · Garantia 30 dias
          </p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO BÓNUS
// ═══════════════════════════════════════════════════════════
const BonusSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();
  const totalValue = BONUSES.reduce((s, b) => s + b.value, 0);

  return (
    <section id="bonus" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#050505] to-[#0A0A0A] border-b border-white/[0.05] relative overflow-hidden">
      
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#D4AF37]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#25D366] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            VALOR EXTRA INCLUÍDO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            E isto ainda <br />
            <span className="text-[#D4AF37]">nem é o principal</span>
          </h2>
          <div className="inline-flex items-center gap-3 mt-4 px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
            <span className="text-sm text-[#A1A1AA]">Valor total dos bónus:</span>
            <span className="text-2xl font-bold text-[#D4AF37]">${totalValue}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {BONUSES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-8 hover:border-[#D4AF37]/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-[#D4AF37] font-bold text-sm">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{b.title}</h3>
                    <span className="text-[#25D366] font-mono text-sm font-bold">${b.value}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{b.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#25D366] font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>INCLUÍDO · $0</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-3xl text-center">
          <p className="text-sm text-[#A1A1AA] mb-2">Tu pagas apenas</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-4xl font-bold text-white">$10</span>
            <span className="text-xl text-[#A1A1AA] line-through">${totalValue + 49}</span>
            <span className="text-sm text-[#25D366] font-bold bg-[#25D366]/10 px-4 py-1.5 rounded-full">Economia de 97%</span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-3">
            {isAngola ? "ou 10.000 AKZ — menos que uma saída ao fim de semana" : "menos que uma saída ao fim de semana"}
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <p className="text-center text-sm text-[#A1A1AA] mb-4">
            <span className="text-white font-medium">E ainda faltam as provas de que isto realmente funciona...</span>
          </p>
          <CTAButtons onConvert={onConvert} size="lg" variant="green" />
          <p className="text-[10px] text-[#A1A1AA] mt-3 font-mono text-center">
            ⚡ Pagamento seguro · Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO PROVA SOCIAL
// ═══════════════════════════════════════════════════════════
const SocialProofSection = memo(() => {
  return (
    <section id="provas" className="py-24 px-4 sm:px-6 border-b border-white/[0.05] bg-[#070707]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#00E5FF] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            RESULTADOS REAIS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Não acredites em nós. <br />
            <span className="text-[#00E5FF]">Acredita neles.</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-4">
            +{SOCIAL_PROOF_COUNT.toLocaleString("pt-PT")} utilizadores · Avaliações 5 estrelas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-[#A1A1AA] font-mono">{t.role} · {t.location}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed italic">"{t.text}"</p>

              <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] text-[#25D366] font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verificado</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 md:p-10 bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-3xl text-center max-w-3xl mx-auto"
        >
          <Quote className="w-8 h-8 text-[#D4AF37]/50 mx-auto mb-4" />
          <p className="text-xl md:text-2xl italic text-white leading-relaxed">
            "Estava à beira do pânico com os exames a bater à porta. Três dias depois de configurar o Kit, tinha todas as minhas revisões organizadas — e pela primeira vez na vida, sentia que era eu a controlar o semestre, não o contrário."
          </p>
          <p className="mt-4 text-[#D4AF37] font-medium">— Ana Luísa Mendes, Luanda</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            ))}
          </div>
        </motion.div>

        <div className="mt-12 max-w-xl mx-auto">
          <p className="text-center text-sm text-[#A1A1AA] mb-4">
            <span className="text-white font-medium">A única diferença entre eles e tú? Eles decidiram agir primeiro.</span>
          </p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO AUTORIDADE
// ═══════════════════════════════════════════════════════════
const AuthoritySection = memo(() => {
  const isAngola = isAngolaCampaign();

  return (
    <section id="autoridade" className="py-24 px-4 sm:px-6 border-b border-white/[0.05] bg-[#070707] relative overflow-hidden">
      <div className="absolute inset-0 chess-deco opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">♟ A Mente por Trás da Matriz</span>
          <h2 className="premium-heading text-3xl sm:text-4xl text-white break-words whitespace-normal">
            Um sistema pensado como uma partida de xadrez — pelo <span className="display-heading text-gradient-gold">Campeão Nacional de Xadrez de Angola</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-[#0A0A0A] shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <img src={CONFIG.authorPhoto} alt={CONFIG.authorName} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white break-words whitespace-normal">{CONFIG.authorName}</h3>
              <p className="text-[10px] text-[#D4AF37] font-mono mt-1 tracking-widest uppercase block break-words whitespace-normal">{CONFIG.authorTitle}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
              <span className="badge-founder-premium px-3 py-1 rounded-full font-mono font-semibold text-[10px]">
                ♟ Campeão Nacional Absoluto · Angola 2024
              </span>
              <a href="https://ratings.fide.com/report.phtml?event=368341" target="_blank" rel="noopener noreferrer"
                 className="px-3 py-1 rounded-full border border-[#00E5FF]/20 text-[#00E5FF] text-[9px] font-mono hover:bg-[#00E5FF]/5 transition-colors inline-flex items-center gap-1">
                Ver ranking oficial FIDE ↗
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-lg">
            <img src={CONFIG.fideProof} alt="Resultado oficial FIDE" className="w-full h-auto object-cover" loading="lazy" />
            <div className="p-3 bg-[#050505] border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#25D366] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> Verificado pela FIDE
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 space-y-5 text-sm text-[#A1A1AA] leading-relaxed">
          <p className="text-lg md:text-xl font-serif italic text-white border-l-2 border-[#D4AF37] pl-5 py-2 bg-white/[0.01] rounded-r break-words whitespace-normal">
            "No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece exatamente o mesmo."
          </p>
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { icon: Eye, label: "Visão três passos à frente" },
              { icon: Zap, label: "Foco sem ruído" },
              { icon: Target, label: "Execução sem hesitação" },
              { icon: Lock, label: "Controlo que não se negocia" }
            ].map((it, i) => {
              const Icon = it.icon;
              return (
                <div key={i} className="p-3 rounded-lg bg-[#0A0A0A] border border-white/[0.05] flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="text-xs text-white font-medium break-words whitespace-normal">{it.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// TEMPORIZADOR DE URGÊNCIA
// ═══════════════════════════════════════════════════════════
const UrgencyTimer = memo(() => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const WINDOW_HOURS = 48;
    const STORAGE_KEY = "ne_offer_deadline";

    let deadline = Number(localStorage.getItem(STORAGE_KEY));
    if (!deadline || Number.isNaN(deadline) || deadline < Date.now()) {
      deadline = Date.now() + WINDOW_HOURS * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(deadline));
    }

    const update = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  if (expired) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-[#0A0A0A] border border-[#FF007A]/30 rounded-lg px-3 py-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF007A] animate-pulse" />
      <span className="text-[10px] font-mono text-[#FF007A] uppercase tracking-wider font-bold">Oferta expira em</span>
      <div className="flex items-center gap-1 font-mono">
        <span className="bg-[#FF007A]/10 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">{pad(timeLeft.h)}h</span>
        <span className="text-[#FF007A]">:</span>
        <span className="bg-[#FF007A]/10 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">{pad(timeLeft.m)}m</span>
        <span className="text-[#FF007A]">:</span>
        <span className="bg-[#FF007A]/10 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">{pad(timeLeft.s)}s</span>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO OFERTA PREMIUM - COM REVELAÇÃO DO PREÇO
// ═══════════════════════════════════════════════════════════
const PremiumOfferSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();
  const totalValue = BONUSES.reduce((s, b) => s + b.value, 0);

  return (
    <section id="oferta" className="py-28 px-4 sm:px-6 bg-gradient-to-b from-[#050505] to-black border-t border-white/[0.08] relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-6">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest font-bold">FOUNDER BATCH · PREÇO ESPECIAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Transforma o teu semestre <br />
            <span className="text-[#D4AF37]">por apenas $10</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] mt-4 max-w-xl mx-auto">
            {isAngola
              ? "O Notion Elite Kit 2026 completo, com todos os bónus incluídos, por menos do que costumas gastar num único almoço para dois."
              : "O Notion Elite Kit 2026 completo, com todos os bónus incluídos, por menos do que costumas gastar num único almoço fora de casa."}
          </p>
        </div>

        <div className="bg-[#0A0A0A] border-2 border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 max-w-xl mx-auto shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl sm:text-7xl font-bold text-white">$10</span>
              <span className="text-2xl text-[#A1A1AA] line-through">$49</span>
            </div>
            <div className="inline-flex items-center gap-2 mt-2 bg-[#FF007A]/10 border border-[#FF007A]/30 rounded-full px-4 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] animate-pulse" />
              <span className="text-[10px] font-mono text-[#FF007A] font-bold uppercase tracking-wider">Preço sobe em breve</span>
            </div>
            <div className="mt-4">
              <UrgencyTimer />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "Notion Elite Kit 2026 completo",
              `Todos os bónus (valor total: $${totalValue})`,
              "Atualizações vitalícias 2026/2027",
              "Setup guiado em vídeo (menos de 24h)",
              "Garantia de 30 dias (risco zero)"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-[#D4D4D8]">
                <Check className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <CTAButtons onConvert={onConvert} size="lg" variant="green" />

          <div className="mt-6 pt-6 border-t border-white/[0.05]">
            <p className="text-[10px] text-[#A1A1AA] font-mono text-center uppercase tracking-wider mb-3">
              Métodos de pagamento aceites
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {isAngola ? (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-mono font-bold">⚡ Multicaixa Express</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#A1A1AA] text-[10px] font-mono">🏦 IBAN</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#A1A1AA] text-[10px] font-mono">📧 Comprovativo por Email</span>
                </>
              ) : (
                <>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#A1A1AA] text-[10px] font-mono">💳 Cartão de Crédito</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#A1A1AA] text-[10px] font-mono">🏦 Transferência</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm text-[#A1A1AA]">
              <strong className="text-white">Garantia de 30 dias</strong> — Se não ficares satisfeito, devolvemos 100% do teu dinheiro.
            </span>
          </div>
          <p className="text-[10px] text-[#A1A1AA]/60 mt-2 font-mono">
            Pagamento único · Acesso imediato · Sem mensalidades
          </p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO FAQ
// ═══════════════════════════════════════════════════════════
const FAQSection = memo(() => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 border-t border-white/[0.05] bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            DÚVIDAS COMUNS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Perguntas <span className="text-[#D4AF37]">frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A1A1AA] shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-5 text-sm text-[#A1A1AA] leading-relaxed border-t border-white/[0.04] pt-4"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <p className="text-center text-sm text-[#A1A1AA] mb-4">
            <span className="text-white font-medium">Ainda tens dúvidas?</span>
          </p>
          <a
            href={CONFIG.whatsappSupport}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            Falar com o suporte no WhatsApp
          </a>
          <p className="text-[10px] text-[#A1A1AA] mt-3 font-mono text-center">Resposta em menos de 24h</p>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// SECÇÃO CTA FINAL
// ═══════════════════════════════════════════════════════════
const FinalCTASection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const isAngola = isAngolaCampaign();

  return (
    <section className="py-28 px-4 sm:px-6 text-center relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#050505]">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-deco opacity-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-full px-6 py-2 mb-8">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest font-bold">ÚLTIMA OPORTUNIDADE NESTE PREÇO</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
          A decisão que separa <br />
          <span className="text-[#D4AF37]">quem sonha de quem realiza</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl mx-auto mb-10 leading-relaxed">
          Chegaste até aqui porque uma parte de ti já sabe que precisa de mudar. Não deixes mais um semestre escapar-te pelas mãos por causa do caos. Ativa o teu sistema hoje — e começa, finalmente, a decidir tu os teus resultados.
        </p>

        <div className="max-w-xl mx-auto">
          <CTAButtons onConvert={onConvert} size="lg" variant="gold" />
        </div>

        <p className="text-[10px] text-[#A1A1AA]/60 mt-8 font-mono">
          {isAngola
            ? "Preço sobe em breve · Licença vitalícia · Multicaixa Express · IBAN"
            : "Preço sobe em breve · Licença vitalícia · Pagamento seguro"}
        </p>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════
// RODAPÉ LEGAL
// ═══════════════════════════════════════════════════════════
const LegalFooter = memo(() => (
  <footer className="border-t border-white/[0.05] bg-[#050505] pt-14 pb-28 px-4 sm:px-6 text-xs text-[#A1A1AA]">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <img src={CONFIG.glowscaleLogo} alt="GlowScalePro" className="w-6 h-6 object-contain" />
          <span className="font-bold text-white tracking-tight text-sm">GlowScalePro</span>
          <span className="text-white/[0.15]">/</span>
          <span className="text-white font-medium text-xs">{CONFIG.authorName}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 text-[11px]">
        <div>
          <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">Conformidade</p>
          <ul className="space-y-2">
            <li><a href={CONFIG.termsOfUse} target="_blank" rel="noopener noreferrer" className="hover:text-white">Termos de Utilização</a></li>
            <li><a href={CONFIG.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacidade de Dados</a></li>
            <li><a href={CONFIG.cookiePolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white">Política de Cookies</a></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">Atendimento</p>
          <ul className="space-y-2">
            <li><a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-white">Correio Eletrónico</a></li>
            <li><a href={CONFIG.telegramSupport} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">Telegram <ExternalLink className="w-2.5 h-2.5" /></a></li>
            <li><a href={CONFIG.whatsappSupport} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">WhatsApp <ExternalLink className="w-2.5 h-2.5" /></a></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">Especificações</p>
          <p className="text-[#A1A1AA]/80 text-[10px] leading-relaxed">
            Notion Elite OS 2026.<br />
            O sistema operativo pessoal para estudantes, profissionais e professores que recusam viver no caos.
          </p>
        </div>
      </div>
      <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#A1A1AA]/60">
        <p>© 2026 GlowScalePro. Todos os direitos reservados.</p>
        <p className="font-mono text-[9px]">Clareza é poder · O caos custa caro</p>
      </div>
    </div>
  </footer>
));

// ═══════════════════════════════════════════════════════════
// MODAL DE SAÍDA
// ═══════════════════════════════════════════════════════════
const ExitIntentModal = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const [show, setShow] = useState(false);
  const [armed, setArmed] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (localStorage.getItem("ne_exit_dismissed") === "1") return;
    const armTimer = setTimeout(() => setArmed(true), 20000);
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && armed && !dismissed.current) {
        setShow(true);
        Telemetry.emit("exit_intent_triggered");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => { clearTimeout(armTimer); document.removeEventListener("mouseleave", handleMouseLeave); };
  }, [armed]);

  const handleClose = () => {
    setShow(false);
    dismissed.current = true;
    localStorage.setItem("ne_exit_dismissed", "1");
  };

  if (!show) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#0A0A0A] border border-[#D4AF37]/50 rounded-3xl p-8 max-w-md text-center relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">Não percas esta oportunidade</h3>
        <p className="text-[#A1A1AA] mb-6">Estás mesmo prestes a sair sem resolver o problema que te trouxe até aqui? O Founder Batch 01 está quase esgotado — depois disto, o preço sobe para <strong className="text-white">$49</strong>.</p>
        <CTAButtons onConvert={onConvert} size="sm" variant="green" />
        <button onClick={handleClose} className="text-sm text-gray-400 hover:text-white mt-4 block mx-auto">
          Não, obrigado.
        </button>
      </motion.div>
    </motion.div>
  );
});

// ═══════════════════════════════════════════════════════════
// BARRAS FIXAS (STICKY BARS)
// ═══════════════════════════════════════════════════════════
const StickyBar = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!visible) return null;
  const isAngola = isAngolaCampaign();
  
  return (
    <div className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A] border border-[#D4AF37]/40 rounded-2xl shadow-2xl px-6 py-3 items-center gap-4 backdrop-blur-sm">
      <span className="text-sm font-medium text-white">Ainda vais deixar o caos decidir por ti?</span>
      <button onClick={() => onConvert(isAngola ? "angola" : "international")}
              className="bg-gradient-to-r from-[#25D366] to-[#1EBE5A] px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:shadow-lg transition-all">
        {isAngola ? "10.000 AKZ" : "$10"} — Ativar Agora
      </button>
      <button onClick={() => onConvert(isAngola ? "international" : "angola")}
              className="bg-white/[0.05] border border-white/[0.1] px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white flex items-center gap-2 transition-all">
        {isAngola ? "$10 USD" : "10.000 AKZ"}
      </button>
    </div>
  );
});

const MobileStickyBar = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!visible) return null;
  const isAngola = isAngolaCampaign();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.08] p-3 flex items-center gap-2">
      <button onClick={() => onConvert(isAngola ? "angola" : "international")}
              className="flex-1 bg-gradient-to-r from-[#25D366] to-[#1EBE5A] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
        {isAngola ? "10.000 AKZ" : "$10"}
      </button>
      <button onClick={() => onConvert(isAngola ? "international" : "angola")}
              className="flex-1 bg-white/[0.05] border border-white/[0.1] text-white/70 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
        {isAngola ? "$10 USD" : "10.000 AKZ"}
      </button>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════
export function App() {
  const [toast, setToast] = useState<typeof NOTIFICATIONS[0] | null>(null);
  const [showWaFloat, setShowWaFloat] = useState(false);
  const shownNotifications = useRef<Set<number>>(new Set());
  const notificationIndex = useRef(0);

  useEffect(() => {
    Telemetry.emit("page_loaded", { ref: document.referrer });

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      setShowWaFloat(scrolled >= total - 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const iv = setInterval(() => {
      if (!FEATURE_FLAGS.enableActivityNotifications) return;
      if (shownNotifications.current.size >= NOTIFICATIONS.length) return;
      while (shownNotifications.current.has(notificationIndex.current) &&
             shownNotifications.current.size < NOTIFICATIONS.length) {
        notificationIndex.current = (notificationIndex.current + 1) % NOTIFICATIONS.length;
      }
      if (!shownNotifications.current.has(notificationIndex.current)) {
        setToast(NOTIFICATIONS[notificationIndex.current]);
        shownNotifications.current.add(notificationIndex.current);
        notificationIndex.current = (notificationIndex.current + 1) % NOTIFICATIONS.length;
        setTimeout(() => setToast(null), 4500);
      }
    }, 50000);

    return () => {
      clearInterval(iv);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToOffer = useCallback(() => {
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const convert = useCallback((seg: "international" | "angola") => {
    const urlParams = new URLSearchParams(window.location.search);
    const metaClickId = urlParams.get("fbclid") || "";
    const utmSource = urlParams.get("utm_source") || "";
    const utmCampaign = urlParams.get("utm_campaign") || "";
    const utmMedium = urlParams.get("utm_medium") || "";
    const utmContent = urlParams.get("utm_content") || "";

    Telemetry.emit("checkout_initiated", {
      segment: seg,
      funnel: "founder_batch_01",
      price_usd: 10,
      price_akz: 10000,
      fbclid: metaClickId,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
      timestamp: Date.now(),
      referrer: document.referrer
    });

    if (seg === "international") {
      sessionStorage.setItem("ne_conversion", JSON.stringify({
        segment: "international",
        value: 10,
        currency: "USD",
        content_name: "Notion Elite OS 2026",
        transaction_id: `ne_${Date.now()}`
      }));

      Telemetry.emit("InitiateCheckout", {
        value: 10,
        currency: "USD",
        content_name: "Notion Elite OS 2026"
      });

      const utmParams = [
        utmSource   && `utm_source=${utmSource}`,
        utmMedium   && `utm_medium=${utmMedium}`,
        utmCampaign && `utm_campaign=${utmCampaign}`,
        utmContent  && `utm_content=${utmContent}`,
        metaClickId && `fbclid=${metaClickId}`
      ].filter(Boolean).join("&");

      window.location.href = utmParams
        ? `${CONFIG.hotmartCheckout}&${utmParams}`
        : CONFIG.hotmartCheckout;

    } else {
      const utmParams = [
        utmSource   && `utm_source=${utmSource}`,
        utmCampaign && `utm_campaign=${utmCampaign}`
      ].filter(Boolean).join("&");

      window.location.href = utmParams ? `/angola?${utmParams}` : "/angola";
    }
  }, []);

  const path = window.location.pathname;
  if (path === "/angola" || path === "/checkout-angola") {
    return <AngolaCheckoutPage />;
  }
  if (path === "/obrigado" || path === "/thank-you") {
    return <ThankYouPage />;
  }

  return (
    <div className="cinematic-noise min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden">
      <Helmet>
        <title>Notion Elite OS 2026 — Sistema de Organização para Estudantes | GlowScalePro</title>
        <meta name="description" content="Organiza toda a tua vida académica em 24 horas. Sistema pronto para estudantes. Oferta especial Founder Batch." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>

      <Header onCTA={scrollToOffer} />
      <HeroSection onConvert={convert} />
      <CountersSection />
      <AngolaContextSection />
      <ProblemSolutionSection onConvert={convert} />
      <PilaresSection onConvert={convert} />
      <TransformationSection onConvert={convert} />
      <BonusSection onConvert={convert} />
      <SocialProofSection />
      <AuthoritySection />
      <PremiumOfferSection onConvert={convert} />
      <FAQSection />
      <FinalCTASection onConvert={convert} />
      <LegalFooter />
      <ExitIntentModal onConvert={convert} />
      <StickyBar onConvert={convert} />
      <MobileStickyBar onConvert={convert} />

      <SalesChatBot />

      <AnimatePresence>
        {showWaFloat && path !== "/angola" && path !== "/checkout-angola" && (
          <motion.a
            href={CONFIG.whatsappSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Telemetry.emit("wa_float_support_click")}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none flex items-center justify-center group"
          >
            <Send className="w-5 h-5 text-white" />
            <span className="absolute right-full mr-3 bottom-1/2 translate-y-1/2 bg-[#050505] text-white text-[10px] font-mono px-3 py-2 rounded-lg border border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl leading-relaxed text-left">
              <span className="block font-bold text-[#25D366] mb-0.5">Dúvidas?</span>
              Fala com o suporte
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      className="fixed bottom-24 left-4 z-50 glass-modal-aggressive p-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs border-l-4 border-l-[#D4AF37]">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[11px] text-white font-bold truncate">{toast.name}</p>
              <p className="text-[10px] text-[#D4AF37] font-mono truncate">{toast.item}</p>
              <span className="text-[9px] text-gray-500 font-mono block">{toast.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;