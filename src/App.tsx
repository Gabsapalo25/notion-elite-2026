import { useState, useEffect, useCallback } from "react";
import {
  Brain, Zap, Target, TrendingUp, Shield, Clock, ChevronDown, ChevronUp,
  Star, MessageCircle, CreditCard, Smartphone, Menu, X, ArrowRight,
  CheckCircle, Play, Sparkles, BookOpen, Wallet, Calendar,
  ShieldCheck, Globe, Users, ExternalLink, Send, Heart, Gift
} from "lucide-react";

// ─── CONFIGURAÇÃO DE ELITE (GABRIEL SAPALO) ───
const CONFIG = {
  authorName: "Gabriel Sapalo",
  authorPhoto: "https://drive.google.com/thumbnail?id=1kmUAUklxpI5yMEfaUaFQT2ye4rpgrbKP&sz=w800",
  heroVideo: "https://www.youtube.com/embed/UwCl0a-FWp4",
  glowscaleLogo: "https://drive.google.com/thumbnail?id=11MvkwbsJstF-st-tYMxpyeCVW1sDG4ks&sz=w400",
  productLogo: "https://drive.google.com/thumbnail?id=1JQNTaRNAk3MZn0osMyPCNenpOfd-1MVn&sz=w400",
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappPayment: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  termsLink: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyLink: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
};

const TESTIMONIALS = [
  { name: "Tomás Ferreira", loc: "Porto, Portugal", avatar: "https://drive.google.com/thumbnail?id=1B8EXhe3kIo9EW8MEaEu4MLSUWqgUZS-U&sz=w400", text: "Incrível como este kit organizou os meus projetos em tempo recorde." },
  { name: "Mariana Costa", loc: "Lisboa, Portugal", avatar: "https://drive.google.com/thumbnail?id=1Qp6Ggy8nwDujXUimXGOYXsluBlLnlCa1&sz=w400", text: "Design limpo e funcionalidades que realmente funcionam no dia a dia." },
  { name: "Ana Luisa", loc: "Luanda, Angola", avatar: "https://drive.google.com/thumbnail?id=1wU9eMnFFPWcMZF6BNoPiRdZHF7xBcQJi&sz=w400", text: "O suporte na comunidade é fantástico. Vale cada Kwanza." },
  { name: "João Pedro", loc: "São Paulo, Brasil", avatar: "https://drive.google.com/thumbnail?id=19FTCcE3bLkdF3EYSnzSzR6Q_z5nsCTLH&sz=w400", text: "O Second Brain mudou a forma como consumo informação." }
];export function App() {
  const handleCtaClick = (label: string) => { console.log(`Pixel Event: ${label}`); };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans">
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <img src={CONFIG.glowscaleLogo} alt="Logo" className="h-10" />
          <a href="#oferta" className="bg-cyan-500 text-black px-6 py-2 rounded-full font-bold text-sm">SUPRIMENTO</a>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
          DOMINE A SUA ROTINA EM <span className="text-cyan-400">24 HORAS</span>
        </h1>
        <div className="max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
          <iframe className="w-full h-full" src={CONFIG.heroVideo} allowFullScreen title="VSL"></iframe>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-black text-center hover:border-cyan-500/30 transition-all">
              <img src={t.avatar} className="w-20 h-20 rounded-2xl mx-auto mb-6 object-cover" alt={t.name} />
              <p className="text-zinc-400 text-sm italic mb-4 leading-relaxed">"{t.text}"</p>
              <div className="font-bold">{t.name}</div>
              <div className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">{t.loc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="oferta" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-8 md:p-16 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div>
            <h2 className="text-4xl font-black mb-8 uppercase">Suprimento Imediato</h2>
            <div className="space-y-4 mb-10 text-zinc-300">
              <div className="flex items-center gap-3"><CheckCircle className="text-cyan-400 w-5" /> <span>Sistema Elite 2026</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-cyan-400 w-5" /> <span>Comunidade VIP Estratégica</span></div>
            </div>
            <div className="space-y-4">
              <a href={CONFIG.hotmartCheckout} target="_blank" rel="noopener noreferrer" onClick={() => handleCtaClick("Hotmart")} className="block w-full bg-white text-black py-6 rounded-2xl font-black text-center text-lg hover:bg-cyan-400 transition-all">ADQUIRIR AGORA ($10 USD)</a>
              <a href={CONFIG.whatsappPayment} target="_blank" rel="noopener noreferrer" onClick={() => handleCtaClick("WhatsApp")} className="block w-full bg-[#25D366] text-white py-6 rounded-2xl font-black text-center text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"><Smartphone /> PAGAR EM KWANZA (10.000 AKZ)</a>
            </div>
          </div>
          <img src={CONFIG.laptopOffer} className="rounded-2xl shadow-2xl scale-110 md:translate-x-10" alt="Oferta Especial" />
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-zinc-700 text-xs italic">
        <div className="flex justify-center gap-8 mb-6 uppercase font-black tracking-widest">
          <a href={CONFIG.termsLink} className="hover:text-white">Termos</a>
          <a href={CONFIG.privacyLink} className="hover:text-white">Privacidade</a>
        </div>
        {CONFIG.authorName} — 2026. Feito com ❤ em Angola para o Mundo.
      </footer>
    </div>
  );
}
