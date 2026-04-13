import { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import BackButton from "../components/BackButton";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isEmailLocked, setIsEmailLocked] = useState(false);
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

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    const email = userLocal.email || userLocal.user?.email;
    const name = userLocal.name || userLocal.user?.name;
    if (email) {
      setForm(prev => ({ ...prev, name: name || "", email: email }));
      setIsEmailLocked(true);
    }
  }, []);

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
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
    
    setStatus("Sending...");
    try {
      const res = await fetch("http://16.16.184.208:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
        setStatus("");
      } else {
        alert("Failed to send message.");
        setStatus("");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
      setStatus("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton />
      <SectionTitle title="Contact Us" subtitle="Share your questions, tourism suggestions, or destination feedback with the Tour Mitra team." />
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-3xl bg-white p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900">Get in Touch</h3>
          <p className="mt-2 text-slate-600">We’d love to hear from you.</p>
          <div className="mt-5 space-y-4">
            <div>
              <input value={form.name} onChange={handleNameChange} placeholder="Your name" className={`h-12 w-full rounded-2xl border ${nameError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} px-4 outline-none`} />
              {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
            </div>
            <input value={form.email} readOnly={isEmailLocked} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" className={`h-12 w-full rounded-2xl border ${isEmailLocked ? 'border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed' : 'border-slate-300'} px-4 outline-none focus:border-slate-500`} />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message"
              className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSend} disabled={status === "Sending..."} className="h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50">
              {status || "Send Message"}
            </motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-3xl bg-white p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900">Support Information</h3>
          <p className="mt-2 text-slate-600">Reach us through the details below.</p>
          <div className="mt-5 space-y-4 text-slate-600">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"><Mail className="h-5 w-5" /> tourmitra0821@gmail.com</div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"><Phone className="h-5 w-5" /> 9440071303</div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"><MapPin className="h-5 w-5" /> Andhra Pradesh, India</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
