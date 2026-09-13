import { LoaderCircle } from "lucide-react";

export default function LoadingState({ label }) {
  return (
    <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
      <LoaderCircle className="animate-spin" size={18} />
      {label}
    </div>
  );
}
