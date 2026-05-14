import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Command,
  Brain,
  Target,
  Calendar,
  Sparkles,
  Zap,
  Play,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  CreditCard,
  MessageCircle,
  ExternalLink,
  Menu,
  X,
  Shield,
  Send
} from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ CONFIGURAÇÃO OFICIAL & ASSETS ABSOLUTOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorPhoto: "https://drive.google.com/thumbnail?id=1kmUAUklxpI5yMEfaUaFQT2ye4rpgrbKP&sz=w800",
  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  glowscaleLogo: "https://drive.google.com/thumbnail?id=11MvkwbsJstF-st-tYMxpyeCVW1sDG4ks&sz=w400",
  productLogo: "https://drive.google.com/thumbnail?id=1PhCQaeCPI4b1sWrfpMIDI3t1eFDac0aT",
  whatsappLogo: "https://drive.google.com/thumbnail?id=1ty3u0-Vks2IM4NNT2bJ14riAvG0Zh5Cd&sz=w200",
  telegramLogo: "https://drive.google.com/thumbnail?id=1I1PJ4DpRVqiWgQGX4jMWLBi6plwQsiJN&sz=w200",
  notionMockup: "https://drive.google.com/thumbnail?id=1ufRMrYBRKe0zj38foMxjdgbckH8SLxcl&sz=w1000",
  internalView: "https://drive.google.com/thumbnail?id=1AQUxp-P7-Wf64CPqbTiQDsPqqBhL7dvL&sz=w1000",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  // NOVA IMAGEM DE CAPA ADICIONADA
  coverImage: "https://drive.google.com/thumbnail?id=1Gv_vB4wENBXyiaQi1iD3UyuXkTvXg8sc&sz=w1000",
  
  // LINK CORRETO DO VIDE WALKTHROUGH (GOOGLE DRIVE)
  walkthroughVideo: "https://drive.google.com/file/d/1qzelqkdoxr_828C4OhgonEMzJNdMKCsa/preview",

  // CTAS OFICIAIS DE CONVERSÃO EXTREMA
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappPayment: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",

  communityLink: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  telegramSupport: "https://t.me/+n_hkEVYAeO9lNDIx",
  supportEmail: "suporte@glowscalepro.com",

  termsOfUse: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyPolicy: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
  cookiePolicy: "https://drive.google.com/file/d/1owleKJFrC-MVOjMx7BKMuuqrhroSZqY1/view"
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ BASE DE DADOS ESTRATÉGICA PREMIUM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MODULES = [
  {
    title: "Dashboard Operacional",
    description: "Centro de controlo unificado. Desenvolvido com zero atrito para gerires tarefas iminentes, rotinas e prazos absolutos numa única dobra visual.",
    icon: Command
  },
  {
    title: "Cérebro Digital",
    description: "Repositório cognitivo imaculado. Arquitetura desenhada para reteres notas de aulas, relatórios, atas e insights sem fragmentação da informação.",
    icon: Brain
  },
  {
    title: "Gestão Estratégica",
    description: "Acompanhamento milimétrico por disciplinas ou vetores corporativos. Visualização de progresso e alocação de largura de banda pessoal em tempo real.",
    icon: Target
  },
  {
    title: "Calendário Inteligente",
    description: "Sincronização preditiva de entregas. O sistema avisa-te de saturações e sobreposições antes que se transformem em madrugadas de urgência.",
    icon: Calendar
  },
  {
    title: "IA & Prompts",
    description: "Enriquecido com matrizes neurais de prompts. Extrai sínteses automáticas, gera flashcards de alta retenção e planeia ciclos complexos num clique.",
    icon: Sparkles
  },
  {
    title: "Anti-Fricção",
    description: "Protocolo de sustentação. Integra rotinas de manutenção limpas de apenas 5 minutos para que o teu sistema se mantenha perpetuamente vivo e limpo.",
    icon: Zap
  }
];

const TESTIMONIALS = [
  {
    name: "Tomás Ferreira",
    role: "Dupla Licenciatura",
    location: "Porto, Portugal",
    avatar: "https://drive.google.com/thumbnail?id=1B8EXhe3kIo9EW8MEaEu4MLSUWqgUZS-U&sz=w400",
    text: "Faço dupla licenciatura e trabalho aos fins-de-semana num café. Antes disto vivia em pânico permanente — dormia 4 horas e mesmo assim entregava tudo atrasado. Agora planeio a semana toda em 10 minutos ao domingo."
  },
  {
    name: "Mariana Costa",
    role: "Estudante Universitária",
    location: "Lisboa, Portugal",
    avatar: "https://drive.google.com/thumbnail?id=1Qp6Ggy8nwDujXUimXGOYXsluBlLnlCa1&sz=w400",
    text: "Passei de média de 12 para 15 em dois meses. O dashboard mudou completamente a minha organização académica e eliminou a dispersão que sentia."
  },
  {
    name: "Ana Luísa Mendes",
    role: "Gestora de Projetos",
    location: "Luanda, Angola",
    avatar: "https://drive.google.com/thumbnail?id=1wU9eMnFFPWcMZF6BNoPiRdZHF7xBcQJi&sz=w400",
    text: "Finalmente tenho controlo total sobre os meus projetos e prazos. Entreguei o último trabalho com uma semana de antecedência pela primeira vez na minha vida."
  },
  {
    name: "João Pedro Silva",
    role: "Profissional & Estudante",
    location: "São Paulo, Brasil",
    avatar: "https://drive.google.com/thumbnail?id=19FTCcE3bLkdF3EYSnzSzR6Q_z5nsCTLH&sz=w400",
    text: "Trabalho e estudo ao mesmo tempo. Este sistema fez-me poupar quase 2 horas por dia em organização. Isso dá-me tempo para finalmente ir ao ginásio e dormir 7 horas."
  },
  {
    name: "Sofia Rodrigues",
    role: "Mestranda e Pesquisadora",
    location: "Coimbra, Portugal",
    avatar: "https://drive.google.com/thumbnail?id=1zmsp7FfLOBEizrHjOLjsK_ro2vVEX9C7&sz=w400",
    text: "Eu era daquelas que tinha 15 separadores abertos no Chrome, notas no WhatsApp para mim mesma e três cadernos diferentes — e mesmo assim esquecia-me de tudo. Na primeira semana com o Kit, entreguei dois trabalhos antes do prazo."
  },
  {
    name: "Beatriz Mendonça",
    role: "Consultora Júnior",
    location: "Maputo, Moçambique",
    avatar: "https://drive.google.com/thumbnail?id=1vtcYqW_DZSgwc6UExrQnerPYNEtt2shQ&sz=w400",
    text: "Comprei a pensar que ia ser mais um template que uso dois dias e abandono. Mas o Método 24H obrigou-me a montar tudo de uma vez. Já vou no terceiro mês e a minha média subiu."
  }
];

