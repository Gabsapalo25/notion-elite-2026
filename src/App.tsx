import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  MessageCircle,
  CreditCard,
  Smartphone,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  BookOpen,
  Wallet,
  BarChart3,
  Calendar,
} from "lucide-react";

// ─── CONFIGURABLE PLACEHOLDERS ───
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorPhoto: "https://drive.google.com/thumbnail?id=1kmUAUklxpI5yMEfaUaFQT2ye4rpgrbKP&sz=w800",
  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  glowscaleLogo: "https://drive.google.com/thumbnail?id=11MvkwbsJstF-st-tYMxpyeCVW1sDG4ks&sz=w400",
  productLogo: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=200&h=200&fit=crop",
  notionLogo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  hotmartLink: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappLink: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  dashboardMockup: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  secondBrainMockup: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  financeMockup: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
  studyCycleMockup: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  termsLink: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyLink: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
};

// ─── DEPOIMENTOS CORRIGIDOS ───
const TESTIMONIALS_LIST = [
  { name: "Tomás Ferreira", loc: "Porto, Portugal", avatar: "https://drive.google.com/thumbnail?id=1B8EXhe3kIo9EW8MEaEu4MLSUWqgUZS-U&sz=w400", text: "Incrível como este kit organizou os meus projetos em tempo recorde." },
  { name: "Mariana Costa", loc: "Lisboa, Portugal", avatar: "https://drive.google.com/thumbnail?id=1Qp6Ggy8nwDujXUimXGOYXsluBlLnlCa1&sz=w400", text: "Design limpo e funcionalidades que realmente funcionam." },
  { name: "Ana Luisa", loc: "Luanda, Angola", avatar: "https://drive.google.com/thumbnail?id=1wU9eMnFFPWcMZF6BNoPiRdZHF7xBcQJi&sz=w400", text: "O suporte na comunidade é fantástico. Vale cada Kwanza." },
  { name: "João Pedro", loc: "São Paulo, Brasil", avatar: "https://drive.google.com/thumbnail?id=19FTCcE3bLkdF3EYSnzSzR6Q_z5nsCTLH&sz=w400", text: "O Second Brain mudou a forma como consumo informação." }
];

