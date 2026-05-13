import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowRight, CheckCircle, Play, Sparkles, Brain, Zap, Target, Clock,
  Shield, CreditCard, Smartphone, MessageCircle, ChevronDown, ChevronUp, Star
} from "lucide-react";

// ==========================================
// 1. CONFIGURAÇÃO (100% IGUAL AO SITE)
// ==========================================
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorPhoto: "https://drive.google.com/thumbnail?id=1kmUAUklxpI5yMEfaUaFQT2ye4rpgrbKP&sz=w800",
  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  glowscaleLogo: "https://drive.google.com/thumbnail?id=11MvkwbsJstF-st-tYMxpyeCVW1sDG4ks&sz=w400",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappPayment: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  termsLink: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyLink: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
};

// ==========================================
// 2. DEPOIMENTOS (COPIADOS DO SITE)
// ==========================================
const TESTIMONIALS = [
  { name: "Mariana Costa", loc: "Lisboa, Portugal", text: "Passei de média de 12 para 15 em dois meses. O dashboard mudou completamente a minha organização académica." },
  { name: "Sofia Rodrigues", loc: "Coimbra, Portugal", text: "Eu era daquelas que tinha 15 separadores abertos... Na primeira semana com o Kit, entreguei dois trabalhos antes do prazo." },
  { name: "João Pedro Silva", loc: "São Paulo, Brasil", text: "Trabalho e estudo ao mesmo tempo. Este sistema fez-me poupar quase 2 horas por dia em organização." },
  { name: "Tomás Ferreira", loc: "Porto, Portugal", text: "Faço dupla licenciatura e trabalho... Agora planeio a semana toda em 10 minutos ao domingo." },
  { name: "Ana Luísa Mendes", loc: "Luanda, Angola", text: "Finalmente tenho controlo total sobre os meus projetos e prazos." },
  { name: "Beatriz Mendonça", loc: "Maputo, Moçambique", text: "Comprei a pensar que ia ser mais um template... Já vou no terceiro mês e a minha média subiu." }
];

// ==========================================
// 3. MODULOS (10 ITENS DO SITE)
// ==========================================
const MODULES = [
  "Dashboard de Elite", "Cérebro Digital", "Gestor de Matérias", "Calendário Estratégico", "Prompts de IA",
  "Rotinas de 5 Minutos", "Filtro de Foco", "Sistema Anti-Procrastinação", "Finanças Pessoais", "Setup 24H"
];

// ==========================================
// 4. COMPONENTES
// ==========================================
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <img src={CONFIG.glowscaleLogo} alt="Logo" className="h-10" />
        <div className="hidden md:flex gap-6 text-sm font-bold text-zinc-400">
          <a href="#problemas" className="hover:text-cyan-400">Problemas</a>
          <a href="#solucao" className="hover:text-cyan-400">Solução</a>
          <a href="#modulos" className="hover:text-cyan-400">Módulos</a>
          <a href="#depoimentos" className="hover:text-cyan-400">Resultados</a>
          <a href="#preco" className="bg-cyan-500 text-black px-5 py-2 rounded-full hover:bg-cyan-400">Adquirir</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden bg-black/95 border-t border-white/5">
            <div className="flex flex-col p-6 gap-4 text-center">
              <a href="#problemas" className="text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Problemas</a>
              <a href="#solucao" className="text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Solução</a>
              <a href="#modulos" className="text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Módulos</a>
              <a href="#depoimentos" className="text-zinc-300 hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Resultados</a>
              <a href="#preco" className="bg-cyan-500 text-black py-2 rounded-full font-bold" onClick={() => setMenuOpen(false)}>Adquirir</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-36 pb-20 px-6 text-center">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
        DOMINE A SUA ROTINA EM <span className="text-cyan-400">24 HORAS</span>
      </h1>
      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,212,255,0.2)]">
        <iframe className="w-full h-full" src={CONFIG.heroVideo} title="VSL" allowFullScreen></iframe>
      </div>
    </motion.div>
  </section>
);

