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
  Send,
  Flame,
  CheckCircle,
  TrendingUp
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
  mockupExtra1: "https://drive.google.com/thumbnail?id=1Gv_vB4wENBXyiaQi1iD3UyuXkTvXg8sc&sz=w1000",
  mockupExtra2: "https://drive.google.com/thumbnail?id=1o79_tWug5lCJ2kI3T4yz0vJOm5wQ2P70&sz=w1000",
  videoDemonstracaoReal: "https://drive.google.com/file/d/1qzelqkdoxr_828C4OhgonEMzJNdMKCsa/preview",

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



const FAQ_DATA = [
  {
    q: "Preciso saber usar Notion?",
    a: "Absolutamente não. O ecossistema foi construído para que iniciantes operem perfeitamente. Acompanha um método de migração tática passo a passo para que saias do caos ao controlo total em menos de 24 horas."
  },
  {
    q: "Funciona perfeitamente no celular?",
    a: "Sim! Adotamos um design mobile-first de altíssima resposta. Podes adicionar tarefas, registrar ideias ou visualizar compromissos urgentes de forma instantânea diretamente na palma da mão."
  },
  {
    q: "O sistema exige uma assinatura paga do Notion?",
    a: "Não. Toda a engenharia foi desenhada para extrair 100% da versão nativa gratuita do Notion, poupando-te de quaisquer custos mensais com ferramentas."
  },
  {
    q: "Tenho acesso vitalício e recebo atualizações?",
    a: "Sim, o pagamento é único com direito a acesso vitalício. Além disso, recebes todas as atualizações estratégicas e melhorias futuras de 2026 e 2027 incondicionalmente."
  },
  {
    q: "Como recebo o acesso ao ecossistema?",
    a: "A entrega é inteiramente imediata e digital. Assim que o pagamento for processado pela Hotmart ou validado via WhatsApp para Angola, o link de ativação segura é enviado para o teu e-mail instantaneamente."
  },
  {
    q: "Como funciona a garantia incondicional de 30 dias?",
    a: "Confiamos plenamente na arquitetura do sistema. Testa a totalidade da ferramenta durante 30 dias. Se não transformares o teu foco e a tua organização, devolvemos 100% do valor de imediato e tu ainda manténs os bônus como cortesia."
  }
];

