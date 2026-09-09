
"use client";

import { useEffect, useState } from "react";
import { QandAQuestion } from "../../utils/api"

export default function ResumeQandA() {
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resume) {
      setResumePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(resume);
    setResumePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [resume]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    const resumeFile = e.target.resume.files[0];
    const jobDescription = e.target.jobDescription.value;

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const response = await QandAQuestion(formData);
console.log("FULL RESPONSE:", response);
console.log("QUESTIONS:", response?.data?.questions);

      setQuestions(response?.data?.data?.questions || []);
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setQuestions([]);
    setResume(null);
    setResumePreview("");
    setError("");
  };

  if (questions.length > 0) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
        <section className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Interview Preparation
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Your Interview Questions
              </h1>

              <p className="mt-2 text-slate-500">
                Here are {questions.length} questions based on your resume and
                job description.
              </p>
            </div>

            <button
              onClick={resetHandler}
              className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Start Again
            </button>
          </div>

          <div className="space-y-5">
            {questions.map((item, index) => (
              <div
                key={item.id || index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-black text-indigo-600">
                      {item.id || index + 1}
                    </span>

                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Question {item.id || index + 1}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : item.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-bold leading-7 text-slate-900">
                  {item.question}
                </h2>

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Expected Answer
                  </p>

                  <p className="text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-200">
            &#10022;
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Interview Preparation
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Prepare for your interview.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Upload your resume and paste a job description to generate
            personalized interview questions.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid gap-6 lg:grid-cols-[1fr_1.08fr]"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Step 01
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Upload your resume
                </h2>
              </div>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                PDF only
              </span>
            </div>

            <input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setResume(e.target.files[0] || null)}
              className="sr-only"
            />

            {resume ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-xs font-black text-red-600">
                    PDF
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">
                      {resume.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB · Resume
                      selected
                    </p>
                  </div>
                </div>

                {resumePreview && (
                  <iframe
                    src={resumePreview}
                    title="Resume preview"
                    className="mt-4 h-72 w-full rounded-lg border border-slate-200 bg-white"
                  />
                )}

                <label
                  htmlFor="resume"
                  className="mt-4 inline-block cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Choose another PDF
                </label>
              </div>
            ) : (
              <label
                htmlFor="resume"
                className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
                  &#8593;
                </span>

                <span className="font-bold text-slate-800">
                  Drop your resume here
                </span>

                <span className="mt-2 text-sm text-slate-500">
                  or click to browse from your device
                </span>

                <span className="mt-5 text-xs font-medium text-slate-400">
                  Maximum file size: 10 MB
                </span>
              </label>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Step 02
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Add the job description
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste the job description to generate relevant interview
                questions.
              </p>
            </div>

            <label
              htmlFor="job-description"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Job description
            </label>

            <textarea
              id="job-description"
              name="jobDescription"
              placeholder="Paste the responsibilities, requirements, and qualifications here..."
              rows={12}
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            {error && (
              <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Generating Questions..."
              ) : (
                <>
                  Generate Interview Questions{" "}
                  <span aria-hidden="true">&#8594;</span>
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Your resume is only used to generate personalized questions.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
