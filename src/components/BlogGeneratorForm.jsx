"use client";

import { useState } from "react";
import { generateBlog } from "../../utils/api";

const initialForm = {
  title: "",
  keywords: "",
  description: "",
};

export default function BlogGeneratorForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const payload = {
      title: form.title.trim(),
      keywords: form.keywords.trim(),
      description: form.description.trim(),
    };

    if (!payload.title || !payload.keywords || !payload.description) {
      setError("Please complete all fields before generating your blog.");
      return;
    }

    setLoading(true);

    try {
      const response = await generateBlog(payload);

      console.log("API Response:", response);

      // Backend response:
      // {
      //   success: true,
      //   blog: {
      //      title,
      //      keywords,
      //      description,
      //      content
      //   }
      // }

      const blogContent = response?.data?.blog

      if (!blogContent) {
        setError("Blog content was not received from the server.");
        return;
      }

      setGeneratedBlog(blogContent);

      setSuccess("Your blog has been generated successfully.");

      // Hide form
      setDisplay(true);

      // Clear form
      setForm(initialForm);
    } catch (requestError) {
      console.error("Generate Blog Error:", requestError);

      setError(
        requestError.response?.data?.message ||
          "Unable to generate your blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAnother = () => {
    setDisplay(false);
    setGeneratedBlog("");
    setSuccess("");
    setError("");
    setForm(initialForm);
  };

  return (
    <main className="min-h-screen px-4 py-10">
      <section className="mx-auto w-full max-w-4xl">

        {/* ================= FORM ================= */}

        {!display && (
          <>
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Create something worth reading
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Blog Generator
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                Enter your topic and let AI create a professional blog for you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="space-y-5">

                {/* Title */}

                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Blog Title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter your blog title"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                {/* Keywords */}

                <div>
                  <label
                    htmlFor="keywords"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Keywords
                  </label>

                  <input
                    id="keywords"
                    name="keywords"
                    type="text"
                    value={form.keywords}
                    onChange={handleChange}
                    placeholder="Enter keywords separated by commas"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                {/* Description */}

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter a short description for your blog"
                    required
                    rows={5}
                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Error */}

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Success */}

              {success && (
                <p
                  role="status"
                  className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {success}
                </p>
              )}

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate Blog"}
              </button>
            </form>
          </>
        )}

        {/* ================= GENERATED BLOG ================= */}

        {display && generatedBlog && (
          <section className="mx-auto max-w-4xl">

            {/* Header */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  AI Generated
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-950">
                  Your Generated Blog
                </h1>
              </div>

              <button
                type="button"
                onClick={handleGenerateAnother}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Generate Another
              </button>
            </div>

            {/* Blog */}

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

              <div
                className="prose prose-slate max-w-none
                  prose-headings:font-bold
                  prose-h1:text-3xl
                  prose-h2:mt-8 prose-h2:text-2xl
                  prose-h3:mt-6 prose-h3:text-xl
                  prose-p:leading-7
                  prose-li:leading-7
                  prose-strong:text-slate-900"
                dangerouslySetInnerHTML={{
                  __html: generatedBlog,
                }}
              />

            </article>
          </section>
        )}
      </section>
    </main>
  );
}