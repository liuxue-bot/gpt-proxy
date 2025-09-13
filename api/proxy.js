// api/proxy.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = req.body;  // ✅ Vercel 自动解析 JSON
    console.log("📩 收到 GPT 请求:", body);

    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24591280/umuyd69/";

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const resultText = await response.text();
    console.log("✅ 已转发到 Zapier，响应:", resultText);

    res.status(200).json({ ok: true, zapierResponse: resultText });
  } catch (error) {
    console.error("❌ Proxy Failed:", error);
    res.status(500).json({ error: "Proxy Failed", details: error.message });
  }
}
