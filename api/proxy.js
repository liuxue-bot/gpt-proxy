export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body || {};
    console.log("📩 收到 GPT 请求:", body);

    // 👇 替换成你的 Zapier Webhook URL
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24591280/umuyd69/";

    // 转发数据到 Zapier
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.text();
    console.log("✅ 已转发到 Zapier:", result);

    // 返回 GPT 确认信息
    res.status(200).json({ ok: true, received: body, zapier: result });

  } catch (error) {
    console.error("❌ 转发失败:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
