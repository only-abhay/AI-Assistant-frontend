import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-[calc(100vh-9rem)] bg-[#f5f7fb] px-4 py-10 text-slate-950 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <div className="flex items-center gap-4">
          <UserCircle className="text-indigo-600" size={58} strokeWidth={1.5} />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">My account</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Profile</h1>
          </div>
        </div>
        <p className="mt-8 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Your profile details will appear here after you sign in.
        </p>
        <Link
          href="/auth"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Login to continue
        </Link>
      </section>
    </main>
  );
}