// SIMULAÇÃO DE NOTIFICAÇÕES DE COMPRA VIRAL
const NOTIFICATIONS = [
  { name: "Lucas R.", item: "Notion Elite Kit 2026", time: "Há 2 min" },
  { name: "Marta S.", item: "Pacote Aceleração IA", time: "Há 5 min" },
  { name: "Tiago M.", item: "Notion Elite Kit 2026", time: "Há 12 min" },
  { name: "Inês P.", item: "Bônus Feynman-Pomodoro", time: "Há 18 min" },
  { name: "Rui C.", item: "Notion Elite Kit 2026", time: "Há 25 min" }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SISTEMA DE TELEMETRIA SILENCIOSA (PRO LEVEL TRACKING)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, any> = {}) => {
    try {
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

      const logStack = JSON.parse(localStorage.getItem("ne_telemetry_stack") || "[]");
      logStack.push(telemetryEvent);
      if (logStack.length > 60) logStack.shift();
      localStorage.setItem("ne_telemetry_stack", JSON.stringify(logStack));
    } catch (err) {
      // Ignora falhas silenciosamente
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
      {/* Banner de Lançamento Privado (Sem Escassez Excessiva) */}
      <div className="bg-[#0A0A0A] border-b border-white/[0.08] py-2 px-4 text-center mb-4">
        <p className="text-[11px] font-mono text-[#00E5FF] tracking-wide font-medium flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>Preço Fundador de Lançamento Ativo — o valor de acesso subirá após o término desta campanha</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Identidade de Luxo Minimalista com Logótipo Oficial aumentado 2x para máxima visibilidade */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            Telemetry.emit("header_brand_click");
          }}
          className="flex items-center gap-3.5 group outline-none"
        >
          <img
            src={CONFIG.productLogo}
            alt="Notion Elite Starter Kit 2026"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm text-white tracking-tight flex items-center gap-1.5">
              Notion Elite Starter Kit 2026
            </span>
          </div>
        </a>

        {/* Navegação Fluida (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A1A1AA]">
          <a href="#solucao" className="hover:text-white transition-colors">Ecossistema</a>
          <a href="#engenharia" className="hover:text-white transition-colors">Demonstração</a>
          <a href="#modulos" className="hover:text-white transition-colors">Módulos</a>
          <a href="#bonus" className="hover:text-white transition-colors">Bônus VIP</a>
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
            className="btn-magnetic-aggressive text-xs px-4 py-2 rounded-md shadow-lg flex items-center gap-1.5 outline-none cursor-pointer"
          >
            <span>Garantir Vaga</span>
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
              href="#engenharia"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Vídeo Demonstração Real
            </a>
            <a
              href="#modulos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Módulos de Alta Conversão
            </a>
            <a
              href="#bonus"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Bônus Progressivos VIP
            </a>
            <a
              href="#provas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white font-medium"
            >
              Prova Social Massiva
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
// ♟️ HERO SECTION CINEMÁTICA E AGRESSIVA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HeroSection = memo(({ onExecuteConversion }: { onExecuteConversion: (marketSegment: "international" | "angola") => void }) => {
  const [isPlayingVSL, setIsPlayingVSL] = useState(false);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-6xl mx-auto text-center grid-luxury-bg">
      {/* Glow Ambiental Subtil e Agressivo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] gradient-magnetic opacity-15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Badge de Lançamento */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-[#101010] border border-[#FF007A]/40 px-4 py-1.5 rounded-full text-xs text-white mb-6 custom-badge-glow"
      >
        <Flame className="w-3.5 h-3.5 text-[#FF007A] animate-bounce" />
        <span className="font-bold tracking-wide text-gradient-magnetic">LANÇAMENTO EXCLUSIVO 89% OFF</span>
      </motion.div>

      {/* Movimento e Identidade (Pertencimento) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-[10px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 px-3 py-1 rounded-md tracking-widest font-bold uppercase inline-block">
          ⚡ MOVIMENTO DOS OPERADORES DE ELITE (SECOND BRAIN SOCIETY)
        </span>
      </motion.div>

      {/* Headlines de Transformação Emocional e Paz Mental */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-xs sm:text-sm font-mono text-[#A1A1AA] tracking-tight uppercase font-extrabold mb-2"
      >
        Seu Segundo Cérebro Definitivo para Dominar 2026
      </motion.h2>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="premium-heading text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl mx-auto mb-6 tracking-tight leading-[1.05]"
      >
        Pare de viver no caos. <br />
        <span className="text-gradient-magnetic">Coloque a sua vida em ordem</span> com um único sistema.
      </motion.h1>

      {/* Subheadline Focada no Resultado Emocional (Controle & Paz Mental) */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-sm sm:text-base text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed mb-8 font-normal"
      >
        Troque a sobrecarga contínua e as tarefas espalhadas por absoluto <span className="text-white font-semibold">controle</span>, <span className="text-[#00E5FF] font-semibold">clareza visual</span> e <span className="text-white font-semibold">paz mental</span>. Domine suas metas, finanças e rotina com uma extensão cognitiva infalível construída no Notion.
      </motion.p>

      {/* Ganhos Imediatos: O que muda HOJE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0A0A0A] border border-white/[0.06] p-4 rounded-xl max-w-3xl mx-auto mb-8 text-left shadow-xl"
      >
        <p className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          <span>Nas próximas 24 horas você consegue:</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            "Organizar tarefas atrasadas",
            "Centralizar estudos",
            "Controlar finanças",
            "Planejar a semana",
            "Eliminar excesso de abas",
            "Criar rotina clara"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
              <span className="text-[#00E5FF] font-bold">✓</span>
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* VSL DE VENDA (Vídeo 1 no Topo sem Autoplay Involuntário) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="max-w-4xl mx-auto mb-10"
      >
        <div className="video-luxury-container w-full shadow-[0_0_50px_rgba(0,0,0,0.95)]">
          {!isPlayingVSL ? (
            <div
              onClick={() => {
                setIsPlayingVSL(true);
                Telemetry.emit("vsl_video_playback_started");
              }}
              className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]"
            >
              <img
                src={CONFIG.laptopOffer}
                alt="Pré-visualização da VSL"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-400"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

              <div className="relative z-10 w-16 h-16 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
              </div>
              <p className="relative z-10 text-xs font-bold text-white mt-4 tracking-wide group-hover:text-[#00E5FF] transition-colors">
                Assistir à Apresentação Estratégica (3 Minutos)
              </p>
              <span className="relative z-10 text-[10px] text-[#00E5FF] mt-1 font-mono font-semibold">
                Recomendado assistir com áudio ativado
              </span>
            </div>
          ) : (
            <iframe
              src={`${CONFIG.heroVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="VSL Oficial de Lançamento"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </motion.div>

      {/* CTAS PRINCIPAIS EXTREMAMENTE VISÍVEIS (Ancoragem + Escassez) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        <div className="bg-[#0E0E0E] p-4 rounded-xl border border-white/[0.05] mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-left">
          <div>
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase block font-semibold">Valor Ancorado Oficial</span>
            <p className="text-xs text-[#A1A1AA]">De <span className="line-through font-mono text-gray-500">$97</span> por apenas <strong className="text-[#00E5FF] font-mono font-extrabold text-base">$10</strong></p>
          </div>
          <div className="text-right flex items-center sm:block gap-2">
            <span className="text-[10px] text-white bg-[#FF007A] px-2 py-0.5 rounded font-bold uppercase tracking-tight block">89% de Desconto</span>
            <span className="text-[9px] text-gray-400 font-mono block">Garantia 30 dias</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-left">
          {/* Botão Internacional */}
          <button
            onClick={() => onExecuteConversion("international")}
            className="w-full btn-luxury-cyan py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer outline-none font-extrabold tracking-tight"
          >
            <CreditCard className="w-4 h-4 text-[#050505] shrink-0" />
            <span>Começar Meu Segundo Cérebro ($10)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Botão Angola */}
          <button
            onClick={() => onExecuteConversion("angola")}
            className="w-full btn-magnetic-aggressive py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer outline-none font-extrabold tracking-tight"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0 fill-white" />
            <span>Organizar Minha Vida em 24h (10k AKZ)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[10px] text-[#A1A1AA]/70 text-center pt-1 font-mono">
          Acesso liberado automaticamente para e-mails cadastrados.
        </p>
      </motion.div>

      {/* Mockup Premium Gigante do Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] p-2.5 max-w-5xl mx-auto shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF007A]/40 to-transparent" />
        <img
          src={CONFIG.notionMockup}
          alt="Dashboard Gigante Notion Elite Kit"
          className="w-full h-auto rounded-lg object-cover block"
          loading="eager"
        />
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
          <span className="bg-[#050505]/95 border border-white/[0.08] text-[10px] text-[#00E5FF] px-3 py-1 rounded-full font-mono backdrop-blur-md font-bold">
            Visualização Panorâmica Ultra Premium
          </span>
        </div>
      </motion.div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ O MOMENTO UAU (DECISÃO EMOCIONAL PROGRESSIVA)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MomentoUauSection = memo(() => {
  return (
    <section className="py-24 bg-[#080808] border-b border-white/[0.05] px-6 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E5FF]/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <span className="text-[10px] font-mono text-[#00E5FF] uppercase block mb-3 font-bold tracking-widest">
          Experiência de Decisão em 5 Segundos
        </span>
        
        <h2 className="premium-heading text-3xl sm:text-4xl text-white mb-6 leading-tight">
          Imagine acordar sabendo <span className="text-gradient-magnetic">exatamente o que fazer.</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-12">
          Sem hesitação. Sem a ansiedade do domingo à noite. O seu ecossistema pessoal cuida de cruzar metas, finanças e rotina em segundo plano, libertando a sua mente para focar estritamente na execução.
        </p>

        {/* Pilares de Clareza Extrema */}
        <div className="grid sm:grid-cols-3 gap-6 text-left">
          <div className="bg-[#050505] p-6 rounded-xl border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-lg mb-2 block">🧠</span>
              <h3 className="text-xs font-bold text-white mb-1.5 uppercase tracking-tight">O Que É</h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Uma infraestrutura de dados centralizada no Notion que funciona como uma extensão cognitiva inviolável para o seu cérebro.
              </p>
            </div>
            <span className="mt-4 pt-2 border-t border-white/[0.02] text-[9px] font-mono text-[#00E5FF] block">
              Paz Mental Imediata
            </span>
          </div>

          <div className="bg-[#050505] p-6 rounded-xl border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-lg mb-2 block">🎯</span>
              <h3 className="text-xs font-bold text-white mb-1.5 uppercase tracking-tight">Para Quem É</h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Estudantes sob pressão, criadores e operadores focados em erradicar pontas soltas e alavancar a produtividade sem atrito.
              </p>
            </div>
            <span className="mt-4 pt-2 border-t border-white/[0.02] text-[9px] font-mono text-[#FF007A] block">
              Foco Cirúrgico
            </span>
          </div>

          <div className="bg-[#050505] p-6 rounded-xl border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-lg mb-2 block">⚡</span>
              <h3 className="text-xs font-bold text-white mb-1.5 uppercase tracking-tight">Por Que Comprar Agora</h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Acesso instantâneo com 89% de desconto exclusivo e todos os pacotes de aceleração neurais embutidos sem custos adicionais.
              </p>
            </div>
            <span className="mt-4 pt-2 border-t border-white/[0.02] text-[9px] font-mono text-[#25D366] block">
              Risco Absolutamente Zero
            </span>
          </div>
        </div>

        {/* Citação de Confiança Visual Premium */}
        <div className="mt-10 p-4 rounded-lg bg-white/[0.01] border border-white/[0.03] text-center">
          <p className="text-xs text-gray-400 italic">
            "A simplicidade é o mais alto grau de sofisticação." — A sensação de facilidade que separa o ruído da verdadeira execução.
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ VÍDEO DEMONSTRAÇÃO REAL ("ENGENHARIA EM ACÇÃO")
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EngenhariaSection = memo(() => {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);

  const miniHighlights = [
    { label: "Finanças", desc: "Fluxos preditivos de receita e despesa." },
    { label: "Hábitos", desc: "Métricas diárias com gamificação visual." },
    { label: "Projetos", desc: "Progresso dinâmico de tarefas ativas." },
    { label: "IA", desc: "Matrizes de comandos neurais instantâneos." },
    { label: "Calendário", desc: "Cronograma sincronizado de alta urgência." },
    { label: "Metas", desc: "Desdobramento tático para execução diária." }
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setActiveHighlight(prev => (prev + 1) % miniHighlights.length);
    }, 2500);
    return () => clearInterval(i);
  }, [miniHighlights.length]);

  return (
    <section id="engenharia" className="py-24 border-t border-white/[0.05] px-6 max-w-6xl mx-auto text-center">
      <div className="mb-12 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#FF007A] uppercase block mb-3 font-extrabold">
          Inspeção Operacional de Luxo
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Engenharia em Acção
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Demonstração real do sistema operando sem edições, provando a velocidade e sincronização imbatível da interface.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-stretch text-left max-w-5xl mx-auto">
        {/* Container 16:9 Largo e Elegante (Vídeo 2 de Demonstração Real) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] aspect-video shadow-2xl w-full h-full">
            {!isPlayingDemo ? (
              <div
                onClick={() => {
                  setIsPlayingDemo(true);
                  Telemetry.emit("real_demo_video_played");
                }}
                className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]"
              >
                <img
                  src={CONFIG.internalView}
                  alt="Demonstração Real do Sistema"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-400"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#4CF2FF] text-[#050505] flex items-center justify-center shadow-[0_0_35px_rgba(0,229,255,0.6)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
                </div>
                <p className="relative z-10 text-xs font-bold text-white mt-4 tracking-wide group-hover:text-[#00E5FF] transition-colors">
                  Assistir à Demonstração na Prática
                </p>
                <span className="relative z-10 text-[10px] text-[#00E5FF] mt-1 font-mono font-semibold">
                  Preview Estilo SaaS • Alta Definição
                </span>
              </div>
            ) : (
              <iframe
                src={CONFIG.videoDemonstracaoReal}
                title="Vídeo Demonstração Real Notion Elite"
                className="w-full h-full absolute inset-0 border-0"
                allow="autoplay"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Mini Highlights Estilo SaaS ao Lado */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] p-5 rounded-xl flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-white mb-4 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF007A]" />
              <span>Mini Highlights do Sistema</span>
            </p>
            <div className="space-y-2.5">
              {miniHighlights.map((h, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border transition-all duration-300 ${
                    activeHighlight === i
                      ? "bg-[#141414] border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                      : "bg-[#080808] border-white/[0.02] opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-bold ${activeHighlight === i ? "text-[#00E5FF]" : "text-gray-300"}`}>
                      {h.label}
                    </span>
                    {activeHighlight === i && (
                      <span className="text-[9px] font-mono text-[#FF007A] font-extrabold animate-pulse">Em Foco</span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#A1A1AA] leading-tight">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.04] mt-4 text-[9px] font-mono text-gray-500 text-center">
            Sincronização Absoluta Instantânea
          </div>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SEÇÃO “ANTES VS DEPOIS” (TRANSFORMAÇÃO EMOCIONAL)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TransformacaoSection = memo(() => {
  return (
    <section className="py-24 border-t border-white/[0.05] px-6 max-w-5xl mx-auto text-center">
      <div className="mb-12 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
          Virada de Chave Operacional
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          A Transformação Emocional Definitiva
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Deixe de sobreviver a apagar incêndios e assuma a posição de comando de todas as áreas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch text-left">
        {/* Card ANTES (Caos) */}
        <div className="bg-gradient-to-b from-[#140505] to-[#0A0505] border border-red-500/20 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500/10 text-red-500 font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg">
            A Realidade Comum
          </div>
          <div>
            <p className="text-xs font-mono text-red-500 font-extrabold uppercase mb-1">ANTES DO SISTEMA</p>
            <h3 className="text-lg font-bold text-white mb-4">O Caos Fragmentado</h3>
            <ul className="space-y-3">
              {[
                "Vida desorganizada e rotinas esmagadoras.",
                "Procrastinação operacional por excesso de estímulos.",
                "Tarefas vitais esquecidas e espalhadas por cadernos.",
                "Prazos que surgem como surpresas gerando pânico."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-3 border-t border-red-500/10 text-[10px] text-red-400/80 font-mono">
            Sintoma: Sobrecarga, estresse e estagnação em 2025.
          </div>
        </div>

        {/* Card DEPOIS (Clareza) */}
        <div className="bg-gradient-to-b from-[#05140A] to-[#050A06] border border-[#25D366]/30 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(37,211,102,0.08)]">
          <div className="absolute top-0 right-0 bg-[#25D366]/10 text-[#25D366] font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg">
            A Experiência Elite
          </div>
          <div>
            <p className="text-xs font-mono text-[#25D366] font-extrabold uppercase mb-1">DEPOIS DO KIT ELITE</p>
            <h3 className="text-lg font-bold text-white mb-4">O Cockpit de Execução</h3>
            <ul className="space-y-3">
              {[
                "Clareza mental absoluta e foco cirúrgico instantâneo.",
                "Produtividade automatizada com rotinas de 5 minutos.",
                "Controle total da vida financeira, projetos e metas.",
                "Tranquilidade psicológica para planejar com antecedência."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-200 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-3 border-t border-[#25D366]/10 text-[10px] text-[#25D366] font-mono font-bold">
            Resultado: Domínio e aceleração explosiva em 2026.
          </div>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SECTION DE SOLUÇÃO & MÓDULOS DE ALTA CONVERSÃO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SolucaoModulosSection = memo(() => {
  return (
    <section id="solucao" className="py-24 bg-[#0A0A0A] border-y border-white/[0.05] px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-semibold">
            O Cockpit de Produtividade
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl text-white">
            Extensão Cognitiva e Cérebro Digital
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-2">
            Seis módulos cirurgicamente programados para eliminar distrações e acelerar processos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left mb-12">
          {MODULES.map((mod, idx) => {
            const LucideIcon = mod.icon;
            return (
              <div
                key={idx}
                className="card-luxury p-5 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all duration-300"
              >
                <div>
                  <div className="w-7 h-7 rounded-md bg-white/[0.05] text-[#00E5FF] flex items-center justify-center mb-4 border border-white/[0.05]">
                    <LucideIcon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1.5">{mod.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{mod.description}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.04] flex justify-between items-center text-[9px] font-mono text-[#A1A1AA]">
                  <span>Módulo Inviolável</span>
                  <span className="text-[#00E5FF] font-extrabold">Liberado</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ DESTAQUE ISOLADO 1: MAPEAMENTO TÁTICO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MapeamentoTaticoSection = memo(() => {
  return (
    <section className="py-24 bg-[#050505] border-b border-white/[0.05] px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/[0.03] rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-3 font-extrabold">
            Ênfase Arquitetural
          </span>
          <h2 className="premium-heading text-2xl sm:text-4xl text-white">
            Painel Analítico de Decisão
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-2">
            Cada componente reativo foi disposto milimetricamente para fornecer um panorama imediato de métricas diárias e prioridades intocáveis.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#00E5FF]/20 bg-[#0A0A0A] p-2 sm:p-3 shadow-[0_20px_80px_rgba(0,229,255,0.07)] max-w-4xl mx-auto">
          <img
            src={CONFIG.mockupExtra1}
            alt="Mapeamento Tático Nativo"
            className="w-full h-auto rounded-xl object-cover block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ DESTAQUE ISOLADO 2: REPOSITÓRIO NEURAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const RepositorioNeuralSection = memo(() => {
  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/[0.05] px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF007A]/[0.02] rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-[#FF007A] uppercase block mb-3 font-extrabold">
            Módulo Cérebro Sincronizado
          </span>
          <h2 className="premium-heading text-2xl sm:text-4xl text-white">
            Repositório Neural de IA
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-2">
            Integração fluida concebida para reter anotações densas, acionar atalhos de inteligência artificial e prever sobrecargas antes do colapso.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#FF007A]/20 bg-[#050505] p-2 sm:p-3 shadow-[0_20px_80px_rgba(255,0,122,0.08)] max-w-4xl mx-auto custom-badge-glow">
          <img
            src={CONFIG.mockupExtra2}
            alt="Repositório Neural de IA"
            className="w-full h-auto rounded-xl object-cover block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ BÔNUS PROGRESSIVOS VIP (SEÇÃO VISUAL MUITO FORTE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BonusProgressivosSection = memo(({ onExecuteConversion }: { onExecuteConversion: (seg: "international" | "angola") => void }) => {
  return (
    <section id="bonus" className="py-24 bg-[#050505] border-b border-white/[0.05] px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-[#FF007A] uppercase block mb-3 font-extrabold">
            Desbloqueios de Impacto Imediato
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl text-white">
            Bônus Progressivos VIP de Lançamento
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-2">
            Uma estrutura visual agressiva acumulando ativos de ponta para criar a sensação de oferta irresistivelmente absurda.
          </p>
        </div>

        <div className="space-y-5 text-left max-w-4xl mx-auto">
          {/* Nível Base */}
          <div className="bg-[#0A0A0A] border border-white/[0.05] p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono bg-white/10 text-white px-2 py-0.5 rounded font-bold uppercase">Nível Universal (Todos Recebem)</span>
              <h3 className="text-sm font-bold text-white mt-2">Atualização Estratégica 2027 + Grupo VIP 60 Dias</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Acesso à comunidade fechada e licenciamento perpétuo das futuras versões nativas.</p>
            </div>
            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.05]">
              <span className="text-[10px] text-gray-500 font-mono block">Valor Individual: <strong className="line-through">$47</strong></span>
              <span className="text-xs font-mono text-[#25D366] font-extrabold">INCLUSO HOJE</span>
            </div>
          </div>

          {/* Primeiros 15 */}
          <div className="bg-[#0E0E0E] border border-[#00E5FF]/20 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[9px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 rounded font-bold uppercase">Apenas Primeiros 15 Compradores</span>
              <h3 className="text-sm font-bold text-white mt-2">Pack de Ícones Premium + Planejamento Estratégico 2026</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Acervo exclusivo para personalização visual de elite e matriz tática anual pré-definida.</p>
            </div>
            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.05]">
              <span className="text-[10px] text-gray-500 font-mono block">Valor Individual: <strong className="line-through">$67</strong></span>
              <span className="text-xs font-mono text-[#00E5FF] font-extrabold">DESBLOQUEADO</span>
            </div>
          </div>

          {/* Primeiros 35 */}
          <div className="bg-[#120A12] border border-[#FF007A]/30 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg custom-badge-glow">
            <div>
              <span className="text-[9px] font-mono bg-[#FF007A]/10 text-[#FF007A] px-2 py-0.5 rounded font-bold uppercase">Apenas Primeiros 35 Compradores</span>
              <h3 className="text-sm font-bold text-white mt-2">Dashboard Financeiro + Banco de Prompts IA & Revisão Ativa</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Contempla o <strong className="text-white">Protocolo de Aceleração IA (Engine 2026)</strong> com 20 comandos neurais, o <strong className="text-white">Framework de Implementação Crítica 24H</strong> e a metodologia <strong className="text-white">Feynman-Pomodoro</strong>.</p>
            </div>
            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.05]">
              <span className="text-[10px] text-gray-500 font-mono block">Valor Individual: <strong className="line-through">$127</strong></span>
              <span className="text-xs font-mono text-[#FF007A] font-extrabold">DESBLOQUEADO</span>
            </div>
          </div>

          {/* Primeiros 50 */}
          <div className="bg-[#0A100A] border border-[#25D366]/30 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-[9px] font-mono bg-[#25D366]/10 text-[#25D366] px-2 py-0.5 rounded font-bold uppercase">Apenas Primeiros 50 Compradores</span>
              <h3 className="text-sm font-bold text-white mt-2">Mini-curso Produtividade Extrema + Mentoria em Grupo Gravada</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Acesso irrestrito aos bastidores de execução e fundamentos cognitivos aplicados em vídeo.</p>
            </div>
            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.05]">
              <span className="text-[10px] text-gray-500 font-mono block">Valor Individual: <strong className="line-through">$197</strong></span>
              <span className="text-xs font-mono text-[#25D366] font-extrabold">DESBLOQUEADO</span>
            </div>
          </div>
        </div>

        {/* Resumo Absurdo de Valor */}
        <div className="mt-10 bg-[#0E0E0E] border border-white/[0.08] p-6 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <p className="text-[10px] font-mono text-[#A1A1AA] uppercase font-semibold">Somatório Acumulado</p>
            <p className="text-xs text-white mt-0.5">Valor Total Real dos Bônus: <span className="line-through text-red-500 font-mono font-bold">$438</span></p>
            <p className="text-xs text-[#00E5FF] font-bold mt-0.5">Teu Custo de Resgate Hoje: <span className="font-mono font-extrabold text-base text-white">$0 (Incluso no Kit)</span></p>
          </div>
          <button
            onClick={() => onExecuteConversion("international")}
            className="btn-magnetic-aggressive text-xs px-5 py-3 rounded-xl w-full sm:w-auto shrink-0 text-center"
          >
            Quero Todos os Bônus
          </button>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ PERFIL ESTRATÉGICO (GABRIEL SAPALO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const AuthoritySection = memo(() => {
  return (
    <section id="autoridade" className="py-24 border-b border-white/[0.05] px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10 items-center text-left">
        <div className="md:col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-[#00E5FF] bg-[#101010] shadow-[0_0_25px_rgba(0,229,255,0.2)] relative">
            <img
              src={CONFIG.authorPhoto}
              alt={CONFIG.authorName}
              className="w-full h-full object-cover filter grayscale contrast-125"
              loading="lazy"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white leading-tight">{CONFIG.authorName}</h3>
            <p className="text-[10px] text-[#00E5FF] font-mono mt-0.5 font-bold uppercase tracking-tight block">
              Estratega & Arquitecto do Sistema
            </p>
            <span className="text-[10px] bg-[#141414] text-[#A1A1AA] border border-white/[0.05] px-2 py-0.5 rounded font-mono inline-block mt-1.5">
              ♟️ Campeão de Xadrez 2024
            </span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 text-xs text-[#A1A1AA] leading-relaxed">
          <span className="text-[10px] font-mono tracking-widest text-[#FF007A] uppercase block font-extrabold">
            A Mente por Trás da Matriz
          </span>
          <p className="text-sm font-bold text-white italic border-l-2 border-[#00E5FF] pl-3 py-1 bg-white/[0.01]">
            “No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece exatamente o mesmo: quem não tem sistema, joga no improviso e falha.”
          </p>
          <p className="text-gray-300">
            Gabriel Sapalo, <strong>Campeão Nacional Absoluto de Xadrez de Angola 2024</strong>, consolidou a sua carreira na intersecção entre o Planeamento Estatístico e a Psicologia Analítica.
          </p>
          <p className="text-gray-300">
            Com uma especialização em Contabilidade e Auditoria e vasta experiência na gestão de fluxos de informação, Gabriel utilizou a sua visão de Estratega para modelar o <strong>Notion Elite Kit</strong>. O sistema não é um template; é uma infraestrutura de inteligência de dados desenhada para otimizar fluxos cognitivos complexos, assegurando execução absoluta e zero fricção técnica.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/20 font-bold">
              ZERO FRICÇÃO
            </span>
            <span className="text-[9px] font-mono bg-[#FF007A]/10 text-[#FF007A] px-2 py-0.5 rounded border border-[#FF007A]/20 font-bold">
              EXECUÇÃO ABSOLUTA
            </span>
            <span className="text-[9px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5">
              INTELIGÊNCIA DE DADOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ SOCIAL PROOF MASSIVA ULTRA PREMIUM (FOCO NO ROSTO SÉNIOR)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SocialProofSection = memo(() => {
  return (
    <section id="provas" className="py-24 border-b border-white/[0.05] px-6 max-w-5xl mx-auto text-center">
      <div className="mb-12 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase block mb-3 font-semibold">
          Evidências Operacionais e Impacto Viral
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl text-white">
          Validação por mentes focadas em execução
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-2">
          Avaliações 5 estrelas e prints reais comprovando a inevitabilidade de organização com o sistema.
        </p>
      </div>

      {/* Bento Grid Otimizado com Escala de Avatares Duplicada (Mínimo 100x100px) */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch text-left mb-12">
        {TESTIMONIALS.map((t, idx) => {
          const isLarge = idx === 0 || idx === 3;
          return (
            <div
              key={idx}
              className={`card-luxury p-6 flex flex-col justify-between ${
                isLarge ? "md:col-span-2 bg-[#0E0E0E]" : "md:col-span-1 bg-[#0A0A0A]"
              }`}
            >
              <div>
                {/* Posicionamento do Rosto em Grande Destaque à Esquerda / Topo com aro fino em Ciano e brilho */}
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

      {/* Prints de Clientes estilo WhatsApp/Instagram */}
      <div className="bg-[#0A0A0A] border border-white/[0.05] p-6 rounded-2xl max-w-4xl mx-auto text-left">
        <p className="text-xs font-bold text-white mb-4 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#25D366]" />
          <span>Comunidade Ativa & Feedback Imediato</span>
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[#050505] p-3.5 rounded-xl border border-white/[0.04]">
            <p className="text-[10px] font-bold text-gray-400">📱 Mensagem Recebida</p>
            <p className="text-xs text-white mt-1 italic">"Gente, o módulo de finanças e o Brain Core pouparam a minha mente. Setup feito em 4h cravadas!"</p>
            <span className="text-[9px] text-[#25D366] font-mono block mt-1">✓ Entregue via WhatsApp</span>
          </div>
          <div className="bg-[#050505] p-3.5 rounded-xl border border-white/[0.04]">
            <p className="text-[10px] font-bold text-gray-400">🔥 Story Mencionado</p>
            <p className="text-xs text-white mt-1 italic">"Adeus abas perdidas. O Notion Elite Kit 2026 é surrealmente inteligente. Recomendo de olhos fechados."</p>
            <span className="text-[9px] text-[#00E5FF] font-mono block mt-1">@glowscalepro citado</span>
          </div>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ OFERTA PREMIUM SÉNIOR (SENSAÇÃO DE SOFTWARE CARO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PremiumOfferSection = memo(({ onExecuteConversion }: { onExecuteConversion: (seg: "international" | "angola") => void }) => {
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
                  "Garantia Estendida 30 Dias",
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

              {/* BOTÕES ABSOLUTOS DE CHECKOUT REPETIDOS */}
              <div className="pt-4 space-y-2.5">
                <div>
                  <button
                    onClick={() => onExecuteConversion("international")}
                    className="w-full btn-luxury-cyan py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer outline-none"
                  >
                    <span>Começar Meu Segundo Cérebro ($10)</span>
                    <ExternalLink className="w-3 h-3 text-[#050505]" />
                  </button>
                  <p className="text-[9px] text-[#A1A1AA]/70 text-center mt-1 font-medium">
                    Processamento global instantâneo Hotmart
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => onExecuteConversion("angola")}
                    className="w-full btn-magnetic-aggressive py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer outline-none text-white"
                  >
                    <span>Organizar Minha Vida em 24h (10k AKZ)</span>
                    <MessageCircle className="w-3 h-3 text-white fill-white" />
                  </button>
                  <p className="text-[9px] text-[#A1A1AA]/70 text-center mt-1 font-medium">
                    Ativação local com encaminhamento via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garantia Forte Extremamente Visível com Selo Visual Premium */}
        <div className="mt-10 bg-[#050505] border-2 border-[#00E5FF]/30 p-6 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-left shadow-[0_0_25px_rgba(0,229,255,0.08)]">
          <div className="w-12 h-12 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Garantia Forte Estendida de 30 Dias</h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              “Teste por 30 dias. Se não transformar sua organização, devolvemos seu dinheiro — e você ainda fica com os bônus como prova do nosso compromisso.”
            </p>
          </div>
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
                    transition={{ duration: 0.2 }}
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
// ♟️ FINAL SECTION (FOMO MÁXIMO E IMPULSO EMOCIONAL)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FinalCTASection = memo(({ onSelectFlow }: { onSelectFlow: (type: "international" | "angola") => void }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#050505] px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto space-y-6">
        <span className="text-[10px] font-mono tracking-widest text-[#FF007A] uppercase block font-bold">
          A Decisão Inevitável
        </span>

        {/* Headline Forte Final */}
        <h2 className="premium-heading text-3xl sm:text-4xl text-white max-w-xl mx-auto leading-tight">
          “2026 vai acontecer de qualquer forma. A questão é: você vai continuar no caos?”
        </h2>

        <p className="text-xs text-[#A1A1AA] max-w-lg mx-auto leading-relaxed">
          As vagas remanescentes com 89% de desconto encerram nas próximas horas. Garanta agora a extensão cognitiva que te separa do controle absoluto.
        </p>

        <div className="pt-4 max-w-sm mx-auto space-y-3 text-left">
          <button
            onClick={() => {
              Telemetry.emit("final_conversion_cta_click", { flow: "international" });
              onSelectFlow("international");
            }}
            className="w-full btn-luxury-cyan py-4 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xl cursor-pointer outline-none"
          >
            <span>Começar Meu Segundo Cérebro ($10)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              Telemetry.emit("final_conversion_cta_click", { flow: "angola" });
              onSelectFlow("angola");
            }}
            className="w-full btn-magnetic-aggressive py-4 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xl cursor-pointer outline-none text-white"
          >
            <span>Organizar Minha Vida em 24h (10k AKZ)</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <p className="text-[10px] text-[#A1A1AA]/60 text-center pt-1 font-mono">
            Licenciamento com garantia total e acesso vitalício incluído.
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
    <footer className="border-t border-white/[0.05] bg-[#050505] pt-12 pb-24 px-6 text-xs text-[#A1A1AA]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.05] text-left">
          {/* Alinhamento estrito exigido: Logotipo e texto na MESMA LINHA horizontal, alinhados ao centro */}
          <div className="flex items-center justify-center w-full sm:w-auto gap-3">
            <img
              src={CONFIG.glowscaleLogo}
              alt="GlowScalePro Logótipo"
              className="w-5 h-5 object-contain filter grayscale contrast-200 select-none pointer-events-none opacity-80"
            />
            <span className="font-bold text-white tracking-tight text-xs">GlowScalePro</span>
            <span className="text-white/[0.1]">/</span>
            <span className="text-white font-medium text-xs">{CONFIG.authorName}</span>
          </div>

          <p className="text-[10px] text-[#A1A1AA]/60 max-w-md text-center sm:text-right leading-relaxed mt-2 sm:mt-0">
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
              Construído com tráfego otimizado nativamente para maximizar FOMO, prova social e impulsividade de compra sob LCP mínimo.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#A1A1AA]/60">
          <p>© 2026 Gabriel Sapalo. Ecossistema licenciado internacionalmente.</p>
          <p className="font-mono text-[9px]">SaaS High-Conversion Layer v5.0</p>
        </div>
      </div>
    </footer>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ APLICAÇÃO DE ELITE (ROOT ECOSYSTEM)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function App() {
  const [notificationToast, setNotificationToast] = useState<typeof NOTIFICATIONS[0] | null>(null);

  // Orquestrador de Notificações Flutuantes Simulado para prova social viciante
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setNotificationToast(NOTIFICATIONS[index]);
      index = (index + 1) % NOTIFICATIONS.length;
      setTimeout(() => setNotificationToast(null), 3500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Telemetria base
  useEffect(() => {
    Telemetry.emit("page_fully_loaded", { referrer: document.referrer });

    const t30 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 30 }), 30000);
    const t60 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 60 }), 60000);
    const t120 = setTimeout(() => Telemetry.emit("time_spent_checkpoint", { durationSeconds: 120 }), 120000);

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

  const executeScrollToOffer = useCallback(() => {
    const offerBlock = document.getElementById("oferta");
    if (offerBlock) {
      offerBlock.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleFinalChoice = useCallback((segment: "international" | "angola") => {
    if (segment === "international") {
      window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    } else {
      window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
    }
  }, []);

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
      <Helmet>
        <title>Notion Elite Kit 2026 — Ecossistema Operacional Premium</title>
        <meta name="description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas. Arquitetura minimalista de alto desempenho cognitivo." />
        <link rel="canonical" href={window.location.href} />
        
        <meta property="og:title" content="Notion Elite Kit 2026 — Ecossistema Operacional Premium" />
        <meta property="og:description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas." />
        <meta property="og:image" content={CONFIG.notionMockup} />
        <meta property="og:type" content="product" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Notion Elite Kit 2026 — Ecossistema Operacional Premium" />
        <meta name="twitter:description" content="Domine a sua rotina e organize a sua vida académica/profissional em menos de 24 horas." />
        <meta name="twitter:image" content={CONFIG.notionMockup} />

        <script type="application/ld+json">
          {JSON.stringify(productSchemaLD)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaLD)}
        </script>
      </Helmet>

      {/* RENDERIZAÇÃO GERAL DO FUNIL */}
      <Header onRequestScroll={executeScrollToOffer} />
      <HeroSection onExecuteConversion={handleFinalChoice} />
      <MomentoUauSection />
      <EngenhariaSection />
      <TransformacaoSection />
      <RepositorioNeuralSection />
      <SolucaoModulosSection />
      <MapeamentoTaticoSection />
      <BonusProgressivosSection onExecuteConversion={handleFinalChoice} />
      <AuthoritySection />
      <SocialProofSection />
      <PremiumOfferSection onExecuteConversion={handleFinalChoice} />
      <FAQSection />
      <FinalCTASection onSelectFlow={handleFinalChoice} />
      <LegalFooter />

      {/* Notificação Flutuante Simulada de Compra Viral (Overlay estilo SaaS) */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 z-50 glass-modal-aggressive p-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs border-l-4 border-l-[#00E5FF]"
          >
            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[11px] text-white font-bold truncate">🎉 {notificationToast.name} comprou</p>
              <p className="text-[10px] text-[#00E5FF] font-mono truncate">{notificationToast.item}</p>
              <span className="text-[9px] text-gray-500 font-mono block">{notificationToast.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY CTA MOBILE EXTREMAMENTE PERSISTENTE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.08] p-3 flex items-center gap-2">
        <button
          onClick={() => handleFinalChoice("international")}
          className="flex-1 btn-luxury-cyan py-2.5 px-2 rounded-lg text-[11px] font-bold text-center block leading-tight truncate"
        >
          Acesso Global ($10)
        </button>
        <button
          onClick={() => handleFinalChoice("angola")}
          className="flex-1 btn-magnetic-aggressive py-2.5 px-2 rounded-lg text-[11px] font-bold text-center block leading-tight truncate text-white"
        >
          Angola (10k AKZ)
        </button>
      </div>

      {/* Botão WhatsApp Flutuante no canto inferior direito (Suporte Mestre Gabriel) acima do sticky mobile */}
      <a
        href={CONFIG.whatsappPayment}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => Telemetry.emit("floating_conversion_button_click")}
        className="fixed bottom-16 md:bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-[#050505] p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 outline-none cursor-pointer flex items-center justify-center group"
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
