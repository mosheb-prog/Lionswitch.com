// Sample-data views for the Live Dashboard demo's Users, Queues, Trends,
// Call tree and Transcripts tabs. Every name, number and call here is made up
// for illustration; nothing comes from a real customer.

function SampleTag() {
  return (
    <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-3">
      Sample data
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">{title}</h3>
        <SampleTag />
      </div>
      {children}
    </div>
  );
}

const USERS = [
  { name: "Dana R.", ext: "1152", status: "On a call", calls: 31, talk: "1:42:10", missed: 0 },
  { name: "Marcus T.", ext: "1156", status: "On a call", calls: 27, talk: "1:18:45", missed: 1 },
  { name: "Priya K.", ext: "1158", status: "On a call", calls: 22, talk: "58:02", missed: 0 },
  { name: "Sam W.", ext: "1160", status: "Available", calls: 19, talk: "44:31", missed: 2 },
  { name: "Elena V.", ext: "1162", status: "Available", calls: 17, talk: "39:15", missed: 0 },
  { name: "Tom B.", ext: "1164", status: "Away", calls: 12, talk: "21:08", missed: 1 },
];

const STATUS_DOT: Record<string, string> = {
  "On a call": "bg-orange",
  Available: "bg-[#86efac]",
  Away: "bg-on-dark-2",
};

