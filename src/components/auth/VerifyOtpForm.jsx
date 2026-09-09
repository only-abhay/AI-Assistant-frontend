"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, LoaderCircle, ShieldCheck, WandSparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyOtp } from "../../../utils/api";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, itemIndex) => itemIndex === index ? digit : item));
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the 6 digit verification code.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, code);
      toast.success("Your account has been verified.");
      router.push("/auth");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to verify the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-4 py-8 text-slate-950 sm:px-6">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100/40 sm:p-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <WandSparkles size={22} />
        </div>
        <p className="mb-2 text-sm font-semibold text-indigo-600">Almost there</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Verify your account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter the 6 digit code we sent to <strong className="break-all text-slate-700">{email || "your email address"}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { inputs.current[index] = element; }}
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={(event) => {
                  event.preventDefault();
                  const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
                  setOtp((current) => current.map((item, itemIndex) => pasted[itemIndex] || item));
                  inputs.current[Math.min(pasted.length, 6) - 1]?.focus();
                }}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Verification digit ${index + 1}`}
                className="h-12 w-10 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:h-14 sm:w-14"
              />
            ))}
          </div>
          <button type="submit" disabled={loading} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : <>Verify account <ArrowRight size={17} /></>}
          </button>
        </form>
        <div className="mt-6 flex items-center gap-2 text-xs leading-5 text-slate-400">
          <ShieldCheck size={16} className="shrink-0 text-emerald-500" />
          This code expires in 3 minutes.
        </div>
      </section>
    </main>
  );
}
