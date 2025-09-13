export default async function handler(req, res) {
  const body = req.body || {};
  console.log("收到 GPT 请求：", body);

  // 转发到你的 webhook.site
  await fetch("https://webhook.site/77e7bf1f-d263-4b0e-899f-93859716f6ac
", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  res.status(200).json({ ok: true, received: body });
}
