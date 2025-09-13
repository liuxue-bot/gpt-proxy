export default async function handler(req, res) {
  try {
    const body = req.body || {};
    console.log("收到 GPT 请求: ", body);

    // 🚨 已替换成你的 Zapier Webhook URL
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24591280/umuyd69/";

    // 转发数据到 Zapier
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // 返回给 GPT 确认信息
    res.status(200).json({ ok: true, received: body });

  } catch (error) {
    console.error("转发失败: ", error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
