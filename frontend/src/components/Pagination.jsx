import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <button className="rounded-xl border px-4 py-2 disabled:opacity-50" disabled={page === 1} onClick={() => setPage(page - 1)}>
        <span className="inline-flex items-center"><ChevronLeft className="mr-1 h-4 w-4" /> Prev</span>
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => setPage(n)}
          className={`rounded-xl border px-4 py-2 ${page === n ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
        >
          {n}
        </button>
      ))}
      <button className="rounded-xl border px-4 py-2 disabled:opacity-50" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        <span className="inline-flex items-center">Next <ChevronRight className="ml-1 h-4 w-4" /></span>
      </button>
    </div>
  );
}