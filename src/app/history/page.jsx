"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBlogs, getMyQuestions } from "../../../utils/api";
import HistorySidebar from "../../components/HistorySidebar";
import BlogHistoryContent from "../../components/history/BlogHistoryContent";
import HistoryEmptyState from "../../components/history/HistoryEmptyState";
import HistoryHeader from "../../components/history/HistoryHeader";
import LoadingState from "../../components/history/LoadingState";
import ResumeHistoryContent from "../../components/history/ResumeHistoryContent";

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
      <HistoryHeader />
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white">
          <LoadingState label="Loading your history..." />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
      ) : isEmpty ? (
        <HistoryEmptyState />
      ) : (
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <HistorySidebar blogs={blogs} questions={questions} selected={selected} onSelect={setSelected} />
          <section className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {!selected ? (
              <LoadingState label="Loading selected content..." />
            ) : selected.type === "blog" ? (
              <BlogHistoryContent blog={selected.item} />
            ) : (
              <ResumeHistoryContent record={selected.item} />
            )}
          </section>
        </div>
      )}
    </main>
  );
}
