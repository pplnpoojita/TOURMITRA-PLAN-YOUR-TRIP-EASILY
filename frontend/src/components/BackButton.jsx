import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If we're deep enough in history, just go back. Otherwise fallback.
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group relative mb-6 inline-flex w-fit items-center justify-center overflow-hidden rounded-full p-[2px] font-medium transition-all hover:-translate-x-1 hover:shadow-md hover:shadow-purple-500/20"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity"></span>
      <span className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm transition-all group-hover:bg-slate-50">
        <ArrowLeft className="h-4 w-4 text-indigo-500 transition-transform group-hover:-translate-x-1" />
        <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Go Back</span>
      </span>
    </button>
  );
}
