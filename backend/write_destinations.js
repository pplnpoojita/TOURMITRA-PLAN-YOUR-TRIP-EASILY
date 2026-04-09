const fs = require('fs');

const data = {
east:[
{name:"Annavaram Temple",description:"Temple of Lord Satyanarayana",rating:5,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Annavaram+Temple"},
{name:"Maredumilli Forest",description:"Beautiful forest tourism",rating:4,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",map:"https://maps.google.com/?q=Maredumilli+Forest"},
{name:"Papikondalu Hills",description:"Scenic hill range on Godavari",rating:5,image:"https://images.unsplash.com/photo-1594818316275-c580dfbf3721?w=800&q=80",map:"https://maps.google.com/?q=Papikondalu+Hills"},
{name:"Rajahmundry Godavari Bridge",description:"Historic rail and road bridge",rating:4,image:"https://images.unsplash.com/photo-1554308527-df21f7ee339a?w=800&q=80",map:"https://maps.google.com/?q=Rajahmundry+Godavari+Bridge"},
{name:"Dowleswaram Barrage",description:"Engineering marvel across Godavari",rating:4,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Dowleswaram+Barrage"},
{name:"Kadiyam Nurseries",description:"Famous flower nurseries",rating:4,image:"https://images.unsplash.com/photo-1456086272153-6d0e802ea60c?w=800&q=80",map:"https://maps.google.com/?q=Kadiyam+Nurseries"},
{name:"Draksharamam Temple",description:"Pancharama temple of Lord Shiva",rating:5,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Draksharamam+Temple"},
{name:"Coringa Wildlife Sanctuary",description:"Mangrove forest reserve",rating:4,image:"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",map:"https://maps.google.com/?q=Coringa+Wildlife+Sanctuary"},
{name:"Hope Island",description:"Island near Kakinada coast",rating:4,image:"https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",map:"https://maps.google.com/?q=Hope+Island"},
{name:"Pithapuram Temple",description:"Ancient spiritual temple town",rating:4,image:"https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?w=800&q=80",map:"https://maps.google.com/?q=Pithapuram+Temple"},
{name:"Rampachodavaram Waterfalls",description:"Nature waterfalls",rating:4,image:"https://images.unsplash.com/photo-1506169018698-356cddb32bf3?w=800&q=80",map:"https://maps.google.com/?q=Rampachodavaram+Waterfalls"},
{name:"Gandipochamma Temple",description:"Local goddess temple",rating:3,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Gandipochamma+Temple"},
{name:"Rampa Waterfalls",description:"Hidden waterfalls",rating:4,image:"https://images.unsplash.com/photo-1432405972618-c600f4f71fb6?w=800&q=80",map:"https://maps.google.com/?q=Rampa+Waterfalls"},
{name:"Korukonda Temple",description:"Hill temple",rating:4,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Korukonda+Temple"},
{name:"Samalkot Temple",description:"Ancient temple",rating:4,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Samalkot+Temple"},
{name:"Kakinada Beach",description:"Beautiful beach",rating:4,image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",map:"https://maps.google.com/?q=Kakinada+Beach"},
{name:"Yanam Beach",description:"Union territory beach",rating:4,image:"https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&q=80",map:"https://maps.google.com/?q=Yanam+Beach"},
{name:"Adurru Buddhist Stupa",description:"Ancient Buddhist site",rating:4,image:"https://images.unsplash.com/photo-1591140089851-f7ee8474d221?w=800&q=80",map:"https://maps.google.com/?q=Adurru+Buddhist+Stupa"},
{name:"Peddapuram Palace",description:"Historic palace remains",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Peddapuram+Palace"},
{name:"Tallapudi Hills",description:"Scenic hill view",rating:3,image:"https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=800&q=80",map:"https://maps.google.com/?q=Tallapudi+Hills"},
{name:"Madduru Temple",description:"Village temple",rating:3,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Madduru+Temple"},
{name:"Kotipalli Temple",description:"Sacred pilgrimage temple",rating:4,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Kotipalli+Temple"},
{name:"Atreyapuram Village",description:"Famous for sweets",rating:4,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=Atreyapuram+Village"},
{name:"Godavari River Cruise",description:"Boat tourism",rating:5,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Godavari+River+Cruise"},
{name:"Rajahmundry ISKCON Temple",description:"Krishna temple",rating:4,image:"https://images.unsplash.com/photo-1595085352654-e67c8cb31bbf?w=800&q=80",map:"https://maps.google.com/?q=Rajahmundry+ISKCON+Temple"},
{name:"Seethanagaram Park",description:"River side park",rating:3,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Seethanagaram+Park"},
{name:"Polavaram Hills",description:"Scenic hills",rating:4,image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",map:"https://maps.google.com/?q=Polavaram+Hills"},
{name:"Pushkar Ghat",description:"Holy bathing ghat",rating:4,image:"https://images.unsplash.com/photo-1598460613897-f509cc14a1a3?w=800&q=80",map:"https://maps.google.com/?q=Pushkar+Ghat"},
{name:"Rallabandi Museum",description:"Cultural museum",rating:3,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Rallabandi+Museum"},
{name:"Godavari Sunset Point",description:"Beautiful sunset view",rating:4,image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",map:"https://maps.google.com/?q=Godavari+Sunset+Point"}
],
west:[
{name:"Dwaraka Tirumala",description:"Famous temple",rating:5,image:"https://images.unsplash.com/photo-1542157585-ef20bfc242b6?w=800&q=80",map:"https://maps.google.com/?q=Dwaraka+Tirumala"},
{name:"Perupalem Beach",description:"Calm beach",rating:4,image:"https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&q=80",map:"https://maps.google.com/?q=Perupalem+Beach"},
{name:"Kolleru Lake",description:"Largest freshwater lake",rating:5,image:"https://images.unsplash.com/photo-1422421350616-6338bd7686c1?w=800&q=80",map:"https://maps.google.com/?q=Kolleru+Lake"},
{name:"Eluru Buddha Park",description:"Peaceful park",rating:4,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Eluru+Buddha+Park"},
{name:"Jangareddygudem Hills",description:"Scenic hills",rating:3,image:"https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=800&q=80",map:"https://maps.google.com/?q=Jangareddygudem+Hills"},
{name:"Kovvur Ghat",description:"Godavari river ghat",rating:4,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Kovvur+Ghat"},
{name:"Narasapur Lighthouse",description:"Historic lighthouse",rating:4,image:"https://images.unsplash.com/photo-1517409540061-ce830ece02e9?w=800&q=80",map:"https://maps.google.com/?q=Narasapur+Lighthouse"},
{name:"Bhimavaram Somaramam Temple",description:"Pancharama temple",rating:5,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Bhimavaram+Somaramam+Temple"},
{name:"Palakollu Temple",description:"Ksheera Rama temple",rating:5,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Palakollu+Temple"},
{name:"Akiveedu Lake",description:"Beautiful lake view",rating:4,image:"https://images.unsplash.com/photo-1422421350616-6338bd7686c1?w=800&q=80",map:"https://maps.google.com/?q=Akiveedu+Lake"},
{name:"Attili Temple",description:"Local temple",rating:3,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Attili+Temple"},
{name:"Tanuku Park",description:"Town park",rating:3,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Tanuku+Park"},
{name:"Pentapadu Temple",description:"Ancient temple",rating:3,image:"https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?w=800&q=80",map:"https://maps.google.com/?q=Pentapadu+Temple"},
{name:"Unguturu Temple",description:"Village temple",rating:3,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Unguturu+Temple"},
{name:"Chintalapudi Hills",description:"Nature hills",rating:4,image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",map:"https://maps.google.com/?q=Chintalapudi+Hills"},
{name:"Pedavegi Buddhist Site",description:"Archaeological site",rating:3,image:"https://images.unsplash.com/photo-1591140089851-f7ee8474d221?w=800&q=80",map:"https://maps.google.com/?q=Pedavegi+Buddhist+Site"},
{name:"Eluru Canal Walk",description:"Canal side walk",rating:3,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Eluru+Canal+Walk"},
{name:"Bhimavaram Lake",description:"City lake",rating:3,image:"https://images.unsplash.com/photo-1422421350616-6338bd7686c1?w=800&q=80",map:"https://maps.google.com/?q=Bhimavaram+Lake"},
{name:"Tadepalligudem Park",description:"Public park",rating:3,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Tadepalligudem+Park"},
{name:"Ganapavaram Temple",description:"Village temple",rating:3,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Ganapavaram+Temple"},
{name:"Veeravasaram Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Veeravasaram+Temple"},
{name:"Nidadavole Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Nidadavole+Temple"},
{name:"Kovvur Park",description:"Park",rating:3,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Kovvur+Park"},
{name:"Devarapalli Hills",description:"Hill area",rating:3,image:"https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=800&q=80",map:"https://maps.google.com/?q=Devarapalli+Hills"},
{name:"Eluru Museum",description:"Museum",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Eluru+Museum"},
{name:"Juvvalapalem Beach",description:"Beach",rating:4,image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",map:"https://maps.google.com/?q=Juvvalapalem+Beach"},
{name:"Achanta Temple",description:"Temple",rating:4,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Achanta+Temple"},
{name:"Palakoderu Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=Palakoderu+Village"},
{name:"Undi Lake",description:"Lake",rating:3,image:"https://images.unsplash.com/photo-1422421350616-6338bd7686c1?w=800&q=80",map:"https://maps.google.com/?q=Undi+Lake"},
{name:"Bhimavaram Market",description:"Cultural market",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Bhimavaram+Market"}
],
konaseema:[
{name:"Antarvedi Temple",description:"Temple near sea",rating:5,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Antarvedi+Temple"},
{name:"Yanam Beach",description:"Scenic beach",rating:4,image:"https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&q=80",map:"https://maps.google.com/?q=Yanam+Beach"},
{name:"Appanapalli Temple",description:"Balaji temple",rating:5,image:"https://images.unsplash.com/photo-1542157585-ef20bfc242b6?w=800&q=80",map:"https://maps.google.com/?q=Appanapalli+Temple"},
{name:"Ryali Temple",description:"Jaganmohini temple",rating:5,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Ryali+Temple"},
{name:"Draksharamam Temple",description:"Pancharama temple",rating:5,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Draksharamam+Temple"},
{name:"Konaseema Coconut Farms",description:"Green coconut farms",rating:4,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",map:"https://maps.google.com/?q=Konaseema+Coconut+Farms"},
{name:"Amalapuram Town",description:"Cultural town",rating:3,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=Amalapuram+Town"},
{name:"Muramalla Temple",description:"Temple",rating:4,image:"https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?w=800&q=80",map:"https://maps.google.com/?q=Muramalla+Temple"},
{name:"Kotipalli Temple",description:"Temple",rating:4,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Kotipalli+Temple"},
{name:"Mummidivaram Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Mummidivaram+Village"},
{name:"Ainavilli Temple",description:"Ganesh temple",rating:4,image:"https://images.unsplash.com/photo-1542157585-ef20bfc242b6?w=800&q=80",map:"https://maps.google.com/?q=Ainavilli+Temple"},
{name:"Gannavaram Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Gannavaram+Temple"},
{name:"Kapileswarapuram Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Kapileswarapuram+Temple"},
{name:"Peddapuram Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",map:"https://maps.google.com/?q=Peddapuram+Temple"},
{name:"Mandapalli Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?w=800&q=80",map:"https://maps.google.com/?q=Mandapalli+Temple"},
{name:"P.Gannavaram Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=P.Gannavaram+Village"},
{name:"Kothapeta Town",description:"Town tourism",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Kothapeta+Town"},
{name:"Sakhinetipalli Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1542157585-ef20bfc242b6?w=800&q=80",map:"https://maps.google.com/?q=Sakhinetipalli+Temple"},
{name:"Malikipuram Temple",description:"Temple",rating:3,image:"https://images.unsplash.com/photo-1588693822187-5750fe80a9e7?w=800&q=80",map:"https://maps.google.com/?q=Malikipuram+Temple"},
{name:"Allavaram Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=Allavaram+Village"},
{name:"Razole Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1581454045501-c9172c72b8ce?w=800&q=80",map:"https://maps.google.com/?q=Razole+Village"},
{name:"Ambajipeta Village",description:"Village tourism",rating:3,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",map:"https://maps.google.com/?q=Ambajipeta+Village"},
{name:"Ravulapalem Town",description:"Town tourism",rating:3,image:"https://images.unsplash.com/photo-1605335198031-6e3e5066a337?w=800&q=80",map:"https://maps.google.com/?q=Ravulapalem+Town"},
{name:"Vadapalli Village",description:"Famous temple at Vadapalli where Godavari river meets tributaries",rating:5 ,image:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",map:"https://maps.google.com/?q=Vadapalli+Village"},
{name:"Godavari Boat Ride",description:"River tourism",rating:5,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Godavari+Boat+Ride"},
{name:"Konaseema Backwaters",description:"Backwater scenery",rating:5,image:"https://images.unsplash.com/photo-1432405972618-c600f4f71fb6?w=800&q=80",map:"https://maps.google.com/?q=Konaseema+Backwaters"},
{name:"Coconut Lagoons",description:"Beautiful lagoons",rating:4,image:"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",map:"https://maps.google.com/?q=Coconut+Lagoons"},
{name:"Godavari Sunset View",description:"Sunset point",rating:4,image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",map:"https://maps.google.com/?q=Godavari+Sunset+View"},
{name:"Village Boat Tour",description:"Village boat tourism",rating:4,image:"https://images.unsplash.com/photo-1544473244-f6895e69ce8d?w=800&q=80",map:"https://maps.google.com/?q=Village+Boat+Tour"},
{name:"Konaseema Nature Park",description:"Nature park",rating:4,image:"https://images.unsplash.com/photo-1502082236199-8cf6e92c23bc?w=800&q=80",map:"https://maps.google.com/?q=Konaseema+Nature+Park"}
]
};

const getCategory = (name, desc) => {
  const text = (name + " " + desc).toLowerCase();
  if (text.includes("temple") || text.includes("pilgrimage") || text.includes("stupa") || text.includes("buddha")) return "Temple";
  if (text.includes("beach")) return "Beach";
  if (text.includes("forest") || text.includes("park") || text.includes("lake") || text.includes("hills") || text.includes("wildlife")) return "Nature";
  if (text.includes("river") || text.includes("boat") || text.includes("cruise") || text.includes("barrage") || text.includes("backwaters") || text.includes("lagoon")) return "Riverfront";
  return "Heritage";
};

let destinationsList = [];
let id = 1;

for (const [districtKey, places] of Object.entries(data)) {
  const districtStr = districtKey === 'east' ? 'east-godavari' : districtKey === 'west' ? 'west-godavari' : 'konaseema';
  const districtName = districtKey === 'east' ? 'East Godavari' : districtKey === 'west' ? 'West Godavari' : 'Konaseema';
  
  for (const place of places) {
    destinationsList.push({
      id: id++,
      name: place.name,
      district: districtStr,
      category: getCategory(place.name, place.description),
      rating: place.rating || 4.5,
      shortDescription: place.description || "Beautiful tourism destination in Andhra Pradesh.",
      location: place.name + ", " + districtName,
      image: place.image,
      mapsUrl: place.map
    });
  }
}

const fileContent = "export const districtMeta = {\n" +
  "  \"east-godavari\": {\n" +
  "    title: \"East Godavari\",\n" +
  "    hero: \"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop\",\n" +
  "    accent: \"from-amber-500 to-orange-500\",\n" +
  "    description: \"Temples, waterfalls, hill views, and serene nature spots across one of Andhra Pradesh’s most scenic districts.\",\n" +
  "  },\n" +
  "  \"west-godavari\": {\n" +
  "    title: \"West Godavari\",\n" +
  "    hero: \"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop\",\n" +
  "    accent: \"from-emerald-500 to-green-600\",\n" +
  "    description: \"A blend of spiritual landmarks, riverside beauty, lush countryside, and cultural richness.\",\n" +
  "  },\n" +
  "  konaseema: {\n" +
  "    title: \"Konaseema\",\n" +
  "    hero: \"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop\",\n" +
  "    accent: \"from-sky-500 to-cyan-600\",\n" +
  "    description: \"Famous for coconut groves, backwaters, mangroves, island vibes, temples, and picturesque landscapes.\",\n" +
  "  },\n" +
  "};\n\n" +
  "export const destinations = " + JSON.stringify(destinationsList, null, 2) + ";\n";

fs.writeFileSync('C:/Users/LENOVO/Desktop/FINALPROJECT/frontend/src/data/destinations.js', fileContent);
console.log("Written beautifully");
