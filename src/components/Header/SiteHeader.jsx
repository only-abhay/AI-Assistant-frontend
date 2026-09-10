import Link from "next/link";
import { UserCircle } from "lucide-react";
import serverApi from "../../../utils/serverApi";

import LoginButton from "./LoginButton";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog generator" },
  { href: "/resume", label: "Resume match" },
  { href: "/history", label: "History" },
];

export default async function SiteHeader(User) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-slate-950">
          AI<span className="text-indigo-600">Workspace</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            aria-label="Open profile"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <UserCircle size={23} strokeWidth={1.8} />
          </Link>
         <LoginButton {...User}/>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-slate-100 px-4 py-3 md:hidden" aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
