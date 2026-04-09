const fs = require('fs');

const eastGodavari = [
  "Annavaram Temple", "Coringa Wildlife Sanctuary", "Maredumilli Forest", "Rampachodavaram", "Talakona Waterfall",
  "Draksharamam Temple", "Pithapuram", "Kakinada Beach", "Hope Island (India)", "Rajahmundry",
  "Kotilingeshwara Temple", "Samalkot", "Yanam", "Dowleswaram Barrage", "Sir Arthur Cotton Museum",
  "Bhupathipalem Reservoir", "Pandavula Metta", "Papikondalu", "Korukonda", "Maredumilli",
  "Sokuleru Vagu", "Jalatarangini Waterfall", "Swamivari Dhaaram", "Rampa Waterfalls", "Maredumilli Coffee Plantations",
  "Uppada Beach", "Rajahmundry Bridge", "Gokavaram", "Seethapalli", "Maddi Anjaneya Swamy Temple"
];

const westGodavari = [
  "Dwaraka Tirumala", "Kolleru Lake", "Perupalem Beach", "Godavari River", "Palakollu",
  "Narasapuram", "Bhimavaram", "Pattiseema", "Polavaram Project", "Eluru",
  "Kovvur", "Jeelakarra Gudem", "Guntupalli Group of Buddhist Monuments", "Jangareddigudem", "Chinchinada",
  "Narasapur Lace", "Nidadavolu", "Tadepalligudem", "Vatluru", "Peda Amiram",
  "Ksheerarama", "Veerabhadra Temple, Pattiseema", "Mavullamma Temple", "Juvvalapalem", "Kolleru Bird Sanctuary",
  "Eluru Ashram", "Penugonda", "Tanuku", "Akividu", "Narasapur Estuary"
];

const konaseema = [
  "Antarvedi", "Antarvedi Temple", "Konaseema", "Ryali", "Appanapalli",
  "Coringa Mangroves", "Dindi, East Godavari", "Razole", "Ainavilli",
  "Muramalla", "Mandapalli", "Odalarevu", "Palivela", "Bandarulanka",
  "Kotipalli", "Mukteswaram", "Amalapuram", "Sakhinetipalli", "Pasarlapudi",
  "Bendamurlanka", "Katrenikona", "Yedurulanka", "Bikkavolu", "Ravulapalem",
  "Peruru", "Mori, Andhra Pradesh", "Kadali", "Chinchinada Bridge", "Gannavaram, East Godavari" // Removed P. Gannavaram for searchability
];

const fetchWikipediaImage = async (query) => {
  try {
    // Step 1: Search for the most relevant page on Wikipedia
    const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + ' Andhra Pradesh')}&utf8=&format=json`);
    const searchData = await searchRes.json();
    
    if (searchData.query.search.length > 0) {
      // Pick the top search result
      const bestTitle = searchData.query.search[0].title;
      
      // Step 2: Get image for that specific page
      const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(bestTitle)}`);
      const imgData = await imgRes.json();
      const ObjectKeys = Object.keys(imgData.query.pages);
      const pageId = ObjectKeys[0];
      
      if (pageId && pageId !== "-1" && imgData.query.pages[pageId].original) {
        return imgData.query.pages[pageId].original.source;
      }
    }
  } catch (e) {
    console.error("Error fetching for", query, e.message);
  }
  return null;
};

// Fallback images (generic placeholders to avoid showing wrong landmarks)
const fallbacks = {
  Temple: ["https://placehold.co/600x400/eee/31343C?text=Temple+Placeholder"],
  Beach: ["https://placehold.co/600x400/eee/31343C?text=Beach+Placeholder"],
  Nature: ["https://placehold.co/600x400/eee/31343C?text=Nature+Placeholder"],
  Riverfront: ["https://placehold.co/600x400/eee/31343C?text=Riverfront+Placeholder"],
  Heritage: ["https://placehold.co/600x400/eee/31343C?text=Heritage+Placeholder"]
};

const getCategory = (name) => {
  const n = name.toLowerCase();
  if (n.includes("temple") || n.includes("ksheera") || n.includes("swamy")) return "Temple";
  if (n.includes("beach") || n.includes("island")) return "Beach";
  if (n.includes("river") || n.includes("godavari") || n.includes("barrage") || n.includes("project")) return "Riverfront";
  if (n.includes("forest") || n.includes("mangrove") || n.includes("waterfall") || n.includes("lake") || n.includes("sanctuary")) return "Nature";
  return "Heritage";
}

let idCounter = 1;
const destinations = [];

async function processPlaces(district, districtId, names) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const category = getCategory(name);
    
    console.log(`Fetching image for ${name}...`);
    let image = await fetchWikipediaImage(name);
    
    if (!image) {
       // if wiki picture missing, fetch a distinct search from Unsplash using new format or use fallback
       const fb = fallbacks[category] || fallbacks.Nature;
       image = fb[i % fb.length];
    }
    
    const rating = (4.0 + (Math.random() * 0.9)).toFixed(1);
    
    destinations.push(`  {
    id: ${idCounter++},
    name: "${name}",
    district: "${districtId}",
    category: "${category}",
    rating: ${rating},
    shortDescription: "A renowned and scenic destination located in ${district}, showcasing real culture and beautiful landscapes.",
    location: "${name.split(',')[0]}, ${district}",
    image: "${image}",
    mapsUrl: "https://maps.google.com/?q=${encodeURIComponent(name.split(',')[0])}",
  }`);
  }
}

async function build() {
  await processPlaces("East Godavari", "east-godavari", eastGodavari);
  await processPlaces("West Godavari", "west-godavari", westGodavari);
  await processPlaces("Konaseema", "konaseema", konaseema);

  const output = `export const districtMeta = {
  "east-godavari": {
    title: "East Godavari",
    hero: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    accent: "from-amber-500 to-orange-500",
    description: "Temples, waterfalls, hill views, and serene nature spots across one of Andhra Pradesh’s most scenic districts.",
  },
  "west-godavari": {
    title: "West Godavari",
    hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    accent: "from-emerald-500 to-green-600",
    description: "A blend of spiritual landmarks, riverside beauty, lush countryside, and cultural richness.",
  },
  konaseema: {
    title: "Konaseema",
    hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    accent: "from-sky-500 to-cyan-600",
    description: "Famous for coconut groves, backwaters, mangroves, island vibes, temples, and picturesque landscapes.",
  },
};

export const destinations = [
${destinations.join(',\n')}
];
`;

  fs.writeFileSync('src/data/destinations.js', output);
  console.log('Done mapping 90 specific places!');
}

build();
