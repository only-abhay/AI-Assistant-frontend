import { Clock3, FolderHeart, Gauge, WandSparkles } from "lucide-react";

const benefits = [
  {
    icon: WandSparkles,
    title: "Unlimited Creation",
    description: "Generate as many blogs and resume Q&A sessions as you need.",
  },
  {
    icon: FolderHeart,
    title: "Save Everything",
    description: "Keep your generated blogs and resume sessions organized in your history.",
  },
  {
    icon: Clock3,
    title: "Faster Workflow",
    description: "Create professional content without worrying about usage limits.",
  },
  {
    icon: Gauge,
    title: "Built for Productivity",
    description: "One AI workspace for content creation and career preparation.",
  },
];

export default function WhyUpgrade() {
  return (
    <section aria-labelledby="why-upgrade">
      <div className="mb-7 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">More room to create</p>
        <h2 id="why-upgrade" className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Why upgrade?</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Icon size={19} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-sm font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
