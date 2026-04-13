import { useEffect, useState } from "react";
import { User, Star } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import BackButton from "../components/BackButton";
import { destinations } from "../data/destinations";
import { API_BASE_URL } from "../apiConfig";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [visitedDestinations, setVisitedDestinations] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSendUserReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}/reply`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "user", reply: replyText }),
      });
      if (res.ok) {
        const updatedMessage = await res.json();
        setMyMessages(myMessages.map(m => m._id === id ? updatedMessage : m));
        setReplyingTo(null);
        setReplyText("");
      }
    } catch (err) {
      console.error("Error sending user reply:", err);
    }
  };

  const handleStartNewThread = async () => {
    if (!newMsg.trim()) return;
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    const email = profile?.email || userLocal.email || userLocal.user?.email || "user@example.com";
    const name = profile?.name || userLocal.name || userLocal.user?.name || "User";
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: newMsg }),
      });
      if (res.ok) {
        setNewMsg("");
        setIsComposing(false);
        fetchProfile();
      }
    } catch (err) {
      console.error("Error starting new thread:", err);
    }
  };

  const closeModal = () => setActiveModal(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        if (data.visitedPlaces) {
          const mapped = data.visitedPlaces.map(vp => {
            const destInfo = destinations.find(d => d.id === vp.destinationId);
            return { ...vp, ...destInfo };
          }).filter(d => d.name); // ensure destination was found
          
          setVisitedDestinations(mapped);
        }
      }

      // Fetch my messages
      const msgRes = await fetch(`${API_BASE_URL}/api/contact/my-messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (msgRes.ok) {
        setMyMessages(await msgRes.json());
      }

      // Fetch my feedbacks
      const fbkRes = await fetch(`${API_BASE_URL}/api/feedback/my-feedbacks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (fbkRes.ok) {
        setMyFeedbacks(await fbkRes.json());
      }
    } catch (e) {
      console.error("Failed to fetch profile", e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRate = async (destinationId, newRating) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/visit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ destinationId, rating: newRating })
      });
      if (res.ok) {
        fetchProfile(); // refresh the list
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = profile?.name || userLocal.name || userLocal.user?.name || "Tourist User";
  const isAdmin = profile?.role === "admin" || userLocal.role === "admin" || userLocal.user?.role === "admin";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8">
      <BackButton />
      <SectionTitle title="Profile Dashboard" subtitle="Manage your visited places and ratings." />
      
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="grid gap-8 md:grid-cols-[140px_1fr] md:items-center">
          <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl">
            <User className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{userName}</h2>
            <p className="mt-2 text-slate-600">
              {isAdmin ? "You are logged in as an administrator." : "Track the beautiful destinations you have explored across the region."}
            </p>
            {!isAdmin && (
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <div onClick={() => setActiveModal('visited')} className="rounded-2xl bg-slate-50 p-4 cursor-pointer hover:scale-105 transition-transform duration-200 hover:ring-2 ring-slate-200">
                  <div className="text-sm text-slate-500">Destinations Conquered</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">{visitedDestinations.length}</div>
                </div>
                <div onClick={() => setActiveModal('rating')} className="rounded-2xl bg-slate-50 p-4 cursor-pointer hover:scale-105 transition-transform duration-200 hover:ring-2 ring-slate-200">
                  <div className="text-sm text-slate-500">Explorer Star Index</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">
                    {visitedDestinations.length > 0 
                      ? (visitedDestinations.reduce((acc, curr) => acc + (curr.rating || 0), 0) / visitedDestinations.length).toFixed(1) 
                      : "0.0"}
                  </div>
                </div>
                <div onClick={() => setActiveModal('messages')} className="rounded-2xl bg-slate-50 p-4 cursor-pointer hover:scale-105 transition-transform duration-200 hover:ring-2 ring-slate-200">
                  <div className="text-sm text-slate-500">Dispatch Threads</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">{myMessages.length}</div>
                </div>
                <div onClick={() => setActiveModal('feedbacks')} className="rounded-2xl bg-slate-50 p-4 cursor-pointer hover:scale-105 transition-transform duration-200 hover:ring-2 ring-slate-200">
                  <div className="text-sm text-slate-500">Shared Contributions</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">{myFeedbacks.length}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900">Your Visited Places</h3>
          <p className="mt-1 text-slate-600">Rate the places you have visited to help others discover the best spots!</p>
          
          {visitedDestinations.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
              You haven't marked any places as visited yet. Start exploring!
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {visitedDestinations.map(place => (
                <div key={place.destinationId} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={place.image} alt={place.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-slate-900">{place.name}</div>
                      <div className="text-sm text-slate-500">{place.category} · {place.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start gap-1 md:items-end">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Rating</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star} 
                          onClick={() => handleRate(place.destinationId, star)}
                          className={`transition hover:scale-110 ${star <= place.rating ? "text-amber-400" : "text-slate-200"}`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Section overlays the specific statistical details */}
      {!isAdmin && activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 p-6 bg-slate-50">
              <h3 className="text-2xl font-bold text-slate-900">
                {activeModal === 'visited' && "All Visited Places Data"}
                {activeModal === 'rating' && "Your Ratings Summary"}
                {activeModal === 'messages' && "Traveler Support Dispatches"}
                {activeModal === 'feedbacks' && "My Website Feedbacks"}
              </h3>
              <button onClick={closeModal} className="rounded-full bg-slate-200 p-2 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6 bg-white">
              {(activeModal === 'visited' || activeModal === 'rating') && (
                visitedDestinations.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                    No data available yet. Start exploring and rating places!
                  </div>
                ) : (
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-4 py-3 font-medium">Destination Name</th>
                        <th className="px-4 py-3 font-medium">District</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Your Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitedDestinations.map((place) => (
                        <tr key={place.destinationId} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-3">
                            <img src={place.image} alt={place.name} className="h-10 w-10 rounded object-cover" />
                            {place.name}
                          </td>
                          <td className="px-4 py-3 capitalize text-slate-600">{place.district ? place.district.replace(/-/g, " ") : ""}</td>
                          <td className="px-4 py-3 text-slate-600">{place.category}</td>
                          <td className="px-4 py-3 text-slate-900 font-bold flex gap-1 items-center">
                            {place.rating} <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {activeModal === 'messages' && (
                myMessages.length === 0 && !isComposing ? (
                  <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500 flex flex-col items-center gap-4">
                    <p>You haven't sent any messages to the admin yet.</p>
                    <button onClick={() => setIsComposing(true)} className="rounded-xl bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700 shadow-md transition-colors">Start a New Dispatch</button>
                  </div>
                ) : isComposing ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-lg">Start a New Dispatch</h4>
                    <textarea value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Type your message to the Tour Mitra admin..." className="w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:border-slate-500 shadow-inner mb-4 min-h-[120px]" />
                    <div className="flex gap-3 justify-end">
                      <button onClick={() => { setIsComposing(false); setNewMsg(""); }} className="rounded-xl bg-slate-200 px-5 py-2 font-bold text-slate-700 hover:bg-slate-300 shadow-sm">Cancel</button>
                      <button onClick={handleStartNewThread} className="rounded-xl bg-teal-600 px-5 py-2 font-bold text-white hover:bg-teal-700 shadow-md">Send Message</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-end mb-4">
                      <button onClick={() => setIsComposing(true)} className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-bold text-white hover:bg-teal-700 shadow-sm">Start New Dispatch</button>
                    </div>
                    {myMessages.map(msg => (
                      <div key={msg._id} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                          <h4 className="font-semibold text-slate-900">Dispatch Thread • {new Date(msg.createdAt).toLocaleDateString()}</h4>
                        </div>
                        <div className="text-slate-600">
                          <div className="mb-2 p-3 rounded-lg bg-slate-100 border border-slate-200 ml-12">
                            <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">Original Dispatch:</span>
                            {msg.message}
                          </div>
                          {msg.reply && (
                            <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100 mr-12">
                              <span className="font-semibold text-xs text-blue-500 uppercase tracking-wider block mb-1">Tour Mitra Response:</span>
                              <p className="text-sm mt-1 text-slate-700">{msg.reply}</p>
                            </div>
                          )}
                          {msg.thread && msg.thread.map((t, idx) => (
                            <div key={idx} className={`mt-2 p-3 rounded-lg border ${t.sender === 'user' ? 'bg-slate-100 border-slate-200 ml-12' : 'bg-blue-50 border-blue-100 mr-12'}`}>
                              <span className={`font-semibold text-xs uppercase tracking-wider block mb-1 ${t.sender === 'user' ? 'text-slate-500' : 'text-blue-500'}`}>
                                {t.sender === 'user' ? 'Explorer:' : 'Tour Mitra Response:'}
                              </span>
                              <p className="text-sm mt-1 text-slate-700">{t.text}</p>
                            </div>
                          ))}
                          {replyingTo === msg._id && (
                            <div className="mt-4 flex flex-col gap-2">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-slate-500 shadow-inner"
                                rows="2"
                                placeholder="Draft your dispatch..."
                              />
                              <div className="flex gap-2">
                                <button onClick={() => handleSendUserReply(msg._id)} className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-md">Send Dispatch</button>
                                <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 shadow-md">Cancel</button>
                              </div>
                            </div>
                          )}
                          {replyingTo !== msg._id && (
                            <div className="mt-4 border-t border-slate-100 pt-3 flex justify-end">
                              <button onClick={() => { setReplyingTo(msg._id); setReplyText(""); }} className="rounded-lg bg-teal-50 px-4 py-2 text-teal-700 hover:bg-teal-100 text-sm font-semibold border border-teal-200 transition-colors shadow-sm">
                                Reply to Thread
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeModal === 'feedbacks' && (
                myFeedbacks.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                    You haven't sent any feedbacks to the admin yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myFeedbacks.map(f => (
                      <div key={f._id} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                          <h4 className="font-semibold text-slate-900">Feedback from {new Date(f.createdAt).toLocaleDateString()}</h4>
                          <span className="font-bold text-amber-500">{f.rating} ★</span>
                        </div>
                        <div className="text-slate-700 whitespace-pre-wrap">{f.comments}</div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
