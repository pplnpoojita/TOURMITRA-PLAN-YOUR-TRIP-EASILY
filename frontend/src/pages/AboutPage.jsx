import SectionTitle from "../components/SectionTitle";
import BackButton from "../components/BackButton";

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
        <BackButton />
        <SectionTitle title="About Tour Mitra" subtitle="A digital tourism solution built to promote regional discovery through accessible information." />
        <div className="grid gap-6">
          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <p className="mt-4 text-slate-700 leading-relaxed">
              Tour Mitra is a comprehensive tourism platform designed to highlight the beauty and cultural richness of East Godavari, West Godavari, and Konaseema districts in Andhra Pradesh.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our goal is to make tourism discovery simpler and smarter. The platform currently presents over 90 handpicked destinations in an organized and visually rich manner. Travelers can easily find temples, natural attractions, heritage landmarks, beautiful riverfronts, and serene beaches perfectly mapped out for their next adventure.
            </p>
          </div>
        </div>
      </div>
      <section className="relative overflow-hidden bg-slate-50 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.1),_transparent_50%),radial-gradient(circle_at_top_left,_rgba(236,72,153,0.1),_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 z-10">
          <SectionTitle title="Why Tour Mitra?" subtitle="An attractive, responsive, and user-friendly tourism application crafted for simple discovery and better travel planning." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Responsive Design", "Looks great on mobile, tablet, and desktop devices.", "from-pink-500 to-rose-400"],
              ["Smart District Browsing", "Tourists can instantly choose a district and explore destinations.", "from-violet-500 to-purple-500"],
              ["Google Maps Support", "Every destination includes quick navigation support via Google Maps.", "from-blue-500 to-cyan-400"],
              ["Admin Management", "Secure admin dashboard to manage destinations and monitor the platform.", "from-emerald-400 to-teal-500"],
            ].map(([title, desc, gradient]) => (
              <div key={title} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/50">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition duration-300 group-hover:opacity-[0.03]`} />
                <div className={`mb-6 h-2 w-14 rounded-full bg-gradient-to-r ${gradient}`} />
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
