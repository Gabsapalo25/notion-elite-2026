import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, X, Send } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  paymentEmail: "glowscalepro@gmail.com",
  expressPhone: "+244 923 379 486",
  expressName: "Gabriel António Armando Sapalo",
  hotmartCheckout: "https://pay.hotmart.com/Q105490101M?off=xablp4k5&hotfeature=51",
  communityLink: "https://chat.whatsapp.com/LDV8ORaZgzGC9ljtt3gTLh",
  whatsappSupport: "https://wa.me/244923379486?text=Ol%C3%A1%20Gabriel%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Notion%20Elite%20Kit",
  supportEmail: "suporte@glowscalepro.com",
};

// ═══════════════════════════════════════════════════════════
// TELEMETRY
// ═══════════════════════════════════════════════════════════
const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") return; // SSR-safe
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
      utmKeys.forEach(k => {
        if (urlParams.has(k)) localStorage.setItem(`ne_${k}`, urlParams.get(k) || "");
      });

      const payload: Record<string, unknown> = {
        action: eventAction,
        ts: new Date().toISOString(),
        ...metadata
      };
      utmKeys.forEach(k => { payload[k] = localStorage.getItem(`ne_${k}`) || ""; });

      const stack = JSON.parse(localStorage.getItem("ne_stack") || "[]");
      stack.push(payload);
      if (stack.length > 50) stack.shift();
      localStorage.setItem("ne_stack", JSON.stringify(stack));

      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", eventAction, { ...metadata });
      }
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", eventAction, { ...metadata });
      }
    } catch { /* silent */ }
  }
};

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════
interface ChatBtn { label: string; action: string }
interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  btns?: ChatBtn[];
}

// Botões reutilizados em vários pontos — evita repetição e facilita manutenção
const MENU_BTNS: ChatBtn[] = [
  { label: "📚 O que é o kit?", action: "como_funciona" },
  { label: "💰 Preços e planos", action: "quanto_custa" },
  { label: "📱 Ver demonstração", action: "ver_demo" },
  { label: "🚀 Comprar agora", action: "comprar_agora" },
];

