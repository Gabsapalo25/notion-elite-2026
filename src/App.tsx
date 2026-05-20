import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Command, Brain, Target, Sparkles, Zap, Play, ArrowRight,
  Check, ChevronDown, ChevronUp, Star, MessageCircle,
  ExternalLink, Menu, X, Shield, Send, CheckCircle2,
  Crown, Eye, Activity, Coins, Radar, Flame,
  Quote, Lock
} from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ ELITE OS — CONFIGURAÇÃO OFICIAL
// Clareza é poder. O caos custa caro.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorTitle: "Estrategista & Especialista em Gestão de Sistemas de Informação",
  authorBio: "Campeão Nacional Absoluto de Xadrez de Angola 2024. Consolidou a sua carreira na intersecção entre o Planeamento Estatístico e a Psicologia Analítica. Com especialização em Contabilidade e Auditoria, Gabriel utilizou a sua visão de Estrategista para modelar o Notion Elite Kit como uma infraestrutura de inteligência de dados para fluxos cognitivos complexos.",
  authorPhoto: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778858082/Gabriel_Sapalo_kp0dhm.png",

  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  videoDemonstracaoReal: "https://www.youtube.com/embed/qfKGywfh05A",

  productLogo: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778858080/Logotipo_Notion_Elite_2026_qhvyup.png",
  glowscaleLogo: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778858081/Logotipo_da_Glowscalepro_vawgu4.png",

  notionMockup: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857929/MOCKUP_NOTION_FINAL_1_zc7jj0.png",
  antesDepoisMockup: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857908/Mockup_2_antes_e_depois_nr6xmh.png",

  whatsappLogo: "https://drive.google.com/thumbnail?id=1ty3u0-Vks2IM4NNT2bJ14riAvG0Zh5Cd&sz=w200",
  telegramLogo: "https://drive.google.com/thumbnail?id=1I1PJ4DpRVqiWgQGX4jMWLBi6plwQsiJN&sz=w200",
  internalView: "https://drive.google.com/thumbnail?id=1AQUxp-P7-Wf64CPqbTiQDsPqqBhL7dvL&sz=w1000",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  mockupExtra1: "https://drive.google.com/thumbnail?id=1Gv_vB4wENBXyiaQi1iD3UyuXkTvXg8sc&sz=w1000",
  mockupExtra2: "https://drive.google.com/thumbnail?id=1o79_tWug5lCJ2kI3T4yz0vJOm5wQ2P70&sz=w1000",

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
// ♟️ FRASES-ÂNCORA DA MARCA (REPEAT UNTIL CULTURE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MANIFESTO_PHRASES = [
  "Clareza é poder.",
  "O caos custa caro.",
  "Mentes organizadas vencem.",
  "Disciplina visual.",
  "2026 pertence aos organizados."
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ MÓDULOS DO SISTEMA OPERACIONAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MODULES = [
  {
    label: "01",
    title: "Dashboard Central",
    subtitle: "Centro de Comando",
    description: "Visão completa do teu dia, semana e semestre num único ecrã. Zero fricção. Zero abas perdidas.",
    icon: Command
  },
  {
    label: "02",
    title: "Cérebro Digital",
    subtitle: "Knowledge Vault",
    description: "O fim das anotações perdidas. Um repositório inteligente para aulas, ideias, PDFs e resumos com IA nativa.",
    icon: Brain
  },
  {
    label: "03",
    title: "Gestor de Disciplinas",
    subtitle: "Academic Core",
    description: "Acompanhamento por cadeira ou projeto. Progresso automático. Entregas nunca mais perdidas.",
    icon: Target
  },
  {
    label: "04",
    title: "Finance Command",
    subtitle: "Controlo Monetário",
    description: "Orçamentos, despesas e poupanças centralizados. Sabe exatamente para onde vai o teu dinheiro.",
    icon: Coins
  },
  {
    label: "05",
    title: "Habit Matrix + Goal Radar",
    subtitle: "Disciplina Visual",
    description: "Objetivos anuais decompostos em passos diários com registo visual. Construção de consistência brutal.",
    icon: Radar
  },
  {
    label: "06",
    title: "IA Prompt Hub",
    subtitle: "Segundo Cérebro Ativo",
    description: "20+ prompts nativos para resumir matérias, gerar flashcards e acelerar estudos em segundos.",
    icon: Sparkles
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ BÓNUS (VALOR PERCEBIDO EXPLOSIVO) — CORRIGIDO
// Apenas 4 bónus premium. Removidos: Pack de Ícones e Mini-curso.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BONUSES = [
  {
    title: "Comunidade Elite Minds 2026",
    desc: "Grupo privado de operadores mentais com desafios semanais, reposts e suporte direto.",
    value: 97
  },
  {
    title: "Hub de Prompts de IA (20+)",
    desc: "Prompts testados para resumir, criar e acelerar estudos com IA nativa do Notion.",
    value: 67
  },
  {
    title: "Atualizações Vitalícias 2026/2027",
    desc: "Novas versões e módulos adicionados sem custo extra. Acesso perpétuo.",
    value: 120
  },
  {
    title: "Setup Guiado em 24h",
    desc: "Vídeo prático de três passos para duplicar e personalizar tudo em menos de um dia.",
    value: 57
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ TESTIMONIALS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TESTIMONIALS = [
  {
    name: "Tomás Ferreira",
    role: "Dupla Licenciatura",
    location: "Porto, Portugal",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Tomás_Ferreira_-Porto_-_Portugal_goriez.png",
    text: "Mano... consegui finalmente organizar tudo. Faço dupla licenciatura e trabalho num café. Antes vivia em pânico a dormir 4 horas. Agora planeio a semana toda em 10 min ao domingo. Surreal.",
    metric: "10 min/sem"
  },
  {
    name: "Mariana Costa",
    role: "Estudante Universitária",
    location: "Lisboa, Portugal",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Mariana_-_Lisboa_Portugal_uerhir.png",
    text: "Passei de média de 12 para 15 em dois meses. O cérebro digital devolveu-me o foco e tirou o peso de ter anotações perdidas. Sinto que tenho o controlo de volta.",
    metric: "12 → 15"
  },
  {
    name: "Ana Luísa Mendes",
    role: "Gestora de Projetos",
    location: "Luanda, Angola",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/Ana_Luisa_-_Luanda_Angola_vae6mt.png",
    text: "A integração das matrizes relacionais e os atalhos de bases de dados funcionam sem qualquer latência. Extremamente sólido. Um verdadeiro cockpit.",
    metric: "0 latência"
  },
  {
    name: "João Pedro Silva",
    role: "Profissional & Estudante",
    location: "São Paulo, Brasil",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/João_Pedro_-_São_Paulo_-_Brasil_inzjna.png",
    text: "Trabalhar e estudar ao mesmo tempo consumia-me. Este setup poupou-me 2 horas diárias. O tempo que recuperei paga o sistema no primeiro dia.",
    metric: "2h/dia poupas"
  },
  {
    name: "Sofia Rodrigues",
    role: "Mestranda e Pesquisadora",
    location: "Coimbra, Portugal",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/Sofia_Rodrigues_-_Coimbra_-Portugal_tlbepm.png",
    text: "Adeus abas perdidas e notas soltas. Setup concluído. Zero atrito. Execução imediata. É God Mode.",
    metric: "17 abas → 1 sistema"
  },
  {
    name: "Beatriz Mendonça",
    role: "Consultora Júnior",
    location: "Maputo, Moçambique",
    avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Beatriz_Mendoça_-_Maputo_Moçambique_qjsbtm.png",
    text: "Ou montas um ecossistema que funciona por ti ou continuas a perder prazos e a mentir a ti mesma. A metodologia de 24H obrigou-me a executar sem desculpas.",
    metric: "Setup em 4h"
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ FAQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FAQ_DATA = [
  { q: "Nunca usei o Notion. Consigo mesmo assim?", a: "Sim. O kit foi construído para iniciantes. Inclui guia prático de três passos para duplicar e personalizar tudo em menos de 24 horas." },
  { q: "Funciona no telemóvel?", a: "Sim. A interface é 100% mobile-first: consulta prazos, marca tarefas rápidas e controla o teu dia diretamente do telemóvel." },
  { q: "Quanto tempo demora o setup?", a: "Menos de 24 horas. O vídeo de setup guiado mostra cada passo — duplicar, personalizar e começar a usar. A maioria dos utilizadores termina em menos de 4 horas." },
  { q: "É só para estudantes ou também para profissionais?", a: "Para os dois. O sistema tem módulos independentes de gestão académica e acompanhamento de projetos profissionais que correm em paralelo sem misturar informações." },
  { q: "Tenho de pagar mensalidade ao Notion?", a: "Não. Toda a estrutura funciona a 100% na versão gratuita do Notion. Sem custos recorrentes." },
  { q: "Recebo atualizações futuras?", a: "Sim. Pagamento único, acesso vitalício às versões 2026 e 2027, e novos prompts de IA embutidos." },
  { q: "A garantia de 30 dias é real?", a: "Sim. Se em 30 dias não sentires clareza e foco reais, devolvemos 100% do valor — sem perguntas." }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ NOTIFICAÇÕES VIRAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NOTIFICATIONS = [
  { name: "Lucas R.", item: "Ativou God Mode", time: "Há 2 min" },
  { name: "Marta S.", item: "Reset Operacional", time: "Há 5 min" },
  { name: "Tiago M.", item: "Ativou God Mode", time: "Há 12 min" },
  { name: "Inês P.", item: "Elite Minds 2026", time: "Há 18 min" },
  { name: "Rui C.", item: "Ativou God Mode", time: "Há 25 min" }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ TELEMETRIA SILENCIOSA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, unknown> = {}) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmKeys.forEach(k => { if (urlParams.has(k)) localStorage.setItem(`ne_${k}`, urlParams.get(k) || ""); });
      const payload: Record<string, unknown> = { action: eventAction, ts: new Date().toISOString(), ...metadata };
      utmKeys.forEach(k => { payload[k] = localStorage.getItem(`ne_${k}`) || ""; });
      const stack = JSON.parse(localStorage.getItem("ne_stack") || "[]");
      stack.push(payload);
      if (stack.length > 50) stack.shift();
      localStorage.setItem("ne_stack", JSON.stringify(stack));
    } catch { /* silent */ }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ HEADER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Header = memo(({ onCTA }: { onCTA: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "header-glass py-3" : "bg-gradient-to-b from-[#050505] via-[#050505]/90 to-transparent py-4"}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="bg-[#080808] border-b border-white/[0.06] py-2.5 px-4 text-center">
        <p className="text-[11px] font-mono text-[#00E5FF] tracking-wide font-semibold flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          🔥 FASE FOUNDER 2026 — Apenas $10 / 10.000 AKZ (preço sobe para $49 em breve)
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between mt-3">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-3 group">
          <img src={CONFIG.productLogo} alt="Elite OS" className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-[13px] text-white tracking-tight">Notion Elite OS</span>
            <span className="text-[9.5px] font-mono text-[#D4AF37] tracking-widest uppercase">Founder 2026</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#A1A1AA]">
          <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
          <a href="#caos" className="hover:text-white transition-colors">O Problema</a>
          <a href="#sistema" className="hover:text-white transition-colors">O Sistema</a>
          <a href="#bonus" className="hover:text-white transition-colors">Bónus</a>
          <a href="#provas" className="hover:text-white transition-colors">Elite Minds</a>
          <a href="#autoridade" className="hover:text-white transition-colors">O Criador</a>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => { Telemetry.emit("header_cta"); onCTA(); }} className="btn-luxury-gold text-xs px-4 py-2 rounded-md flex items-center gap-1.5 cursor-pointer animate-pulse-gold">
            <span>Founder Batch 01 · $10</span>
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
            <a href="#sistema" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Sistema</a>
            <a href="#bonus" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Bónus</a>
            <a href="#provas" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Elite Minds</a>
            <a href="#autoridade" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Criador</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ HERO — O MOMENTO DA DECISÃO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HeroSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 px-6 max-w-6xl mx-auto text-center overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 badge-founder px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-8">
        <Crown className="w-3.5 h-3.5" />
        FASE FOUNDER 2026 — Acesso Exclusivo
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] text-white tracking-[-2px] leading-[1.05] max-w-5xl mx-auto mb-6 font-bold"
      >
        O Teu Cérebro Não Foi Feito<br className="hidden md:block" />
        Para Guardar Prazos.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-6 font-light tracking-tight"
      >
        Foi feito para criar o teu futuro.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="text-sm md:text-base text-[#D4AF37] font-mono font-bold max-w-xl mx-auto mb-10 tracking-wide"
      >
        O problema nunca foi falta de inteligência. <br className="hidden sm:block" />
        Foi operar sem sistema.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="relative max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <img src={CONFIG.notionMockup} alt="Cockpit Operacional Elite" className="w-full" loading="eager" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base text-[#A1A1AA] max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        Sistema em Notion para estudantes e profissionais organizarem tarefas, metas, IA, finanças e execução diária num único cockpit.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] text-left"
      >
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] mb-2 font-bold">Em menos de 15 minutos vais:</p>
        <div className="space-y-1.5 text-sm text-[#D4D4D8]">
          <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" /><span>Centralizar a tua vida num único lugar</span></div>
          <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" /><span>Eliminar abas perdidas e notas dispersas</span></div>
          <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" /><span>Saber exatamente o que fazer todos os dias</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-xl mx-auto space-y-3">
        <button onClick={() => onConvert("international")} className="w-full btn-luxury-cyan py-4 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-3 animate-pulse-ring">
          <span>Ativar Reset Operacional · $10 (Internacional)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button onClick={() => onConvert("angola")} className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] hover:-translate-y-0.5">
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Angola · 10.000 AKZ via WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="h-px bg-white/10 flex-1 max-w-[80px]" />
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">Escolhe o teu método</span>
          <div className="h-px bg-white/10 flex-1 max-w-[80px]" />
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs text-[#A1A1AA] mt-6">
        +3.200 utilizadores · 4.9/5 · Criado pelo Campeão Nacional de Xadrez de Angola
      </motion.p>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ MARQUEE DE FRASES-ÂNCORA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MarqueeSection = memo(() => (
  <section className="relative border-y border-white/[0.05] bg-[#050505] overflow-hidden py-5">
    <div className="flex animate-marquee whitespace-nowrap gap-12">
      {[...MANIFESTO_PHRASES, ...MANIFESTO_PHRASES].map((p, i) => (
        <div key={i} className="flex items-center gap-12 shrink-0">
          <span className="text-xl md:text-2xl font-serif italic text-white/80">{p}</span>
          <span className="text-[#D4AF37]">♟</span>
        </div>
      ))}
    </div>
  </section>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ MANIFESTO — MOVIMENTO, NÃO MARKETING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ManifestoSection = memo(() => {
  return (
    <section id="manifesto" className="relative py-28 px-6 overflow-hidden border-b border-white/[0.05]">
      <div className="absolute inset-0 chess-deco opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-6 block">
          ♟ O Manifesto · Elite OS
        </span>

        <Quote className="w-8 h-8 text-[#D4AF37]/40 mx-auto mb-4" />

        <p className="text-2xl sm:text-3xl md:text-4xl text-white leading-[1.15] font-serif italic mb-8">
          Nós acreditamos que o caos moderno está a destruir mentes brilhantes. <br className="hidden md:block" />
          <span className="text-gradient-magnetic not-italic font-sans font-bold text-xl sm:text-2xl md:text-3xl block mt-6">
            Enquanto o mundo vive fragmentado, nós construímos sistemas.
          </span>
        </p>

        <div className="divider-gold max-w-md mx-auto mb-10" />

        <div className="mb-12 max-w-xl mx-auto">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight mb-3">
            Clareza é <span className="text-gradient-magnetic not-italic font-bold">poder</span>.
          </p>
          <div className="divider-gold max-w-[120px] mx-auto mb-3" />
          <p className="text-xs text-[#A1A1AA] italic">
            O slogan dos que se recusam a viver no ruído.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          {[
            { p: "O caos custa futuros.", sub: "Cada dia desorganizado é oportunidade perdida." },
            { p: "Disciplina visual.", sub: "O que não é visto não é gerido." },
            { p: "Organizados vencem.", sub: "2026 pertence a quem tem sistema." }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.05]">
              <span className="text-[10px] font-mono text-[#D4AF37] block mb-2 tracking-widest">0{i + 1}</span>
              <p className="text-base font-bold text-white mb-1.5">{item.p}</p>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ A DOR — FAZ O LEAD RECONHECER-SE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PainSection = memo(() => {
  const pains = [
    {
      icon: Activity,
      title: "Fragmentação Digital",
      desc: "PDFs perdidos. Apontamentos no WhatsApp. Prazos que te apanham de surpresa. O teu cérebro virou um browser com 47 abas abertas.",
      color: "pink"
    },
    {
      icon: Brain,
      title: "Sobrecarga Mental",
      desc: "Acordas cansado antes de começar. A mente nunca desliga. A ansiedade do domingo à noite virou rotina semanal.",
      color: "cyan"
    },
    {
      icon: Coins,
      title: "Custo Real",
      desc: "Cada semestre desperdiçado custa dinheiro, oportunidades e saúde mental. O caos não é gratuito — é o imposto invisível da desorganização.",
      color: "gold"
    }
  ];

  return (
    <section id="caos" className="relative py-28 px-6 border-b border-white/[0.05] bg-[#070707]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF007A] uppercase font-bold mb-4 block">
            O Diagnóstico
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05]">
            Estás a estudar… <br />
            ou apenas a <span className="display-heading text-[#FF007A]">sobreviver</span> no caos?
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-4 leading-relaxed">
            O problema da maioria não é falta de inteligência. É <strong className="text-white">excesso de ruído</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = p.icon;
            const colorMap: Record<string, string> = {
              pink: "from-[#FF007A]/15 to-transparent border-[#FF007A]/20 text-[#FF007A]",
              cyan: "from-[#00E5FF]/15 to-transparent border-[#00E5FF]/20 text-[#00E5FF]",
              gold: "from-[#D4AF37]/15 to-transparent border-[#D4AF37]/20 text-[#D4AF37]"
            };
            const cls = colorMap[p.color];
            return (
              <div key={i} className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-b ${cls} border bg-[#050505] flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-current tracking-widest font-bold uppercase">PROBLEMA 0{i + 1}</span>
                  <div className={`w-9 h-9 rounded-lg bg-[#0A0A0A] border border-white/[0.06] text-current flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <div className="divider-glow max-w-md mx-auto mb-6" />
          <p className="text-xs md:text-sm text-white italic max-w-xl mx-auto font-serif">
            "No xadrez, uma jogada errada destrói posições inteiras. Na vida moderna acontece o mesmo — uma aba perdida, um prazo esquecido, e o semestre colapsa."
          </p>
          <p className="text-[10px] text-[#D4AF37] font-mono mt-3 tracking-widest uppercase">
            — Gabriel Sapalo, Campeão Nacional de Xadrez 2024
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ "ISTO NÃO É UM TEMPLATE" — Destruição de objeção invisível
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NotTemplateSection = memo(() => {
  const pillars = [
    { k: "Sistema operacional", v: "Infraestrutura mental que pensa por ti, não decoração bonita." },
    { k: "Integração total", v: "Tarefas, metas, IA, finanças e hábitos interligados num único cockpit." },
    { k: "Redução de carga cognitiva", v: "O teu cérebro descansa enquanto o sistema executa em segundo plano." },
    { k: "Execução diária real", v: "Não inspira motivação. Obriga à clareza e à ação concreta todos os dias." }
  ];

  return (
    <section className="py-20 px-6 border-b border-white/[0.05] bg-[#070707]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF007A] uppercase font-bold mb-4 block">
            Destruição de Objeção
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl text-white leading-tight">
            Isto <span className="line-through text-gray-500">não é um template</span>. <br className="hidden sm:block" />
            <span className="display-heading text-gradient-magnetic">É um sistema operacional.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <div key={i} className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.05] flex gap-3">
              <span className="text-[10px] font-mono text-[#00E5FF] shrink-0 mt-1">0{i + 1}</span>
              <div>
                <p className="text-sm font-bold text-white mb-1">{p.k}</p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{p.v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ O SISTEMA OPERACIONAL PESSOAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SystemSection = memo(() => {
  return (
    <section id="sistema" className="relative py-28 px-6 border-b border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#00E5FF] uppercase font-bold mb-4 block">
            ♟ A Solução · Sistema Operacional Pessoal
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05]">
            O Sistema Operacional Pessoal que transforma <span className="display-heading text-gradient-magnetic">caos em execução</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-4 leading-relaxed max-w-2xl mx-auto">
            Não é um template bonito. É a <strong className="text-white">infraestrutura cognitiva</strong> que eu uso como campeão de xadrez para manter clareza e execução diária.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-luxury p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-transparent border border-[#00E5FF]/30 text-[#00E5FF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest">{m.label}</span>
                </div>
                <span className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-widest mb-1 block">{m.subtitle}</span>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">{m.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed flex-1">{m.description}</p>
                <div className="mt-5 pt-3 border-t border-white/[0.04] flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#A1A1AA]">Módulo Inviolável</span>
                  <span className="text-[#25D366] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ativo</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#A1A1AA] italic font-serif leading-relaxed">
            "Seis módulos cirurgicamente programados para eliminar distrações e acelerar processos. Um ecossistema que funciona em segundo plano, libertando a tua mente para o que importa: <strong className="text-white">pensar com clareza</strong>."
          </p>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ ENGENHARIA — VÍDEO DE DEMONSTRAÇÃO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EngineeringSection = memo(() => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-24 px-6 border-b border-white/[0.05] bg-[#070707]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">
            Engenharia em Ação
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl text-white">
            Vê o sistema a funcionar <span className="display-heading text-gradient-magnetic">na prática</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-3">
            Navega nas funcionalidades prontas a usar. Sem adivinhar o design. Sem complicação.
          </p>
        </div>

        <div className="video-luxury-container max-w-4xl mx-auto">
          {!playing ? (
            <div onClick={() => { setPlaying(true); Telemetry.emit("demo_played"); }} className="absolute inset-0 cursor-pointer group flex flex-col items-center justify-center bg-[#050505]">
              <img src={CONFIG.internalView} alt="Demo" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#4CF2FF] text-[#050505] flex items-center justify-center shadow-[0_0_40px_rgba(0,229,255,0.5)] group-hover:scale-110 transition-transform duration-400">
                <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
              </div>
              <p className="relative z-10 text-xs font-bold text-white mt-4 tracking-wide">Assistir Demonstração Real</p>
              <span className="relative z-10 text-[10px] text-[#00E5FF] mt-1 font-mono font-semibold">Preview SaaS · Alta Definição</span>
            </div>
          ) : (
            <iframe src={CONFIG.videoDemonstracaoReal} title="Demo" className="w-full h-full absolute inset-0 border-0" allow="autoplay" allowFullScreen />
          )}
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ ANTES VS DEPOIS — TRANSFORMAÇÃO VISUAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TransformationSection = memo(() => {
  const rows = [
    { a: "Abas perdidas e dispersão", b: "Sistema centralizado" },
    { a: "Tarefas e prazos esquecidos", b: "Execução diária implacável" },
    { a: "Caos e ruído mental", b: "Clareza absoluta" },
    { a: "Procrastinação e paralisia", b: "Rotina fluida e automática" },
    { a: "Sobrevivência académica", b: "Execução com clareza" }
  ];

  return (
    <section className="py-24 px-6 border-b border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#00E5FF] uppercase font-bold mb-4 block">
            A Virada de Chave
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl text-white leading-tight">
            Do caos ao <span className="display-heading text-gradient-magnetic">cockpit de execução</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 text-left">
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#140508] to-[#0A0505] border border-[#FF007A]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FF007A]/10 text-[#FF007A] font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg">ANTES</div>
            <p className="text-[10px] font-mono text-[#FF007A] font-extrabold uppercase mb-2">A Sobrecarga Diária</p>
            <h3 className="text-xl font-bold text-white mb-2">Sobreviver ao semestre.</h3>
            <p className="text-xs text-gray-500 mb-5 italic">WhatsApp, PDFs, caos, stress.</p>
            <div className="space-y-3">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-gray-400 border-b border-[#FF007A]/[0.08] pb-3">
                  <X className="w-4 h-4 text-[#FF007A] shrink-0 mt-0.5" />
                  <span className="line-through">{r.a}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-3 border-t border-[#FF007A]/10 text-[10px] text-[#FF007A]/80 font-mono">
              Sintoma: stress, hesitação, estagnação.
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#05140A] to-[#050A06] border border-[#25D366]/25 relative overflow-hidden shadow-[0_0_40px_rgba(37,211,102,0.08)]">
            <div className="absolute top-0 right-0 bg-[#25D366]/10 text-[#25D366] font-mono text-[9px] font-bold px-3 py-1 rounded-bl-lg">DEPOIS · CLAREZA</div>
            <p className="text-[10px] font-mono text-[#25D366] font-extrabold uppercase mb-2">A Experiência Elite</p>
            <h3 className="text-xl font-bold text-white mb-2">Operar com clareza.</h3>
            <p className="text-xs text-[#A1A1AA] mb-5 italic">Dashboard, calendário, foco, silêncio.</p>
            <div className="space-y-3">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white font-semibold border-b border-[#25D366]/[0.08] pb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span className="text-[#00E5FF]">{r.b}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-3 border-t border-[#25D366]/10 text-[10px] text-[#25D366] font-mono font-bold">
              Resultado: controlo real e foco instantâneo.
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0A] p-2 max-w-4xl mx-auto">
          <img src={CONFIG.antesDepoisMockup} alt="Antes e Depois" className="w-full h-auto rounded-xl object-cover block" loading="lazy" />
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ BÓNUS — VALOR PERCEBIDO EXPLOSIVO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BonusSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const totalValue = BONUSES.reduce((s, b) => s + b.value, 0);

  return (
    <section id="bonus" className="py-24 px-6 border-b border-white/[0.05] bg-[#070707] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[400px] gradient-gold-glow opacity-50 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">
            ♟ Tudo Incluído na Fase Founder
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl text-white leading-tight">
            Mais do que o sistema. <br />
            <span className="display-heading text-gradient-gold">Tudo o que precisas.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {BONUSES.map((b, i) => (
            <div key={i} className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.05] flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[9px] font-mono badge-founder px-2 py-0.5 rounded uppercase font-bold tracking-wider">Bónus 0{i + 1}</span>
                <span className="text-xs font-mono text-[#A1A1AA] line-through">${b.value}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{b.title}</h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed flex-1">{b.desc}</p>
              <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[10px] font-mono text-[#25D366] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>INCLUÍDO · $0</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-2xl mx-auto p-6 rounded-2xl border-gradient-gold text-center">
          <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-2 font-bold">Valor Total dos Bónus</p>
          <p className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="line-through text-[#A1A1AA] font-mono text-xl mr-3">${totalValue}</span>
            <span className="text-gradient-gold">$0</span>
          </p>
          <p className="text-xs text-[#A1A1AA]">Tudo incluído na tua licença Founder.</p>
        </div>

        <div className="mt-8 max-w-xl mx-auto space-y-3">
          <button onClick={() => onConvert("international")} className="w-full btn-luxury-cyan py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer animate-pulse-ring">
            <Crown className="w-4 h-4" />
            <span>Internacional · $10 USD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => onConvert("angola")} className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]">
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Angola · 10.000 AKZ via WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ PROVA SOCIAL — ELITE MINDS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SocialProofSection = memo(() => (
  <section id="provas" className="py-24 px-6 border-b border-white/[0.05]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#00E5FF] uppercase font-bold mb-4 block">
          ♟ Elite Minds · Validação Operacional
        </span>
          <h2 className="premium-heading text-3xl sm:text-4xl text-white leading-tight">
            Eles já fizeram o <span className="display-heading text-gradient-magnetic">reset operacional</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-3">+3.200 operadores mentais. Avaliações 5 estrelas. Evidências reais.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="card-luxury p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.05]">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />)}
                </div>
                <p className="text-xs font-bold text-white truncate">{t.name}</p>
                <p className="text-[10px] text-[#A1A1AA] font-mono truncate">{t.role} · {t.location}</p>
              </div>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed italic flex-1">"{t.text}"</p>
            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#25D366]">
                <CheckCircle2 className="w-3 h-3" /> Identidade Verificada
              </div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                {t.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center p-6 rounded-2xl bg-[#0A0A0A] border border-[#00E5FF]/20">
        <p className="text-xs font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#FF007A]" />
          Junta-te à Elite Minds 2026
        </p>
        <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
          Desafios semanais, reposts, suporte direto e uma cultura de operadores mentais que se recusam a viver no caos.
        </p>
      </div>
    </div>
  </section>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ AUTORIDADE — GABRIEL COMO PERSONAGEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AuthoritySection = memo(() => (
  <section id="autoridade" className="py-24 px-6 border-b border-white/[0.05] bg-[#070707] relative overflow-hidden">
    <div className="absolute inset-0 chess-deco opacity-20 pointer-events-none" />
    <div className="max-w-5xl mx-auto relative">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">
          ♟ A Mente por Trás da Matriz
        </span>
        <h2 className="premium-heading text-3xl sm:text-4xl text-white">
          Criado por quem <span className="display-heading text-gradient-gold">pensa 10 jogadas à frente</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-[#0A0A0A] shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <img src={CONFIG.authorPhoto} alt={CONFIG.authorName} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-bold text-white">{CONFIG.authorName}</h3>
            <p className="text-[10px] text-[#D4AF37] font-mono mt-1 tracking-widest uppercase block">{CONFIG.authorTitle}</p>
            <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] badge-founder px-3 py-1 rounded-full font-mono font-semibold">
              ♟ Campeão Nacional Absoluto · Angola 2024
            </span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4 text-sm text-[#A1A1AA] leading-relaxed">
          <p className="text-base font-serif italic text-white border-l-2 border-[#D4AF37] pl-4 py-2 bg-white/[0.01] rounded-r">
            "No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece exatamente o mesmo: quem não tem sistema, joga no improviso — e falha."
          </p>

          <p className="text-[#D4D4D8] bg-[#0A0A0A] border-l-2 border-[#00E5FF]/40 pl-4 py-2 rounded-r italic">
            Eu também vivia perdido entre PDFs, WhatsApp e deadlines. Criei este sistema primeiro para mim — porque precisava dele. Só depois percebi que funcionava para qualquer pessoa que quisesse sair do caos.
          </p>

          <div className="space-y-2">
            {[
              "♟️ Campeão Nacional Absoluto de Xadrez — Angola 2024",
              "Criador do Notion Elite OS — sistema operacional pessoal",
              "Especialista em Gestão de Sistemas de Informação",
              "Foco: antecipação estratégica, clareza e execução"
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
                <span className="text-[#D4AF37] shrink-0 mt-0.5">▸</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { icon: Eye, label: "Antecipação estruturada" },
              { icon: Zap, label: "Redução de ruído" },
              { icon: Target, label: "Execução eficiente" },
              { icon: Lock, label: "Controlo inegociável" }
            ].map((it, i) => {
              const Icon = it.icon;
              return (
                <div key={i} className="p-3 rounded-lg bg-[#0A0A0A] border border-white/[0.05] flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="text-xs text-white font-medium">{it.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ OFERTA PREMIUM — FASE FOUNDER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PremiumOfferSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => (
  <section id="oferta" className="py-24 px-6 border-b border-white/[0.05]">
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">
          ♟ Licenciamento Exclusivo · Fase Founder
        </span>
        <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
          O investimento mais inteligente <br className="hidden md:block" />
          que podes fazer em <span className="display-heading text-gradient-gold">ti mesmo</span>
        </h2>
      </div>

      <div className="border border-[#00E5FF]/30 bg-[#101010] p-8 sm:p-10 rounded-3xl text-center max-w-2xl mx-auto relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00E5FF]/[0.06] rounded-full blur-3xl pointer-events-none" />

        <p className="text-xs text-white/60 uppercase tracking-widest font-mono">Preço de Lançamento — Founder Batch 01</p>

        <div className="flex items-end justify-center gap-2 my-5">
          <span className="text-6xl sm:text-7xl font-black text-white tracking-tight">$10</span>
          <span className="pb-3 text-lg font-normal text-white/50">ou 10.000 AKZ</span>
        </div>

        <div className="mt-6 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#A1A1AA] font-mono">Vagas Founder Batch 01</span>
            <span className="text-[#25D366] font-bold font-mono">72% preenchidas</span>
          </div>
          <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-white/[0.05]">
            <div className="h-full bg-gradient-to-r from-[#25D366] to-[#00E5FF] rounded-full relative" style={{ width: '72%' }}>
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
          <p className="text-[10px] text-[#FF007A] font-mono font-bold mt-2 flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF007A] animate-pulse" />
            Apenas 14 licenças Founder restantes
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#D4AF37]/20 bg-[#0A0A0A] p-6 text-left max-w-md mx-auto">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] mb-4 font-bold text-center">
            Estrutura de Preço Founder
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Founder Batch 01 <span className="text-[9px] font-mono text-[#25D366] uppercase tracking-wider">(atual)</span>
              </span>
              <span className="font-mono text-[#25D366] font-bold">$10</span>
            </div>
            <div className="flex items-center justify-between opacity-80">
              <span className="text-[#A1A1AA]">Próximo lote</span>
              <span className="font-mono text-white">$27</span>
            </div>
            <div className="flex items-center justify-between opacity-70">
              <span className="text-[#A1A1AA]">Preço final</span>
              <span className="font-mono text-white">$49</span>
            </div>
          </div>
          <p className="text-[10px] text-[#A1A1AA] mt-4 text-center italic">
            Garante o Batch 01 antes que o preço suba.
          </p>
        </div>

        <p className="text-xs text-[#00E5FF] font-mono font-semibold mt-6">
          Acesso vitalício • Garantia de 30 dias
        </p>

        <div className="mt-8 text-left max-w-md mx-auto">
          <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest mb-3 font-semibold text-center">Inclui:</p>
          <div className="space-y-2 text-sm">
            {[
              "Sistema Operacional Notion Elite 2026",
              "Dashboard académico + profissional",
              "Habit Matrix + Goal Radar",
              "Hub de IA com 20+ prompts",
              "Finance Command",
              "Guia de setup em 24h",
              "Acesso à comunidade Elite Minds",
              "Atualizações 2026 + 2027"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[#D4D4D8]">
                <Check className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <button
            onClick={() => onConvert("international")}
            className="w-full btn-luxury-cyan py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 cursor-pointer animate-pulse-ring"
          >
            <Crown className="w-4 h-4" />
            Garantir Founder Batch 01 — $10
          </button>

          <button
            onClick={() => onConvert("angola")}
            className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Angola — 10.000 AKZ via WhatsApp
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <p className="text-xs font-bold text-white uppercase tracking-wider">Garantia Incondicional 30 Dias</p>
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Testa durante 30 dias. Se não sentires clareza real, devolvemos <strong className="text-white">100% do valor</strong>.
          </p>
        </div>
      </div>
    </div>
  </section>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ FAQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FAQSection = memo(() => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="premium-heading text-3xl sm:text-4xl text-white">Perguntas Frequentes</h2>
      </div>

      <div className="space-y-2.5">
        {FAQ_DATA.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="bg-[#0A0A0A] border border-white/[0.05] rounded-lg overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors outline-none cursor-pointer text-sm font-semibold text-white">
                <span>{item.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#A1A1AA] shrink-0" />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="px-5 pb-5 text-xs text-[#A1A1AA] border-t border-white/[0.04] pt-4 leading-relaxed">
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
// ♟️ FINAL CTA — MANIFESTO 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FinalCTASection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => (
  <section className="py-28 px-6 text-center relative overflow-hidden border-b border-white/[0.05] bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] gradient-magnetic opacity-20 rounded-full blur-[150px] pointer-events-none -z-10" />
    <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] gradient-gold-glow opacity-40 rounded-full blur-[120px] pointer-events-none -z-10" />

    <div className="max-w-2xl mx-auto relative">
      <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block mb-5">
        ♟ A Decisão Inevitável
      </span>

      <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white max-w-xl mx-auto leading-[1.05] mb-5">
        Daqui a 12 meses, <br />
        <span className="display-heading text-gradient-gold">vais desejar ter começado hoje.</span>
      </h2>

      <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto leading-relaxed mb-4">
        O <strong className="text-white">Founder Batch 01</strong> encerra em breve. O próximo lote sobe para <strong className="text-white">$27</strong> e o preço final será <strong className="text-white">$49</strong>.
      </p>
      <p className="text-[11px] text-[#D4AF37] font-mono font-bold mb-8 tracking-wide">
        ♟ Garante agora o acesso antecipado pelo valor mais baixo possível.
      </p>

      <div className="max-w-xl mx-auto mb-6 space-y-3">
        <button onClick={() => { Telemetry.emit("final_cta_intl"); onConvert("international"); }} className="w-full btn-luxury-cyan py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 cursor-pointer animate-pulse-ring">
          <Crown className="w-4 h-4" />
          Garantir Founder Batch 01 — $10
          <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={() => { Telemetry.emit("final_cta_angola"); onConvert("angola"); }} className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]">
          <MessageCircle className="w-4 h-4 fill-white" />
          Angola — 10.000 AKZ via WhatsApp
        </button>
      </div>

      <p className="text-[10px] text-[#A1A1AA]/60 font-mono">
        Licenciamento perpétuo · Garantia 30 dias · Acesso imediato
      </p>
    </div>
  </section>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ FOOTER LEGAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LegalFooter = memo(() => (
  <footer className="border-t border-white/[0.05] bg-[#050505] pt-14 pb-28 px-6 text-xs text-[#A1A1AA]">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <img src={CONFIG.glowscaleLogo} alt="GlowScalePro" className="w-6 h-6 object-contain" />
          <span className="font-bold text-white tracking-tight text-sm">GlowScalePro</span>
          <span className="text-white/[0.15]">/</span>
          <span className="text-white font-medium text-xs">{CONFIG.authorName}</span>
        </div>
        <p className="text-[10px] text-[#A1A1AA]/60 max-w-md text-center sm:text-right leading-relaxed">
          Arquitetura operacional desenvolvida de forma independente. Sem afiliação ou patrocínio institucional da Notion Labs Inc.
        </p>
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
            <li><a href={CONFIG.communityLink} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">WhatsApp <ExternalLink className="w-2.5 h-2.5" /></a></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-mono text-white uppercase tracking-wider mb-3 font-semibold">Especificações</p>
          <p className="text-[#A1A1AA]/80 text-[10px] leading-relaxed">
            Notion Elite OS 2026. <br />
            Sistema operacional pessoal em Notion para estudantes e profissionais que recusam o caos.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-[#A1A1AA]/60">
        <p>© 2026 Gabriel Sapalo. Todos os direitos reservados.</p>
        <p className="font-mono text-[9px]">Clareza é poder · O caos custa caro</p>
      </div>
    </div>
  </footer>
));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ♟️ APP ROOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function App() {
  const [toast, setToast] = useState<typeof NOTIFICATIONS[0] | null>(null);

  useEffect(() => {
    Telemetry.emit("page_loaded", { ref: document.referrer });
    let i = 0;
    const iv = setInterval(() => {
      setToast(NOTIFICATIONS[i]);
      i = (i + 1) % NOTIFICATIONS.length;
      setTimeout(() => setToast(null), 3500);
    }, 9000);
    const t30 = setTimeout(() => Telemetry.emit("checkpoint_30s"), 30000);
    const t60 = setTimeout(() => Telemetry.emit("checkpoint_60s"), 60000);
    const marks = new Set<number>();
    const onScroll = () => {
      const p = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 90].forEach(x => { if (p >= x && !marks.has(x)) { marks.add(x); Telemetry.emit(`scroll_${x}`); } });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearInterval(iv); clearTimeout(t30); clearTimeout(t60); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollToOffer = useCallback(() => {
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const convert = useCallback((seg: "international" | "angola") => {
    Telemetry.emit("convert_click", { seg });
    if (seg === "international") window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    else window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
  }, []);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Notion Elite OS 2026",
    "image": CONFIG.productLogo,
    "description": "Sistema operacional mental pessoal criado pelo Campeão Nacional de Xadrez de Angola.",
    "brand": { "@type": "Brand", "name": "GlowScalePro" },
    "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "10.00", "availability": "https://schema.org/InStock" }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  };

  return (
    <div className="cinematic-noise min-h-screen bg-[#050505] text-white font-sans relative">
      <Helmet>
        <title>Notion Elite OS 2026 — Sistema Operacional Mental | Gabriel Sapalo</title>
        <meta name="description" content="O teu cérebro não foi feito para guardar prazos. Foi feito para criar o teu futuro. Sistema operacional mental criado pelo Campeão Nacional de Xadrez de Angola. Clareza, foco e controlo." />
        <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dyerjg6mf/image/upload/v1778858077/favicon.ico_h34ezo.ico" />
        <meta property="og:title" content="Notion Elite OS 2026 — Sistema Operacional Mental" />
        <meta property="og:description" content="Clareza é poder. O caos custa caro. Sistema Operacional Pessoal para operar com clareza, foco e controlo." />
        <meta property="og:image" content={CONFIG.notionMockup} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header onCTA={scrollToOffer} />
      <HeroSection onConvert={convert} />
      <MarqueeSection />
      <TransformationSection />
      <ManifestoSection />
      <PainSection />
      <NotTemplateSection />
      <SystemSection />
      <EngineeringSection />
      <BonusSection onConvert={convert} />
      <SocialProofSection />
      <AuthoritySection />
      <PremiumOfferSection onConvert={convert} />
      <FAQSection />
      <FinalCTASection onConvert={convert} />
      <LegalFooter />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 z-50 glass-modal-aggressive p-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs border-l-4 border-l-[#D4AF37]"
          >
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

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.08] p-2.5 flex items-center gap-2">
        <button onClick={() => convert("international")} className="flex-1 btn-luxury-cyan py-2.5 rounded-lg text-[11px] font-bold cursor-pointer flex items-center justify-center gap-1.5">
          <Crown className="w-3 h-3" />
          Internacional · $10
        </button>
        <button onClick={() => convert("angola")} className="flex-1 bg-[#25D366] hover:bg-[#1EBE5A] text-white py-2.5 rounded-lg text-[11px] font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
          <MessageCircle className="w-3 h-3 fill-white" />
          Angola · 10k AKZ
        </button>
      </div>

      <a href={CONFIG.whatsappPayment} target="_blank" rel="noopener noreferrer" onClick={() => Telemetry.emit("wa_float")} className="fixed bottom-20 md:bottom-6 right-5 z-50 bg-[#25D366] hover:bg-[#20ba59] p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none flex items-center justify-center group">
        <Send className="w-5 h-5 text-white" />
        <span className="absolute right-full mr-2.5 bg-[#050505] text-white text-[10px] font-mono px-2 py-1 rounded border border-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Falar com o Gabriel
        </span>
      </a>
    </div>
  );
}

export default App;
