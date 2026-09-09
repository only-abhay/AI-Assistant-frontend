import { Check, Sparkles, WandSparkles } from "lucide-react";

const features = [
  "Generate publish-ready content in seconds",
  "Turn your experience into a stronger resume",
  "Keep every idea in one intelligent workspace",
];

export default function AuthBrandPanel() {
  return (
    <section className="relative flex min-h-[430px] flex-1 flex-col justify-between overflow-hidden bg-[#10142b] px-6 py-7 text-white sm:px-10 lg:min-h-screen lg:max-w-[53%] lg:px-16 lg:py-10">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <div className="relative z-10 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 shadow-lg shadow-indigo-950/40">
          <WandSparkles size={20} />
        </span>
        <span className="text-lg font-bold tracking-tight">
          Lumina<span className="text-indigo-300">AI</span>
        </span>
      </div>

      <div className="relative z-10 max-w-xl py-12 lg:py-0">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur">
          <Sparkles size={14} className="text-fuchsia-300" />
          Your creative co-pilot
        </div>
        <h1 className="max-w-lg text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl">
          Make room for bigger ideas.
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-indigo-100/70">
          Lumina turns a blank page into momentum, helping you write, build, and show up as your best self.
        </p>
        <ul className="mt-8 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-indigo-50/85">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-400/20 text-indigo-200">
                <Check size={13} strokeWidth={3} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 hidden text-xs text-indigo-100/40 lg:block">
        © 2025 Lumina AI · Built for curious minds
      </p>
    </section>
  );
}
