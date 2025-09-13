export default async function handler(req, res) {
  try {
    // 如果是 POST 请求，就读取 body，否则返回默认信息
    const body = req.method === "POST" ? req.body : { msg: "Hello Proxy" };

    // 转发到 webhook.site
    await fetch("https://webhook.site/77e7bf1f-d263-4b0e-899f-93859716f6ac", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // 成功时返回
    res.status(200).json({ ok: true, received: body });
  } catch (error) {
    console.error("代理错误:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
}
