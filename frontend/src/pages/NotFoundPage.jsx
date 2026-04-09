import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 flex flex-col items-center text-center md:px-6 lg:px-8">
      <BackButton />
      <h1 className="text-6xl font-extrabold text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800">
        Go Home
      </Link>
    </div>
  );
}
