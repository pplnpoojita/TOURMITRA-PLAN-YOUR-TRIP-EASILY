import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import Pagination from "../components/Pagination";
import { destinations, districtMeta } from "../data/destinations";
import BackButton from "../components/BackButton";

export default function DistrictPage() {
  const { districtId } = useParams();
  const district = districtId || "east-godavari";
  const meta = districtMeta[district] || districtMeta["east-godavari"];
  const allDistrictDestinations = useMemo(() => destinations.filter((d) => d.district === district), [district]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = allDistrictDestinations.filter((d) => {
    const text = `${d.name} ${d.location} ${d.category} ${d.shortDescription}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setPage(1);
  }, [district, query]);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden">
        <div className="h-[360px] w-full">
          <img src={meta.hero} alt={meta.title} className="h-full w-full object-cover" />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${meta.accent} opacity-75`} />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white">District Explorer</div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{meta.title}</h1>
            <p className="mt-3 max-w-2xl text-white/90">{meta.description}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6 lg:px-8">
        <BackButton fallback="/" />
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Destinations</h2>
            <p className="text-slate-600">Showing {filtered.length} destinations in {meta.title}</p>
          </div>
          <div className="relative w-full md:max-w-md">
            <select 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              className="h-12 w-full appearance-none rounded-2xl border border-slate-300 bg-white pl-4 pr-10 outline-none focus:border-slate-500 text-slate-700"
            >
              <option value="">All {meta.title} Destinations</option>
              {allDistrictDestinations.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
