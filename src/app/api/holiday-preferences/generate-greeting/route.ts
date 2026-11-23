import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  companyName: z.string().trim().min(1).max(200),
  dates: z
    .array(
      z.object({
        date: z.string(),
        status: z.enum(["closed", "custom-hours"]),
        openTime: z.string().optional(),
        closeTime: z.string().optional(),
        label: z.string().optional(),
      }),
    )
    .max(500),
  tone: z.enum(["warm", "formal", "brief"]).optional().default("warm"),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`generate-greeting:${ip}`, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The greeting generator isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const { companyName, dates, tone } = parsed.data;
  const closedDates = dates.filter((d) => d.status === "closed").map((d) => d.date);
  const customHoursDates = dates.filter((d) => d.status === "custom-hours");

  try {
    const anthropic = new Anthropic({ apiKey });
    const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

    const response = await anthropic.messages.create({
      model,
      max_tokens: 250,
      system: [
        "You write short auto-attendant (phone greeting) scripts for a business phone system.",
        "Output ONLY the greeting script itself, as plain text the business would read aloud or have a voice generate — no preamble, no markdown, no quotation marks around it.",
        "Keep it under 60 words. It should state that the office is closed for the holiday(s), when it will reopen if that's inferable, and invite the caller to leave a message or call back.",
        `The tone should be ${tone}.`,
      ].join(" "),
      messages: [
        {
          role: "user",
          content: [
            `Company name: ${companyName}`,
            closedDates.length
              ? `Fully closed on: ${closedDates.join(", ")}`
              : "No fully-closed dates selected.",
            customHoursDates.length
              ? `Custom/reduced hours on: ${customHoursDates
                  .map((d) => `${d.date} (${d.openTime || "?"}-${d.closeTime || "?"})`)
                  .join(", ")}`
              : "",
            "Write the auto-attendant greeting now.",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const greeting = textBlock && "text" in textBlock ? textBlock.text.trim() : "";

    if (!greeting) {
      return NextResponse.json({ error: "Couldn't generate a greeting. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ greeting });
  } catch (err) {
    console.error("[holiday-preferences] generate-greeting error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
