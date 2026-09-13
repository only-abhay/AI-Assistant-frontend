import PricingCard from "./PricingCard";

export default function PricingHero({ plans, onSelect }) {
  return (
    <section className="relative px-4 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">Simple, transparent pricing</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Choose your plan</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-lg sm:leading-7">Create more. Achieve more. Choose the plan that works best for you.</p>
        </div>
        <div className="mt-8 grid items-stretch gap-5 sm:mt-12 sm:gap-8 md:grid-cols-2">
          {plans.map((plan) => <PricingCard key={plan.name} plan={plan} onSelect={onSelect} />)}
        </div>
      </div>
    </section>
  );
}
