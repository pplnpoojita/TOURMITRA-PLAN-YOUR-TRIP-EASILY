import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Star, Navigation, Users, Shield, ArrowRight } from "lucide-react";
import { districtMeta, destinations } from "../data/destinations";

const districts = [
  { id: "east-godavari", ...districtMeta["east-godavari"] },
  { id: "west-godavari", ...districtMeta["west-godavari"] },
  { id: "konaseema", ...districtMeta["konaseema"] }
];

// Get 6 top destinations for preview
const topDestinations = destinations.slice(0, 6);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 w-full overflow-y-auto">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop" 
            alt="Godavari River View" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg uppercase whitespace-nowrap">
            Welcome To <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">TourMitra</span>
          </h1>
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm mb-6 border border-blue-500/30 backdrop-blur-sm">
            Explore the Heart of Andhra
          </span>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
            Discover the rich heritage, pristine beaches, and lush landscapes of East Godavari, West Godavari, and Konaseema.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/tourist-login")}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 hover:scale-105"
            >
              Start Planning <ArrowRight className="w-5 h-5"/>
            </button>
            <Link 
              to="/about"
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition backdrop-blur-md border border-white/20 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-md">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Navigation className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Curated Destinations</h3>
                <p className="text-slate-600">Explore over hundreds of hand-picked locations across the Godavari districts.</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-md">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Safe & Verified</h3>
                <p className="text-slate-600">All travel information and guides are officially verified for your safety.</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-transform hover:-translate-y-2 hover:shadow-md">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Community Support</h3>
                <p className="text-slate-600">Read reviews and share experiences with a community of enthusiastic travelers.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Districts Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Discover Regions</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Immerse yourself in the distinct cultures and landscapes of our prime tourist regions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {districts.map((district) => (
              <div key={district.id} className="group flex flex-col rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={district.hero} 
                    alt={district.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white tracking-wide">{district.title}</h3>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-slate-600 mb-8 flex-grow">{district.description}</p>
                  <button 
                    onClick={() => navigate("/tourist-login")}
                    className="flex justify-between items-center w-full group-hover:text-blue-600 font-bold transition-colors"
                  >
                    <span>Explore District</span>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors text-slate-400">
                      <ArrowRight className="w-5 h-5"/>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Destinations Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
               <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-4"></div>
               <p className="text-slate-600 max-w-xl">Places that our travelers love the most. Add them to your itinerary today.</p>
            </div>
            <button onClick={() => navigate("/tourist-login")} className="hidden sm:flex text-blue-600 font-bold items-center gap-2 hover:underline group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map(dest => (
              <div key={dest.id} className="rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl hover:border-slate-300 transition-all cursor-pointer bg-white" onClick={() => navigate("/tourist-login")}>
                <div className="h-56 overflow-hidden relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                    {dest.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="font-bold text-xl text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-600 shrink-0">
                      <Star className="w-4 h-4 fill-current"/>
                      <span className="font-bold text-sm tracking-tight">{dest.rating}.0</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 shrink-0"/>
                    <span className="truncate">{dest.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{dest.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
             <button onClick={() => navigate("/tourist-login")} className="text-blue-600 font-bold items-center gap-2 hover:underline inline-flex">
              View All Destinations <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Abstract background pattern for CTA */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\\"60\\\" height=\\\"60\\\" viewBox=\\\"0 0 60 60\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"%3E%3Cg fill=\\\"none\\\" fill-rule=\\\"evenodd\\\"%3E%3Cg fill=\\\"%23ffffff\\\" fill-opacity=\\\"1\\\"%3E%3Cpath d=\\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Experience the Magic?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of travelers who have already discovered the hidden gems of the Godavari region.</p>
          <button onClick={() => navigate("/tourist-login")} className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
            Create an Account Now
          </button>
        </div>
      </section>

    </div>
  );
}
