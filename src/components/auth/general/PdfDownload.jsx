"use client";

import html2pdf from "html2pdf.js";

export default function ExportButton({
  targetId,
  fileName = "document",
  label = "Download PDF",
}) {
  const handleDownload = () => {
    const element = document.getElementById(targetId);

    if (!element) {
      console.error(`Element with id "${targetId}" not found`);
      return;
    }

    const options = {
      margin: 10,
      filename: `${fileName}.pdf`,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save();
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
    >
      {label}
    </button>
  );
}