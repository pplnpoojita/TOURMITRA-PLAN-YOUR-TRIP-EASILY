import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import BackButton from "../components/BackButton";

export default function AdminLoginPage({ setRole }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!/^[A-Za-z\s]*$/.test(val)) {
      setNameError("Name must contain only alphabets.");
    } else {
      setNameError("");
    }
    setName(val);
  };

  const handleAdminLogin = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (nameError) {
      alert("Please resolve the errors before submitting.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    
    if (trimmedName.toLowerCase() !== "poojita" || trimmedEmail !== "tourmitra0821@gmail.com" || password !== "tourmitra@08") {
      alert("Invalid Admin Credentials");
      return;
    }

    try {
      const loginRes = await fetch("http://16.16.184.208:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData));
        setRole("admin");
        navigate("/admin-dashboard");
      } else {
        const registerRes = await fetch("http://16.16.184.208:5001/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role: "admin" })
        });

        if (registerRes.ok) {
          const registerData = await registerRes.json();
          localStorage.setItem("token", registerData.token);
          localStorage.setItem("user", JSON.stringify(registerData));
          setRole("admin");
          navigate("/admin-dashboard");
        } else {
          const data = await loginRes.json();
          alert("Admin Authentication Failed: " + (data.message || "Invalid credentials"));
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton />
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
          <div className="w-fit rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">Secure Access</div>
          <h1 className="mt-3 text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-slate-300">Access the admin dashboard to manage destinations, monitor district tourism content, and keep the platform updated.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm">Your Name</label>
              <input value={name} onChange={handleNameChange} placeholder="Enter your name" className={`h-12 w-full rounded-2xl border ${nameError ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/10'} px-4 text-white outline-none placeholder:text-slate-300`} />
              {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-slate-300" />
            </div>
            <div>
              <label className="mb-2 block text-sm">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-slate-300" />
            </div>
            <button onClick={handleAdminLogin} className="flex h-12 w-full items-center justify-center rounded-2xl bg-white text-slate-900 hover:bg-slate-100">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-slate-900">Admin Features</h3>
          <p className="mt-2 text-slate-600">Everything designed in a clean dashboard layout.</p>
          <div className="mt-6 grid gap-4">
            {[
              "View total districts and destination counts",
              "Track categories and tourism content",
              "Manage destination records easily",
              "Use responsive cards and modern UI blocks",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}