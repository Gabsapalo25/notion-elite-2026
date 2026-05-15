import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp, Menu, MessageCircle,
  Play, X, ExternalLink, Star, Shield, Zap, Users, Brain, Target, Wallet,
  BookOpen, Flame, TrendingUp, Sparkles, LayoutDashboard, CalendarDays,
  BarChart3, CheckCircle, XCircle, Sun, Coffee, BedDouble
} from "lucide-react";
import { C, REVIEWS, FAQ } from "./lib/config";
import { track, trackScroll, initTimers, captureUtms, withUtms } from "./lib/tracking";

/* ── Helpers ── */
const go = (t: "h" | "w", s: string) => {
  track(t === "h" ? "cta_hotmart" : "cta_wa", { s });
  window.open(withUtms(t === "h" ? C.hotmart : C.whatsapp), "_blank", "noopener,noreferrer");
};
const bd = "border border-white/[0.06]";

/* countdown + timer removed — launch framing replaces artificial urgency */

/* ── Reveal ── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: "easeOut" }} className={className}>{children}</motion.div>;
}

/* ── CTA ── */
function Cta({ s, label }: { s: string; label?: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
      <button onClick={() => go("h", s)}
        className="pulse-main w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 text-white px-7 py-3.5 rounded-xl text-[14px] font-bold hover:from-violet-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(139,92,246,.25)]">
        {label || "Garantir Meu Preço Fundador"} — $10 <ArrowRight className="w-4 h-4" />
      </button>
      <button onClick={() => go("w", s)}
        className="pulse-green w-full sm:w-auto bg-emerald-600 text-white px-7 py-3.5 rounded-xl text-[14px] font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(34,197,94,.2)]">
        <MessageCircle className="w-4 h-4" /> Pagar em Kwanzas
      </button>
    </div>
  );
}

/* timer removed — launch narrative is more credible than countdown */

/* notifications removed — static social proof in hero is more credible */

