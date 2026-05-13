import { useState } from "react";

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

const TESTIMONIALS = [
  { name: "Mariana Costa", loc: "Lisboa, Portugal", text: "Passei de média de 12 para 15 em dois meses. O dashboard mudou completamente a minha organização académica." },
  { name: "Sofia Rodrigues", loc: "Coimbra, Portugal", text: "Na primeira semana com o Kit, entreguei dois trabalhos antes do prazo." },
  { name: "João Pedro Silva", loc: "São Paulo, Brasil", text: "Este sistema fez-me poupar quase 2 horas por dia em organização." },
  { name: "Tomás Ferreira", loc: "Porto, Portugal", text: "Agora planeio a semana toda em 10 minutos ao domingo." },
  { name: "Ana Luísa Mendes", loc: "Luanda, Angola", text: "Finalmente tenho controlo total sobre os meus projetos e prazos." },
  { name: "Beatriz Mendonça", loc: "Maputo, Moçambique", text: "Já vou no terceiro mês e a minha média subiu." }
];

const MODULES = [
  "Dashboard de Elite", "Cérebro Digital", "Gestor de Matérias", "Calendário Estratégico", "Prompts de IA",
  "Rotinas de 5 Minutos", "Filtro de Foco", "Sistema Anti-Procrastinação", "Finanças Pessoais", "Setup 24H"
];

export function App() {
  return (
    <div style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <div style={{ position: "fixed", top: 0, width: "100%", backgroundColor: "rgba(0,0,0,0.9)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000, borderBottom: "1px solid #333" }}>
        <img src={CONFIG.glowscaleLogo} alt="Logo" style={{ height: "40px" }} />
        <div>
          <a href="#preco" style={{ backgroundColor: "#00E5FF", color: "#000", padding: "10px 20px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold" }}>ADQUIRIR</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "120px 24px 80px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", maxWidth: "800px", margin: "0 auto" }}>DOMINE A SUA ROTINA EM <span style={{ color: "#00E5FF" }}>24 HORAS</span></h1>
        <div style={{ maxWidth: "800px", margin: "40px auto", aspectRatio: "16/9" }}>
          <iframe src={CONFIG.heroVideo} style={{ width: "100%", height: "100%", borderRadius: "24px" }} allowFullScreen title="VSL"></iframe>
        </div>
      </div>

      {/* Problemas */}
      <div style={{ padding: "80px 24px", backgroundColor: "#0a0a0a" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>A Raiz da Desorganização</h2>
        <p style={{ textAlign: "center", color: "#00E5FF" }}>O problema não é falta de motivação. É falta de sistema.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "48px auto" }}>
          {["Caos Fragmentado", "Sobrecarga Mental", "Pânico na Véspera", "Falsa Produtividade", "Ansiedade Constante", "Fadiga de Ferramentas"].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111", padding: "24px", borderRadius: "16px", border: "1px solid #222" }}>
              <div style={{ fontSize: "2rem", color: "#00E5FF", fontWeight: "bold" }}>{(i+1).toString().padStart(2, '0')}</div>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Módulos */}
      <div style={{ padding: "80px 24px" }}>
        <h2 style={{ textAlign: "center" }}>Arquitetura Premium</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", maxWidth: "1200px", margin: "48px auto" }}>
          {MODULES.map((m, i) => (
            <div key={i} style={{ backgroundColor: "#111", padding: "20px", borderRadius: "12px", textAlign: "center", border: "1px solid #222" }}>
              <div style={{ color: "#00E5FF", fontSize: "12px" }}>Módulo {i+1}</div>
              <strong>{m}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Autor */}
      <div style={{ padding: "80px 24px", backgroundColor: "#0a0a0a", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "48px", alignItems: "center" }}>
        <img src={CONFIG.authorPhoto} alt="Gabriel Sapalo" style={{ width: "200px", borderRadius: "16px" }} />
        <div style={{ maxWidth: "500px" }}>
          <h3>Gabriel Sapalo</h3>
          <p>🏆 Campeão Nacional de Xadrez de Angola 2024</p>
          <p style={{ color: "#ccc" }}>“No xadrez, cada jogada tem consequência. Quem não tem sistema, joga no improviso e perde prazos.”</p>
        </div>
      </div>

      {/* Depoimentos */}
      <div style={{ padding: "80px 24px" }}>
        <h2 style={{ textAlign: "center" }}>Resultados Comprovados</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "48px auto" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ backgroundColor: "#111", padding: "24px", borderRadius: "16px" }}>
              <div style={{ color: "gold" }}>★★★★★</div>
              <p style={{ fontStyle: "italic" }}>“{t.text}”</p>
              <strong>{t.name}</strong>
              <div style={{ color: "#00E5FF", fontSize: "12px" }}>{t.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preços e Botões */}
      <div id="preco" style={{ padding: "80px 24px", backgroundColor: "#0a0a0a", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#111", padding: "48px", borderRadius: "32px", border: "1px solid #333" }}>
          <div style={{ fontSize: "2rem", textDecoration: "line-through", color: "#888" }}>249 USD</div>
          <div style={{ fontSize: "4rem", fontWeight: "bold", color: "#00E5FF" }}>10 USD</div>
          <p>ou 10.000 AKZ para Angola</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>
            <a href={CONFIG.hotmartCheckout} target="_blank" style={{ backgroundColor: "#fff", color: "#000", padding: "16px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold" }}>💳 ADQUIRIR POR $10 USD</a>
            <a href={CONFIG.whatsappPayment} target="_blank" style={{ backgroundColor: "#25D366", color: "#fff", padding: "16px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>📱 PAGAR 10.000 AKZ</a>
          </div>
          <p style={{ marginTop: "24px", fontSize: "12px" }}>⚠️ Garantia de 7 dias. Risco zero.</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "48px 24px", textAlign: "center", borderTop: "1px solid #222", fontSize: "12px", color: "#666" }}>
        <a href={CONFIG.termsLink} style={{ color: "#888", margin: "0 12px" }}>Termos</a>
        <a href={CONFIG.privacyLink} style={{ color: "#888", margin: "0 12px" }}>Privacidade</a>
        <p>{CONFIG.authorName} — 2026. Feito com ❤ em Angola.</p>
      </footer>
    </div>
  );
}
