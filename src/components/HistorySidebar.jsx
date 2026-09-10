"use client";

import { FileText, History, Newspaper } from "lucide-react";

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value))
    : "Unknown date";

function HistorySection({ title, icon: Icon, items, emptyText, type, selected, onSelect }) {
  return (
    <section className="mb-6">
      <div className="mb-2 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Icon size={15} />
        {title}
      </div>
      {items.length === 0 ? (
        <p className="px-2 text-sm text-slate-400">{emptyText}</p>
      ) : (
        <div className="space-y-1">
          {items.map((item) => {
            const key = `${type}-${item._id}`;
            const isSelected = selected?.key === key;
            const label = type === "blog"
              ? item.title
              : item.resume?.fileName || "Resume interview";

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect({ key, type, item })}
                className={`w-full rounded-xl px-3 py-3 text-left transition ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="block truncate text-sm font-semibold">{label}</span>
                <span className="mt-1 block text-xs text-slate-400">
                  {formatDate(item.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function HistorySidebar({
  blogs = [],
  questions = [],
  selected,
  onSelect,
  showBlogs = true,
  showQuestions = true,
}) {
  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:sticky md:top-4 md:h-[calc(100vh-7rem)] md:w-80 md:overflow-y-auto md:rounded-2xl md:border md:shadow-sm">
      <div className="mb-6 flex items-center gap-2 px-2">
        <History className="text-indigo-600" size={20} />
        <h2 className="font-bold text-slate-950">History</h2>
      </div>
      {showBlogs && <HistorySection
          title="Blogs"
          icon={Newspaper}
          items={blogs}
          type="blog"
          emptyText="No blogs generated yet."
          selected={selected}
          onSelect={onSelect}
        />}
      {showQuestions && <HistorySection
          title="Resume Q&A"
          icon={FileText}
          items={questions}
          type="resume"
          emptyText="No resume interviews generated yet."
          selected={selected}
          onSelect={onSelect}
        />}
    </aside>
  );
}
