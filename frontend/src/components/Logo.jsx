import { Landmark } from "lucide-react";
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
        <Landmark className="h-5 w-5" />
      </div>
      <div>
        <div className="text-lg font-extrabold tracking-tight text-slate-900">Tour Mitra</div>
        <div className="text-xs text-slate-500">Your Digital Travel Companion</div>
      </div>
    </div>
  );
}