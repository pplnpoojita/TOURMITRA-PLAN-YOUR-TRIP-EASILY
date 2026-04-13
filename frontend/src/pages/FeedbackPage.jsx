import { useState } from "react";
import { Star } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import BackButton from "../components/BackButton";
import { API_BASE_URL } from "../apiConfig";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", rating: 0, comments: "" });
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!/^[A-Za-z\s]*$/.test(val)) {
      setNameError("Name must contain only alphabets.");
    } else {
      setNameError("");
    }
    setForm({ ...form, name: val });
  };

  const handleSend = async () => {
    if (!form.name || !form.email || !form.rating || !form.comments) {
      alert("Please fill all fields and provide a rating.");
      return;
    }
    if (nameError) {
      alert("Please resolve the errors before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    setStatus("Submitting...");
    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Thank you for your feedback!");
        setForm({ name: "", email: "", rating: 0, comments: "" });
        setStatus("");
      } else {
        let errorMessage = "Unknown server issue occurred.";
        try {
          const errorData = await res.json();
          errorMessage = `${errorData.message} ${errorData.error || ''}`;
        } catch(e) {
          errorMessage = `Server returned status: ${res.status}`;
        }
        alert(`Failed to submit feedback: ${errorMessage}`);
        setStatus("");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback. Ensure your backend server is restarted and running.");
      setStatus("");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton />
      <SectionTitle title="Website Feedback" subtitle="Let us know how your experience was and what we can improve." />
      <div className="rounded-3xl bg-white p-6 md:p-10 shadow-xl mt-8">
        <h3 className="text-2xl font-bold text-slate-900">Your Feedback</h3>
        <p className="mt-2 text-slate-600 mb-6">We value your opinion!</p>
        
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input value={form.name} onChange={handleNameChange} placeholder="Your name" className={`h-12 w-full rounded-2xl border ${nameError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} px-4 outline-none`} />
              {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`transition hover:scale-110 ${star <= form.rating ? "text-amber-400" : "text-slate-200"}`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Comments / Suggestions</label>
            <textarea
              value={form.comments}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
              placeholder="Tell us what you liked or what we can do better..."
              className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>
          
          <button onClick={handleSend} disabled={status === "Submitting..."} className="h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 font-medium">
            {status || "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}
