"use client";

export type EmergencyHandlingValue = {
  enabled: boolean;
  contactName: string;
  phoneNumbers: string;
  routingOrder: string;
  notes: string;
};

export function EmergencyHandling({
  value,
  onChange,
}: {
  value: EmergencyHandlingValue;
  onChange: (value: EmergencyHandlingValue) => void;
}) {
  const inputClasses =
    "w-full rounded-xl border border-soft-border px-4 py-2.5 text-sm focus:border-orange focus:outline-none";

  return (
    <div>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={value.enabled}
          onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
          className="mt-0.5 h-4 w-4 rounded border-soft-border text-orange focus:ring-orange"
        />
        <span className="text-sm font-semibold text-ink">
          I want to set up emergency call routing
          <span className="mt-1 block font-normal text-muted">
            Optional — skip this if emergency routing is already configured for your account.
          </span>
        </span>
      </label>

      {value.enabled ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="emergency-contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
              Emergency Contact Name
            </label>
            <input
              id="emergency-contact-name"
              value={value.contactName}
              onChange={(e) => onChange({ ...value, contactName: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="emergency-phones" className="mb-1.5 block text-sm font-semibold text-ink">
              Phone Number(s)
            </label>
            <input
              id="emergency-phones"
              value={value.phoneNumbers}
              onChange={(e) => onChange({ ...value, phoneNumbers: e.target.value })}
              placeholder="Separate multiple numbers with commas"
              className={inputClasses}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="emergency-routing-order" className="mb-1.5 block text-sm font-semibold text-ink">
              Routing Order
            </label>
            <input
              id="emergency-routing-order"
              value={value.routingOrder}
              onChange={(e) => onChange({ ...value, routingOrder: e.target.value })}
              placeholder="e.g. 1. John Doe, 2. Jane Smith"
              className={inputClasses}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="emergency-notes" className="mb-1.5 block text-sm font-semibold text-ink">
              Notes
            </label>
            <textarea
              id="emergency-notes"
              value={value.notes}
              onChange={(e) => onChange({ ...value, notes: e.target.value })}
              rows={2}
              className={inputClasses}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
