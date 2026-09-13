import { Crown, Sparkles } from "lucide-react";
import FeatureList from "./FeatureList";

export default function PricingCard({ plan, onSelect }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 sm:p-8 ${
        plan.popular
          ? "border-indigo-500 bg-slate-950 text-white shadow-2xl shadow-indigo-200/70 md:scale-[1.03]"
          : "border-slate-200 bg-white text-slate-950 shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-indigo-300/30 sm:left-8">
          <Sparkles size={13} fill="currentColor" aria-hidden="true" />
          Most popular
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${plan.popular ? "text-indigo-300" : "text-indigo-600"}`}>
            {plan.name}
          </p>
          <p className={`mt-2 text-sm ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.eyebrow}</p>
        </div>
        {plan.popular && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
            <Crown size={21} aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="mt-6 flex items-end gap-1 sm:mt-7">
        <span className="text-3xl font-black tracking-tight sm:text-5xl">{plan.price}</span>
        <span className={`mb-1 text-sm ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.period}</span>
      </div>
      {plan.popular && <p className="mt-2 text-xs font-medium text-indigo-200">Billed monthly</p>}
      <p className={`mt-4 min-h-12 text-sm leading-6 ${plan.popular ? "text-slate-300" : "text-slate-500"}`}>{plan.description}</p>
      <div className={`my-7 h-px ${plan.popular ? "bg-white/10" : "bg-slate-100"}`} />
      <FeatureList features={plan.features} />
      {plan.limitations && (
        <div className={`mt-6 rounded-2xl p-4 ${plan.popular ? "bg-white/5" : "bg-slate-50"}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Plan limits</p>
          <ul className={`space-y-1 text-xs ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
            {plan.limitations.map((limitation) => <li key={limitation}>• {limitation}</li>)}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => onSelect(plan)}
        className={`mt-auto flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold transition active:scale-[0.98] ${
          plan.popular
            ? "bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-indigo-50"
            : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
        }`}
      >
        {plan.action}
      </button>
    </article>
  );
}
