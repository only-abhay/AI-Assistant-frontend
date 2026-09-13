"use client";

import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import AuthField from "./AuthField";

export default function AuthForm({
  mode,
  form,
  loading,
  showPassword,
  onChange,
  onSubmit,
  onSwitchMode,
  onTogglePassword,
}) {
  const isSignup = mode === "signup";

  return (
    <section className="flex min-h-screen flex-1 items-center justify-center px-4 py-8 sm:px-10 sm:py-10 lg:px-16">
      <div className="w-full max-w-md">
        <div className="mb-7 flex rounded-xl bg-slate-200/70 p-1 sm:mb-8">
          {[
            ["signin", "Sign in"],
            ["signup", "Create account"],
            
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onSwitchMode(value)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${mode === value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold text-indigo-600">Welcome to Lumina</p>
          <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl">
            {isSignup ? "Build your next breakthrough." : "Good to see you again."}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {isSignup ? "Start creating with a workspace that thinks alongside you." : "Sign in to pick up right where you left off."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {isSignup && <AuthField label="Full name" name="name" value={form.name} onChange={onChange} placeholder="Alex Morgan" autoComplete="name" required />}
          <AuthField label="Email address" type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" required />
          <div className="relative">
            <AuthField label="Password" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={onChange} placeholder="••••••••" autoComplete={isSignup ? "new-password" : "current-password"} required />
            <button type="button" onClick={onTogglePassword} className="absolute right-4 top-[34px] text-slate-400 transition hover:text-indigo-600" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {isSignup && <AuthField label="Mobile number" type="tel" name="number" value={form.number} onChange={onChange} placeholder="9876543210" autoComplete="tel" required />}
          {!isSignup && <div className="text-right"><button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Forgot password?</button></div>}
          {isSignup && (
            <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-slate-500">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 accent-indigo-600" />
              <span>I agree to the <button type="button" className="font-semibold text-indigo-600">Terms of Service</button> and Privacy Policy.</span>
            </label>
          )}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : <>{isSignup ? "Create my workspace" : "Sign in to Lumina"}<ArrowRight size={17} /></>}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> or continue with <span className="h-px flex-1 bg-slate-200" />
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          <FcGoogle size={19} /> Continue with Google
        </button>
        <p className="mt-8 text-center text-xs text-slate-400">Your data is encrypted and never used to train public models.</p>
      </div>
    </section>
  );
}
