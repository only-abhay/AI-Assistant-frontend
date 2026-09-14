const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });
import ExportButton from "../auth/general/PdfDownload";

export default function BlogHistoryContent({ blog }) {
  return (
    <article  id="blog-content">
      <div className="mb-6 border-b border-slate-200 pb-6">
        <p className="mb-2 text-sm font-semibold text-indigo-600">Blog</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">{blog.title}</h1>
        <p className="mt-3 text-slate-600">{blog.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{dateFormatter.format(new Date(blog.createdAt))}</span>
          {blog.keywords && <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">{blog.keywords}</span>}
        </div>
      </div>
      <div className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-a:text-indigo-600" dangerouslySetInnerHTML={{ __html: blog.content }} />
   <div className="mt-5 text-right">
              <ExportButton
  targetId="blog-content"
  fileName={blog?.title || "AI-Generated-Blog"}
/>
   </div>
    </article>
  );
}
