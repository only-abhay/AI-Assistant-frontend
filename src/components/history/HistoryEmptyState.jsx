import { FileText, Newspaper } from "lucide-react";

export default function HistoryEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Newspaper size={22} />
        <FileText className="-ml-1" size={18} />
      </div>
      <h2 className="mt-4 text-xl font-bold text-slate-950">Your history is empty</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Generate a blog or create a resume interview to see it here.
      </p>
    </div>
  );
}
