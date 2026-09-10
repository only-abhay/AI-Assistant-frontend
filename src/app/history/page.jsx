"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, LoaderCircle, Newspaper } from "lucide-react";
import { getMyBlogs, getMyQuestions } from "../../../utils/api";
import HistorySidebar from "../../components/HistorySidebar";

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

function LoadingState({ label }) {
  return (
    <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
      <LoaderCircle className="animate-spin" size={18} />
      {label}
    </div>
  );
}

function BlogContent({ blog }) {
  return (
    <article>
      <div className="mb-6 border-b border-slate-200 pb-6">
        <p className="mb-2 text-sm font-semibold text-indigo-600">Blog</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">{blog.title}</h1>
        <p className="mt-3 text-slate-600">{blog.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {dateFormatter.format(new Date(blog.createdAt))}
          </span>
          {blog.keywords && (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              {blog.keywords}
            </span>
          )}
        </div>
      </div>
      <div
        className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-a:text-indigo-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}

function ResumeContent({ record }) {
  return (
    <article>
      <div className="mb-6 border-b border-slate-200 pb-6">
        <p className="mb-2 text-sm font-semibold text-indigo-600">Resume Q&A</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          {record.resume?.fileName || "Resume interview"}
        </h1>
        <p className="mt-3 whitespace-pre-wrap text-slate-600">{record.jobDescription}</p>
        <p className="mt-4 text-xs font-semibold text-slate-500">
          {dateFormatter.format(new Date(record.createdAt))}
        </p>
      </div>
      <div className="space-y-4">
        {(record.questions || []).map((question, index) => (
          <section key={question._id || question.id || index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-indigo-600">
                Question {question.id || index + 1}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {question.priority}
              </span>
            </div>
            <h2 className="font-bold text-slate-950">{question.question}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {question.answer}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadHistory = async () => {
      try {
        const [blogsResponse, questionsResponse] = await Promise.all([
          getMyBlogs(),
          getMyQuestions(),
        ]);
        if (!active) return;

        const nextBlogs = blogsResponse.data.data || [];
        const nextQuestions = questionsResponse.data.data || [];
        setBlogs(nextBlogs);
        setQuestions(nextQuestions);

        const newestBlog = nextBlogs[0];
        const newestQuestion = nextQuestions[0];
        if (newestBlog && newestQuestion) {
          setSelected(
            new Date(newestBlog.createdAt) >= new Date(newestQuestion.createdAt)
              ? { key: `blog-${newestBlog._id}`, type: "blog", item: newestBlog }
              : { key: `resume-${newestQuestion._id}`, type: "resume", item: newestQuestion },
          );
        } else if (newestBlog) {
          setSelected({ key: `blog-${newestBlog._id}`, type: "blog", item: newestBlog });
        } else if (newestQuestion) {
          setSelected({ key: `resume-${newestQuestion._id}`, type: "resume", item: newestQuestion });
        }
      } catch (requestError) {
        if (!active) return;
        if ([401, 403].includes(requestError.response?.status)) {
          router.replace("/auth?redirect=/history");
          return;
        }
        setError("We couldn't load your history. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadHistory();
    return () => {
      active = false;
    };
  }, [router]);

  const isEmpty = useMemo(() => !blogs.length && !questions.length, [blogs, questions]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-indigo-600">Your workspace</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">History</h1>
      </div>
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white"><LoadingState label="Loading your history..." /></div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
      ) : isEmpty ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <HistoryEmptyIcon />
          <h2 className="mt-4 text-xl font-bold text-slate-950">Your history is empty</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Generate a blog or create a resume interview to see it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <HistorySidebar blogs={blogs} questions={questions} selected={selected} onSelect={setSelected} />
          <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {!selected ? <LoadingState label="Loading selected content..." /> : selected.type === "blog" ? <BlogContent blog={selected.item} /> : <ResumeContent record={selected.item} />}
          </section>
        </div>
      )}
    </main>
  );
}

function HistoryEmptyIcon() {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
      <Newspaper size={22} />
      <FileText className="-ml-1" size={18} />
    </div>
  );
}