// ─── NAVBAR ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#dores", label: "Dores" },
    { href: "#funcionalidades", label: "Funcionalidades" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
    { href: "#preco", label: "Adquirir" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl text-white">ELITE<span className="text-cyan-400">.</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors font-medium">
                {link.label}
              </a>
            ))}
            <a href="#preco" className="bg-cyan-500 text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-400 transition-all">
              Adquirir Agora
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block text-zinc-400 hover:text-cyan-400 py-2 font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#preco" onClick={() => setMenuOpen(false)} className="block bg-cyan-500 text-black px-6 py-3 rounded-full text-center font-bold mt-4">
                Adquirir Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Notion Elite Kit 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
              <span className="text-white">Domine a sua</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">rotina</span>
              <br />
              <span className="text-white">em menos de</span>{" "}
              <span className="text-cyan-400">24 horas</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Organize a sua vida académica e profissional com o sistema mais
              avançado de produtividade baseado em Notion. Criado por{" "}
              <span className="text-white font-semibold">Gabriel Sapalo</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="#preco" className="bg-cyan-500 text-black px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 group hover:bg-cyan-400 transition-all">
                Quero o Meu Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#funcionalidades" className="px-8 py-4 rounded-full text-lg font-semibold border border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" />
                Ver Funcionalidades
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { number: "500+", label: "Utilizadores" },
                { number: "4.9★", label: "Avaliação" },
                { number: "24h", label: "Setup" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">{stat.number}</div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto w-72 sm:w-80 lg:w-96">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-3xl blur-2xl" />
              <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-800">
                  <img
                    src={CONFIG.authorPhoto}
                    alt={CONFIG.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white font-semibold">{CONFIG.authorName}</p>
                  <p className="text-cyan-400 text-sm">Campeão Nacional de Xadrez & Estrategista</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-cyan-500/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-cyan-500" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAIN POINTS ───
function PainPoints() {
  const pains = [
    { icon: <Zap className="w-6 h-6" />, title: "Apagar Incêndios", description: "Passa o dia a resolver problemas urgentes em vez de focar no que realmente importa?" },
    { icon: <Brain className="w-6 h-6" />, title: "Caos Mental", description: "Notas espalhadas, tarefas esquecidas, prazos perdidos. Precisa de um sistema que organize tudo." },
    { icon: <Clock className="w-6 h-6" />, title: "Tempo Desperdiçado", description: "Horas perdidas a procurar informações em vez de executar o que realmente importa." },
    { icon: <Target className="w-6 h-6" />, title: "Falta de Foco", description: "Sem prioridades claras, acaba por trabalhar em tudo sem concluir nada." },
  ];

  return (
    <section id="dores" className="relative py-24 sm:py-32 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold mb-6">
            ⚠️ Se sente isto, não está sozinho
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Reconhece algum destes{" "}
            <span className="text-red-400">problemas</span>?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                {pain.icon}
              </div>
              <h3 className="font-bold text-xl text-white mb-3">{pain.title}</h3>
              <p className="text-zinc-400 text-sm">{pain.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ───
function Features() {
  const features = [
    { icon: <Brain className="w-7 h-7" />, title: "Dashboard Central", description: "Painel de controlo completo com tarefas, metas e progresso num só lugar." },
    { icon: <BookOpen className="w-7 h-7" />, title: "Second Brain", description: "Organize notas, ideias e projetos num sistema que cresce consigo." },
    { icon: <Wallet className="w-7 h-7" />, title: "Gestão Financeira", description: "Controle despesas, orçamentos e objetivos financeiros com gráficos claros." },
    { icon: <Calendar className="w-7 h-7" />, title: "Ciclos de Estudo", description: "Planifique estudos com calendário integrado e revisão espaçada." },
    { icon: <BarChart3 className="w-7 h-7" />, title: "Métricas", description: "Acompanhe o seu progresso com dashboards visuais e dados reais." },
    { icon: <Shield className="w-7 h-7" />, title: "Segurança", description: "Dados seguros na nuvem com acesso de qualquer dispositivo." },
  ];

  return (
    <section id="funcionalidades" className="relative py-24 sm:py-32 overflow-hidden bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            ⚡ Funcionalidades Premium
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Tudo o que precisa num{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">só lugar</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ───
function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative py-24 sm:py-32 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6">
            ⭐ O que dizem os nossos utilizadores
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Resultados{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">reais</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_LIST.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-zinc-300 text-sm mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-cyan-400 text-xs">{t.loc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Preciso de saber programar para usar o kit?", a: "Não! O kit foi desenhado para ser 100% intuitivo. Basta ter uma conta gratuita no Notion." },
    { q: "Funciona em Angola? Posso pagar em AKZ?", a: "Sim! Temos pagamento via WhatsApp por apenas 10.000 AKZ." },
    { q: "O que está incluído no kit?", a: "Dashboard Central, Second Brain, Gestão Financeira, Ciclos de Estudo, Métricas, Templates e Guia em vídeo." },
    { q: "Posso usar no telemóvel?", a: "Sim! O Notion funciona perfeitamente em iOS e Android." },
    { q: "Tem garantia?", a: "Sim, 7 dias de garantia incondicional. Se não gostar, devolvemos 100%." },
  ];

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            ❓ Perguntas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Tem{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">dúvidas</span>?
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-black rounded-2xl overflow-hidden border border-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-semibold text-lg">{faq.q}</span>
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  {openIndex === i ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-cyan-400" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-zinc-400 border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ───
function Pricing() {
  return (
    <section id="preco" className="relative py-24 sm:py-32 overflow-hidden bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            🔥 Oferta de Lançamento — Preço Especial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Invista na sua{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">produtividade</span>
          </h2>
        </motion.div>

        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 sm:p-12 border border-white/10 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-zinc-500 text-2xl line-through">$47 USD</span>
              <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold">-79% OFF</span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-black text-cyan-400">$10</span>
              <span className="text-2xl text-zinc-400 font-semibold">USD</span>
            </div>
            <p className="text-zinc-500 mt-2">ou 10.000 AKZ para Angola</p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "Dashboard Central Completo",
              "Second Brain System",
              "Gestão Financeira Integrada",
              "Ciclos de Estudo Planificados",
              "Templates Prontos a Usar",
              "Guia de Configuração em Vídeo",
              "Suporte VIP no Grupo",
              "Garantia de 7 Dias",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <a href={CONFIG.hotmartLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-black py-4 rounded-2xl font-bold text-center text-lg hover:bg-cyan-400 transition-all">
              <CreditCard className="w-5 h-5 inline mr-2" /> Adquirir por $10 USD (Cartão/PayPal)
            </a>
            <a href={CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-center text-lg hover:opacity-90 transition-all">
              <Smartphone className="w-5 h-5 inline mr-2" /> Pagar 10.000 AKZ via WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5">
              <Shield className="w-4 h-4 text-green-400" /> Pagamento Seguro
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5">
              <Zap className="w-4 h-4 text-yellow-400" /> Acesso Imediato
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Garantia 7 Dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── QUICK ACCESS ───
function QuickAccess() {
  const shortcuts = [
    { icon: <Zap className="w-5 h-5" />, label: "Setup Rápido", desc: "Configure em 24h", href: "#funcionalidades" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Guia Completo", desc: "Tutorial passo-a-passo", href: "#faq" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Suporte VIP", desc: "Grupo exclusivo", href: "#preco" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Actualizações", desc: "Sempre grátis", href: "#funcionalidades" },
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {shortcuts.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 rounded-2xl p-5 text-center border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{s.label}</h3>
              <p className="text-zinc-500 text-xs">{s.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="relative pt-16 pb-8 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <span className="font-bold text-2xl text-white">ELITE<span className="text-cyan-400">.</span></span>
        </div>

        <div className="flex justify-center gap-8 mb-8 text-xs font-black uppercase tracking-widest text-zinc-600">
          <a href={CONFIG.termsLink} className="hover:text-cyan-400 transition">Termos</a>
          <a href={CONFIG.privacyLink} className="hover:text-cyan-400 transition">Privacidade</a>
        </div>

        <p className="text-zinc-700 text-xs italic">
          {CONFIG.authorName} — 2026. Todos os direitos reservados. Feito com ❤ em Angola para o Mundo.
        </p>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
export function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <TestimonialsSection />
      <QuickAccess />
      <FAQ />
      <Pricing />
      <Footer />

      {/* Floating CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 p-4">
        <div className="flex gap-3">
          <a href={CONFIG.hotmartLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-black flex-1 py-3 rounded-xl text-center font-bold text-sm">
            $10 USD
          </a>
          <a href={CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white flex-1 py-3 rounded-xl text-center font-bold text-sm">
            10.000 AKZ
          </a>
        </div>
      </div>
    </div>
  );
}
