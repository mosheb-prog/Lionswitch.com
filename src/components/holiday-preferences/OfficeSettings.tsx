"use client";

export type OfficeSettingsValue = {
  fullyClosed: boolean;
  greetingChoice: "standard" | "custom";
  customGreeting: string;
};

export function OfficeSettings({
  value,
  onChange,
}: {
  value: OfficeSettingsValue;
  onChange: (value: OfficeSettingsValue) => void;
}) {
  return (
    <div className="space-y-5">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={value.fullyClosed}
          onChange={(e) => onChange({ ...value, fullyClosed: e.target.checked })}
          className="h-4 w-4 rounded border-soft-border text-orange focus:ring-orange"
        />
        <span className="text-sm font-semibold text-ink">
          Office fully closed <span className="font-normal text-muted">(overall, in addition to the dates above)</span>
        </span>
      </label>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Auto Attendant Greeting</legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="radio"
              name="greeting-choice"
              checked={value.greetingChoice === "standard"}
              onChange={() => onChange({ ...value, greetingChoice: "standard" })}
              className="h-4 w-4 border-soft-border text-orange focus:ring-orange"
            />
            Use standard holiday greeting
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="radio"
              name="greeting-choice"
              checked={value.greetingChoice === "custom"}
              onChange={() => onChange({ ...value, greetingChoice: "custom" })}
              className="h-4 w-4 border-soft-border text-orange focus:ring-orange"
            />
            Write custom greeting
          </label>
        </div>
        {value.greetingChoice === "custom" ? (
          <textarea
            value={value.customGreeting}
            onChange={(e) => onChange({ ...value, customGreeting: e.target.value })}
            rows={3}
            placeholder="e.g. Thank you for calling Lion Switch. Our office is closed for the holiday..."
            className="mt-3 w-full rounded-xl border border-soft-border px-4 py-2.5 text-sm focus:border-orange focus:outline-none"
          />
        ) : null}
      </fieldset>
    </div>
  );
}