const PAYMENT_CHOICE_BTNS: ChatBtn[] = [
  { label: "💳 Cartão Internacional ($10)", action: "comprar_hotmart" },
  { label: "🇦🇴 Angola (10.000 AKZ)", action: "pagamento_angola" },
];

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════
const SalesChatBot = memo(() => {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [nome, setNome] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      from: 'bot',
      text: `👋 Olá! Eu sou o assistente do Notion Elite Starter Kit.

Antes de começarmos, me diz: como posso te chamar?`,
      btns: [
        { label: "📝 Digitar meu nome", action: "digitar_nome" },
        { label: "🚀 Ir direto ao assunto", action: "pular_nome" }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [etapa, setEtapa] = useState<'boas_vindas' | 'acolhimento' | 'mapeamento' | 'historia' | 'apresentacao' | 'prova' | 'fechamento' | 'objeção' | 'pos_venda'>('boas_vindas');
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Balão de boas-vindas
  useEffect(() => {
    if (open) return;

    const hero = document.getElementById("hero-section");
    if (!hero) {
      const timer = setTimeout(() => setShowGreeting(true), 6000);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowGreeting(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(hero);

    const fallback = setTimeout(() => setShowGreeting(true), 10000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Limpa qualquer timer pendente ao desmontar
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const addMessage = (from: 'bot' | 'user', text: string, btns?: ChatBtn[]) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), from, text, btns }]);
  };

  // Simula o assistente "a pensar" antes de responder — e, de facto, bloqueia
  // novos cliques/envios enquanto isso acontece (corrige o bug do `busy` morto).
  const addBotMessageDelayed = (text: string, btns?: ChatBtn[], delay?: number) => {
    setBusy(true);
    const wait = delay ?? 500 + Math.random() * 400;
    timerRef.current = setTimeout(() => {
      addMessage('bot', text, btns);
      setBusy(false);
    }, wait);
  };

  const redirectToAngola = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = [
      urlParams.get("utm_source")   && `utm_source=${urlParams.get("utm_source")}`,
      urlParams.get("utm_campaign") && `utm_campaign=${urlParams.get("utm_campaign")}`
    ].filter(Boolean).join("&");
    window.location.href = utmParams ? `/angola?${utmParams}` : "/angola";
  };

  const redirectToHotmart = () => {
    window.open(CONFIG.hotmartCheckout, '_blank');
  };

  // ============================================================
  // LÓGICA DE CONVERSA — separada do disparo (botão vs texto livre)
  // para nunca duplicar a bolha do usuário.
  // ============================================================
  const processAction = (action: string) => {
    // ============================================================
    // BOAS-VINDAS
    // ============================================================
    if (action === 'digitar_nome') {
      setEtapa('acolhimento');
      return;
    }

    if (action === 'pular_nome') {
      setEtapa('mapeamento');
      addBotMessageDelayed(`Seja muito bem-vindo(a) ao Notion Elite Starter Kit. 👋

Pra eu te ajudar direito: como está a sua organização neste momento?`, [
        { label: "😰 Um caos total", action: "caos_total" },
        { label: "📝 Mais ou menos organizado", action: "mais_ou_menos" },
        { label: "✅ Já sou organizado", action: "ja_organizado" },
        { label: "🤔 Só estou conhecendo", action: "conhecendo" }
      ]);
      return;
    }

    // ============================================================
    // MAPEAMENTO
    // ============================================================
    if (action === 'caos_total' || action === 'mais_ou_menos') {
      setEtapa('historia');
      addBotMessageDelayed(`Conheço bem essa sensação. 😰

A grande maioria das pessoas que chega até aqui descreve a mesma cena: PDFs perdidos, prazos que escapam, aquela sensação de estar sempre a correr atrás.

A diferença entre quem sai desse ciclo e quem fica nele não é "força de vontade" — é ter um sistema que pensa por ti nos dias em que tu não tens energia para pensar.

O que te trouxe até o Notion Elite Kit hoje?`, [
        { label: "📚 Organizar os estudos", action: "organizar_estudos" },
        { label: "💼 Gestão de projetos", action: "gestao_projetos" },
        { label: "💰 Controlo financeiro", action: "controlo_financeiro" },
        { label: "🧠 Tudo ao mesmo tempo", action: "tudo_ao_mesmo" }
      ]);
      return;
    }

    if (action === 'ja_organizado') {
      setEtapa('apresentacao');
      addBotMessageDelayed(`Isso já te coloca na frente da maioria. ✅

Mas se chegaste até aqui, é porque sabes que "organizado manualmente" tem um teto — e que cada hora a montar planilhas é uma hora que não volta.

O Notion Elite Kit elimina esse trabalho manual: duplicas, personalizas em 20 minutos, e o sistema passa a correr por ti.

Queres ver como?`, [
        { label: "📚 Quero ver os pilares", action: "ver_pilares" },
        { label: "💰 Quanto custa?", action: "quanto_custa" },
        { label: "📱 Ver demonstração", action: "ver_demo" }
      ]);
      return;
    }

    if (action === 'conhecendo') {
      setEtapa('apresentacao');
      addBotMessageDelayed(`Boa, vou ser direto contigo. 🤔

Imagina ter um sistema operacional para a tua vida académica e profissional:

• **Dashboard** — o que é prioridade hoje, num só olhar
• **Gestor de Projetos** — todos os teus trabalhos, sem se perderem
• **Controlo Financeiro** — para onde vai cada AKZ/dólar
• **Cérebro Digital** — todo o teu conhecimento, sempre à mão

Tudo pronto. A funcionar em menos de 24 horas.

O que gostarias de saber primeiro?`, [
        { label: "📊 Como funciona na prática?", action: "como_funciona" },
        { label: "💰 Quanto custa?", action: "quanto_custa" },
        { label: "📱 Ver demonstração", action: "ver_demo" }
      ]);
      return;
    }

    // ============================================================
    // HISTÓRIA / APRESENTAÇÃO
    // ============================================================
    if (['organizar_estudos', 'gestao_projetos', 'controlo_financeiro', 'tudo_ao_mesmo', 'mais_sobre_sistema'].includes(action)) {
      setEtapa('apresentacao');
      addBotMessageDelayed(`Faz todo o sentido. 🎯

Deixa eu contar-te rapidamente quem está do outro lado disto: sou o Gabriel Sapalo, Campeão Nacional Absoluto de Xadrez de Angola 2024.

No xadrez aprendi uma coisa que vale para a vida: o caos não é falta de esforço, é falta de estrutura. Cada peça precisa de função. Cada movimento precisa de plano.

Foi com essa lógica que construí o Notion Elite Starter Kit — para que tu não precises de "ter mais disciplina", precisas só de um sistema que organize por ti.

Hoje já são centenas de pessoas a usar isto no dia a dia.

O que te faria começar ainda hoje?`, [
        { label: "📚 Quero organizar meus estudos", action: "organizar_estudos" },
        { label: "💰 Fala do preço", action: "quanto_custa" },
        { label: "📱 Quero ver na prática", action: "ver_demo" },
        { label: "🧠 Conta mais sobre o sistema", action: "mais_sobre_sistema" }
      ]);
      return;
    }

    if (action === 'ver_pilares' || action === 'como_funciona') {
      setEtapa('prova');
      addBotMessageDelayed(`Aqui estão os 6 PILARES do Notion Elite Starter Kit. 🏛️

**01 — Dashboard** — o teu centro de comando diário
**02 — Gestor de Projetos** — método Kanban, zero confusão
**03 — Gestor Financeiro** — controlo total do dinheiro
**04 — Cérebro Digital** — todo o conhecimento, organizado
**05 — Exames e Provas** — planeamento estratégico de estudo
**06 — Habit Tracker** — as rotinas que constroem o resultado

E não precisas de saber nada de Notion para começar — é literalmente copiar, colar e usar.

Isto é o que estavas a procurar?`, [
        { label: "🔥 É exatamente o que quero!", action: "quero_isso" },
        { label: "💰 Quanto custa?", action: "quanto_custa" },
        { label: "📱 Ver demonstração", action: "ver_demo" }
      ]);
      return;
    }

    // ============================================================
    // PROVA / FECHAMENTO
    // ============================================================
    if (action === 'quero_isso') {
      setEtapa('fechamento');
      addBotMessageDelayed(`Então vamos fechar isso. 🎉

**O que recebes hoje:**
✅ 6 Pilares de Alta Performance
✅ 4 Bónus Exclusivos (Comunidade, Prompts de IA, Atualizações, Setup Guiado)
✅ Acesso vitalício — pagas uma vez, usas para sempre
✅ Garantia de 30 dias — não serviu, devolvemos o dinheiro

**Valor combinado dos bónus:** $341
**O que pagas hoje, no Founder Batch 01:** $10

Menos do que um almoço fora — e vais usar isto todos os dias.

Estás pronto(a)?`, [
        { label: "✅ Sim, quero isso AGORA!", action: "quero_agora" },
        { label: "💰 Quanto custa mesmo?", action: "quanto_custa" },
        { label: "🤔 Ainda estou pensando", action: "pensando" }
      ]);
      return;
    }

    if (action === 'quero_agora') {
      setEtapa('fechamento');
      addBotMessageDelayed(`Ótima decisão. 🚀

**Preço Founder Batch 01:** $10 / 10.000 AKZ
**Garantia:** 30 dias, sem perguntas
**Acesso:** em menos de 10 minutos após confirmação

Escolhe a forma de pagamento:`, [
        ...PAYMENT_CHOICE_BTNS,
        { label: "📱 Ver demonstração primeiro", action: "ver_demo" }
      ]);
      return;
    }

    if (action === 'pensando') {
      setEtapa('objeção');
      addBotMessageDelayed(`Faz sentido teres dúvidas — é dinheiro a sério, mesmo que pouco. 😊

**As perguntas mais comuns:**
❓ *"Nunca usei Notion, consigo mesmo assim?"* — Sim. O kit foi pensado para quem nunca abriu o Notion na vida.
❓ *"Preciso pagar mensalidade?"* — Não. A versão gratuita do Notion é suficiente para sempre.
❓ *"Quanto tempo demora a configurar?"* — Menos de 24 horas, com vídeo passo a passo incluído.
❓ *"E se eu não gostar?"* — Garantia de 30 dias. Risco é meu, não teu.

Ficou alguma dúvida específica?`, [
        { label: "🚀 Não tenho mais dúvidas — quero comprar", action: "comprar_agora" },
        { label: "📱 Quero ver o sistema na prática", action: "ver_demo" },
        { label: "💰 Me fala do preço de novo", action: "quanto_custa" }
      ]);
      return;
    }

    if (action === 'quanto_custa') {
      setEtapa('objeção');
      addBotMessageDelayed(`💰 **Preços do Notion Elite Starter Kit**

**Founder Batch 01 — $10 / 10.000 AKZ** ⬅️ preço de lançamento, por tempo limitado
⬆️ Próximo lote: $27
⬆️ Preço final: $49

**Incluído:**
✅ 6 Pilares de Alta Performance
✅ 4 Bónus Exclusivos (valor combinado: $341)
✅ Atualizações vitalícias 2026/2027
✅ Garantia de 30 dias

Quem entra agora, no Founder Batch, paga uma fração do que quem entrar depois vai pagar — pelo mesmo sistema.

O que achas?`, [
        { label: "🚀 Faz sentido — quero comprar", action: "comprar_agora" },
        { label: "🇦🇴 Como pago em Angola?", action: "pagamento_angola" },
        { label: "💳 Pagamento internacional", action: "pagamento_internacional" }
      ]);
      return;
    }

    // ============================================================
    // COMPRA — INTERNACIONAL
    // ============================================================
    if (action === 'comprar_agora') {
      addBotMessageDelayed(`🚀 Boa escolha.

Escolhe a forma de pagamento:`, [
        ...PAYMENT_CHOICE_BTNS,
        { label: "📱 Ainda tenho dúvidas", action: "duvidas" }
      ]);
      return;
    }

    if (action === 'comprar_hotmart') {
      Telemetry.emit('checkout_initiated', {
        segment: 'international',
        funnel: 'chatbot',
        price_usd: 10
      });

      redirectToHotmart();

      addBotMessageDelayed(`✅ Abri a página de pagamento para ti. 🎉

**Para finalizar:**
1️⃣ Preenche os teus dados na Hotmart
2️⃣ Efetua o pagamento de $10
3️⃣ A confirmação chega por email em minutos
4️⃣ Recebes o link do kit

**Garantia:** 30 dias, incondicional.

Volta aqui depois de comprar para eu te dar as boas-vindas. 🙌`, [
        { label: "✅ Já comprei! Receber boas-vindas", action: "ja_comprei" },
        { label: "🇦🇴 Sou de Angola", action: "pagamento_angola" },
        { label: "❓ Dúvidas sobre o pagamento", action: "duvidas" }
      ]);
      return;
    }

    // ============================================================
    // COMPRA — ANGOLA
    // ============================================================
    if (action === 'pagamento_angola') {
      redirectToAngola();
      return;
    }

    if (action === 'comprovativo_enviado') {
      redirectToAngola();
      return;
    }

    // ============================================================
    // MULTICAIXA EXPRESS
    // ============================================================
    if (action === 'multicaixa_express') {
      addBotMessageDelayed(
        `⚡ **Multicaixa Express — 10.000 AKZ**

📱 **Número:** ${CONFIG.expressPhone}
👤 **Titular:** ${CONFIG.expressName}
💰 **Valor:** 10.000 AKZ

**Passo a passo:**
1️⃣ Abre o Multicaixa Express
2️⃣ Seleciona "Transferência" → "Para outro banco"
3️⃣ Insere os dados acima
4️⃣ Confirma a transferência
5️⃣ Tira um print do comprovativo
6️⃣ Envia para: **${CONFIG.paymentEmail}**

⚡ **Ativação em menos de 10 minutos**

Depois do pagamento, clica no botão abaixo:`,
        [
          { label: "🇦🇴 Angola · 10.000 AKZ — Activar Agora", action: "pagamento_angola" },
          { label: "🏦 Prefiro IBAN", action: "transferencia_bai" },
          { label: "💬 Suporte", action: "suporte" }
        ]
      );
      return;
    }

    // ============================================================
    // TRANSFERÊNCIA IBAN
    // ============================================================
    if (action === 'transferencia_bai' || action === 'transferencia_iban') {
      addBotMessageDelayed(
        `🏦 **Transferência IBAN — 10.000 AKZ**

🏦 **Banco:** BAI
👤 **Titular:** Gabriel António Armando Sapalo
🔢 **IBAN:** AO06 0040 0000 1859 5631 1019 4
💰 **Valor:** 10.000 AKZ

**Como ativar:**
1️⃣ Faz a transferência de 10.000 AKZ
2️⃣ Envia o comprovativo para: **${CONFIG.paymentEmail}**
3️⃣ Assunto do email: ELITE-XXXX (referência gerada)
4️⃣ Recebes o kit em menos de 10 minutos

⚡ **Ativação em menos de 10 minutos** — via email

Depois do pagamento, clica no botão abaixo:`,
        [
          { label: "🇦🇴 Angola · 10.000 AKZ — Activar Agora", action: "pagamento_angola" },
          { label: "⚡ Prefiro Multicaixa Express", action: "multicaixa_express" },
          { label: "💬 Suporte", action: "suporte" }
        ]
      );
      return;
    }

    // ============================================================
    // PÓS-VENDA
    // ============================================================
    if (action === 'ja_comprei') {
      setEtapa('pos_venda');
      addBotMessageDelayed(`🎉 **Parabéns — agora fazes parte da Elite!**

O teu acesso ao Notion Elite Starter Kit 2026 está confirmado.

📧 **Verifica o teu email** (e a pasta de spam) — está lá o link do kit e os bónus.

**Próximos passos:**
1️⃣ Abre o email
2️⃣ Duplica o kit
3️⃣ Personaliza — segue o vídeo de setup na Página 36
4️⃣ Começa a executar

🎁 **Bónus incluídos:**
• Comunidade Elite Minds 2026
• Hub de Prompts de IA (20+)
• Atualizações vitalícias 2026/2027
• Setup guiado em 24h

Bem-vindo(a). 🏆`, [
        { label: "🔗 Entrar na Comunidade", action: "entrar_comunidade" },
        { label: "📧 Reenviar email do kit", action: "reenviar_email" },
        { label: "📱 Ver vídeo de setup", action: "ver_setup" }
      ]);
      return;
    }

    if (action === 'entrar_comunidade' || action === 'link_comunidade') {
      window.open(CONFIG.communityLink, '_blank');
      Telemetry.emit('community_link_click', { source: 'chatbot' });
      addBotMessageDelayed('🔗 Comunidade Elite Minds aberta! 🎉\n\nLá encontras outros operadores mentais, desafios semanais e suporte direto.\n\nPosso ajudar com mais alguma coisa?', [
        { label: "📱 Ajuda com o setup", action: "ajuda_setup" },
        { label: "📧 Reenviar email", action: "reenviar_email" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    if (action === 'reenviar_email') {
      addBotMessageDelayed(`📧 **Reenvio de email solicitado!**

Vamos reenviar o link do kit para o teu email agora.

**Verifica:**
✅ A pasta de spam ou promoções
✅ Se o email está correto
✅ Bloqueios de segurança

Se não chegar em 5 minutos, envia um email para ${CONFIG.paymentEmail} com o assunto "REENVIO".`, [
        { label: "📱 Ajuda com o setup", action: "ajuda_setup" },
        { label: "💬 Falar com suporte", action: "suporte" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    if (action === 'ajuda_setup' || action === 'ver_setup') {
      window.open('https://www.youtube.com/embed/qfKGywfh05A', '_blank');
      addBotMessageDelayed(`🔧 **Setup do Notion Elite Kit — 3 Passos**

**Passo 1 — Duplicar** (2 min)
**Passo 2 — Personalizar** (10 min)
**Passo 3 — Executar** (a partir de agora)

📹 **Vídeo completo:** Página 36 do kit.

Precisas de ajuda com algum passo específico?`, [
        { label: "💬 Dúvidas sobre o setup", action: "ajuda_setup" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    // ============================================================
    // DEMONSTRAÇÃO
    // ============================================================
    if (action === 'ver_demo') {
      window.open('https://www.youtube.com/embed/qfKGywfh05A', '_blank');
      addBotMessageDelayed('📱 Demonstração aberta! 🎬\n\nVê o sistema a funcionar na prática.\n\nO que achaste?', [
        { label: "🔥 Quero comprar agora", action: "comprar_agora" },
        { label: "💰 Quanto custa?", action: "quanto_custa" },
        { label: "❓ Ainda tenho dúvidas", action: "duvidas" }
      ]);
      return;
    }

    // ============================================================
    // SUPORTE
    // ============================================================
    if (action === 'suporte') {
      addBotMessageDelayed(`📧 **Suporte Notion Elite Kit**

**Email:** ${CONFIG.supportEmail}
**WhatsApp:** +244 923 379 486

Clica para falar diretamente no WhatsApp:`, [
        { label: "💬 Falar no WhatsApp", action: "abrir_whatsapp" },
        { label: "🏠 Voltar ao menu", action: "menu" }
      ]);
      return;
    }

    if (action === 'abrir_whatsapp') {
      window.open(CONFIG.whatsappSupport, '_blank');
      addBotMessageDelayed('✅ WhatsApp aberto! 🎉\n\nA nossa equipa vai responder-te diretamente.\n\nEnquanto isso, posso ajudar com mais alguma coisa?', [
        { label: "💰 Preços e planos", action: "quanto_custa" },
        { label: "📱 Ver demonstração", action: "ver_demo" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    // ============================================================
    // MENU
    // ============================================================
    if (action === 'menu') {
      addBotMessageDelayed(`🏠 **Menu Principal — Notion Elite Kit**

Escolhe uma opção:`, [
        ...MENU_BTNS,
        { label: "❓ Dúvidas frequentes", action: "duvidas" }
      ]);
      return;
    }

    // ============================================================
    // DÚVIDAS
    // ============================================================
    if (action === 'duvidas') {
      addBotMessageDelayed(`❓ **Perguntas Frequentes**

**1. Nunca usei o Notion. Consigo mesmo assim?**
Sim! O kit foi construído para iniciantes.

**2. Preciso pagar mensalidade ao Notion?**
Não. A versão gratuita é suficiente.

**3. Quanto tempo demora o setup?**
Menos de 24 horas.

**4. Recebo acesso imediato?**
Sim, enviado automaticamente após a compra.

**5. Recebo atualizações futuras?**
Sim. Pagamento único, acesso vitalício.

Ficou mais alguma dúvida?`, [
        { label: "🚀 Quero comprar agora", action: "comprar_agora" },
        { label: "💰 Preços", action: "quanto_custa" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    // ============================================================
    // PAGAMENTO INTERNACIONAL
    // ============================================================
    if (action === 'pagamento_internacional') {
      addBotMessageDelayed(`💳 **Pagamento Internacional — $10 USD**

**Métodos disponíveis:**
💳 Cartão de Crédito/Débito (Visa, Mastercard)
📱 Apple Pay / Google Pay

**Como comprar:**
1. Clica em "Comprar Agora"
2. Serás redirecionado para a Hotmart
3. Preenche os teus dados
4. Pagamento de $10
5. Acesso imediato por email

**Garantia:** 30 dias, incondicional.

Vamos finalizar?`, [
        { label: "💳 Quero comprar com cartão", action: "comprar_hotmart" },
        { label: "🇦🇴 Sou de Angola", action: "pagamento_angola" },
        { label: "📱 Ainda tenho dúvidas", action: "duvidas" }
      ]);
      return;
    }

    // ============================================================
    // FALLBACK
    // ============================================================
    addBotMessageDelayed(`Entendido! 😊

Posso ajudar com:

📚 **Sobre o kit** — o que é, como funciona, os 6 pilares
💰 **Preços** — $10 agora, sobe para $27
📱 **Demonstração** — ver o sistema na prática
🚀 **Compra** — como comprar e ativar
❓ **Dúvidas** — perguntas específicas

O que gostarias de saber?`, MENU_BTNS);
  };

  // Disparo via clique em botão: adiciona a bolha do usuário + telemetria
  const handleAction = (action: string, label: string) => {
    if (busy) return;

    addMessage('user', label);

    Telemetry.emit('chat_interaction', {
      action,
      label,
      etapa,
      user_nome: nome || 'anonimo',
      is_conversion: action.includes('comprar') || action === 'comprar_agora' || action === 'comprar_hotmart'
    });

    processAction(action);
  };

  // Disparo via texto livre: a bolha do usuário já foi adicionada em handleSend,
  // então aqui só tratamos telemetria + lógica — sem duplicar a mensagem.
  const handleSend = () => {
    const text = input.trim();
    if (!text || busy) return;

    setInput('');
    addMessage('user', text);

    if (etapa === 'acolhimento') {
      setNome(text);
      setEtapa('mapeamento');
      addBotMessageDelayed(`Olá ${text}! 👋 Seja muito bem-vindo(a) ao Notion Elite Starter Kit.

Como está a sua organização neste momento?`, [
        { label: "😰 Um caos total", action: "caos_total" },
        { label: "📝 Mais ou menos organizado", action: "mais_ou_menos" },
        { label: "✅ Já sou organizado", action: "ja_organizado" },
        { label: "🤔 Só estou conhecendo", action: "conhecendo" }
      ]);
      return;
    }

    const lower = text.toLowerCase();
    let matchedAction: string | null = null;

    if (lower.includes('preço') || lower.includes('custa')) matchedAction = 'quanto_custa';
    else if (lower.includes('como funciona') || lower.includes('o que é') || lower.includes('o que e')) matchedAction = 'como_funciona';
    else if (lower.includes('comprar')) matchedAction = 'comprar_agora';
    else if (lower.includes('multicaixa') || lower.includes('express')) matchedAction = 'multicaixa_express';
    else if (lower.includes('iban') || lower.includes('transferência') || lower.includes('transferencia')) matchedAction = 'transferencia_bai';

    if (matchedAction) {
      Telemetry.emit('chat_interaction', {
        action: matchedAction,
        label: text,
        etapa,
        user_nome: nome || 'anonimo',
        is_conversion: matchedAction.includes('comprar')
      });
      processAction(matchedAction);
      return;
    }

    if (lower.includes('obrigado') || lower.includes('obrigada')) {
      addBotMessageDelayed(`❤️ Por nada! Fico feliz em ajudar.

O Notion Elite Kit está aqui para transformar a forma como organizas a tua vida.

Precisas de mais alguma coisa?`, [
        { label: "🚀 Quero comprar agora", action: "comprar_agora" },
        { label: "📱 Ver demonstração", action: "ver_demo" },
        { label: "🏠 Menu", action: "menu" }
      ]);
      return;
    }

    addBotMessageDelayed(`Entendido! 😊

Posso ajudar com:
📚 Sobre o kit
💰 Preços
🚀 Compra
❓ Dúvidas

O que gostarias de saber?`, MENU_BTNS);
  };

  return (
    <>
      {/* Balão de Boas-Vindas */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-[150px] left-5 z-40 w-72 rounded-2xl border border-[#D4AF37]/40 bg-[#0a0f1a]/95 p-4 shadow-[0_8px_30px_rgba(212,175,55,0.25)] backdrop-blur-sm"
          >
            <button
              onClick={() => setShowGreeting(false)}
              className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-[#1e293b] text-slate-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-base">
                👑
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Olá! Tudo bem?</p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Posso ajudar-te com o <span className="text-[#D4AF37] font-semibold">Notion Elite Kit</span> ou tirar dúvidas. 😊
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowGreeting(false); setOpen(true); }}
              className="mt-3 w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D77A] py-2 text-xs font-semibold text-black transition hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
            >
              Falar com especialista agora
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante */}
      <button
        onClick={() => { setOpen(v => !v); setShowGreeting(false); }}
        className="fixed bottom-24 left-5 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-[#D4AF37] bg-[#111827] text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
        aria-label="Abrir assistente"
      >
        {showGreeting && !open && (
          <span className="absolute inset-0 rounded-full border-2 border-[#D4AF37] animate-ping" />
        )}
        {open ? <X className="h-6 w-6" /> : <Crown className="h-6 w-6" />}
      </button>

      {/* Janela do Chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-32 left-5 z-40 w-[400px] max-w-[calc(100vw-40px)] rounded-2xl border border-[#1e293b] bg-[#0a0f1a] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-[#1e293b] px-4 py-3 bg-gradient-to-r from-[#0a0f1a] to-[#111827]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xl">
                    👑
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0a0f1a] bg-[#25D366]" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white flex items-center gap-2">
                    Notion Elite Assistant
                    <span className="text-[8px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Elite
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400">🎯 Especialista em Organização & Performance</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-[#0a0f1a]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-[#1e293b] text-white'
                  }`}>
                    {msg.text}
                    {msg.btns && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.btns.map((btn) => (
                          <button
                            key={btn.action}
                            onClick={() => handleAction(btn.action, btn.label)}
                            disabled={busy}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                              btn.action === 'pagamento_angola'
                                ? 'bg-[#25D366] text-white hover:bg-[#1EBE5A] shadow-[0_4px_15px_rgba(37,211,102,0.4)]'
                                : 'border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-[#1e293b] px-4 py-2.5 text-sm text-slate-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse mr-2" />
                    Pensando...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#1e293b] p-3 bg-[#0a0f1a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={etapa === 'acolhimento' ? "Digite seu nome..." : "Digite sua pergunta..."}
                  disabled={busy}
                  className="flex-1 rounded-full border border-[#1e293b] bg-[#111827] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#D4AF37] transition-colors disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#D4AF37] text-black transition hover:bg-[#F4D77A] hover:scale-105 disabled:opacity-50"
                  disabled={busy}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <span>⚡</span>
                <span>Respostas em tempo real</span>
                <span>•</span>
                <span>🔒 100% seguro</span>
                <span>•</span>
                <span className="text-[#D4AF37]">👑 Founder Batch 01</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default SalesChatBot;