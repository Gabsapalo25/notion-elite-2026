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
  
  // PAGAMENTOS E LINKS (BLINDADOS)
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  whatsappPayment: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  
  // MOCKUPS
  laptopOffer: "https://drive.google.com/thumbnail?id=1ek54pgWKa_2j90WGcpmb30XGuzB5qjvJ&sz=w800",
  
  // LEGAL
  termsLink: "https://drive.google.com/file/d/1cpwleZI5mtMGj8oVQ9C-xFkPmW6iJd1c/view",
  privacyLink: "https://drive.google.com/file/d/1yi1D2p_QYdK9tIwCaU8kxlFnol97kGdg/view",
};

// ─── DEPOIMENTOS (CORREÇÃO DE POSICIONAMENTO) ───
const TESTIMONIALS = [
  {
    name: "Tomás Ferreira",
    loc: "Porto, Portugal",
    avatar: "https://drive.google.com/thumbnail?id=1B8EXhe3kIo9EW8MEaEu4MLSUWqgUZS-U&sz=w400",
    text: "Incrível como este kit organizou os meus projetos em tempo recorde."
  },
  {
    name: "Mariana Costa",
    loc: "Lisboa, Portugal",
    avatar: "https://drive.google.com/thumbnail?id=1Qp6Ggy8nwDujXUimXGOYXsluBlLnlCa1&sz=w400",
    text: "Design limpo e funcionalidades que realmente funcionam no dia a dia."
  },
  {
    name: "Ana Luisa",
    loc: "Luanda, Angola",
    avatar: "https://drive.google.com/thumbnail?id=1wU9eMnFFPWcMZF6BNoPiRdZHF7xBcQJi&sz=w400",
    text: "O suporte na comunidade é fantástico. Vale cada Kwanza."
  },
  {
    name: "João Pedro",
    loc: "São Paulo, Brasil",
    avatar: "https://drive.google.com/thumbnail?id=19FTCcE3bLkdF3EYSnzSzR6Q_z5nsCTLH&sz=w400",
    text: "O Second Brain mudou a forma como consumo informação."
  }
];

// ─── COMPONENTES AUXILIARES ───
const Nav = () => (
  <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <img src={CONFIG.glowscaleLogo} alt="Logo" className="h-10" />
      <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <a href="#vsl" className="hover:text-cyan-400 transition">O Método</a>
        <a href="#provas" className="hover:text-cyan-400 transition">Resultados</a>
        <a href="#oferta" className="hover:text-cyan-400 transition text-white">Adquirir</a>
      </div>
    </div>
  </nav>
);

// ─── COMPONENTE PRINCIPAL ───
export function App() {
  const handleCtaClick = (label: string) => {
    console.log(`Evento Pixel: ${label}`);
    // Integrar fbq('track', 'InitiateCheckout') aqui se necessário
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Nav />

      {/* HERO & VSL */}
      <section id="vsl" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
            DOMINE A SUA ROTINA EM <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">24 HORAS</span>
          </h1>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,212,255,0.15)] bg-zinc-900">
            <iframe 
              className="w-full h-full" 
              src={CONFIG.heroVideo} 
              title="VSL" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL (FUNDO LIMPO - SEM AZUL) */}
      <section id="provas" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.3em] text-cyan-500 mb-16">Aprovado em 4 Continentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-black hover:border-cyan-500/30 transition-all group">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-2xl mb-6 object-cover grayscale group-hover:grayscale-0 transition-all" />
                <p className="text-zinc-400 text-sm italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-cyan-500 uppercase tracking-widest font-black">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA FINAL (BLINDADA) */}
      <section id="oferta" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">Suprimento Imediato</h2>
              <div className="space-y-4 mb-10">
                {[
                  "Acesso Vitalício ao Notion Elite Kit",
                  "Setup Completo em menos de 24h",
                  "Comunidade VIP de Estrategistas",
                  "Atualizações 2026 Gratuitas"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <a 
                  href={CONFIG.hotmartCheckout}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick("Hotmart Checkout")}
                  className="block w-full bg-white text-black py-6 rounded-2xl font-black text-center text-lg hover:bg-cyan-400 transition-colors"
                >
                   ADQUIRIR POR $10 USD
                </a>
                <a 
                  href={CONFIG.whatsappPayment}
                  target="_blank"
                  rel="noopener noreferrer" // ESSENCIAL PARA EVITAR O ERRO DE CONEXÃO
                  onClick={() => handleCtaClick("WhatsApp Kwanza")}
                  className="block w-full bg-[#25D366] text-white py-6 rounded-2xl font-black text-center text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                >
                   <Smartphone className="w-6 h-6" /> PAGAR 10.000 AKZ
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img src={CONFIG.laptopOffer} alt="Mockup" className="rounded-2xl shadow-2xl scale-110 md:translate-x-10" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src={CONFIG.glowscaleLogo} alt="GlowScale" className="h-8 mx-auto mb-10 opacity-50" />
          <div className="flex justify-center gap-8 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <a href={CONFIG.termsLink} className="hover:text-white transition">Termos</a>
            <a href={CONFIG.privacyLink} className="hover:text-white transition">Privacidade</a>
          </div>
          <p className="text-zinc-700 text-xs italic">
            {CONFIG.authorName} — 2026. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
