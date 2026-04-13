import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, Check } from "lucide-react";
import StarRating from "./StarRating";

export default function DestinationCard({ item }) {
  const [visited, setVisited] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVisit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to mark as visited.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://16.16.184.208:5001/api/users/visit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ destinationId: item.id })
      });
      if (res.ok) setVisited(true);
      else alert("Failed to mark as visited");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-44 overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow-sm">
            {item.category}
          </div>
        </div>
        <div className="p-4 md:p-5">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{item.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs text-slate-600 leading-relaxed">{item.shortDescription}</p>
          <div className="mt-3">
            <StarRating value={item.rating} />
          </div>
          <div className="mt-3 flex items-start gap-1.5 text-xs font-medium text-slate-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <a href={item.mapsUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
              Maps <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
            <button onClick={handleVisit} disabled={visited || loading} className={`flex flex-1 items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold text-white transition ${visited ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-slate-800'}`}>
              {visited ? <><Check className="mr-1.5 h-3.5 w-3.5" /> Visited</> : "Mark Visited"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
