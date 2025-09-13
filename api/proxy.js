const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = await req.json();
    console.log("✅ 收到 GPT 请求:", body);

    // 你的 Zapier Webhook URL
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24591280/umuyd69/";

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const resultText = await response.text();
    console.log("✅ 已转发到 Zapier，响应:", resultText);

    res.status(200).json({ ok: true, result: resultText });
  } catch (err) {
    console.error("❌ 出错:", err);
    res.status(500).json({ error: "Proxy Failed", details: err.message });
  }
};
