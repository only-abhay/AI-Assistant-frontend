import { Check } from "lucide-react";

export default function FeatureList({ features }) {
  return (
    <ul className="space-y-3.5">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-sm leading-5 text-slate-600">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Check size={13} strokeWidth={2.75} aria-hidden="true" />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
