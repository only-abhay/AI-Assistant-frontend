import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Build better with AI Workspace.</p>
        <nav className="flex gap-5" aria-label="Footer navigation">
          <Link href="/blog" className="transition hover:text-indigo-600">Blog generator</Link>
          <Link href="/resume" className="transition hover:text-indigo-600">Resume match</Link>
          <Link href="/profile" className="transition hover:text-indigo-600">Profile</Link>
          <Link href="/pricing" className="transition hover:text-indigo-600">Pricing</Link>
        </nav>
      </div>
    </footer>
  );
}
