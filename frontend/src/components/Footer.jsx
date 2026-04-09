import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Tour Mitra helps tourists discover the beauty, spirituality, and natural charm of East Godavari, West Godavari, and Konaseema.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Explore</h4>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div>90+ tourist destinations</div>
            <div>Google Maps integration</div>
            <div>Responsive card-based discovery</div>
            <div>Tourist and admin modules</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> tourmitra0821@gmail.com</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 9440071303</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Andhra Pradesh, India</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-500">
        © 2026 Tour Mitra. Designed for regional tourism promotion.
      </div>
    </footer>
  );
}
