// api/proxy.js

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = req.body;
    console.log("📩 收到 GPT 请求:", body);

    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24591280/umuyd69/";

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const resultText = await response.text();
    console.log("✅ 已转发到 Zapier，响应:", resultText);

    res.status(200).json({ ok: true, received: body, zapier: resultText });
  } catch (error) {
    console.error("❌ 转发失败:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};