const Problemas = () => {
  const problemasList = [
    { titulo: "Caos Fragmentado", texto: "Notas espalhadas entre WhatsApp, Google Drive, cadernos físicos e rascunhos de e-mails." },
    { titulo: "Sobrecarga Mental", texto: "Tarefas esquecidas e pontas soltas porque dependes inteiramente da tua memória frágil." },
    { titulo: "Pânico na Véspera", texto: "Prazos de entrega que aparecem de surpresa na véspera e criam madrugadas de pura ansiedade." },
    { titulo: "Falsa Produtividade", texto: "Sensação frustrante de trabalhar e estudar muito, mas continuar sempre com a matéria atrasada." },
    { titulo: "Ansiedade Constante", texto: "Nervosismo crónico antes de provas, entregas de relatórios e reuniões importantes." },
    { titulo: "Fadiga de Ferramentas", texto: "Testar dezenas de apps complexas que acabas por abandonar ao fim de 3 dias por falta de hábito." }
  ];
  return (
    <section id="problemas" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-4">A Raiz da Desorganização</h2>
        <p className="text-xl text-cyan-400 text-center mb-16">O problema não é falta de motivação. É falta de sistema.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {problemasList.map((p, i) => (
            <div key={i} className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30">
              <div className="text-3xl font-black text-cyan-500 mb-4">{(i+1).toString().padStart(2, '0')}</div>
              <h3 className="text-xl font-bold mb-3">{p.titulo}</h3>
              <p className="text-zinc-400">{p.texto}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-500 italic mt-12">“Nenhuma quantidade de esforço compensa um sistema que não existe.”</p>
      </div>
    </section>
  );
};

const Solucao = () => (
  <section id="solucao" className="py-24 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-black mb-4">A Transformação Digital</h2>
      <p className="text-xl text-zinc-300 mb-16 max-w-3xl mx-auto">O Notion Elite Kit transforma o teu Notion num cérebro digital em menos de 24 horas.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {["Pronto a Usar", "Centralização Total", "Curva Zero", "Sincronização Perfeita"].map((item, i) => (
          <div key={i} className="bg-black p-6 rounded-2xl border border-white/10">
            <Sparkles className="text-cyan-400 w-10 h-10 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">{item}</h3>
            <p className="text-zinc-400 text-sm">{i===0 && "Ecossistema configurado para organizar tudo no mesmo lugar."}{i===1 && "Unifica tarefas, resumos, finanças e metas anuais."}{i===2 && "Funciona mesmo para quem nunca abriu o Notion."}{i===3 && "Acede no PC, tablet ou smartphone."}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Modulos = () => (
  <section id="modulos" className="py-24 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-black text-center mb-4">Arquitetura Premium</h2>
      <p className="text-center text-zinc-400 mb-16">Tudo o que precisas para dominar a tua execução</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {MODULES.map((m, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-5 text-center hover:border-cyan-500/40">
            <span className="text-cyan-500 text-xs font-bold">Módulo {i+1}</span>
            <h3 className="font-bold mt-2 text-sm">{m}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Autor = () => (
  <section className="py-24 bg-zinc-950">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
      <img src={CONFIG.authorPhoto} alt="Gabriel Sapalo" className="w-64 h-64 rounded-2xl object-cover border border-cyan-500" />
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-bold mb-2">Gabriel Sapalo</h3>
        <p className="text-cyan-400 font-semibold mb-4">🏆 Campeão Nacional Absoluto de Xadrez de Angola 2024 • Fundador da GlowScalePro</p>
        <p className="text-zinc-300 leading-relaxed">“No xadrez, cada jogada tem consequência. Cada peça tem função. Cada movimento precisa de plano. Na vida académica e profissional acontece rigorosamente o mesmo: quem não tem sistema, joga no improviso e perde prazos.”</p>
      </div>
    </div>
  </section>
);

const Depoimentos = () => (
  <section id="depoimentos" className="py-24 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-black text-center mb-16">Resultados Comprovados</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30">
            <div className="flex gap-1 mb-3 text-yellow-400">★★★★★</div>
            <p className="text-zinc-300 italic mb-4">“{t.text}”</p>
            <p className="font-bold">{t.name}</p>
            <p className="text-cyan-500 text-xs">{t.loc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Preciso de saber programar ou ser expert em Notion?", a: "Não. O kit é 100% intuitivo. Basta seguir o Setup 24H e arrastar os templates." },
    { q: "Posso pagar em Angola via Multicaixa?", a: "Sim! Basta clicar no botão verde 'PAGAR 10.000 AKZ' e falar connosco no WhatsApp." },
    { q: "Funciona no telemóvel?", a: "Sim. O Notion sincroniza perfeitamente entre PC, tablet e telemóvel." },
    { q: "Tem garantia?", a: "Sim. 7 dias incondicionais. Se não gostar, devolvemos o dinheiro." }
  ];
  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-black">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between p-5 text-left font-semibold">
                {faq.q}
                {open === i ? <ChevronUp /> : <ChevronDown />}
              </button>
              <AnimatePresence>
                {open === i && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-5 pb-5 text-zinc-400 border-t border-white/5 pt-3">{faq.a}</motion.div>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="preco" className="py-24 px-6">
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 md:p-16 border border-white/10">
      <div className="text-center mb-8">
        <span className="line-through text-3xl text-zinc-500">249 USD</span>
        <div className="text-5xl md:text-7xl font-black text-cyan-400 my-3">10 USD</div>
        <p className="text-zinc-400">ou 10.000 AKZ para pagamentos locais</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {["Dashboard de Controlo Total", "Método de Setup em 24H", "Prompts de IA Integrados", "Acesso Vitalício", "Comunidade VIP"].map((item) => (
            <div key={item} className="flex items-center gap-3"><CheckCircle className="text-cyan-400" size={20} /> <span>{item}</span></div>
          ))}
          <a href={CONFIG.hotmartCheckout} target="_blank" className="block w-full bg-white text-black py-4 rounded-xl font-bold text-center hover:bg-cyan-400 transition">💳 ADQUIRIR POR $10 USD</a>
          <a href={CONFIG.whatsappPayment} target="_blank" className="block w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:opacity-90"><Smartphone size={20} /> PAGAR 10.000 AKZ</a>
          <p className="text-xs text-center text-zinc-500 mt-4">⚠️ Garantia Incondicional de 7 Dias. Risco Zero.</p>
        </div>
        <img src={CONFIG.laptopOffer} alt="Mockup" className="rounded-2xl shadow-2xl" />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 border-t border-white/5 text-center text-zinc-600 text-sm">
    <div className="flex justify-center gap-8 mb-6">
      <a href={CONFIG.termsLink} className="hover:text-cyan-400">Termos</a>
      <a href={CONFIG.privacyLink} className="hover:text-cyan-400">Privacidade</a>
    </div>
    <p>{CONFIG.authorName} — 2026. Todos os direitos reservados. Feito com ❤ em Angola.</p>
  </footer>
);

// ==========================================
// 5. MAIN APP
// ==========================================
export function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Problemas />
      <Solucao />
      <Modulos />
      <Autor />
      <Depoimentos />
      <FAQ />
      <Pricing />
      <Footer />

      {/* Botão flutuante para telemóvel */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 flex gap-3 z-40">
        <a href={CONFIG.hotmartCheckout} target="_blank" className="flex-1 bg-cyan-500 text-black text-center py-3 rounded-xl font-bold text-sm">💲 10 USD</a>
        <a href={CONFIG.whatsappPayment} target="_blank" className="flex-1 bg-[#25D366] text-white text-center py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1"><Smartphone size={14} /> 10.000 AKZ</a>
      </div>
    </div>
  );
}
