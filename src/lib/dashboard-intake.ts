// Sends a website form submission to the Lion Switch dashboard's "Website forms"
// inbox (/admin). Uses the same dashboard and shared secret as holiday requests
// (HOLIDAY_DASHBOARD_URL + HOLIDAY_INTAKE_SECRET).

export type DashboardForm = "call-preferences" | "bill-review" | "contact";

export async function sendToDashboard(
  form: DashboardForm,
  payload: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    fields: { label: string; value: string }[];
    details?: Record<string, unknown>;
    summary: string;
    files?: { filename: string; data: string }[];
  },
): Promise<{ configured: boolean; sent: boolean }> {
  const base = process.env.HOLIDAY_DASHBOARD_URL;
  const secret = process.env.HOLIDAY_INTAKE_SECRET;
  if (!base || !secret) return { configured: false, sent: false };
  let url: string;
  try {
    url = `${new URL(base).origin}/api/intake/website/${form}`;
  } catch {
    return { configured: false, sent: false };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    });
    // 404 means the dashboard doesn't have this inbox yet (its update isn't
    // deployed), so treat it as "not set up" rather than a failed delivery.
    if (res.status === 404) {
      console.warn(`[dashboard] ${form} inbox not available yet (404)`);
      return { configured: false, sent: false };
    }
    if (!res.ok) console.error(`[dashboard] ${form} intake responded ${res.status}`);
    return { configured: true, sent: res.ok };
  } catch (err) {
    console.error(`[dashboard] ${form} intake failed`, err);
    return { configured: true, sent: false };
  }
}
