// Sistema de Telemetry extraído do ChatBot
export const Telemetry = {
  emit: (eventAction: string, metadata: Record<string, unknown> = {}) => {
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