import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Brain, Target, Sparkles, Zap, Play, ArrowRight,
  Check, ChevronDown, ChevronUp, Star, MessageCircle,
  ExternalLink, Menu, X, Shield, Send, CheckCircle2,
  Crown, Eye, Activity, Coins, Flame,
  Quote, Lock
} from "lucide-react";

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
  mockupExtra1: "https://drive.google.com/thumbnail?id=1Gv_vB4wENBXyiaQi1iD3UyuXkTvXg8sc&sz=w1000",
  mockupExtra2: "https://drive.google.com/thumbnail?id=1o79_tWug5lCJ2kI3T4yz0vJOm5wQ2P70&sz=w1000",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  internalView: "https://drive.google.com/thumbnail?id=1AQUxp-P7-Wf64CPqbTiQDsPqqBhL7dvL&sz=w1000",
  productHero: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986988/Notion_Elite_Starter_Kit_2026_20260528_jr4muh.jpg",
  productIntro: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_Intro_jfpgbo.png",
  productDashboard: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986987/notion_elite_starter_Kit_Dashboard_f1wqev.png",
  productGestorProjeto: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_Gestor_de_Projecto_eebyxb.png",
  productGestorFinanceiro: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_Gestor_Financeiro_qoknnt.png",
  productCerebroDigital: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_C%C3%A9rebro_digital_slkjqm.png",
  productExamesProvas: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_Exames_e_Provas_mogbmy.png",
  productHabitTracker: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779986986/notion_elite_starter_Kit_Habit_Tracker_teccka.png",
  fideProof: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1779991681/Campeonato_Nacional_Absoluto_2024_FIDE_results_harpay.png",
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappPayment: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  communityLink: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  telegramSupport: "https://t.me/+n_hkEVYAeO9lNDIx",
  supportEmail: "suporte@glowscalepro.com",
  termsOfUse: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyPolicy: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
  cookiePolicy: "https://drive.google.com/file/d/1owleKJFrC-MVOjMx7BKMuuqrhroSZqY1/view"
};

const MANIFESTO_PHRASES = [
  "Clareza é poder.",
  "O caos custa futuros.",
  "Disciplina visual.",
  "Organizados vencem."
];

const BONUSES = [
  { title: "Comunidade Elite Minds 2026", desc: "Grupo privado de operadores mentais com desafios semanais, reposts e suporte direto.", value: 97 },
  { title: "Hub de Prompts de IA (20+)", desc: "Prompts testados para resumir, criar e acelerar estudos com IA nativa do Notion.", value: 67 },
  { title: "Atualizações Vitalícias 2026/2027", desc: "Novas versões e módulos adicionados sem custo extra. Acesso perpétuo.", value: 120 },
  { title: "Setup Guiado em 24h", desc: "Vídeo prático de três passos para duplicar e personalizar tudo em menos de um dia.", value: 57 }
];