/* ━━━━━ BANNER (launch framing) ━━━━━ */
function Banner() {
  const [v, setV] = useState(true);
  if (!v) return null;
  return (
    <div className="relative bg-[#0A0A0A] border-b border-white/[0.04] text-center py-2.5 px-8 text-[11px] sm:text-[12px] text-zinc-400 z-[60]">
      <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /><span className="text-violet-300 font-semibold">Preço Fundador Ativo</span></span>
      <span className="mx-1.5 text-zinc-700">·</span>
      Primeira turma entra por <span className="text-white font-semibold">$10</span>. Após o lançamento sobe para $47.
      <button onClick={() => setV(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white cursor-pointer"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}

/* ━━━━━ HEADER ━━━━━ */
const Header = memo(function Header() {
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(() => { const h = () => setSc(scrollY > 32); addEventListener("scroll", h, { passive: true }); return () => removeEventListener("scroll", h); }, []);
  const links: [string, string][] = [["#demo", "Demo"], ["#como", "Como Funciona"], ["#prova", "Resultados"], ["#preco", "Preço"]];
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${sc ? "bg-[#030303]/85 backdrop-blur-2xl border-b border-white/[0.04]" : "bg-transparent"}`}>
      <div className="max-w-[1120px] mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img src={C.productLogo} alt="Notion Elite Kit" className="h-14 w-14 rounded-lg object-contain" />
          <span className="text-[13px] font-semibold text-zinc-400 group-hover:text-white transition-colors tracking-tight hidden sm:inline">Notion Elite Kit 2026</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[13px] text-zinc-500">
          {links.map(([h, l]) => <a key={h} href={h} className="hover:text-zinc-200 transition-colors">{l}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => { track("hdr"); document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-violet-600 text-white text-[13px] font-bold px-4 py-[6px] rounded-lg hover:bg-violet-500 transition-colors cursor-pointer">Começar</button>
          <button onClick={() => setMo(!mo)} className="md:hidden text-zinc-500 p-1 cursor-pointer">{mo ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </div>
      <AnimatePresence>{mo && (
        <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0A0A0A] border-t border-white/[0.04] px-5 py-4 space-y-3">
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setMo(false)} className="block text-[14px] text-zinc-400 hover:text-white">{l}</a>)}
        </motion.nav>
      )}</AnimatePresence>
    </header>
  );
});

/* ━━━━━ HERO — EMOTIONAL, NOT TECHNICAL ━━━━━ */
function Hero() {
  return (
    <section className="relative pt-10 pb-6 md:pt-16 md:pb-10 px-5 overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(139,92,246,.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Launch badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[11px] text-violet-300 font-semibold uppercase tracking-wider">Preço Fundador de Lançamento Ativo</span>
        </motion.div>

        {/* H1 — Clear, sells the end state */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[1.6rem] sm:text-[2.2rem] md:text-[2.8rem] font-black tracking-[-0.035em] leading-[1.1] text-white mb-5">
          Organize estudos, trabalho e vida inteira<br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 bg-clip-text text-transparent">num único sistema Notion pronto para usar.</span>
        </motion.h1>

        {/* Sub — Simple, tangible */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed max-w-lg mx-auto mb-8">
          Tarefas, finanças, metas, hábitos, calendário e IA — tudo centralizado. Duplica o sistema, segue o guia e <span className="text-white font-medium">em 24 horas a tua vida está organizada.</span>
        </motion.p>

        {/* Price — launch framing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-3 text-[13px]">
            <span className="text-zinc-600 line-through">$47</span>
            <span className="text-white font-bold text-xl">$10</span>
            <span className="text-[10px] text-zinc-500">/ 10.000 AKZ</span>
          </div>
          <p className="text-[11px] text-zinc-500">Preço fundador — sobe após esta campanha de lançamento</p>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="max-w-lg mx-auto mb-5">
          <Cta s="hero" label="Garantir Meu Preço Fundador" />
        </motion.div>

        {/* Trust */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-500 font-medium mb-14">
          {[["Garantia 30 dias", Shield], ["Acesso vitalício", Zap], ["+312 alunos", Users]].map(([t, I]) => {
            const Icon = I as typeof Shield;
            return <span key={t as string} className="flex items-center gap-1.5"><Icon className="w-3 h-3 text-zinc-600" />{t as string}</span>;
          })}
        </motion.div>
      </div>

      {/* Mockup */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="max-w-5xl mx-auto relative z-10">
        <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse,rgba(139,92,246,.05)_0%,transparent_55%)] pointer-events-none blur-xl" />
        <div className={`relative rounded-2xl overflow-hidden ${bd} bg-[#0A0A0A] shadow-[0_24px_80px_rgba(0,0,0,.6)]`}>
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.04]">
            {[0,1,2].map(i => <span key={i} className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />)}
            <span className="text-[10px] text-zinc-700 ml-3 font-mono">notion-elite-kit-2026</span>
          </div>
          <img src={C.mockup} alt="Dashboard" className="w-full block" />
        </div>
      </motion.div>
    </section>
  );
}

/* ━━━━━ VSL ━━━━━ */
function VSL() {
  const [on, setOn] = useState(false);
  return (
    <section id="demo" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-4xl mx-auto">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3 text-center">Veja na prática</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight text-center mb-10">3 minutos para entender o que muda na sua rotina</h2>
        <div className="grid md:grid-cols-[1fr_260px] gap-8 items-center">
          <div className={`relative rounded-xl overflow-hidden ${bd} bg-black aspect-video shadow-[0_8px_50px_rgba(0,0,0,.5)]`}>
            {!on ? (
              <button onClick={() => { setOn(true); track("vsl"); }} className="absolute inset-0 flex flex-col items-center justify-center group cursor-pointer">
                <img src={C.laptop} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10 w-16 h-16 rounded-full bg-violet-500/20 backdrop-blur-md border border-violet-500/30 flex items-center justify-center group-hover:bg-violet-500/30 group-hover:scale-110 transition-all">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
                <p className="relative z-10 text-[12px] text-zinc-400 mt-3 group-hover:text-white transition-colors font-medium">Clique para assistir</p>
              </button>
            ) : (
              <div className="vw"><iframe src={`${C.video}?rel=0`} title="VSL" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
            )}
          </div>
          <div className="space-y-2.5 hidden md:block">
            {[[LayoutDashboard, "Dashboard Central"], [Wallet, "Finanças"], [Target, "Metas & Hábitos"], [Brain, "Segundo Cérebro"], [Sparkles, "IA Integrada"], [CalendarDays, "Calendário"]].map(([I, l], i) => {
              const Icon = I as typeof Brain;
              return <div key={i} className={`${bd} bg-[#0A0A0A] rounded-lg px-3.5 py-2.5 flex items-center gap-3 hover:border-violet-500/20 transition-colors`}><Icon className="w-4 h-4 text-violet-400/70 shrink-0" /><span className="text-[12px] text-zinc-300 font-medium">{l as string}</span></div>;
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ IMAGINE SECTION — THE WOW MOMENT ━━━━━ */
function ImagineSection() {
  const moments = [
    { icon: Sun, time: "07:00", text: "Acordas e o teu dashboard já mostra as 3 prioridades do dia." },
    { icon: Coffee, time: "08:30", text: "Revês os teus hábitos e marcas o treino matinal — 5 segundos." },
    { icon: Target, time: "10:00", text: "Entregas um relatório antes do prazo. Sem stress. Já estava planeado." },
    { icon: BookOpen, time: "14:00", text: "A IA gera flashcards automáticos da aula que acabaste de ter." },
    { icon: Wallet, time: "18:00", text: "Consultados os gastos do mês. Tudo dentro do orçamento." },
    { icon: BedDouble, time: "22:00", text: "Deitas-te sabendo que amanhã já está planeado. A mente descansa." },
  ];
  return (
    <section className="py-20 px-5 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,.04)_0%,transparent_60%)] pointer-events-none" />
      <Reveal className="max-w-3xl mx-auto">
        <p className="text-[11px] font-bold text-violet-400/60 uppercase tracking-[.15em] mb-3 text-center">Resultado</p>
        <h2 className="text-[1.4rem] sm:text-[1.7rem] font-bold text-white tracking-tight text-center mb-3 leading-tight">
          Imagina um dia em que <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">tudo faz sentido.</span>
        </h2>
        <p className="text-[13px] text-zinc-400 text-center max-w-md mx-auto mb-12">Isto não é fantasia. É a rotina real dos +214 que já usam o sistema.</p>

        <div className="space-y-3">
          {moments.map((m, i) => (
            <div key={i} className={`${bd} bg-[#0A0A0A] rounded-xl px-5 py-4 flex items-center gap-4 hover:border-violet-500/15 transition-colors`}>
              <div className="w-10 h-10 rounded-lg bg-violet-500/[0.06] border border-violet-500/10 flex items-center justify-center shrink-0">
                <m.icon className="w-4 h-4 text-violet-400/70" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-zinc-600 font-mono font-medium">{m.time}</span>
                <p className="text-[13px] text-zinc-300 leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[15px] text-zinc-300 font-medium mb-6">Esta pode ser a tua rotina a partir de amanhã.</p>
          <Cta s="imagine" label="Quero Esta Clareza" />
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ BEFORE / AFTER ━━━━━ */
function BeforeAfter() {
  const before = ["Acordas sem saber o que fazer primeiro", "Prazos esquecidos, notas espalhadas", "Ansiedade constante, mente sobrecarregada", "Dinheiro a sair sem controlo", "Acabas o dia sem sensação de progresso"];
  const after = ["Acordas com as 3 prioridades definidas", "Calendário visual, tudo centralizado", "Clareza mental, foco absoluto", "Finanças organizadas visualmente", "Cada dia termina com sensação de avanço"];
  return (
    <section className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-4xl mx-auto">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3 text-center">Transformação</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight text-center mb-10">A diferença entre sobreviver e dominar o teu dia</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className={`${bd} bg-red-500/[0.03] rounded-xl p-6`}>
            <div className="flex items-center gap-2 mb-4"><XCircle className="w-5 h-5 text-red-400" /><span className="text-[14px] font-bold text-red-400">Sem sistema</span></div>
            <div className="space-y-2.5">{before.map((t, i) => <div key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-400"><XCircle className="w-3.5 h-3.5 text-red-500/50 shrink-0 mt-0.5" /><span>{t}</span></div>)}</div>
          </div>
          <div className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4"><CheckCircle className="w-5 h-5 text-emerald-400" /><span className="text-[14px] font-bold text-emerald-400">Com o Elite Kit</span></div>
            <div className="space-y-2.5">{after.map((t, i) => <div key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-300"><CheckCircle className="w-3.5 h-3.5 text-emerald-500/60 shrink-0 mt-0.5" /><span>{t}</span></div>)}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ WHAT YOU GET — clear deliverables ━━━━━ */
function WhatYouGet() {
  const items = [
    { icon: LayoutDashboard, title: "Dashboard principal", desc: "Visão completa do teu dia, semana e mês." },
    { icon: CalendarDays, title: "Calendário de prazos", desc: "Nunca mais esqueces uma entrega." },
    { icon: Wallet, title: "Gestor financeiro", desc: "Controla gastos e orçamento visual." },
    { icon: Brain, title: "Cérebro digital", desc: "Notas, ideias e referências organizadas." },
    { icon: Sparkles, title: "20 prompts de IA", desc: "Resumos e flashcards automáticos." },
    { icon: Target, title: "Tracker de hábitos", desc: "Constrói consistência diária." },
    { icon: BookOpen, title: "Sistema de estudos", desc: "Por disciplina, com progresso visual." },
    { icon: TrendingUp, title: "Planeamento semanal", desc: "10 minutos ao domingo, semana planeada." },
    { icon: BarChart3, title: "Revisão e metas", desc: "Acompanha objetivos com clareza." },
  ];
  return (
    <section className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-5xl mx-auto">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3 text-center">O que recebes</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight text-center mb-3">Tudo o que precisas. Pronto para duplicar.</h2>
        <p className="text-[13px] text-zinc-400 text-center mb-10 max-w-md mx-auto">Sem construir nada do zero. Duplica, segue o guia, e o sistema está a funcionar em 24 horas.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <div key={i} className={`${bd} bg-[#0A0A0A] rounded-xl px-4 py-3.5 flex items-center gap-3 hover:border-white/[0.1] transition-colors`}>
              <div className="w-8 h-8 rounded-lg bg-violet-500/[0.06] border border-violet-500/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-violet-400/60" />
              </div>
              <div>
                <p className="text-[13px] text-white font-medium">{item.title}</p>
                <p className="text-[11px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ NEXT 24H — immediate result ━━━━━ */
function Next24h() {
  const results = [
    "Organizar todas as tarefas atrasadas num único lugar",
    "Centralizar notas e materiais de estudo",
    "Ter visão clara das finanças do mês",
    "Planear a semana inteira com prioridades definidas",
    "Eliminar o excesso de abas, apps e cadernos",
    "Criar uma rotina matinal e noturna clara",
  ];
  return (
    <section className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] font-bold text-emerald-400/60 uppercase tracking-[.15em] mb-3">Resultado imediato</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight mb-3">Nas próximas 24 horas vais conseguir:</h2>
        <p className="text-[13px] text-zinc-400 mb-8">Não daqui a 3 meses. Amanhã.</p>
        <div className="space-y-2.5 text-left max-w-md mx-auto">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3 text-[13px] text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400/60 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
        <div className="mt-8"><Cta s="24h" label="Começar Agora" /></div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ SHOWCASE 1 — Architectural view ━━━━━ */
function ShowcaseOne() {
  return (
    <section className="py-16 px-5 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,.04)_0%,transparent_60%)] pointer-events-none" />
      <Reveal className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[11px] font-bold text-violet-400/60 uppercase tracking-[.15em] mb-3">O que recebes</p>
            <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight mb-4 leading-tight">Não precisas de construir nada. Está tudo pronto.</h2>
            <p className="text-[13px] text-zinc-400 leading-relaxed mb-5">Duplicas o sistema, segues o guia de 24h e no dia seguinte a tua vida já está organizada. Sem curva de aprendizagem.</p>
            <div className="space-y-2.5">
              {["Dashboard com visão completa do teu dia", "Calendário que te avisa antes de cada prazo", "Finanças pessoais com controlo visual", "IA que gera resumos e flashcards por ti"].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12px] text-zinc-300"><Check className="w-3.5 h-3.5 text-violet-400/50 shrink-0 mt-0.5" /><span>{t}</span></div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-violet-500/[0.05] to-emerald-500/[0.02] blur-2xl pointer-events-none" />
            <div className={`relative rounded-2xl overflow-hidden ${bd} bg-[#0A0A0A] shadow-[0_16px_60px_rgba(0,0,0,.5)]`}>
              <img src={C.mockup2} alt="Sistema completo" className="w-full block" loading="lazy" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ WALKTHROUGH ━━━━━ */
function Walkthrough() {
  const [on, setOn] = useState(false);
  return (
    <section id="como" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3">Por dentro do sistema</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight mb-3">Veja exactamente o que vai receber</h2>
        <p className="text-[13px] text-zinc-400 mb-10 max-w-lg mx-auto">Demonstração real do ecossistema — cada base de dados, cada automação, cada detalhe.</p>
        <div className={`relative rounded-2xl overflow-hidden ${bd} bg-black aspect-video shadow-[0_12px_60px_rgba(0,0,0,.6)]`}>
          {!on ? (
            <button onClick={() => { setOn(true); track("walk"); }} className="absolute inset-0 flex flex-col items-center justify-center group cursor-pointer">
              <img src={C.internal} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-violet-500/20 backdrop-blur-md border border-violet-500/30 flex items-center justify-center group-hover:bg-violet-500/30 group-hover:scale-105 transition-all">
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>
              <p className="relative z-10 text-[12px] text-zinc-400 mt-3 group-hover:text-white transition-colors font-medium">Clique para ver o sistema por dentro</p>
            </button>
          ) : (
            <div className="vw"><iframe src={C.walkthrough} title="Walkthrough" allow="autoplay; encrypted-media" allowFullScreen /></div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ SHOWCASE 2 — Deep system view ━━━━━ */
function ShowcaseTwo() {
  return (
    <section className="py-16 px-5 border-t border-white/[0.04] relative overflow-hidden">
      <Reveal className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-bl from-emerald-500/[0.04] to-violet-500/[0.02] blur-2xl pointer-events-none" />
            <div className={`relative rounded-2xl overflow-hidden ${bd} bg-[#0A0A0A] shadow-[0_16px_60px_rgba(0,0,0,.5)]`}>
              <img src={C.mockup3} alt="Visão detalhada" className="w-full block" loading="lazy" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-emerald-400/60 uppercase tracking-[.15em] mb-3">Profundidade</p>
            <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight mb-4 leading-tight">Cada detalhe desenhado para te poupar tempo e energia mental.</h2>
            <p className="text-[13px] text-zinc-400 leading-relaxed mb-5">Não é complexo. É inteligente. As bases de dados comunicam entre si para que nunca tenhas de duplicar esforço.</p>
            <div className="space-y-2.5">
              {["Tudo interligado — altera num lugar, atualiza em todo o sistema", "Vistas filtradas para cada contexto da tua vida", "Automações que eliminam trabalho manual repetitivo", "Funciona no telemóvel exactamente como no computador"].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12px] text-zinc-300"><Check className="w-3.5 h-3.5 text-emerald-400/50 shrink-0 mt-0.5" /><span>{t}</span></div>
              ))}
            </div>
            <div className="mt-6"><Cta s="showcase2" label="Entrar por Apenas $10" /></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ BONUSES ━━━━━ */
function Bonuses() {
  const tiers = [
    { tag: "TODOS RECEBEM", color: "violet", items: [
      { icon: TrendingUp, title: "Atualizações 2027 Gratuitas", val: "$29" },
      { icon: Users, title: "Comunidade VIP 60 Dias", val: "$19" },
    ]},
    { tag: "PRIMEIROS 15", color: "amber", items: [
      { icon: Sparkles, title: "Pack de Ícones Premium", val: "$15" },
      { icon: CalendarDays, title: "Planeamento Anual Completo", val: "$12" },
    ]},
    { tag: "PRIMEIROS 35", color: "emerald", items: [
      { icon: BarChart3, title: "Dashboard Financeiro Pro", val: "$25" },
      { icon: Brain, title: "50 Prompts de IA Avançados", val: "$19" },
    ]},
    { tag: "PRIMEIROS 50", color: "rose", items: [
      { icon: BookOpen, title: "Mini-Curso de Produtividade", val: "$49" },
      { icon: Flame, title: "Mentoria em Grupo (Gravada)", val: "$79" },
    ]},
  ];
  const cs: Record<string, string> = { violet: "border-violet-500/15 bg-violet-500/[0.03]", amber: "border-amber-500/15 bg-amber-500/[0.03]", emerald: "border-emerald-500/15 bg-emerald-500/[0.03]", rose: "border-rose-500/15 bg-rose-500/[0.03]" };
  const ts: Record<string, string> = { violet: "bg-violet-500/15 text-violet-300", amber: "bg-amber-500/15 text-amber-300", emerald: "bg-emerald-500/15 text-emerald-300", rose: "bg-rose-500/15 text-rose-300" };

  return (
    <section id="bonus" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-4xl mx-auto">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3 text-center">Bónus</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight text-center mb-3">Quanto mais cedo entrar, mais recebe</h2>
        <p className="text-[13px] text-zinc-400 text-center mb-10 max-w-md mx-auto">Os bónus são desbloqueados por ordem de chegada.</p>
        <div className="space-y-3">
          {tiers.map((tier, ti) => (
            <div key={ti} className={`border rounded-xl p-5 ${cs[tier.color]}`}>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${ts[tier.color]} mb-3 inline-block`}>{tier.tag}</span>
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                {tier.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 shrink-0 opacity-60" />
                    <span className="text-[13px] text-zinc-200 font-medium flex-1">{item.title}</span>
                    <span className="text-[11px] text-zinc-600 line-through">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[13px] text-zinc-400 mt-6">Valor total: <span className="text-white font-bold line-through">$247</span> → <span className="text-violet-400 font-bold">Incluído GRÁTIS</span></p>
      </Reveal>
    </section>
  );
}

/* ━━━━━ AUTHOR ━━━━━ */
function Author() {
  return (
    <section id="autor" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="shrink-0 relative">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-violet-500/[0.06] to-transparent blur-xl pointer-events-none" />
          <div className={`relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden ${bd} bg-[#0A0A0A]`}>
            <img src={C.authorImg} alt={C.author} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-2">Quem criou este sistema</p>
          <h3 className="text-xl font-bold text-white tracking-tight mb-1">{C.author}</h3>
          <p className="text-[12px] text-violet-400/50 font-medium mb-4">Estratega & Arquitecto do Sistema</p>

          {/* Quote — short */}
          <div className="border-l-2 border-violet-500/30 pl-4 mb-5">
            <p className="text-[13px] text-zinc-300 italic leading-relaxed">"Quem não tem sistema, joga no improviso e falha."</p>
          </div>

          {/* Bullets — scannable */}
          <div className="space-y-2 mb-4">
            {[
              "Campeão Nacional Absoluto de Xadrez de Angola 2024",
              "Especialista em planeamento estratégico e gestão de dados",
              "Formação em Contabilidade, Auditoria e Psicologia Analítica",
              "Criador do Notion Elite Kit — usado por +312 pessoas em 4 países",
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[12px] text-zinc-400">
                <Check className="w-3.5 h-3.5 text-violet-400/50 shrink-0 mt-0.5" /><span>{b}</span>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-zinc-500 leading-relaxed">
            Gabriel criou o sistema porque precisava de organizar a sua própria vida caótica. Hoje, esse mesmo sistema ajuda centenas de estudantes e profissionais a sair do caos.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ PROOF ━━━━━ */
function Proof() {
  return (
    <section id="prova" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-5xl mx-auto">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[.15em] mb-3 text-center">Resultados</p>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-white tracking-tight text-center mb-3">Pessoas reais que saíram do caos</h2>
        <div className="flex items-center justify-center gap-1 mb-10">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
          <span className="text-[12px] text-zinc-400 ml-2">4.9/5</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`bg-[#0A0A0A] ${bd} rounded-xl p-6 pt-8 hover:border-white/[0.1] transition-colors flex flex-col items-center text-center`}>
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0 mb-4 av-glow">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-[13px] font-semibold text-white mb-0.5">{r.name}</p>
              <p className="text-[11px] text-violet-400/50 font-medium mb-3">{r.loc}</p>
              <div className="flex items-center gap-0.5 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-amber-400/60 fill-amber-400/60" />)}</div>
              <p className="text-[12px] text-zinc-400 leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ GUARANTEE ━━━━━ */
function Guarantee() {
  return (
    <section className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-xl mx-auto text-center">
        <div className="bg-gradient-to-b from-emerald-500/[0.04] to-transparent border border-emerald-500/15 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mx-auto mb-4"><Shield className="w-6 h-6 text-emerald-400" /></div>
          <h3 className="text-[1.1rem] font-bold text-white mb-3">Garantia de 30 Dias — Zero Risco</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed">Teste o sistema durante 30 dias. Se não transformar a sua organização, devolvemos 100% — <span className="text-emerald-400 font-medium">e ficas com os bónus.</span></p>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ PRICING ━━━━━ */
function Pricing() {
  const items = ["Dashboard completo", "Framework 24H", "Templates prontos", "20 Prompts IA", "Habit Tracker", "Calendário visual", "Finanças pessoais", "Suporte dedicado"];
  return (
    <section id="preco" className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-[520px] mx-auto">
        <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-b from-violet-500/[0.03] to-[#0A0A0A] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,.06)]">
          <div className="p-8 text-center border-b border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-[radial-gradient(ellipse,rgba(139,92,246,.04)_0%,transparent_70%)] pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 relative mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-[11px] font-semibold uppercase tracking-wider">Preço Fundador de Lançamento</span>
            </div>
            <div className="flex items-baseline justify-center gap-2 mt-2 mb-1 relative">
              <span className="text-5xl font-black text-white">$10</span>
              <span className="text-zinc-700">/</span>
              <span className="text-2xl font-bold text-emerald-400">10.000 AKZ</span>
            </div>
            <p className="text-[12px] text-zinc-500 relative">Primeira turma. Sobe para <span className="text-zinc-400 font-medium">$47</span> após o lançamento.</p>
          </div>
          <div className="p-8">
            <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
              {items.map((t, i) => <div key={i} className="flex items-center gap-2.5 text-[12px] text-zinc-300"><Check className="w-3.5 h-3.5 text-violet-400/50 shrink-0" /><span>{t}</span></div>)}
            </div>
            <Cta s="pricing" label="Quero Organizar Minha Vida" />
            <p className="mt-4 text-center text-[10px] text-zinc-600">Internacional → botão roxo. Angola → botão verde.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ FAQ ━━━━━ */
function FaqSection() {
  const [o, setO] = useState<number | null>(null);
  return (
    <section className="py-16 px-5 border-t border-white/[0.04]">
      <Reveal className="max-w-[520px] mx-auto">
        <h2 className="text-[1.3rem] font-bold text-white tracking-tight text-center mb-10">Perguntas frequentes</h2>
        <div className="divide-y divide-white/[0.04] border-y border-white/[0.04]">
          {FAQ.map((fq, i) => { const isO = o === i; return (
            <div key={i}>
              <button onClick={() => { setO(isO ? null : i); if (!isO) track("faq", { q: fq.q }); }} className="w-full py-4 flex items-center justify-between text-left gap-4 group cursor-pointer">
                <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors">{fq.q}</span>
                {isO ? <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-700 shrink-0" />}
              </button>
              <AnimatePresence>{isO && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <p className="text-[12px] text-zinc-500 leading-relaxed pb-4">{fq.a}</p>
                </motion.div>
              )}</AnimatePresence>
            </div>
          ); })}
        </div>
      </Reveal>
    </section>
  );
}

/* ━━━━━ FINAL — Emotional close ━━━━━ */
function FinalSection() {
  return (
    <section className="py-20 px-5 border-t border-white/[0.04] relative overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,.05)_0%,transparent_65%)] pointer-events-none" />
      <Reveal className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-black text-white tracking-tight mb-5 leading-tight">
          2026 vai acontecer de qualquer forma.<br />
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">A questão é: com clareza ou com caos?</span>
        </h2>
        <p className="text-[14px] text-zinc-400 mb-4 max-w-md mx-auto leading-relaxed">
          Há dois tipos de pessoas: as que organizam a vida e avançam. E as que continuam a reagir ao caos todos os dias.
        </p>
        <p className="text-[14px] text-zinc-300 font-medium mb-8">Tu decides de que lado ficas.</p>
        <Cta s="final" label="Quero Organizar Minha Vida" />
        <p className="text-[11px] text-zinc-600 mt-4">Garantia 30 dias · Acesso vitalício · Bónus incluídos · De $97 por apenas $10</p>
      </Reveal>
    </section>
  );
}

/* ━━━━━ FOOTER ━━━━━ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row items-center justify-center gap-3 mb-8">
          <img src={C.logo} alt="GlowScalePro" className="h-6 object-contain opacity-[0.2]" />
          <span className="text-[12px] font-semibold text-zinc-600 tracking-tight">GlowScalePro</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600 mb-6">
          <a href={C.terms} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors inline-flex items-center gap-1">Termos <ExternalLink className="w-2.5 h-2.5" /></a>
          <a href={C.privacy} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors inline-flex items-center gap-1">Privacidade <ExternalLink className="w-2.5 h-2.5" /></a>
          <a href={`mailto:${C.email}`} className="hover:text-zinc-400 transition-colors">{C.email}</a>
          <a href={C.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors inline-flex items-center gap-1">Telegram <ExternalLink className="w-2.5 h-2.5" /></a>
        </div>
        <p className="text-center text-[10px] text-zinc-700">© 2026 {C.author} · GlowScalePro · Não afiliado à Notion Labs Inc.</p>
      </div>
    </footer>
  );
}

/* ━━━━━ STICKY MOBILE ━━━━━ */
function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(scrollY > 600); addEventListener("scroll", h, { passive: true }); return () => removeEventListener("scroll", h); }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#030303]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3">
      <button onClick={() => go("h", "sticky")}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_-4px_20px_rgba(139,92,246,.2)]">
        Garantir Meu Preço Fundador — $10 <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ━━━━━ APP ━━━━━ */
export function App() {
  useEffect(() => {
    captureUtms(); track("pv");
    const c = initTimers();
    const s = () => trackScroll();
    addEventListener("scroll", s, { passive: true });
    return () => { c(); removeEventListener("scroll", s); };
  }, []);

  return (
    <div className="noise min-h-screen pb-14 sm:pb-0">
      <Banner />
      <Header />
      <main>
        <Hero />
        <VSL />
        <ImagineSection />
        <BeforeAfter />
        <WhatYouGet />
        <Next24h />
        <ShowcaseOne />
        <Walkthrough />
        <ShowcaseTwo />
        <Bonuses />
        <Author />
        <Proof />
        <Guarantee />
        <Pricing />
        <FaqSection />
        <FinalSection />
      </main>
      <Footer />
      {/* floating notifs removed — credibility over gimmicks */}
      <StickyCta />
      <a href={C.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("float_wa")}
        className="fixed bottom-16 sm:bottom-5 right-5 z-40 group cursor-pointer flex items-center gap-2">
        <span className="hidden sm:block bg-[#111]/90 border border-white/[0.06] text-[10px] text-zinc-400 font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Suporte Gabriel</span>
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(34,197,94,.3)] group-hover:scale-105 transition-transform">
          <MessageCircle className="w-5 h-5 text-white" fill="white" />
        </div>
      </a>
    </div>
  );
}
