import { ShieldCheck, MapPin, Phone } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import BackButton from "../components/BackButton";

export default function AdminProfilePage() {

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton fallback="/admin-dashboard" />
      <SectionTitle title="Admin Profile" subtitle="Your highly secure administrative details." />
      
      <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-2xl mt-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative grid gap-8 md:grid-cols-[140px_1fr] md:items-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl border-4 border-slate-600">
            <ShieldCheck className="h-14 w-14 text-teal-400" />
          </div>
          <div>
            <div className="inline-block rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 tracking-wider mb-3">SUPER ADMIN</div>
            <h2 className="text-3xl font-bold">P.P.L.N.POOJITA</h2>
            <p className="mt-2 text-slate-300 max-w-lg">Managing regional tourism platform content, user engagement, dynamic datasets, and platform statistics securely.</p>
            
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div className="mt-1 text-lg font-medium tracking-wide">9440071303</div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-400">Village</div>
                  <div className="mt-1 text-lg font-medium tracking-wide capitalize">Vadapalli</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