const TESTIMONIALS = [
  { name: "Tomás Ferreira", role: "Dupla Licenciatura", location: "Porto, Portugal", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Tomás_Ferreira_-Porto_-_Portugal_goriez.png", text: "Mano... consegui finalmente organizar tudo. Faço dupla licenciatura e trabalho num café. Antes vivia em pânico a dormir 4 horas. Agora planeio a semana toda em 10 min ao domingo. Surreal.", metric: "10 min/sem" },
  { name: "Mariana Costa", role: "Estudante Universitária", location: "Lisboa, Portugal", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Mariana_-_Lisboa_Portugal_uerhir.png", text: "Passei de média de 12 para 15 em dois meses. O cérebro digital devolveu-me o foco e tirou o peso de ter anotações perdidas. Sinto que tenho o controlo de volta.", metric: "12 → 15" },
  { name: "Ana Luísa Mendes", role: "Gestora de Projetos", location: "Luanda, Angola", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/Ana_Luisa_-_Luanda_Angola_vae6mt.png", text: "A integração das matrizes relacionais e os atalhos de bases de dados funcionam sem qualquer latência. Extremamente sólido. Um verdadeiro cockpit.", metric: "0 latência" },
  { name: "João Pedro Silva", role: "Profissional & Estudante", location: "São Paulo, Brasil", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/João_Pedro_-_São_Paulo_-_Brasil_inzjna.png", text: "Trabalhar e estudar ao mesmo tempo consumia-me. Este setup poupou-me 2 horas diárias. O tempo que recuperei paga o sistema no primeiro dia.", metric: "2h/dia poupas" },
  { name: "Sofia Rodrigues", role: "Mestranda e Pesquisadora", location: "Coimbra, Portugal", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857745/Sofia_Rodrigues_-_Coimbra_-Portugal_tlbepm.png", text: "Adeus abas perdidas e notas soltas. Setup concluído. Zero atrito. Execução imediata. É God Mode.", metric: "17 abas → 1 sistema" },
  { name: "Beatriz Mendonça", role: "Consultora Júnior", location: "Maputo, Moçambique", avatar: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1778857744/Beatriz_Mendoça_-_Maputo_Moçambique_qjsbtm.png", text: "Ou montas um ecossistema que funciona por ti ou continuas a perder prazos e a mentir a ti mesma. A metodologia de 24H obrigou-me a executar sem desculpas.", metric: "Setup em 4h" }
];

const FAQ_DATA = [
  { q: "Nunca usei o Notion. Consigo mesmo assim?", a: "Sim. O kit foi construído para iniciantes. Inclui guia prático de três passos para duplicar e personalizar tudo em menos de 24 horas." },
  { q: "Funciona no telemóvel?", a: "Sim. O sistema foi otimizado para desktop e smartphone. A interface é mobile-first para consultares prazos e tarefas em qualquer lugar." },
  { q: "Preciso pagar mensalidade ao Notion?", a: "Não. A versão gratuita do Notion é suficiente. Toda a estrutura funciona a 100% sem custos recorrentes." },
  { q: "Recebo acesso imediato?", a: "Sim. O acesso é enviado e liberado automaticamente assim que a compra for confirmada." },
  { q: "Quanto tempo demora o setup?", a: "Menos de 24 horas. O vídeo de setup guiado mostra cada passo — duplicar e personalizar. A maioria termina em menos de 4 horas." },
  { q: "É só para estudantes ou também para profissionais?", a: "Para os dois. Módulos independentes de gestão académica e acompanhamento de projetos correm em paralelo sem misturar informações." },
  { q: "Recebo atualizações futuras?", a: "Sim. Pagamento único, acesso vitalício às versões 2026 e 2027, e novos prompts de IA incluídos gratuitamente." }
];

const NOTIFICATIONS = [
  { name: "Lucas R.", item: "Ativou God Mode", time: "Há 2 min" },
  { name: "Marta S.", item: "Reset Operacional", time: "Há 5 min" },
  { name: "Tiago M.", item: "Ativou God Mode", time: "Há 12 min" },
  { name: "Inês P.", item: "Elite Minds 2026", time: "Há 18 min" },
  { name: "Rui C.", item: "Ativou God Mode", time: "Há 25 min" }
];

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
          <a href="#pilares" className="hover:text-white transition-colors">O Sistema</a>
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
            <a href="#pilares" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Sistema</a>
            <a href="#bonus" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Bónus</a>
            <a href="#provas" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Elite Minds</a>
            <a href="#autoridade" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">O Criador</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

const HeroVSL = memo(() => {
  const [playing, setPlaying] = useState(false);
  return (
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
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />
            <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D77A] text-[#050505] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-400">
              <Play className="w-6 h-6 fill-[#050505] translate-x-0.5" />
            </div>
            <p className="relative z-10 text-xs font-bold text-white mt-4 tracking-wide group-hover:text-[#D4AF37] transition-colors">
              ▶ Assistir Apresentação Estratégica (3 Min)
            </p>
            <span className="relative z-10 text-[10px] text-[#D4AF37] mt-1 font-mono font-semibold">
              Recomendado com áudio ativado
            </span>
          </button>
        ) : (
          <iframe
            src={`${CONFIG.heroVideo}?autoplay=1&rel=0&modestbranding=1`}
            title="VSL — Transforma o Caos em Controlo Total"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </motion.div>
  );
});

const HeroSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 px-6 max-w-6xl mx-auto text-center overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 badge-founder px-4 py-1.5 rounded-full text-xs font-mono tracking-wider mb-8">
        <Crown className="w-3.5 h-3.5" />
        FASE FOUNDER 2026 — Acesso Exclusivo
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-[11px] md:text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] max-w-2xl mx-auto mb-6"
      >
        Para estudantes e profissionais cansados do caos
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[-1.5px] leading-[1.02] max-w-5xl mx-auto mb-6 font-bold"
      >
        Para de viver no caos.<br />
        <span className="text-gradient-magnetic">Organiza toda a tua vida num único Notion</span> em menos de 24 horas.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-3xl mx-auto mb-6 leading-relaxed"
      >
        Mesmo com internet lenta, apagões ou PDFs espalhados. O sistema operacional pessoal criado pelo <strong className="text-white">Campeão Nacional de Xadrez de Angola</strong>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="flex flex-col items-center gap-4 mb-10"
      >
        <p className="text-sm md:text-base text-[#D4AF37] font-mono font-bold max-w-xl tracking-wide">
          O problema nunca foi falta de inteligência. <br className="hidden sm:block" />
          Foi operar sem sistema.
        </p>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#25D366]/20 bg-[#25D366]/5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[11px] font-mono text-[#25D366] font-semibold">
            Configura tudo em menos de 24h
          </span>
        </div>
      </motion.div>

      <HeroVSL />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="relative max-w-5xl mx-auto mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <img src={CONFIG.productHero} alt="Notion Elite Starter Kit 2026" className="w-full" loading="eager" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-xs md:text-sm text-[#A1A1AA] max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        Chega de perder tempo a tentar organizar-se. Com o <strong className="text-white">Notion Elite Starter Kit 2026</strong>, você não gere apenas tarefas — gere a sua carreira e estudos com a precisão de um arquiteto de sistemas.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="max-w-md mx-auto mb-10 p-5 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] text-left"
      >
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] mb-3 font-bold">Em menos de 24 horas vais:</p>
        <div className="space-y-2.5 text-sm text-[#D4D4D8]">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366] shrink-0" /><span>Ter um sistema completo e funcional</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366] shrink-0" /><span>Eliminar abas, PDFs e notas perdidas</span></div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366] shrink-0" /><span>Saber exactamente o que fazer todos os dias</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-xl mx-auto space-y-3">
        <button onClick={() => onConvert("international")} className="w-full btn-luxury-cyan py-4 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-3 animate-pulse-ring">
          <Crown className="w-5 h-5" />
          Quero organizar a minha vida agora — $10
          <ArrowRight className="w-4 h-4" />
        </button>

        <button onClick={() => onConvert("angola")} className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] transition-all hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]">
          <MessageCircle className="w-5 h-5 fill-white" />
          Angola · 10.000 AKZ via WhatsApp
        </button>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs text-[#A1A1AA] mt-8 mb-12">
        +3.200 utilizadores · 4.9/5 · Criado pelo Campeão Nacional de Xadrez de Angola
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("pilares")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">Descobre como</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#D4AF37]/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
});

