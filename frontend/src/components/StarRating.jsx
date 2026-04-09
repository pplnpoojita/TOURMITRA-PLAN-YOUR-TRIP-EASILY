import { Star } from "lucide-react";

export default function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < Math.round(value) ? "fill-current" : ""}`} />
      ))}
      <span className="ml-2 text-sm font-medium text-slate-700">{value.toFixed(1)}</span>
    </div>
  );
}
