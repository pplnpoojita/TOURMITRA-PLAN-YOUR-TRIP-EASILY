import { useState, useEffect } from "react";
import { destinations } from "../data/destinations";
import BackButton from "../components/BackButton";
import { API_BASE_URL } from "../apiConfig";

export default function AdminDashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  
  const closeModal = () => setActiveModal(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}/reply`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "admin", reply: replyText }),
      });
      if (res.ok) {
        const updatedMessage = await res.json();
        setMessages(messages.map(m => m._id === id ? updatedMessage : m));
        setReplyingTo(null);
        setReplyText("");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  useEffect(() => {
    fetch('${API_BASE_URL}/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
      })
      .catch(err => console.error("Error fetching users:", err));

    fetch('${API_BASE_URL}/api/contact')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(err => console.error("Error fetching messages:", err));

    fetch('${API_BASE_URL}/api/feedback')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFeedbacks(data);
      })
      .catch(err => console.error("Error fetching feedbacks:", err));
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    district: "east-godavari",
    category: "Heritage",
    location: "",
    shortDescription: "",
    image: "",
  });

  const countByDistrict = {
    east: destinations.filter((d) => d.district === "east-godavari").length,
    west: destinations.filter((d) => d.district === "west-godavari").length,
    kona: destinations.filter((d) => d.district === "konaseema").length,
  };

  const categories = Array.from(new Set(destinations.map((d) => d.category)));

  const handleAddSubmit = () => {
    if (formData.name && formData.district) {
      destinations.unshift({ ...formData, id: destinations.length + 1, rating: 4.5 });
      setRefresh(refresh + 1);
      setShowForm(false);
      setFormData({ name: "", district: "east-godavari", category: "Heritage", location: "", shortDescription: "", image: "" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
      <BackButton fallback="/admin-login" />
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Admin Panel</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Monitor the tourism platform with a clean and attractive dashboard layout.</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button 
            onClick={() => { window.location.href = '/admin-profile'; }} 
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50">
            View Profile
          </button>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800">
            {showForm ? "Cancel" : "Add Destination"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900">Insert New Place</h3>
          <p className="mt-1 text-slate-600">Fill in the details to add a new destination.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">District</label>
              <select value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-slate-500">
                <option value="east-godavari">East Godavari</option>
                <option value="west-godavari">West Godavari</option>
                <option value="konaseema">Konaseema</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. Temple, Beach, Heritage" className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
              <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
              <input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-slate-500" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Short Description</label>
              <textarea value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-slate-500" rows="3" />
            </div>
          </div>
          <button onClick={handleAddSubmit} className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800">
            Submit New Place
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[
          { id: 'destinations', title: "Total Destinations", value: `${destinations.length}` },
          { id: 'users', title: "Logged-in Users", value: `${users.length}` },
          { id: 'messages', title: "Contact Messages", value: `${messages.length}` },
          { id: 'feedbacks', title: "Site Feedbacks", value: `${feedbacks.length}` },
          { id: 'views', title: "Destinations Views", value: `${users.length > 0 ? users.length * 15 : 0}+` },
        ].map((item) => (
          <div key={item.title} onClick={() => setActiveModal(item.id)} className="rounded-3xl bg-white p-6 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 hover:ring-2 ring-slate-200">
            <div className="text-sm text-slate-500">{item.title}</div>
            <div className="mt-2 text-3xl font-extrabold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900">District Summary</h3>
          <p className="mt-1 text-slate-600">Quick overview of destination distribution.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div onClick={() => setActiveModal('east')} className="rounded-2xl bg-amber-50 p-5 cursor-pointer hover:bg-amber-100 transition-colors">
              <div className="text-sm text-amber-700">East Godavari</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{countByDistrict.east}</div>
            </div>
            <div onClick={() => setActiveModal('west')} className="rounded-2xl bg-emerald-50 p-5 cursor-pointer hover:bg-emerald-100 transition-colors">
              <div className="text-sm text-emerald-700">West Godavari</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{countByDistrict.west}</div>
            </div>
            <div onClick={() => setActiveModal('kona')} className="rounded-2xl bg-sky-50 p-5 cursor-pointer hover:bg-sky-100 transition-colors">
              <div className="text-sm text-sky-700">Konaseema</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{countByDistrict.kona}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900">Destination Categories</h3>
          <p className="mt-1 text-slate-600">Tourism types available on the platform.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span 
                key={cat} 
                onClick={() => setActiveModal(`cat-${cat}`)}
                className="cursor-pointer hover:bg-slate-200 hover:scale-105 transition-transform duration-200 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900">Recent User Logins & Places Seen</h3>
        <p className="mt-1 text-slate-600">Overview of which users logged in and the district (places) they viewed.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone / Password Used</th>
                <th className="px-4 py-3 font-medium">Places Seen (District)</th>
                <th className="px-4 py-3 font-medium">Marked & Rated</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Login Date</th>
              </tr>
            </thead>
            <tbody>
              {users.slice().reverse().map((u) => (
                <tr key={u._id || u.email} className="border-b border-slate-100 align-top">
                  <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3 text-slate-600">{u.phone || 'N/A'}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{u.district ? u.district.replace(/-/g, " ") : "All"} Places</td>
                  <td className="px-4 py-3 text-slate-600 w-64">
                    {u.visitedPlaces && u.visitedPlaces.length > 0 ? (
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        {u.visitedPlaces.map((vp, idx) => {
                          const destinationName = destinations.find(d => d.id === vp.destinationId)?.name || 'Unknown Item';
                          return <li key={idx}><span className="font-semibold">{destinationName}</span> : {vp.rating}★</li>;
                        })}
                      </ul>
                    ) : (
                      <span className="text-slate-400 text-xs italic">No ratings yet</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    {u.loginDates && u.loginDates.length > 0 
                      ? new Date(u.loginDates[u.loginDates.length - 1]).toLocaleDateString()
                      : 'Never'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-500">No users found or loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900">Recent Destination Records</h3>
        <p className="mt-1 text-slate-600">Full list of places tracked in the database.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">District</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{d.district.replace(/-/g, " ")}</td>
                  <td className="px-4 py-3 text-slate-600">{d.category}</td>
                  <td className="px-4 py-3 text-slate-600">{d.rating.toFixed(1)}</td>
                  <td className="px-4 py-3 text-slate-600">{d.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-900">Recent Contact Messages</h3>
        <p className="mt-1 text-slate-600">User feedback and support queries from the Contact Us page.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id} className="border-b border-slate-100 align-top">
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{m.email}</td>
                  <td className="px-4 py-3 text-slate-600 min-w-[300px]">
                    <div className="mb-2 p-3 rounded-lg bg-slate-100 border border-slate-200 mr-12">
                      <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">User Query:</span>
                      {m.message}
                    </div>
                    {m.reply && (
                      <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100 ml-12">
                        <span className="font-semibold text-xs text-blue-500 uppercase tracking-wider block mb-1">Admin Reply:</span>
                        <p className="text-sm mt-1 text-slate-700">{m.reply}</p>
                      </div>
                    )}
                    {m.thread && m.thread.map((t, idx) => (
                      <div key={idx} className={`mt-2 p-3 rounded-lg border ${t.sender === 'admin' ? 'bg-blue-50 border-blue-100 ml-12' : 'bg-slate-100 border-slate-200 mr-12'}`}>
                        <span className={`font-semibold text-xs uppercase tracking-wider block mb-1 ${t.sender === 'admin' ? 'text-blue-500' : 'text-slate-500'}`}>
                          {t.sender === 'admin' ? 'Admin:' : 'User:'}
                        </span>
                        <p className="text-sm mt-1 text-slate-700">{t.text}</p>
                      </div>
                    ))}
                    {replyingTo === m._id && (
                      <div className="mt-4 flex flex-col gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-slate-500 shadow-inner"
                          rows="2"
                          placeholder="Type your reply to user thread..."
                        />
                        <div className="flex gap-2">
                          <button onClick={() => handleSendReply(m._id)} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-md">Send Reply</button>
                          <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 shadow-md">Cancel</button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {replyingTo !== m._id && (
                      <button onClick={() => { setReplyingTo(m._id); setReplyText(""); }} className="rounded-lg bg-slate-100 px-3 py-1.5 text-blue-600 hover:bg-slate-200 hover:text-blue-800 text-sm font-semibold border border-slate-200 transition-colors">
                        Reply
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No messages yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal section overlays the dashboard when activeModal is set */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 p-6 bg-slate-50">
              <h3 className="text-2xl font-bold text-slate-900">
                {activeModal === 'destinations' && "All Destinations Data"}
                {activeModal === 'users' && "All Logged-in Users Data"}
                {activeModal === 'messages' && "All Contact Messages Data"}
                {activeModal === 'feedbacks' && "All Website Feedback Data"}
                {activeModal === 'views' && "Destinations Views Summary"}
                {activeModal === 'east' && "East Godavari Destinations Data"}
                {activeModal === 'west' && "West Godavari Destinations Data"}
                {activeModal === 'kona' && "Konaseema Destinations Data"}
                {activeModal?.startsWith('cat-') && `${activeModal.replace('cat-', '')} Destinations Data`}
              </h3>
              <button onClick={closeModal} className="rounded-full bg-slate-200 p-2 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6 bg-white">
              {activeModal === 'users' && (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Phone / Password Used</th>
                      <th className="px-4 py-3 font-medium">Places Seen (District)</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Login Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice().reverse().map((u) => (
                      <tr key={u._id || u.email} className="border-b border-slate-100 align-top hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                        <td className="px-4 py-3 text-slate-600">{u.email}</td>
                        <td className="px-4 py-3 text-slate-600">{u.phone || 'N/A'}</td>
                        <td className="px-4 py-3 capitalize text-slate-600">{u.district ? u.district.replace(/-/g, " ") : "All"} Places</td>
                        <td className="px-4 py-3 text-slate-600"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{u.role}</span></td>
                        <td className="px-4 py-3 text-slate-600 text-xs">
                          {u.loginDates && u.loginDates.length > 0 
                            ? new Date(u.loginDates[u.loginDates.length - 1]).toLocaleDateString()
                            : 'Never'}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {(['destinations', 'east', 'west', 'kona'].includes(activeModal) || activeModal?.startsWith('cat-')) && (() => {
                const targetDestinations = 
                  activeModal === 'east' ? destinations.filter(d => d.district === 'east-godavari') :
                  activeModal === 'west' ? destinations.filter(d => d.district === 'west-godavari') :
                  activeModal === 'kona' ? destinations.filter(d => d.district === 'konaseema') :
                  activeModal?.startsWith('cat-') ? destinations.filter(d => d.category === activeModal.replace('cat-', '')) :
                  destinations;
                return (
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">District</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Rating</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {targetDestinations.map((d) => (
                        <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                          <td className="px-4 py-3 capitalize text-slate-600">{d.district.replace(/-/g, " ")}</td>
                          <td className="px-4 py-3 text-slate-600">{d.category}</td>
                          <td className="px-4 py-3 text-slate-600">{d.rating.toFixed(1)}</td>
                          <td className="px-4 py-3 text-slate-600 truncate max-w-xs">{d.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}

              {activeModal === 'feedbacks' && (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Rating</th>
                      <th className="px-4 py-3 font-medium">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((f) => (
                      <tr key={f._id} className="border-b border-slate-100 hover:bg-slate-50 align-top">
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{new Date(f.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{f.name}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{f.email}</td>
                        <td className="px-4 py-3 font-bold text-amber-500 whitespace-nowrap">{f.rating} ★</td>
                        <td className="px-4 py-3 text-slate-600 min-w-[300px]">
                          <div className="mb-2 whitespace-pre-wrap">{f.comments}</div>
                        </td>
                      </tr>
                    ))}
                    {feedbacks.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No feedback submitted yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeModal === 'messages' && (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Message</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((m) => (
                      <tr key={m._id} className="border-b border-slate-100 hover:bg-slate-50 align-top">
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{new Date(m.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{m.name}</td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{m.email}</td>
                        <td className="px-4 py-3 text-slate-600 min-w-[300px]">
                          <div className="mb-2 p-3 rounded-lg bg-slate-100 border border-slate-200 mr-12">
                            <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider block mb-1">User Query:</span>
                            {m.message}
                          </div>
                          {m.reply && (
                            <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100 ml-12">
                              <span className="font-semibold text-xs text-blue-500 uppercase tracking-wider block mb-1">Admin Reply:</span>
                              <p className="text-sm mt-1 text-slate-700">{m.reply}</p>
                            </div>
                          )}
                          {m.thread && m.thread.map((t, idx) => (
                            <div key={idx} className={`mt-2 p-3 rounded-lg border ${t.sender === 'admin' ? 'bg-blue-50 border-blue-100 ml-12' : 'bg-slate-100 border-slate-200 mr-12'}`}>
                              <span className={`font-semibold text-xs uppercase tracking-wider block mb-1 ${t.sender === 'admin' ? 'text-blue-500' : 'text-slate-500'}`}>
                                {t.sender === 'admin' ? 'Admin:' : 'User:'}
                              </span>
                              <p className="text-sm mt-1 text-slate-700">{t.text}</p>
                            </div>
                          ))}
                          {replyingTo === m._id && (
                            <div className="mt-4 flex flex-col gap-2">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-slate-500 shadow-inner"
                                rows="2"
                                placeholder="Type your reply to user thread..."
                              />
                              <div className="flex gap-2">
                                <button onClick={() => handleSendReply(m._id)} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-md">Send Reply</button>
                                <button onClick={() => { setReplyingTo(null); setReplyText(""); }} className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 shadow-md">Cancel</button>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                          {replyingTo !== m._id && (
                            <button onClick={() => { setReplyingTo(m._id); setReplyText(""); }} className="rounded-lg bg-slate-100 px-3 py-1.5 text-blue-600 hover:bg-slate-200 hover:text-blue-800 text-sm font-semibold border border-slate-200 transition-colors">
                              Reply
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No messages yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeModal === 'views' && (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="rounded-full bg-blue-100 p-6 mb-6">
                    <svg className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h4 className="text-3xl font-extrabold text-slate-900 mb-2">Detailed Views Data</h4>
                  <p className="text-lg text-slate-600 max-w-lg mb-8">
                    View counts are aggregated metrics representing the total activity across all listed destinations. The current count is estimated based on login sessions and visited patterns.
                  </p>
                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                   <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                     <div className="text-slate-500 font-medium mb-1">Total Active Logins</div>
                     <div className="text-4xl font-black text-slate-800">{users.length}</div>
                   </div>
                   <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                     <div className="text-slate-500 font-medium mb-1">Estimated Views</div>
                     <div className="text-4xl font-black text-slate-800">{users.length > 0 ? users.length * 15 : 0}+</div>
                   </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}