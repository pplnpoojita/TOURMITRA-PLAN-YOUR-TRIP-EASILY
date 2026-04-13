import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { districtMeta, destinations } from "../data/destinations";
import BackButton from "../components/BackButton";
import { API_BASE_URL } from "../apiConfig";

export default function TouristLoginPage({ setRole }) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [district, setDistrict] = useState("east-godavari");
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

  const handleRegisterSubmit = async () => {
    if (!name || !email || !phone || !password || !district) {
      alert("Please fill in all fields");
      return;
    }

    if (nameError) {
      alert("Please resolve the errors before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must contain only numbers.");
      return;
    }

    try {
      const registerRes = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          district,
          password,
          role: "tourist"
        })
      });

      if (registerRes.ok) {
        alert("Registration successful! Please login to continue.");
        setIsLoginMode(true);
      } else {
        const data = await registerRes.json();
        if (registerRes.status === 400 && data.message === 'User already exists') {
          alert("Account already exists! Please click Login to continue.");
          setIsLoginMode(true);
        } else {
          alert("Registration failed: " + data.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  const handleLoginSubmit = async () => {
    if (!email || !password || !district) {
      alert("Please fill in email, password and select a district");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData));
        setRole("tourist");
        navigate(`/district/${district}`);
      } else {
        const data = await loginRes.json();
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const resetRes = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password })
      });

      if (resetRes.ok) {
        alert("Password reset successfully! Please login with your new password.");
        setIsForgotPasswordMode(false);
        setIsLoginMode(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await resetRes.json();
        alert("Password reset failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700">Tourist Access</div>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {isForgotPasswordMode ? "Reset Password" : isLoginMode ? "Tourist Login" : "Tourist Registration"}
          </h1>
          <p className="mt-2 text-slate-600">
            {isForgotPasswordMode 
              ? "Enter your email and new password to reset your account access." 
              : isLoginMode 
                  ? "Welcome back! Please enter your details to continue exploring." 
                  : "Register below, select your preferred district, and start discovering destinations."}
          </p>

          <div className="mt-6 space-y-5">
            {!isLoginMode && !isForgotPasswordMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Your Name</label>
                <input value={name} onChange={handleNameChange} placeholder="Enter your name" className={`h-12 w-full rounded-2xl border ${nameError ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-slate-500'} px-4 outline-none`} />
                {nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>

            {!isLoginMode && !isForgotPasswordMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  {isForgotPasswordMode ? "New Password" : "Password"}
                </label>
                {isLoginMode && !isForgotPasswordMode && (
                  <button type="button" onClick={() => setIsForgotPasswordMode(true)} className="text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isForgotPasswordMode ? "Enter new password" : "Enter your password"} className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>

            {isForgotPasswordMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
              </div>
            )}

            {!isForgotPasswordMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Select District</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.keys(districtMeta).map((key) => (
                    <button
                      key={key}
                      onClick={() => setDistrict(key)}
                      className={`rounded-2xl border p-4 text-left transition ${district === key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                    >
                      <div className="font-semibold">{districtMeta[key].title}</div>
                      <div className={`mt-1 text-xs ${district === key ? "text-slate-200" : "text-slate-500"}`}>Explore now</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={isForgotPasswordMode ? handleResetPasswordSubmit : isLoginMode ? handleLoginSubmit : handleRegisterSubmit} 
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
            >
              {isForgotPasswordMode ? (
                "Reset Password"
              ) : (
                <><LogIn className="mr-2 h-4 w-4" /> {isLoginMode ? "Login as Tourist" : "Register as Tourist"}</>
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-slate-600">
              {isForgotPasswordMode ? (
                <>
                  Remember your password?{" "}
                  <button 
                    onClick={() => {
                      setIsForgotPasswordMode(false);
                      setIsLoginMode(true);
                    }} 
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    Back to Login
                  </button>
                </>
              ) : isLoginMode ? (
                <>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setIsLoginMode(false)} 
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button 
                    onClick={() => setIsLoginMode(true)} 
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    Login here
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <img src={districtMeta[district].hero} alt={districtMeta[district].title} className="h-64 w-full object-cover" />
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900">{districtMeta[district].title}</h3>
            <p className="mt-2 text-slate-600">{districtMeta[district].description}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-2xl font-bold text-slate-900">{destinations.filter((d) => d.district === district).length}</div>
                <div className="text-sm text-slate-500">Destinations</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-2xl font-bold text-slate-900">4.8★</div>
                <div className="text-sm text-slate-500">Average Rating</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-500">Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
