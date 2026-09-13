const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function ResumeHistoryContent({ record }) {
  return (
    <article>
      <div className="mb-6 border-b border-slate-200 pb-6">
        <p className="mb-2 text-sm font-semibold text-indigo-600">Resume Q&A</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">{record.resume?.fileName || "Resume interview"}</h1>
        <p className="mt-3 whitespace-pre-wrap text-slate-600">{record.jobDescription}</p>
        <p className="mt-4 text-xs font-semibold text-slate-500">{dateFormatter.format(new Date(record.createdAt))}</p>
      </div>
      <div className="space-y-4">
        {(record.questions || []).map((question, index) => (
          <section key={question._id || question.id || index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-indigo-600">Question {question.id || index + 1}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{question.priority}</span>
            </div>
            <h2 className="font-bold text-slate-950">{question.question}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{question.answer}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
