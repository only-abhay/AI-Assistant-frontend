"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import AuthForm from "../../components/auth/AuthForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", number: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setShowPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (mode === "signup") {
      if (form.name.trim().length < 3) {
        toast.error("Please enter your full name.");
        return;
      }
      if (!/^[6-9]\d{9}$/.test(form.number)) {
        toast.error("Enter a valid 10 digit mobile number.");
        return;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/.test(form.password)) {
        toast.error("Use 8+ characters with uppercase, lowercase, number and symbol.");
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/user/register" : "/api/user/login";
      const payload = mode === "signup" ? form : { email: form.email, password: form.password };
      await axios.post(`${API_URL}${endpoint}`, payload, { withCredentials: true });

      if (mode === "signup") {
        toast.success("Your verification code is on its way.");
        router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
      } else {
        toast.success("Welcome back to your workspace.");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "number") {
      setForm((current) => ({ ...current, number: event.target.value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }
    updateField(event);
  };

  return (
    <main className="auth-shell min-h-screen overflow-hidden bg-[#f6f7fb] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        <AuthBrandPanel />
        <AuthForm
          mode={mode}
          form={form}
          loading={loading}
          showPassword={showPassword}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onSwitchMode={switchMode}
          onTogglePassword={() => setShowPassword((visible) => !visible)}
        />
      </div>
    </main>
  );
}
