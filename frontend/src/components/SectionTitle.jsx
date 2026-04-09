export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}