export function UsersView() {
  return (
    <Panel title="Users today">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-on-dark-2">
            <tr>
              <th className="pb-2 font-semibold">User</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 text-right font-semibold">Calls</th>
              <th className="pb-2 text-right font-semibold">Talk time</th>
              <th className="pb-2 text-right font-semibold">Missed</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.ext} className="border-t border-white/10">
                <td className="py-2">
                  {u.name} <span className="text-on-dark-2">· {u.ext}</span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[u.status]}`} />
                    {u.status}
                  </span>
                </td>
                <td className="py-2 text-right tabular-nums">{u.calls}</td>
                <td className="py-2 text-right tabular-nums text-on-dark-2">{u.talk}</td>
                <td className={`py-2 text-right tabular-nums ${u.missed ? "text-orange-3" : "text-on-dark-2"}`}>{u.missed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

const QUEUE_STATS = [
  { name: "Sales", ext: "510", waiting: 2, longest: "1:12", answered: 41, abandoned: 2, agents: "2 of 3" },
  { name: "Support", ext: "520", waiting: 0, longest: "—", answered: 33, abandoned: 1, agents: "1 of 2" },
  { name: "Billing", ext: "530", waiting: 1, longest: "0:38", answered: 12, abandoned: 0, agents: "1 of 1" },
];

export function QueuesView() {
  return (
    <Panel title="Queues right now">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {QUEUE_STATS.map((q) => (
          <div key={q.name} className="rounded-xl bg-white/5 p-3 text-xs">
            <div className="flex items-baseline justify-between">
              <span className="font-[family-name:var(--font-heading)] text-sm font-bold">{q.name}</span>
              <span className="text-on-dark-2">ext {q.ext}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className={`font-[family-name:var(--font-heading)] text-xl font-bold tabular-nums ${q.waiting ? "text-orange-3" : ""}`}>{q.waiting}</p>
                <p className="text-[10px] uppercase tracking-wider text-on-dark-2">Waiting</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-heading)] text-xl font-bold tabular-nums">{q.longest}</p>
                <p className="text-[10px] uppercase tracking-wider text-on-dark-2">Longest wait</p>
              </div>
              <div>
                <p className="font-semibold tabular-nums">{q.answered}</p>
                <p className="text-[10px] uppercase tracking-wider text-on-dark-2">Answered</p>
              </div>
              <div>
                <p className="font-semibold tabular-nums">{q.abandoned}</p>
                <p className="text-[10px] uppercase tracking-wider text-on-dark-2">Abandoned</p>
              </div>
            </div>
            <p className="mt-3 text-on-dark-2">{q.agents} agents available</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

const WEEK = [
  { day: "Mon", now: 142, before: 128 },
  { day: "Tue", now: 131, before: 135 },
  { day: "Wed", now: 156, before: 140 },
  { day: "Thu", now: 149, before: 138 },
  { day: "Fri", now: 97, before: 102 },
  { day: "Sat", now: 0, before: 0 },
  { day: "Sun", now: 64, before: 58 },
];

export function TrendsView() {
  const max = Math.max(...WEEK.map((d) => Math.max(d.now, d.before)));
  return (
    <Panel title="Last 7 days vs the 7 days before">
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        {[
          ["739", "Calls this week", "+6%"],
          ["91%", "Answered", "+2 pts"],
          ["Wed 11 AM", "Busiest hour", ""],
        ].map(([v, l, d]) => (
          <div key={l} className="rounded-xl bg-white/5 p-3">
            <p className="font-[family-name:var(--font-heading)] text-lg font-bold">{v}</p>
            <p className="text-[10px] uppercase tracking-wider text-on-dark-2">{l}</p>
            {d ? <p className="mt-1 text-[10px] font-semibold text-[#86efac]">{d}</p> : null}
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-32 items-end gap-2">
        {WEEK.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-24 w-full items-end justify-center gap-0.5">
              <div className="w-1/3 rounded-t-sm bg-on-dark-2/40" style={{ height: `${(d.before / max) * 100}%` }} />
              <div className="w-1/3 rounded-t-sm bg-orange" style={{ height: `${(d.now / max) * 100}%` }} />
            </div>
            <span className="text-[10px] text-on-dark-2">{d.day}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 flex items-center justify-center gap-3 text-[10px] text-on-dark-2">
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-orange" /> This week</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-on-dark-2/40" /> Week before</span>
      </p>
    </Panel>
  );
}

function Node({ label, sub, tone = "default" }: { label: string; sub?: string; tone?: "start" | "default" | "end" }) {
  const cls =
    tone === "start" ? "bg-orange text-ink" : tone === "end" ? "bg-white/10 text-on-dark" : "bg-white/5 text-on-dark ring-1 ring-inset ring-white/15";
  return (
    <div className={`rounded-xl px-3 py-2 text-center text-xs ${cls}`}>
      <p className="font-semibold">{label}</p>
      {sub ? <p className={`mt-0.5 text-[10px] ${tone === "start" ? "text-ink/70" : "text-on-dark-2"}`}>{sub}</p> : null}
    </div>
  );
}

export function CallTreeView() {
  const options = [
    { key: "1", label: "Sales queue", sub: "ext 510 · 3 agents" },
    { key: "2", label: "Support queue", sub: "ext 520 · 2 agents" },
    { key: "3", label: "Billing", sub: "ext 530" },
    { key: "0", label: "Front desk", sub: "ext 1152" },
  ];
  return (
    <Panel title="Main number call flow">
      <div className="flex flex-col items-center gap-2">
        <Node label="(718) 555-0100" sub="Main number" tone="start" />
        <span className="h-4 w-px bg-white/20" />
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.03] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-3">Business hours</p>
            <Node label="Auto attendant" sub="“Press 1 for sales…”" />
            <div className="grid w-full grid-cols-2 gap-2">
              {options.map((o) => (
                <div key={o.key} className="flex items-start gap-1.5">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/20 text-[10px] font-bold text-orange-3">{o.key}</span>
                  <div className="flex-1">
                    <Node label={o.label} sub={o.sub} tone="end" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.03] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-3">After hours &amp; holidays</p>
            <Node label="Closed greeting" sub="Holiday message on holiday dates" />
            <span className="h-3 w-px bg-white/20" />
            <Node label="Company voicemail" sub="Box 1100" tone="end" />
          </div>
        </div>
      </div>
    </Panel>
  );
}

const TRANSCRIPTS = [
  {
    when: "11:14 AM",
    caller: "(212) 555-0199",
    who: "Marcus T. · 5:03",
    mood: "Happy",
    summary: "Customer confirmed the order for 12 desk phones and asked for delivery by Friday.",
    lines: [
      ["Caller", "Hi, I'm calling to confirm the order for the twelve phones."],
      ["Marcus", "Great, I have it here. Delivery by Friday works?"],
      ["Caller", "Perfect, Friday is ideal. Thanks!"],
    ],
  },
  {
    when: "10:58 AM",
    caller: "(646) 555-0143",
    who: "Voicemail · 0:41",
    mood: "Neutral",
    summary: "Asked for a callback about a billing question on last month's invoice. Added to follow-ups.",
    lines: [["Caller", "Hi, this is about last month's invoice, could someone call me back? Thanks."]],
  },
];

export function TranscriptsView() {
  return (
    <Panel title="Transcripts (ready after each call ends)">
      <ul className="space-y-3">
        {TRANSCRIPTS.map((t) => (
          <li key={t.when} className="rounded-xl bg-white/5 p-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold tabular-nums">
                {t.caller} <span className="font-normal text-on-dark-2">· {t.when} · {t.who}</span>
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold">{t.mood}</span>
            </div>
            <p className="mt-2 rounded-lg bg-orange/10 px-2.5 py-1.5 text-on-dark">
              <span className="font-bold text-orange-3">Summary: </span>
              {t.summary}
            </p>
            <div className="mt-2 space-y-1 text-on-dark-2">
              {t.lines.map(([who, line], i) => (
                <p key={i}>
                  <span className="font-semibold text-on-dark">{who}:</span> {line}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
