"use client";

export type YourInformationValue = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  notes: string;
};

const NOTES_LIMIT = 500;

export function YourInformation({
  value,
  onChange,
}: {
  value: YourInformationValue;
  onChange: (value: YourInformationValue) => void;
}) {
  const inputClasses =
    "w-full rounded-xl border border-soft-border px-4 py-2.5 text-sm focus:border-orange focus:outline-none";
  const labelClasses = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="hp-first-name" className={labelClasses}>
            First Name*
          </label>
          <input
            id="hp-first-name"
            required
            value={value.firstName}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="hp-last-name" className={labelClasses}>
            Last Name*
          </label>
          <input
            id="hp-last-name"
            required
            value={value.lastName}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="hp-company" className={labelClasses}>
          Company Name*
        </label>
        <input
          id="hp-company"
          required
          value={value.companyName}
          onChange={(e) => onChange({ ...value, companyName: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="hp-email" className={labelClasses}>
          Email*
        </label>
        <input
          id="hp-email"
          type="email"
          required
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="hp-notes" className={labelClasses}>
            Additional Notes
          </label>
          <span className="text-xs text-muted">
            {value.notes.length}/{NOTES_LIMIT}
          </span>
        </div>
        <textarea
          id="hp-notes"
          rows={3}
          maxLength={NOTES_LIMIT}
          value={value.notes}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
