import { Suspense } from "react";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f6f7fb]" />}>
      <VerifyOtpForm />
    </Suspense>
  );
}
