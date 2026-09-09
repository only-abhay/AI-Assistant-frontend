import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-950 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Workspace</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">What would you like to create?</h1>
          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Choose a tool to get started.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link href="/blog" className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-2xl text-amber-700">&#9998;</span>
            <h2 className="mt-7 text-2xl font-bold">Blog generator</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:min-h-14">Turn a title, keywords, and description into a polished blog post.</p>
            <span className="mt-7 inline-block text-sm font-bold text-indigo-600 transition group-hover:translate-x-1">Open blog generator &#8594;</span>
          </Link>

          <Link href="/resume" className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-2xl text-indigo-700">&#10022;</span>
            <h2 className="mt-7 text-2xl font-bold">Resume match</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:min-h-14">Upload your resume and compare it with a job description.</p>
            <span className="mt-7 inline-block text-sm font-bold text-indigo-600 transition group-hover:translate-x-1">Open resume match &#8594;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