const AnimatedCounter = memo(({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
        {count.toLocaleString("pt-PT")}{suffix}
      </p>
      <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
});

const CountersSection = memo(() => (
  <section className="py-16 px-6 border-b border-white/[0.05] bg-[#070707]">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      <AnimatedCounter end={3247} suffix="+" label="Avaliações Verificadas" />
      <AnimatedCounter end={12} label="Países CPLP" />
      <AnimatedCounter end={24} suffix="h" label="Setup Médio" />
      <AnimatedCounter end={98} suffix="%" label="Taxa de Retenção" />
    </div>
  </section>
));

const AngolaContextSection = memo(() => {
  return (
    <section className="py-20 px-6 border-b border-white/[0.05] bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 md:p-10 rounded-3xl border border-[#25D366]/30 bg-[#050505] relative overflow-hidden shadow-[0_20px_60px_rgba(37,211,102,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono text-[#25D366] font-bold uppercase tracking-widest mb-4 bg-[#25D366]/10 px-3 py-1.5 rounded-lg border border-[#25D366]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Vantagem Competitiva Real
              </span>
              <h2 className="premium-heading text-2xl sm:text-3xl text-white mb-4 leading-tight">
                Feito para a nossa realidade. <br />
                <span className="text-[#25D366]">Funciona mesmo offline.</span>
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Enquanto outros sistemas param quando a net cai, o teu Elite OS continua. O sistema foi desenhado para simplicidade, velocidade e controlo real, independentemente do contexto.
              </p>
              
              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  "Internet lenta",
                  "Dados móveis limitados",
                  "Rotina caótica",
                  "Múltiplos projetos",
                  "Telemóvel ou Desktop",
                  "Apagões inesperados"
                ].map((item, i) => (
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

const ProblemSolutionSection = memo(() => (
  <section className="py-20 px-6 border-b border-white/[0.05] bg-[#070707]">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF007A] uppercase font-bold mb-3 block">
          O Diagnóstico
        </span>
        <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
          Sentes que estudas muito, <br className="hidden md:block" />
          <span className="display-heading text-[#FF007A]">mas não avanças?</span>
        </h2>
        <p className="text-sm text-[#A1A1AA] mt-4 leading-relaxed">
          O problema não é a tua dedicação. É a falta de um sistema. Este kit elimina a fricção e coloca à tua disposição <strong className="text-white">6 pilares de alta performance</strong>, prontos para uso imediato.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
        <img
          src={CONFIG.productIntro}
          alt="Notion Elite Kit — Problema vs Solução"
          className="w-full h-auto rounded-xl object-cover block"
          loading="lazy"
        />
      </div>
    </div>
  </section>
));

const PilaresSection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => {
  const pilares = [
    { label: "Pilar 01", title: "Dashboard — Centro de Comando", desc: "O seu centro de comando diário. Saiba exactamente o que é prioridade, sem distrações. Tarefas urgentes, prazos e metas num único ecrã limpo.", img: CONFIG.productDashboard },
    { label: "Pilar 02", title: "Gestor de Projectos — Método Kanban", desc: "Pare de procrastinar trabalhos práticos. O método Kanban visual mantém os seus projetos sob controlo total — do início à entrega.", img: CONFIG.productGestorProjeto },
    { label: "Pilar 03", title: "Gestor Financeiro — Controlo Total", desc: "Domine as suas finanças. Controlo rigoroso de receitas e despesas com a clareza que o seu bolso exige.", img: CONFIG.productGestorFinanceiro },
    { label: "Pilar 04", title: "Cérebro Digital — Arquivo de Conhecimento", desc: "Nunca mais esqueça uma informação valiosa. O seu arquivo de conhecimento, organizado e reutilizável para sempre.", img: CONFIG.productCerebroDigital, ctaAfter: true },
    { label: "Pilar 05", title: "Exames e Provas — Planeamento Estratégico", desc: "Antecipe-se às datas críticas. Planeamento estratégico para garantir que nada passe despercebido — zero surpresas em época de exames.", img: CONFIG.productExamesProvas },
    { label: "Pilar 06", title: "Habit Tracker — Rotinas que Compõem", desc: "Pequenas rotinas, resultados gigantes. O rastreador que transforma hábitos em resultados mensuráveis dia após dia.", img: CONFIG.productHabitTracker }
  ];

  return (
    <section id="pilares" className="py-20 px-6 border-b border-white/[0.05] bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-3 block">
            Os 6 Pilares de Alta Performance
          </span>
          <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Prova de funcionalidade. <br />
            <span className="display-heading text-gradient-gold">Sem promessas vazias.</span>
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-4">
            Cada pilar foi desenhado para eliminar uma fricção específica da sua rotina. Veja o produto real.
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
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold mb-2">A Solução Está Aqui</p>
                  <p className="text-sm text-white mb-4">
                    Não precisas de ver o resto da página.<br />
                    Se estás cansado do caos, este é o momento de agir.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button onClick={() => onConvert("international")} className="btn-luxury-cyan py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 animate-pulse-ring">
                      <Crown className="w-4 h-4" />
                      Internacional · $10
                    </button>
                    <button onClick={() => onConvert("angola")} className="bg-[#25D366] hover:bg-[#1EBE5A] text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Angola · 10k AKZ
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const ROICalculatorSection = memo(() => {
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const hourlyValue = 800;
  const weeksPerYear = 40;
  const annualLoss = hoursPerWeek * hourlyValue * weeksPerYear;
  const kitPrice = 10000;
  const roi = Math.round(annualLoss / kitPrice);

  return (
    <section className="py-20 px-6 border-b border-white/[0.05] bg-[#070707]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF007A] uppercase font-bold mb-3 block">
            A Lógica da Compra
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            Quanto te custa, <span className="display-heading text-[#FF007A]">por ano</span>, continuar desorganizado?
          </h2>
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-[#0A0A0A] border border-white/[0.06]">
          <label className="block text-xs text-[#A1A1AA] mb-2 font-mono uppercase tracking-wider">
            Horas perdidas por semana a organizar tarefas
          </label>
          <div className="flex items-center gap-4 mb-1">
            <input
              type="range"
              min="1"
              max="20"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            />
            <span className="text-3xl font-black text-white font-mono min-w-[80px] text-right">{hoursPerWeek}h</span>
          </div>
          <p className="text-[10px] text-[#A1A1AA] mb-6 font-mono">Ajusta o slider consoante a tua realidade.</p>

          <div className="grid sm:grid-cols-3 gap-3 pt-5 border-t border-white/[0.05]">
            <div className="p-4 rounded-xl bg-[#050505] border border-[#FF007A]/20 text-center">
              <p className="text-[9px] font-mono text-[#FF007A] uppercase tracking-widest mb-1">Custo anual do caos</p>
              <p className="text-xl font-black text-white font-mono">{annualLoss.toLocaleString("pt-PT")} <span className="text-xs text-[#A1A1AA]">AKZ</span></p>
            </div>
            <div className="p-4 rounded-xl bg-[#050505] border border-[#00E5FF]/20 text-center">
              <p className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-widest mb-1">Preço do Elite OS</p>
              <p className="text-xl font-black text-white font-mono">10.000 <span className="text-xs text-[#A1A1AA]">AKZ</span></p>
            </div>
            <div className="p-4 rounded-xl bg-[#050505] border border-[#D4AF37]/30 text-center">
              <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest mb-1">ROI estimado</p>
              <p className="text-xl font-black text-[#D4AF37] font-mono">{roi}x</p>
            </div>
          </div>

          <p className="text-center text-xs text-[#A1A1AA] mt-6 italic">
            Menos que uma saída ao fim de semana. Mais que um semestre inteiro de clareza.
          </p>
        </div>
      </div>
    </section>
  );
});

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

const TransformationSection = memo(() => {
  const rows = [
    { a: "Abas perdidas e dispersão", b: "Sistema centralizado" },
    { a: "Tarefas e prazos esquecidos", b: "Execução diária implacável" },
    { a: "Caos e ruído mental", b: "Clareza absoluta" },
    { a: "Procrastinação e paralisia", b: "Rotina fluida e automática" },
    { a: "Sobrevivência académica", b: "Execução com clareza" }
  ];

  return (
    <section id="transformacao" className="py-24 px-6 border-b border-white/[0.05]">
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

const RevealSection = memo(() => {
  return (
    <section className="py-20 px-6 border-b border-white/[0.05] bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4"
        >
          ♟ A Virada de Chave
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="premium-heading text-2xl sm:text-3xl md:text-4xl text-white mb-10 leading-tight"
        >
          Do caos… <span className="display-heading text-gradient-gold">à clareza</span>.
        </motion.h2>

        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          <motion.div
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <img
              src={CONFIG.notionMockup}
              alt="Transição Caos → Controlo"
              className="w-full h-auto rounded-xl object-cover block"
              loading="lazy"
            />
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent pointer-events-none"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-sm text-[#A1A1AA] mt-6 max-w-xl mx-auto italic font-serif"
        >
          "Quando o sistema entra, o ruído sai."
        </motion.p>
      </div>
    </section>
  );
});

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

const PainSection = memo(() => {
  const pains = [
    { icon: Activity, title: "Fragmentação Digital", desc: "PDFs perdidos. Apontamentos no WhatsApp. Prazos que te apanham de surpresa. O teu cérebro virou um browser com 47 abas abertas.", color: "pink" },
    { icon: Brain, title: "Sobrecarga Mental", desc: "Acordas cansado antes de começar. A mente nunca desliga. A ansiedade do domingo à noite virou rotina semanal.", color: "cyan" },
    { icon: Coins, title: "Custo Real", desc: "Cada semestre desperdiçado custa dinheiro, oportunidades e saúde mental. O caos não é gratuito — é o imposto invisível da desorganização.", color: "gold" }
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
            "No xadrez, uma jogada errada pode custar o campeonato. Na vida, um prazo esquecido pode custar o semestre inteiro."
          </p>
          <p className="text-[10px] text-[#D4AF37] font-mono mt-3 tracking-widest uppercase">
            — Gabriel Sapalo, Campeão Nacional de Xadrez 2024
          </p>
        </div>
      </div>
    </section>
  );
});

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

const JourneySection = memo(() => {
  const steps = [
    { time: "Minuto 0", title: "Acesso instantâneo", desc: "Recebes o link de duplicação imediatamente após o pagamento.", color: "cyan" },
    { time: "Minuto 20", title: "Personalização guiada", desc: "Vídeo de setup passo-a-passo para adaptar o sistema à tua vida.", color: "gold" },
    { time: "Dia 1", title: "Execução total", desc: "Acordas com clareza. Sabes exactamente o que fazer. O sistema já trabalha por ti.", color: "green" }
  ];

  const colorMap: Record<string, string> = {
    cyan: "text-[#00E5FF] border-[#00E5FF]/30 bg-[#00E5FF]/5",
    gold: "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5",
    green: "text-[#25D366] border-[#25D366]/30 bg-[#25D366]/5"
  };

  return (
    <section className="py-20 px-6 border-b border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-3 block">
            A Tua Jornada em 3 Etapas
          </span>
          <h2 className="premium-heading text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            Do pagamento à execução total <br className="hidden md:block" />
            <span className="display-heading text-gradient-gold">em menos de 24 horas.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${colorMap[s.color]} relative`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">{s.time}</span>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{s.desc}</p>
              <span className="absolute top-4 right-4 text-3xl font-black text-white/[0.04]">0{i + 1}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A0505] to-[#050505] border border-[#FF007A]/20">
            <p className="text-[10px] font-mono text-[#FF007A] font-bold uppercase tracking-widest mb-3">Isto NÃO é para ti se…</p>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              <li className="flex items-start gap-2"><X className="w-3 h-3 text-[#FF007A] shrink-0 mt-0.5" /> Procuras motivação mágica ou atalhos</li>
              <li className="flex items-start gap-2"><X className="w-3 h-3 text-[#FF007A] shrink-0 mt-0.5" /> Queres um template "bonito" só para mostrar</li>
              <li className="flex items-start gap-2"><X className="w-3 h-3 text-[#FF007A] shrink-0 mt-0.5" /> Não estás disposto a investir 20 minutos no setup</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#05140A] to-[#050A06] border border-[#25D366]/25">
            <p className="text-[10px] font-mono text-[#25D366] font-bold uppercase tracking-widest mb-3">Isto É para ti se…</p>
            <ul className="space-y-2 text-xs text-[#D4D4D8]">
              <li className="flex items-start gap-2"><Check className="w-3 h-3 text-[#25D366] shrink-0 mt-0.5" /> Queres operar com clareza todos os dias</li>
              <li className="flex items-start gap-2"><Check className="w-3 h-3 text-[#25D366] shrink-0 mt-0.5" /> Estás pronto para executar e não só planear</li>
              <li className="flex items-start gap-2"><Check className="w-3 h-3 text-[#25D366] shrink-0 mt-0.5" /> Valorizas sistema acima de inspiração</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

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

const EngineeringSection = memo(() => {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="engenharia" className="py-24 px-6 border-b border-white/[0.05] bg-[#070707]">
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

const AuthoritySection = memo(() => (
  <section id="autoridade" className="py-24 px-6 border-b border-white/[0.05] bg-[#070707] relative overflow-hidden">
    <div className="absolute inset-0 chess-deco opacity-20 pointer-events-none" />
    <div className="max-w-5xl mx-auto relative">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4 block">
          ♟ A Mente por Trás da Matriz
        </span>
        <h2 className="premium-heading text-3xl sm:text-4xl text-white">
          O sistema criado pelo <span className="display-heading text-gradient-gold">Campeão Nacional de Xadrez de Angola</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-[#0A0A0A] shadow-[0_0_40px_rgba(212,175,55,0.3)] mb-4">
              <img src={CONFIG.authorPhoto} alt={CONFIG.authorName} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{CONFIG.authorName}</h3>
              <p className="text-[10px] text-[#D4AF37] font-mono mt-1 tracking-widest uppercase block">{CONFIG.authorTitle}</p>
            </div>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-lg">
            <img src={CONFIG.fideProof} alt="Resultados Oficiais FIDE 2024" className="w-full h-auto object-cover opacity-90" loading="lazy" />
            <div className="p-3 bg-[#050505] border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#25D366] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> Verificado pela FIDE
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-5 text-sm text-[#A1A1AA] leading-relaxed mt-4 md:mt-0">
          <p className="text-lg md:text-xl font-serif italic text-white border-l-2 border-[#D4AF37] pl-5 py-2 bg-white/[0.01] rounded-r">
            "No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece exatamente o mesmo: quem não tem sistema, joga no improviso — e falha."
          </p>

          <p className="text-[#D4D4D8] bg-[#0A0A0A] border-l-2 border-[#00E5FF]/40 pl-4 py-2 rounded-r italic">
            Eu também vivia perdido entre PDFs, WhatsApp e deadlines. Criei este sistema primeiro para mim — porque precisava dele. Só depois percebi que funcionava para qualquer pessoa que quisesse sair do caos.
          </p>

          <div className="space-y-2">
            {[
              "♟️ Campeão Nacional Absoluto de Xadrez de Angola",
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

const UrgencyTimer = memo(() => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const STORAGE_KEY = "ne_founder_deadline_v1";
    let deadline = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 72 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(deadline));
    }

    const update = () => {
      const diff = Math.max(0, deadline - Date.now());
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ h, m, s });
    };

    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

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

        <div className="flex justify-center mt-3 mb-4">
          <UrgencyTimer />
        </div>

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

        <div className="mt-2 mb-6 bg-red-500/10 border border-red-500/20 text-left p-4 rounded-xl max-w-md mx-auto">
          <p className="text-xs font-bold text-red-400 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Viste os nossos anúncios de $10?
          </p>
          <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
            Parabéns, chegaste a tempo. O <strong className="text-white">Founder Batch 01</strong> ainda tem vagas, mas o preço subirá para <strong className="text-white">$49</strong> assim que este lote for fechado.
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
          
          <div className="mt-4 p-3 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00E5FF]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white mb-0.5">🎁 Bónus Exclusivo Incluído</p>
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">
                Acesso imediato à biblioteca com <strong>20 Prompts de IA Nativos</strong> para acelerar a tua produtividade. Tudo incluído no teu acesso.
              </p>
            </div>
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

        <div className="mt-5 pt-5 border-t border-white/[0.05]">
          <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">Métodos de pagamento aceites</p>
          <div className="flex items-center justify-center gap-3 flex-wrap text-[10px] text-white/70 font-mono">
            <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]">💳 Cartão Internacional</span>
            <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]">🇦🇴 Multicaixa Express</span>
            <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]">📱 Transferência Bancária</span>
            <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]">💬 WhatsApp Angola</span>
          </div>
          <p className="text-[10px] text-[#A1A1AA] mt-2 italic">
            Comenta <span className="text-[#D4AF37] font-bold">"ELITE"</span> nos nossos vídeos e recebe o link directo por DM.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05]">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <p className="text-xs font-bold text-white uppercase tracking-wider">Garantia de Resultado 30 Dias</p>
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Se em 30 dias não tiveres clareza real, devolvemos <strong className="text-white">100% do teu dinheiro</strong> <span className="text-[#D4AF37] font-semibold">e oferecemos uma sessão privada de 30 min com o Gabriel</span> para montarmos o teu sistema do zero. Sem risco.
          </p>
        </div>
      </div>
    </div>
  </section>
));

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

const FinalCTASection = memo(({ onConvert }: { onConvert: (seg: "international" | "angola") => void }) => (
  <section className="py-28 px-6 text-center relative overflow-hidden border-b border-white/[0.05] bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] gradient-magnetic opacity-20 rounded-full blur-[150px] pointer-events-none -z-10" />
    <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] gradient-gold-glow opacity-40 rounded-full blur-[120px] pointer-events-none -z-10" />

    <div className="max-w-2xl mx-auto relative">
      <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block mb-5">
        ♟ A Decisão Inevitável
      </span>

      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-mono shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <strong className="tracking-wide">Founder Batch 01 quase encerrado</strong>
        </div>
      </div>

      <h2 className="premium-heading text-3xl sm:text-4xl md:text-5xl text-white max-w-2xl mx-auto leading-[1.05] mb-5">
        A elite não espera pelas oportunidades. <br />
        <span className="display-heading text-gradient-gold">Ela cria o seu próprio sistema.</span>
      </h2>

      <p className="text-sm text-[#A1A1AA] max-w-xl mx-auto leading-relaxed mb-4">
        O Notion Elite Starter Kit 2026 é o investimento que separa quem apenas deseja de quem realmente executa.
      </p>
      <p className="text-xs text-[#FF007A] font-mono font-bold tracking-wide mb-2">
        O Founder Batch 01 está quase no fim. Depois sobe para $27 e $49.
      </p>
      <p className="text-[#D4AF37] font-mono font-bold text-xs md:text-sm tracking-wide mb-8 mt-4">
        ♟ Assume o comando da tua vida agora.
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

const ExitIntentModal = memo(() => {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (localStorage.getItem("ne_exit_dismissed") === "1") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed.current) {
        setShow(true);
        Telemetry.emit("exit_intent_shown");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleAction = () => {
    setShow(false);
    localStorage.setItem("ne_exit_dismissed", "1");
    dismissed.current = true;
    Telemetry.emit("exit_intent_action_clicked");
    document.getElementById("engenharia")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("ne_exit_dismissed", "1");
    dismissed.current = true;
    Telemetry.emit("exit_intent_dismissed");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-[#A1A1AA] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">
                Ainda indeciso?
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-4">
                Não saias sem ver o sistema em <span className="text-[#D4AF37]">ação real</span>.
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Lembra-te: o Notion Elite Starter Kit 2026 já inclui o <strong className="text-white">Hub de 20 Prompts IA</strong> para poupares horas de trabalho esta semana.
              </p>
              <p className="text-xs text-[#A1A1AA] mt-3 leading-relaxed">
                Vais continuar a perder tempo a organizar a tua rotina manualmente?
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAction}
                className="w-full btn-luxury-gold py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 animate-pulse-gold"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Ver o Sistema em Ação</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export function App() {
  const [toast, setToast] = useState<typeof NOTIFICATIONS[0] | null>(null);

  useEffect(() => {
    Telemetry.emit("page_loaded", { ref: document.referrer });
    let i = 0;
    const iv = setInterval(() => {
      setToast(NOTIFICATIONS[i]);
      i = (i + 1) % NOTIFICATIONS.length;
      setTimeout(() => setToast(null), 3500);
    }, 14000);
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
    const urlParams = new URLSearchParams(window.location.search);
    const metaClickId = urlParams.get("fbclid") || "";
    const utmSource = urlParams.get("utm_source") || "";
    const utmCampaign = urlParams.get("utm_campaign") || "";

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
      Telemetry.emit("checkout_hotmart_redirect");
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "InitiateCheckout", { value: 10, currency: "USD", content_name: "Notion Elite OS 2026" });
      }
      window.open(CONFIG.hotmartCheckout, "_blank", "noopener,noreferrer");
    } else {
      Telemetry.emit("checkout_whatsapp_redirect");
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Contact", { content_name: "Notion Elite OS 2026 — Angola" });
      }
      window.open(CONFIG.whatsappPayment, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <div className="cinematic-noise min-h-screen bg-[#050505] text-white font-sans relative">
      <Header onCTA={scrollToOffer} />
      <HeroSection onConvert={convert} />
      <CountersSection />
      <AngolaContextSection />
      <ProblemSolutionSection />
      <PilaresSection onConvert={convert} />
      <ROICalculatorSection />
      <MarqueeSection />
      <TransformationSection />
      <RevealSection />
      <ManifestoSection />
      <PainSection />
      <NotTemplateSection />
      <JourneySection />
      <BonusSection onConvert={convert} />
      <EngineeringSection />
      <SocialProofSection />
      <AuthoritySection />
      <PremiumOfferSection onConvert={convert} />
      <FAQSection />
      <FinalCTASection onConvert={convert} />
      <LegalFooter />
      <ExitIntentModal />

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