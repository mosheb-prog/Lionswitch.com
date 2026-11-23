// Posts structured JSON to a Google Apps Script webhook (Google Sheet as a
// simple data store), configured entirely via env var so no credentials are
// hard-coded. No-ops with a console warning if the webhook isn't configured,
// so forms still succeed for the visitor even if this integration isn't set
// up yet.

export async function postToSheetWebhook(
  webhookEnvVar: string,
  payload: Record<string, unknown>,
  /** "form" sends application/x-www-form-urlencoded (what a Google Apps
   * Script reading `e.parameter` expects); "json" sends a JSON body. */
  format: "json" | "form" = "json",
): Promise<{ sent: boolean }> {
  const url = process.env[webhookEnvVar];

  if (!url) {
    console.warn(`[sheets] ${webhookEnvVar} not configured — skipping webhook post`);
    return { sent: false };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": format === "form" ? "application/x-www-form-urlencoded" : "application/json",
      },
      body:
        format === "form"
          ? new URLSearchParams(
              Object.entries(payload).map(([k, v]) => [k, String(v ?? "")]),
            ).toString()
          : JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`[sheets] webhook ${webhookEnvVar} responded ${res.status}`);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[sheets] webhook ${webhookEnvVar} failed`, err);
    return { sent: false };
  }
}
