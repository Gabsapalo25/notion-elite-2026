// src/components/AngolaCheckoutPage.tsx
import { useState, memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Lock, Zap, Copy, Check, MessageCircle } from "lucide-react";

const CONFIG = {
  paymentEmail: "glowscalepro@gmail.com",
  expressPhone: "+244 923 379 486",
  expressName: "Gabriel António Armando Sapalo",
  productLogo: "https://res.cloudinary.com/dyerjg6mf/image/upload/v1780069896/Logotipo_Notion_Elite_2026_kiwhgx.png",
};

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
    setLoading(false);
    setStep("payment");
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─────────────────────────────────────────────────────────────
  // FORMULÁRIO
  // ─────────────────────────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={CONFIG.productLogo} alt="Elite OS" className="w-14 h-14 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-bold text-white mb-2">Activar Acesso — Angola</h1>
            <p className="text-sm text-[#A1A1AA]">Preenche os teus dados para receberes as instruções de pagamento</p>
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
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Ver dados de pagamento <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>

          <p className="text-center text-xs text-[#A1A1AA] mt-4">🔒 Os teus dados são usados apenas para entregar o teu acesso</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // PAGAMENTO
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Dados de pagamento</h1>
          <p className="text-sm text-[#A1A1AA]">Transfere e envia o comprovativo por email</p>
        </div>

        {/* Multicaixa Express - Destaque */}
        <div className="bg-[#141414] border-2 border-[#00E5FF] rounded-2xl p-5 mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
          <div className="text-center mb-3 pb-2 border-b border-[#00E5FF]/30">
            <span className="text-[11px] font-mono text-[#00E5FF] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <span>⚡</span> Multicaixa Express <span className="text-[#25D366] text-[9px] bg-[#25D366]/10 px-2 py-0.5 rounded-full">RECOMENDADO</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.05]">
            <span className="text-xs text-[#A1A1AA] font-mono">Número</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-[#00E5FF]">{CONFIG.expressPhone}</span>
              <button onClick={() => copy(CONFIG.expressPhone, "express")} className="text-[#A1A1AA] hover:text-[#D4AF37]">
                {copied === "express" ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.05]">
            <span className="text-xs text-[#A1A1AA] font-mono">Titular</span>
            <span className="text-sm font-mono font-bold text-white">{CONFIG.expressName}</span>
          </div>

          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.05]">
            <span className="text-xs text-[#A1A1AA] font-mono">Valor</span>
            <span className="text-sm font-mono font-bold text-[#25D366]">10.000 AKZ</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#A1A1AA] font-mono">Referência</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-[#D4AF37]">{ref}</span>
              <button onClick={() => copy(ref, "ref")} className="text-[#A1A1AA] hover:text-[#D4AF37]">
                {copied === "ref" ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 text-center border-t border-[#00E5FF]/20">
            <span className="text-[9px] font-mono text-[#25D366]">✅ Pagamento imediato, sem esperas bancárias</span>
          </div>
        </div>

        {/* Transferência BAI - Opção secundária */}
        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-4 mb-4">
          <div className="text-center mb-2 pb-2 border-b border-white/[0.05]">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">🏦 Transferência BAI</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
            <span className="text-xs text-[#A1A1AA] font-mono">Titular</span>
            <span className="text-xs font-mono text-white text-right">{CONFIG.expressName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
            <span className="text-xs text-[#A1A1AA] font-mono">IBAN</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white">AO06 0040 0000 1859 5631 1019 4</span>
              <button onClick={() => copy("AO06 0040 0000 1859 5631 1019 4", "iban")} className="text-[#A1A1AA] hover:text-[#D4AF37]">
                {copied === "iban" ? <Check className="w-3 h-3 text-[#25D366]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-[#A1A1AA] font-mono">Valor</span>
            <span className="text-xs font-mono font-bold text-[#25D366]">10.000 AKZ</span>
          </div>
        </div>

        {/* Instrução de envio */}
        <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-2xl p-5 mb-4">
          <p className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-3 font-bold">📧 Após a transferência</p>
          <p className="text-sm text-white mb-3">Envia o comprovativo por email para:</p>
          <div className="flex items-center justify-between bg-[#1A1A1A] rounded-xl px-4 py-3 border border-white/[0.06]">
            <span className="text-sm font-mono text-[#00E5FF] font-bold">{CONFIG.paymentEmail}</span>
            <button onClick={() => copy(CONFIG.paymentEmail, "email")} className="text-[10px] border border-white/20 rounded px-1.5 py-0.5 font-mono text-[#A1A1AA] hover:text-white">
              {copied === "email" ? "✓" : "copiar"}
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

        {/* Timeline */}
        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-5 mb-4">
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">O que acontece a seguir</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#25D366]" /><div><span className="text-xs font-mono font-bold text-[#25D366]">Agora</span><p className="text-xs text-[#A1A1AA]">Transferes 10.000 AKZ</p></div></div>
            <div className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#00E5FF]" /><div><span className="text-xs font-mono font-bold text-[#00E5FF]">2 minutos</span><p className="text-xs text-[#A1A1AA]">Envias o comprovativo para {CONFIG.paymentEmail} com assunto {ref} — kit entregue automaticamente em menos de 10 min. WhatsApp +244 923 379 486 também disponível, mas a entrega depende de confirmação manual.</p></div></div>
            <div className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#D4AF37]" /><div><span className="text-xs font-mono font-bold text-[#D4AF37]">Até 10 min</span><p className="text-xs text-[#A1A1AA]">Recebes o link do kit no teu email em menos de 10 minutos</p></div></div>
          </div>
        </div>

        {/* Garantia */}
        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <p className="text-xs text-[#A1A1AA] leading-relaxed"><strong className="text-white">Garantia 30 dias.</strong> Se não ficares satisfeito, devolvemos 100% do teu dinheiro. Sem perguntas.</p>
        </div>
      </div>
    </div>
  );
});

export default AngolaCheckoutPage;