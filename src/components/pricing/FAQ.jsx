"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What does the Free plan include?",
    answer: "The Free plan allows you to generate up to 10 AI blogs and use Resume Q&A with basic AI functionality. Your blog and resume history are included too.",
  },
  {
    question: "How many blogs can I generate for free?",
    answer: "You can generate up to 10 AI blogs on the Free plan.",
  },
  {
    question: "Is Resume Q&A available in the Free plan?",
    answer: "Yes. Resume Q&A generation is available on the Free plan with limited usage.",
  },
  {
    question: "What does Unlimited mean in the Pro plan?",
    answer: "Unlimited means you can generate blogs and Resume Q&A sessions without a monthly usage cap, subject to fair-use safeguards.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes. You can upgrade to the Pro plan whenever you need unlimited access.",
  },
  {
    question: "Can I cancel my Pro plan?",
    answer: "Yes. When billing is available, you will be able to cancel your Pro plan from your account settings.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(faqs[0].question);

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl">
      <div className="mb-7 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Questions, answered</p>
        <h2 id="faq-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Frequently asked questions</h2>
      </div>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm sm:px-7">
        {faqs.map(({ question, answer }) => {
          const isOpen = openQuestion === question;
          return (
            <div key={question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenQuestion(isOpen ? "" : question)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold text-slate-800"
              >
                {question}
                <ChevronDown size={18} className={`shrink-0 text-indigo-500 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isOpen && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-slate-500">{answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