const PAIN_POINTS = [
  {
    title: "Caos Mental Disperso",
    desc: "Anotações vitais espalhadas de forma inconsistente entre conversas de WhatsApp, rascunhos sem nome e blocos físicos."
  },
  {
    title: "Sobrecarga Operacional",
    desc: "A sensação sufocante de investir dezenas de horas semanais de esforço e continuar invariavelmente com tarefas atrasadas."
  },
  {
    title: "Prazos Emergenciais",
    desc: "Entregas decisivas que surgem sem aviso no horizonte por pura ausência de uma visualização global consolidada."
  },
  {
    title: "Fadiga de Ferramentas",
    desc: "O ciclo frustrante de testar repetidamente aplicações difíceis que acabam abandonadas em menos de 72 horas."
  },
  {
    title: "Procrastinação Involuntária",
    desc: "Paralisia decisória gerada pelo excesso de abas abertas e pela falta de clareza sobre qual o próximo passo executável."
  },
  {
    title: "Ansiedade Crónica",
    desc: "O peso mental contínuo de depender de uma memória sobrecarregada para gerir múltiplas frentes académicas ou de trabalho."
  }
];

const FAQ_DATA = [
  {
    q: "O sistema exige uma assinatura paga do Notion?",
    a: "Não. A arquitetura foi programada nativamente para explorar todo o potencial da versão gratuita do Notion. Terás acesso irrestrito e vitalício sem custos recorrentes associados ao software."
  },
  {
    q: "Preciso de ser perito em Notion para operar?",
    a: "Absolutamente não. O ecossistema inclui um processo imersivo e passo a passo desenhado para te conduzir do zero absoluto até ao controlo de elite em menos de 24 horas."
  },
  {
    q: "É compatível com smartphones e tablets?",
    a: "O Notion Elite Kit adota uma filosofia mobile-first rigorosa. A interface de inserção rápida permite capturar ideias, tarefas ou consultar prazos iminentes instantaneamente a partir de qualquer dispositivo móvel."
  },
  {
    q: "Como se diferenciam os fluxos de aquisição?",
    a: "Se residires fora de Angola, utiliza a opção internacional via Hotmart com processamento imediato por Cartão ou PayPal. Para residentes em Angola, disponibilizamos pagamento local simplificado via Multicaixa/IBAN com validação rápida via WhatsApp."
  },
  {
    q: "O que cobre a garantia incondicional de 7 dias?",
    a: "Se ativares a tua licença, duplicares o sistema e concluíres que a estrutura não te entrega clareza mental e ganho de tempo tangível, o reembolso integral é efetuado de imediato, sem burocracia ou constrangimentos."
  },
  {
    q: "Qual o vínculo oficial com a marca Notion?",
    a: "Este é um produto intelectual premium inteiramente projetado, gerido e otimizado pela GlowScalePro, operando de forma autônoma sem patrocínio ou afiliação oficial com a Notion Labs Inc."
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SISTEMA DE TELEMETRIA SILENCIOSA (PRO LEVEL TRACKING)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, any> = {}) => {
    try {
      // Retenção persistente de UTMs no localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmKeys.forEach(key => {
        if (urlParams.has(key)) {
          localStorage.setItem(`ne_persist_${key}`, urlParams.get(key) || "");
        }
      });

      const utmPayload: Record<string, string> = {};
      utmKeys.forEach(key => {
        utmPayload[key] = localStorage.getItem(`ne_persist_${key}`) || "";
      });

      const telemetryEvent = {
        action: eventAction,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        deviceResolution: window.innerWidth,
        deviceCategory: window.innerWidth < 768 ? "mobile" : "desktop",
        ...metadata,
        ...utmPayload
      };

      // Disparo silencioso em background
      // Em conformidade estrita com o prompt: "NÃO mostrar painéis debug ao utilizador."
      const logStack = JSON.parse(localStorage.getItem("ne_telemetry_stack") || "[]");
      logStack.push(telemetryEvent);
      if (logStack.length > 60) logStack.shift();
      localStorage.setItem("ne_telemetry_stack", JSON.stringify(logStack));
    } catch (err) {
      // Operação inócua para prevenir quaisquer perturbações na fluidez de renderização
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ COMPONENTES VISUAIS PREMIUM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Header = memo(({ onRequestScroll }: { onRequestScroll: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
        isScrolled
          ? "header-glass pb-3"
          : "bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent pb-4"
      }`}
    >
      {/* Banner de Urgência (Topo do Site) */}
      <div className="bg-[#0A0A0A] border-b border-white/[0.08] py-2 px-4 text-center mb-4">
        <p className="text-[11px] font-mono text-[#00E5FF] tracking-wide font-medium flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>OFERTA DE LANÇAMENTO: Apenas 14 licenças restantes a $10 / 10.000 AKZ</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Identidade de Luxo Minimalista com Logótipo Oficial - TAMANHO 2.5x (w-[4.5rem] h-[4.5rem] = 72px) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            Telemetry.emit("header_brand_click");
          }}
          className="flex items-center gap-3 group outline-none"
        >
          <img
            src={CONFIG.productLogo}
            alt="Notion Elite Starter Kit 2026"
            className="w-[4.5rem] h-[4.5rem] object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-white tracking-tight flex items-center gap-1.5">
              Notion Elite Starter Kit 2026
            </span>
          </div>
        </a>

        {/* Navegação Fluida (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A1A1AA]">
          <a href="#solucao" className="hover:text-white transition-colors">Ecossistema</a>
          <a href="#modulos" className="hover:text-white transition-colors">Módulos</a>
          <a href="#autoridade" className="hover:text-white transition-colors">Estratégia</a>
          <a href="#provas" className="hover:text-white transition-colors">Validação</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Ações de Estatuto */}
        <div className="flex items-center gap-4">
          <a
            href={CONFIG.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Telemetry.emit("header_support_click")}
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors"
          >
            <Send className="w-3 h-3 text-[#00E5FF]/80" />
            <span>Suporte</span>
          </a>

          <button
            onClick={() => {
              Telemetry.emit("header_cta_click");
              onRequestScroll();
            }}
            className="bg-white text-[#050505] hover:bg-gray-100 text-xs font-medium px-4 py-2 rounded-md transition-all duration-200 active:scale-98 shadow-sm flex items-center gap-1.5 outline-none cursor-pointer"
          >
            <span>Obter Acesso</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Menu Hambúrguer Minimalista */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#A1A1AA] hover:text-white p-1 transition-colors outline-none cursor-pointer"
            aria-label="Alternar navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Retrátil Premium */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/[0.06] bg-[#0A0A0A] mt-3 px-6 py-5 space-y-4 text-xs overflow-hidden"
          >
            <a
              href="#solucao"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Ecossistema Operacional
            </a>
            <a
              href="#modulos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Módulos Cognitivos
            </a>
            <a
              href="#autoridade"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Gabriel Sapalo & Estratégia
            </a>
            <a
              href="#provas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Social Proof Elite
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Perguntas Frequentes
            </a>
            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[#A1A1AA]">
              <span>Assistência Direta:</span>
              <a
                href={CONFIG.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] font-medium flex items-center gap-1"
              >
                <Send className="w-3 h-3" /> Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ HERO SECTION CINEMÁTICA (COM VSL INTEGRADO E LOOP LATERAL)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HeroSection = memo(() => {
  const executeConversion = useCallback((marketSegment: "international" | "angola") => {
    Telemetry.emit("conversion_intent_triggered", { segment: marketSegment });
    if (marketSegment === "international") {
      window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    } else {
      window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
    }
  }, []);

  const [videoActivated, setVideoActivated] = useState(false);
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  // Efeito para alternar os clips representativos do sistema
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClipIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const clips = [
    { label: "00:05 - Ativação do Dashboard", desc: "Sincronização imediata de tarefas ativas." },
    { label: "00:12 - Matriz de Prompts IA", desc: "Geração de resumos instantâneos de aulas." },
    { label: "00:22 - Visão de Calendário", desc: "Prevenção preditiva de sobreposições." },
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-6xl mx-auto text-center grid-luxury-bg">
      {/* Glow Ambiental Subtil */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-gradient from-[#00E5FF]/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Título Monumental Exigido */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[10px] font-mono text-[#00E5FF] tracking-widest uppercase font-semibold mb-3"
      >
        O SISTEMA DE ESTRATÉGIA QUE ORGANIZA A SUA VIDA EM 24 HORAS.
      </motion.h2>

      {/* Promessa Central Obrigatória (Imutável) */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="premium-heading text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl mx-auto mb-6"
      >
        Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas.
      </motion.h1>

      {/* Subheadline Rigorosa */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-12 font-normal"
      >
        Para estudantes, profissionais e criadores que estão cansados de perder prazos, acumular tarefas e viver a apagar incêndios todas as semanas.
      </motion.p>

      {/* Player Minimalista e Loop Vivo (Lado a Lado na Hero) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="grid lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-12 items-stretch"
      >
        {/* VSL Minimalista (2 colunas) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="video-luxury-container w-full h-full shadow-2xl">
            {!videoActivated ? (
              <div
                onClick={() => {
                  setVideoActivated(true);
                  Telemetry.emit("vsl_video_playback_started");
                }}
                className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]"
              >
                <img
                  src={CONFIG.laptopOffer}
                  alt="Pré-visualização do ecossistema"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-400"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                <div className="relative z-10 w-14 h-14 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-[#050505] translate-x-0.5" />
                </div>
                <p className="relative z-10 text-xs font-semibold text-white mt-3 tracking-wide group-hover:text-[#00E5FF] transition-colors">
                  Assistir à Demonstração (3 Minutos)
                </p>
              </div>
            ) : (
              <iframe
                src={`${CONFIG.heroVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Demonstração Notion Elite Kit"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Clipe do Sistema Vivo na Lateral (1 coluna) */}
        <div className="card-luxury p-5 flex flex-col justify-between bg-[#0A0A0A] border-white/[0.08]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono text-[#00E5FF] uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                Sistema Vivo em Loop
              </span>
              <span className="text-[9px] font-mono text-[#A1A1AA]">00:05 - 00:25</span>
            </div>
            
            {/* Visualizador Rotativo em Loop */}
            <div className="relative rounded-lg overflow-hidden border border-white/[0.05] bg-[#050505] aspect-video mb-4 flex items-center justify-center">
              <img
                src={CONFIG.internalView}
                alt="Live Clip View"
                className="w-full h-full object-cover opacity-70 transition-all duration-700"
                style={{ filter: `hue-rotate(${activeClipIndex * 45}deg) brightness(1.1)` }}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/[0.05] text-[9px] font-mono text-white truncate text-center">
                {clips[activeClipIndex].label}
              </div>
            </div>

            <p className="text-xs font-semibold text-white mb-1">
              Transmissão Dinâmica
            </p>
            <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
              {clips[activeClipIndex].desc}
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.04] mt-4 flex items-center justify-between text-[9px] font-mono text-[#A1A1AA]">
            <span>Estado da Matriz</span>
            <span className="text-[#25D366] font-semibold">Online</span>
          </div>
        </div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ♟️ BOTÕES DE CONVERSÃO IRRESISTÍVEIS (FLUXO INTERNACIONAL E ANGOLA)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {/* CTA Internacional */}
          <button
            onClick={() => executeConversion("international")}
            className="w-full bg-[#101010] hover:bg-[#141414] border border-white/[0.08] hover:border-[#00E5FF]/40 p-4 rounded-xl transition-all duration-300 group relative flex flex-col justify-between cursor-pointer outline-none shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#A1A1AA] tracking-wider uppercase font-semibold">
                  Mercado Global
                </span>
                <CreditCard className="w-3.5 h-3.5 text-[#00E5FF]" />
              </div>
              <p className="text-xs font-semibold text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>Adquirir via Hotmart</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Processamento seguro Cartão / PayPal</p>
          </button>

          {/* CTA Angola */}
          <button
            onClick={() => executeConversion("angola")}
            className="w-full bg-[#101010] hover:bg-[#141414] border border-white/[0.08] hover:border-[#25D366]/40 p-4 rounded-xl transition-all duration-300 group relative flex flex-col justify-between cursor-pointer outline-none shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#A1A1AA] tracking-wider uppercase font-semibold">
                  Mercado Angola
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              </div>
              <p className="text-xs font-semibold text-white group-hover:text-[#25D366] transition-colors flex items-center gap-1">
                <span>Pagar via Multicaixa / IBAN</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </p>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Atendimento de acesso via WhatsApp</p>
          </button>
        </div>
      </motion.div>

      {/* Mockup Cinematográfico Gigante */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] p-2.5 max-w-5xl mx-auto shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent" />
        <img
          src={CONFIG.notionMockup}
          alt="Ecossistema Operacional Notion Elite Kit"
          className="w-full h-auto rounded-lg object-cover block"
          loading="eager"
        />
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
          <span className="bg-[#050505]/90 border border-white/[0.08] text-[10px] text-[#00E5FF] px-3 py-1 rounded-full font-mono backdrop-blur-md">
            Cockpit Operacional Centralizado
          </span>
        </div>
      </motion.div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ ESPAÇO DE REFORÇO (A PROVA DO WALKTHROUGH INTERNO) - VÍDEO ATUALIZADO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const WalkthroughSection = memo(() => {
  const [activeWalkthrough, setActiveWalkthrough] = useState(false);

  return (
    <section className="py-24 border-t border-white/[0.05] px-6 max-w-5xl mx-auto text-center">
      <div className="mb-12 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
          Espaço de Reforço Operacional
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Veja a Engenharia em Ação
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Inspeção imersiva às bases de dados avançadas e ao funcionamento da inteligência artificial dentro da matriz.
        </p>
      </div>

      {/* Container de vídeo 16:9 com bordas suaves e profundidade shadow-2xl */}
      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] aspect-video shadow-2xl max-w-4xl mx-auto">
        {!activeWalkthrough ? (
          <div
            onClick={() => {
              setActiveWalkthrough(true);
              Telemetry.emit("walkthrough_video_triggered");
            }}
            className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]"
          >
            <img
              src={CONFIG.internalView}
              alt="Walkthrough do Ecossistema Interno"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 w-16 h-16 rounded-full bg-[#00E5FF] text-[#050505] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
            </div>
            <p className="relative z-10 text-xs font-semibold text-white mt-4 tracking-wide group-hover:text-[#00E5FF] transition-colors">
              Iniciar Navegação Guiada na Base de Dados
            </p>
            <span className="relative z-10 text-[10px] text-[#A1A1AA] mt-1 font-mono">
              Alta Fidelidade • Sem Edições
            </span>
          </div>
        ) : (
          <iframe
            src={`${CONFIG.walkthroughVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Walkthrough Interno do Sistema"
            className="w-full h-full absolute inset-0 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SECTION DE DOR (DIAGNÓSTICO DO ATRITO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PainSection = memo(() => {
  return (
    <section className="py-24 border-t border-white/[0.05] px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1">
          <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-3 font-semibold">
            O Diagnóstico
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl text-white leading-tight">
            A paralisia gerada pela dispersão.
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-4 leading-relaxed">
            Trabalhar com extrema intensidade sobre um sistema inexistente gera sobrecarga inevitável e fadiga de decisão.
          </p>
        </div>

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {PAIN_POINTS.map((pain, i) => (
            <div
              key={i}
              className="card-luxury p-5 flex flex-col justify-between text-left"
            >
              <div>
                <span className="text-[10px] font-mono text-[#A1A1AA]/40 block mb-2 font-semibold">
                  0{i + 1}
                </span>
                <h3 className="text-xs font-semibold text-white mb-1.5">{pain.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{pain.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SECTION DE SOLUÇÃO (O COCKPIT DE PRODUTIVIDADE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SolutionSection = memo(() => {
  return (
    <section id="solucao" className="py-24 bg-[#0A0A0A] border-y border-white/[0.05] px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
            A Extensão Cognitiva
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl text-white">
            Um centro de comando concebido para fluidez e velocidade mental.
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-3">
            O Notion Elite Kit não é um aglomerado de templates soltos. É um ecossistema operacional centralizado que funciona como o teu cérebro digital primário.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-left">
            {[
              {
                title: "Sistema Operacional Pessoal",
                desc: "Estrutura imaculada que interliga entregas académicas, projetos profissionais e gestão financeira sem necessidade de alternar interfaces."
              },
              {
                title: "Cockpit de Produtividade",
                desc: "Visualização panorâmica que elimina fricção diária. Sabes exatamente o que fazer hoje, amanhã e durante a totalidade do semestre."
              },
              {
                title: "Implementação Ultra Rápida",
                desc: "Acompanhado de uma metodologia cirúrgica para que instales e domines o ecossistema na íntegra em menos de 24 horas."
              }
            ].map((sol, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 text-[#00E5FF]">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white mb-1">{sol.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#050505] shadow-2xl">
            <img
              src={CONFIG.coverImage}
              alt="Visão do Ecossistema Interno"
              className="w-full h-auto object-cover block opacity-95"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SECTION DE MÓDULOS PREMIUM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ModulesSection = memo(() => {
  return (
    <section id="modulos" className="py-24 border-b border-white/[0.05] px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-3 font-semibold">
          Arquitetura do Ecossistema
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          6 Módulos concebidos com precisão cirúrgica
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Cada bloco atua como um acelerador cognitivo para desbloquear execução imediata.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULES.map((mod, idx) => {
          const LucideIcon = mod.icon;
          return (
            <div
              key={idx}
              className="card-luxury p-5 flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-7 h-7 rounded-md bg-white/[0.05] text-[#00E5FF] flex items-center justify-center mb-4 border border-white/[0.05]">
                  <LucideIcon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-semibold text-white mb-1.5">{mod.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{mod.description}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.04] flex justify-between items-center text-[9px] font-mono text-[#A1A1AA]">
                <span>Módulo de Elite</span>
                <span className="text-[#00E5FF] font-semibold">Ativo</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SECTION DE AUTORIDADE (GABRIEL SAPALO) - TEXTO ATUALIZADO (SEM GEPE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const AuthoritySection = memo(() => {
  return (
    <section id="autoridade" className="py-24 border-b border-white/[0.05] px-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10 items-center">
        <div className="md:col-span-1 text-center md:text-left">
          <div className="w-36 h-36 rounded-full overflow-hidden border border-white/[0.1] bg-[#101010] mx-auto md:mx-0 shadow-xl">
            <img
              src={CONFIG.authorPhoto}
              alt={CONFIG.authorName}
              className="w-full h-full object-cover filter grayscale contrast-125"
              loading="lazy"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-white">{CONFIG.authorName}</h3>
            <p className="text-[10px] text-[#00E5FF] font-mono mt-0.5 font-semibold">Campeão Nacional de Xadrez 2024 • Estratega</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 text-xs text-[#A1A1AA] leading-relaxed text-left">
          <span className="text-[10px] font-mono tracking-widest text-white uppercase block font-semibold">
            ━━━━━━━━━━━━━━━━━━━
            👤 PERFIL ESTRATÉGICO (GABRIEL SAPALO)
            ━━━━━━━━━━━━━━━━━━━
          </span>
          <p className="text-sm font-semibold text-white">
            "No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece exatamente o mesmo: quem não tem sistema, joga no improviso e falha."
          </p>
          <p>
            Gabriel Sapalo, <strong>Campeão Nacional Absoluto de Xadrez de Angola 2024</strong>, consolidou a sua carreira na intersecção entre o Planeamento Estatístico e a Psicologia Analítica.
          </p>
          <p>
            Com uma especialização em Contabilidade e Auditoria e vasta experiência na gestão de fluxos de informação, Gabriel utilizou a sua visão de <strong>Estratega</strong> para modelar o <em>Notion Elite Kit</em>. O sistema não é um template; é uma infraestrutura de inteligência de dados desenhada para otimizar fluxos cognitivos complexos, assegurando execução absoluta e zero fricção técnica.
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SOCIAL PROOF ULTRA PREMIUM (FOCO NO ROSTO SÉNIOR)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SocialProofSection = memo(() => {
  return (
    <section id="provas" className="py-24 border-b border-white/[0.05] px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-3 font-semibold">
          Evidências Operacionais
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Validação por mentes focadas em execução
        </h2>
      </div>

      {/* Bento Grid Otimizado com Escala de Avatares Duplicada */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {TESTIMONIALS.map((t, idx) => {
          const isLarge = idx === 0 || idx === 3;
          return (
            <div
              key={idx}
              className={`card-luxury p-6 flex flex-col justify-between text-left ${
                isLarge ? "md:col-span-2 bg-[#0E0E0E]" : "md:col-span-1 bg-[#0A0A0A]"
              }`}
            >
              <div>
                {/* Posicionamento do Rosto em Grande Destaque à Esquerda / Topo */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/[0.04]">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-[#050505] shrink-0 border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#00E5FF] fill-[#00E5FF]" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-white leading-tight truncate">{t.name}</p>
                    <p className="text-[10px] text-[#00E5FF] font-mono mt-0.5 truncate">{t.role}</p>
                    <p className="text-[9px] text-[#A1A1AA] font-mono truncate">{t.location}</p>
                  </div>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed italic">
                  “{t.text}”
                </p>
              </div>

              <div className="mt-4 pt-2 text-[9px] font-mono text-gray-600 text-right">
                Identidade Verificada
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ VITRINE DE BÓNUS DE ELITE (INVISÍVEIS AGORA VISÍVEIS)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BonusSection = memo(() => {
  const extraTechModules = [
    {
      badge: "Integração Neural",
      title: "Protocolo de Aceleração IA (Engine 2026)",
      desc: "Implementação nativa de 20 comandos neurais de elite prontos a desbloquear sínteses, flashcards e planeamentos automáticos.",
      highlight: true
    },
    {
      badge: "Arquitetura de Transição",
      title: "Framework de Implementação Crítica 24H",
      desc: "Metodologia de migração passo a passo projetada para transferires os teus fluxos dispersos para a matriz em tempo recorde.",
      highlight: true
    },
    {
      badge: "Alta Retenção",
      title: "Sistema de Revisão Ativa Feynman-Pomodoro",
      desc: "Estruturas embutidas com base na ciência da aprendizagem para otimização contínua de ciclos de estudo sem saturação mental.",
      highlight: false
    }
  ];

  const coreBonuses = [
    { title: "Guia Prático de Implementação (PDF)", desc: "Manual de arquitetura tática para aceleração inicial e adoção sem atrito." },
    { title: "Sistema Anti-Procrastinação 'Porto Seguro'", desc: "Mecanismo neuro-operacional para resgatar e preservar o foco diário." },
    { title: "Organizador Financeiro de Elite", desc: "Módulo integrado de orçamentação e alocação analítica de recursos." },
    { title: "Habit Tracker Pro 2026", desc: "Monitorização e analítica preditiva de hábitos com retroalimentação visual." }
  ];

  return (
    <section className="py-24 bg-[#050505] border-b border-white/[0.05] px-6 max-w-5xl mx-auto text-left">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
          Camadas de Ativação Cognitiva
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Módulos de Tecnologia Extra & Ativos de Aceleração
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Extensões operacionais de estatuto sénior incorporadas incondicionalmente na tua licença.
        </p>
      </div>

      {/* Módulos de Tecnologia Extra Sénior */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {extraTechModules.map((m, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
              m.highlight
                ? "bg-[#0A0A0A] border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.05)]"
                : "bg-[#080808] border-white/[0.08]"
            }`}
          >
            <div>
              <span className={`text-[9px] font-mono uppercase block mb-2 font-semibold ${m.highlight ? "text-[#00E5FF]" : "text-[#A1A1AA]"}`}>
                {m.badge}
              </span>
              <h3 className="text-xs font-bold text-white mb-2">{m.title}</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{m.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] font-mono text-gray-500">
              Acesso Imediato Integrado
            </div>
          </div>
        ))}
      </div>

      {/* Vitrine de Ativos Adicionais */}
      <div className="pt-6 border-t border-white/[0.04]">
        <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-4 text-center font-semibold">
          Componentes Operacionais Complementares
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreBonuses.map((b, i) => (
            <div key={i} className="bg-[#080808] border border-white/[0.04] p-4 rounded-lg hover:border-white/[0.1] transition-all">
              <span className="text-[9px] font-mono text-[#00E5FF] block mb-1">
                Ativo 0{i + 1}
              </span>
              <h4 className="text-[11px] font-semibold text-white mb-1">{b.title}</h4>
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ OFERTA PREMIUM (SENSAÇÃO DE SOFTWARE CARO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PremiumOfferSection = memo(() => {
  const routeToCheckout = useCallback((segment: "international" | "angola") => {
    Telemetry.emit("offer_checkout_button_click", { segment });
    if (segment === "international") {
      window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    } else {
      window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <section id="oferta" className="py-24 bg-[#0A0A0A] border-b border-white/[0.05] px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
            Licenciamento Exclusivo
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl text-white">
            Acesso integral e vitalício ao ecossistema
          </h2>
        </div>

        <div className="border border-white/[0.08] bg-[#101010] rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden text-left">
          {/* Efeito luminoso muito suave de destaque */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Bloco Esquerdo: Preço e Valor Sénior */}
            <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-white/[0.06] pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider block mb-1 font-semibold">
                Investimento Único
              </span>
              <div className="text-xs text-[#A1A1AA] mb-0.5">
                Preço sugerido: <span className="line-through font-mono text-gray-500">$97</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-0.5">
                Preço Especial <br />
                <span className="text-[#00E5FF]">$10</span>
                <span className="text-xs block text-gray-400 mt-1 font-mono font-normal">
                  ou 10.000 AKZ
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] mt-3 leading-relaxed">
                Sem mensalidades. Acesso integral a todas as atualizações e pacotes de aceleração IA embutidos.
              </p>
            </div>

            {/* Bloco Direito: Entregáveis */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-xs font-semibold text-white block">
                O teu estatuto operacional inclui:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Acesso Vitalício",
                  "Setup Concluído em 24h",
                  "Garantia de 7 Dias",
                  "Suporte Premium",
                  "Acesso à Comunidade",
                  "Atualizações Futuras"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    <Check className="w-3 h-3 text-[#00E5FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  ♟️ BOTÕES ABSOLUTOS DE CHECKOUT
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className="pt-4 space-y-2.5">
                <div>
                  <button
                    onClick={() => routeToCheckout("international")}
                    className="w-full btn-luxury-cyan py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer outline-none"
                  >
                    <span>Adquirir via Hotmart (Cartão / PayPal)</span>
                    <ExternalLink className="w-3 h-3 text-[#050505]" />
                  </button>
                  <p className="text-[9px] text-[#A1A1AA]/70 text-center mt-1 font-medium">
                    Processamento global instantâneo
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => routeToCheckout("angola")}
                    className="w-full btn-luxury-dark py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                  >
                    <span>Pagar via Multicaixa / IBAN (10.000 AKZ)</span>
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  </button>
                  <p className="text-[9px] text-[#A1A1AA]/70 text-center mt-1 font-medium">
                    Ativação local com encaminhamento via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reiteração Psicológica de Confiança */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#A1A1AA] flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 text-[#00E5FF]" />
            <span>Garantia absoluta de 7 dias. Retorno garantido caso o sistema não duplique a tua clareza.</span>
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ FAQ (DESTRUIÇÃO DE OBJEÇÕES DE FORMA TÉCNICA)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FAQSection = memo(() => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleToggle = useCallback((index: number, questionStr: string) => {
    setActiveFaq(prev => {
      const nextState = prev === index ? null : index;
      if (nextState !== null) {
        Telemetry.emit("faq_item_viewed", { question: questionStr });
      }
      return nextState;
    });
  }, []);

  return (
    <section id="faq" className="py-24 border-b border-white/[0.05] px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-3 font-semibold">
          Esclarecimentos Base
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Perguntas Frequentes
        </h2>
      </div>

      <div className="space-y-2.5">
        {FAQ_DATA.map((item, i) => {
          const isOpen = activeFaq === i;
          return (
            <div
              key={i}
              className="bg-[#101010] border border-white/[0.05] rounded-lg overflow-hidden transition-colors text-left"
            >
              <button
                onClick={() => handleToggle(i, item.q)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors outline-none cursor-pointer text-xs font-semibold text-white"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="text-gray-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#00E5FF]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#A1A1AA]" />}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="px-4 pb-4 text-xs text-[#A1A1AA] border-t border-white/[0.04] pt-3 leading-relaxed font-normal"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ CTA FINAL MANDATÓRIO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FinalCTASection = memo(({ onSelectFlow }: { onSelectFlow: (type: "international" | "angola") => void }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#050505] px-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-semibold">
          Estatuto de Eficiência
        </span>

        {/* Headline Obrigatória */}
        <h2 className="premium-heading text-3xl sm:text-4xl text-white max-w-xl mx-auto">
          “Daqui a 6 meses vais desejar ter começado hoje.”
        </h2>

        <p className="text-xs text-[#A1A1AA] max-w-lg mx-auto leading-relaxed">
          Podes continuar a apagar incêndios todas as semanas ou montar um ecossistema operacional premium que te devolve clareza e execução inevitável.
        </p>

        <div className="pt-4 max-w-sm mx-auto space-y-2.5 text-left">
          <button
            onClick={() => {
              Telemetry.emit("final_conversion_cta_click", { flow: "international" });
              onSelectFlow("international");
            }}
            className="w-full bg-white hover:bg-gray-100 text-[#050505] text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between shadow cursor-pointer outline-none"
          >
            <span>Acesso Global (Hotmart)</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => {
              Telemetry.emit("final_conversion_cta_click", { flow: "angola" });
              onSelectFlow("angola");
            }}
            className="w-full bg-[#101010] hover:bg-[#141414] border border-white/[0.08] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer outline-none"
          >
            <span>Acesso Angola (Multicaixa / IBAN)</span>
            <ArrowRight className="w-3 h-3 text-[#25D366]" />
          </button>

          <p className="text-[10px] text-[#A1A1AA]/60 text-center pt-2 font-mono">
            Investimento único: 10 USD / 10.000 AKZ
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ RODAPÉ LEGAL PREMIUM & TRANSPARÊNCIA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LegalFooter = memo(() => {
  return (
    <footer className="border-t border-white/[0.05] bg-[#050505] pt-12 pb-16 px-6 text-xs text-[#A1A1AA]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.05] text-left">
          {/* Alinhamento estrito exigido: Flex-row, items-center, gap-3 na mesma linha horizontal */}
          <div className="flex items-center gap-3">
            <img
              src={CONFIG.glowscaleLogo}
              alt="GlowScalePro Logótipo"
              className="w-5 h-5 object-contain filter grayscale contrast-200 select-none pointer-events-none opacity-80"
            />
            <span className="font-bold text-white tracking-tight text-xs">GlowScalePro</span>
            <span className="text-white/[0.1]">/</span>
            <span className="text-white font-medium text-xs">{CONFIG.authorName}</span>
          </div>

          <p className="text-[10px] text-[#A1A1AA]/60 max-w-md text-center sm:text-right leading-relaxed">
            Arquitetura operacional de alta performance desenvolvida de forma independente. Sem afiliação ou patrocínio institucional da Notion Labs Inc.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 text-[11px] text-left">
          <div>
            <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">
              Conformidade
            </p>
            <ul className="space-y-2">
              <li>
                <a href={CONFIG.termsOfUse} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Termos de Utilização
                </a>
              </li>
              <li>
                <a href={CONFIG.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Privacidade de Dados
                </a>
              </li>
              <li>
                <a href={CONFIG.cookiePolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">
              Atendimento e Canais
            </p>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-white transition-colors">
                  Correio Eletrónico
                </a>
              </li>
              <li>
                <a href={CONFIG.telegramSupport} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Chat Telegram</span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-600" />
                </a>
              </li>
              <li>
                <a href={CONFIG.communityLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Comunidade WhatsApp</span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-600" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">
              Especificações Técnicas
            </p>
            <p className="text-[#A1A1AA]/80 text-[10px] leading-relaxed">
              Notion Elite Kit 2026. <br />
              Otimizado nativamente sob design responsivo extremo para LCP mínimo e fluidez cognitiva máxima.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#A1A1AA]/60">
          <p>© 2026 Gabriel Sapalo. Ecossistema licenciado internacionalmente.</p>
          <p className="font-mono text-[9px]">Black Interface Architecture v4.0</p>
        </div>
      </div>
    </footer>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ APLICAÇÃO DE ELITE (ROOT ECOSYSTEM) - COM FAVICONS ADICIONADOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function App() {
  // Configuração inicial de monitorização em conformidade com o prompt
  useEffect(() => {
    Telemetry.emit("page_fully_loaded", { referrer: document.referrer });

    // Rastreamento silencioso de tempo decorrido
    const t30 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 30 }), 30000);
    const t60 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 60 }), 60000);
    const t120 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 120 }), 120000);

    // Monitorização passiva de profundidade de deslocamento (Scroll Tracking)
    const marks = new Set<number>();
    const handlePassiveScroll = () => {
      const currentScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height <= 0) return;
      
      const percentage = Math.round((currentScroll / height) * 100);
      [25, 50, 75, 90].forEach(p => {
        if (percentage >= p && !marks.has(p)) {
          marks.add(p);
          Telemetry.emit("scroll_depth_milestone", { scrollPercent: p });
        }
      });
    };

    window.addEventListener("scroll", handlePassiveScroll, { passive: true });

    return () => {
      clearTimeout(t30);
      clearTimeout(t60);
      clearTimeout(t120);
      window.removeEventListener("scroll", handlePassiveScroll);
    };
  }, []);

  // Interação centralizada de scroll para os botões de chamada primária
  const executeScrollToOffer = useCallback(() => {
    const offerBlock = document.getElementById("oferta");
    if (offerBlock) {
      offerBlock.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Roteamento encapsulado do bloco final
  const handleFinalChoice = useCallback((segment: "international" | "angola") => {
    if (segment === "international") {
      window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    } else {
      window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
    }
  }, []);

  // JSON-LD Schemas Avançados para motores de busca exigentes
  const productSchemaLD = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Notion Elite Kit 2026",
    "image": CONFIG.productLogo,
    "description": "Ecossistema operacional premium em Notion concebido para dominar rotinas e gerir frentes profissionais e académicas complexas.",
    "brand": {
      "@type": "Brand",
      "name": "GlowScalePro"
    },
    "offers": {
      "@type": "Offer",
      "url": CONFIG.hotmartCheckout,
      "priceCurrency": "USD",
      "price": "10.00",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchemaLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="cinematic-noise min-h-screen bg-[#050505] text-white font-sans relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ♟️ CAMADA DE METADADOS & SEO ELITE (HELMET) - COM FAVICONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Helmet>
        <title>Notion Elite Kit 2026 — Ecossistema Operacional Premium</title>
        <meta name="description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas. Arquitetura minimalista de alto desempenho cognitivo." />
        <link rel="canonical" href={window.location.href} />
        
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ♟️ FAVICONS ADICIONADOS (CORRETAMENTE IMPLEMENTADOS)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Favicon padrão (desktop) */}
        <link rel="icon" type="image/x-icon" href="https://drive.google.com/thumbnail?id=14rQjLyO4yBn0J4Xm36JyXhc3uK7B1v1k&sz=64" />
        
        {/* Apple Touch Icon (iOS, iPadOS) */}
        <link rel="apple-touch-icon" sizes="180x180" href="https://drive.google.com/thumbnail?id=14ObH6mZWZH-UOVfLxze-6BTMLed9L7IZ&sz=180" />
        
        {/* PWA Icon - Android/Chrome (192x192) */}
        <link rel="icon" type="image/png" sizes="192x192" href="https://drive.google.com/thumbnail?id=1e87UtUWFWZwHlXjOUX8mxEg55rGiePko&sz=192" />
        
        {/* Suporte para modo web app mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Notion Elite" />
        <meta name="application-name" content="Notion Elite Kit" />
        
        {/* Tema de cor para navegadores mobile */}
        <meta name="theme-color" content="#050505" />
        <meta name="msapplication-TileColor" content="#050505" />
        
        {/* Open Graph Tags Cinemáticas */}
        <meta property="og:title" content="Notion Elite Kit 2026 — Ecossistema Operacional Premium" />
        <meta property="og:description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas." />
        <meta property="og:image" content={CONFIG.notionMockup} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Notion Elite Kit" />
        
        {/* Twitter Cards Elegantes */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Notion Elite Kit 2026 — Ecossistema Operacional Premium" />
        <meta name="twitter:description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas." />
        <meta name="twitter:image" content={CONFIG.notionMockup} />

        {/* Injeção limpa de JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(productSchemaLD)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaLD)}
        </script>
      </Helmet>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ♟️ RENDERIZAÇÃO ORQUESTRAMENTO DE INTERFACE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Header onRequestScroll={executeScrollToOffer} />
      <HeroSection />
      <WalkthroughSection />
      <PainSection />
      <SolutionSection />
      <ModulesSection />
      <AuthoritySection />
      <SocialProofSection />
      <BonusSection />
      <PremiumOfferSection />
      <FAQSection />
      <FinalCTASection onSelectFlow={handleFinalChoice} />
      <LegalFooter />

      {/* Botão Flutuante de Conversão Imediata (Canto Inferior Direito) */}
      <a
        href={CONFIG.whatsappPayment}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => Telemetry.emit("floating_conversion_button_click")}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-[#050505] p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 outline-none cursor-pointer flex items-center justify-center group"
        aria-label="Suporte Mestre Gabriel via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-[#050505] fill-[#050505]" />
        <span className="absolute right-full mr-2.5 bg-[#050505] text-[#FFFFFF] text-[10px] font-mono px-2 py-1 rounded border border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-semibold">
          Suporte Mestre Gabriel
        </span>
      </a>
    </div>
  );
}

export default App;
