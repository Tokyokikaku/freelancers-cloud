import type { ReactNode } from "react";

export function Field({ label, name, error, hint, required, children }: { label: string; name: string; error?: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-xs text-red-600">必須</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs leading-5 text-muted">{hint}</p>}
      {error && <p role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Check({ name, label, defaultChecked, hint, error }: { name: string; label: string; defaultChecked?: boolean; hint?: string; error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-1 size-4 accent-brand-600" />
        <span>{label}{hint && <span className="block text-xs text-muted">{hint}</span>}</span>
      </label>
      {error && <p role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="card space-y-4 p-5 sm:p-6">
      <legend className="px-1 text-base font-bold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

export function FormMessage({ message, ok }: { message?: string; ok?: boolean }) {
  if (!message) return null;
  return <p role="alert" className={`rounded-lg p-3 text-sm ${ok ? "bg-good-50 text-good-700" : "bg-red-50 text-red-700"}`}>{message}</p>;
}
