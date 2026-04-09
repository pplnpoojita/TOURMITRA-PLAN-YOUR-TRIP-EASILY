import json

data = {
    "east": [
        {"name":"Annavaram Temple","description":"Temple of Lord Satyanarayana","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3f/Annavaram_temple.jpg","map":"https://maps.google.com"},
        {"name":"Maredumilli Forest","description":"Beautiful forest tourism","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/f/f1/Maredumilli.jpg","map":"https://maps.google.com"},
        {"name":"Papikondalu Hills","description":"Scenic hill range on Godavari","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Rajahmundry Godavari Bridge","description":"Historic rail and road bridge","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/6/6b/Godavari_bridge.jpg","map":"https://maps.google.com"},
        {"name":"Dowleswaram Barrage","description":"Engineering marvel across Godavari","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/8/80/Dowleswaram_Barrage.jpg","map":"https://maps.google.com"},
        {"name":"Kadiyam Nurseries","description":"Famous flower nurseries","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/6/63/Kadiyam_nursery.jpg","map":"https://maps.google.com"},
        {"name":"Draksharamam Temple","description":"Pancharama temple of Lord Shiva","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/e/e7/Draksharamam.jpg","map":"https://maps.google.com"},
        {"name":"Coringa Wildlife Sanctuary","description":"Mangrove forest reserve","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Coringa_wildlife.jpg","map":"https://maps.google.com"},
        {"name":"Hope Island","description":"Island near Kakinada coast","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/d/d5/Hope_island.jpg","map":"https://maps.google.com"},
        {"name":"Pithapuram Temple","description":"Ancient spiritual temple town","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4f/Pithapuram.jpg","map":"https://maps.google.com"},
        {"name":"Rampachodavaram Waterfalls","description":"Nature waterfalls","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/5/58/Waterfall.jpg","map":"https://maps.google.com"},
        {"name":"Gandipochamma Temple","description":"Local goddess temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Rampa Waterfalls","description":"Hidden waterfalls","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/5/58/Waterfall.jpg","map":"https://maps.google.com"},
        {"name":"Korukonda Temple","description":"Hill temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Samalkot Temple","description":"Ancient temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Kakinada Beach","description":"Beautiful beach","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg","map":"https://maps.google.com"},
        {"name":"Yanam Beach","description":"Union territory beach","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg","map":"https://maps.google.com"},
        {"name":"Adurru Buddhist Stupa","description":"Ancient Buddhist site","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/2/25/Stupa.jpg","map":"https://maps.google.com"},
        {"name":"Peddapuram Palace","description":"Historic palace remains","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/c/cf/Palace.jpg","map":"https://maps.google.com"},
        {"name":"Tallapudi Hills","description":"Scenic hill view","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Madduru Temple","description":"Village temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Kotipalli Temple","description":"Sacred pilgrimage temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Atreyapuram Village","description":"Famous for sweets","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Godavari River Cruise","description":"Boat tourism","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Rajahmundry ISKCON Temple","description":"Krishna temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Seethanagaram Park","description":"River side park","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"},
        {"name":"Polavaram Hills","description":"Scenic hills","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Pushkar Ghat","description":"Holy bathing ghat","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Rallabandi Museum","description":"Cultural museum","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/8/85/Museum.jpg","map":"https://maps.google.com"},
        {"name":"Godavari Sunset Point","description":"Beautiful sunset view","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"}
    ],
    "west": [
        {"name":"Dwaraka Tirumala","description":"Famous temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/5/5c/Dwaraka_Tirumala.jpg","map":"https://maps.google.com"},
        {"name":"Perupalem Beach","description":"Calm beach","rating:4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg","map":"https://maps.google.com"},
        {"name":"Kolleru Lake","description":"Largest freshwater lake","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/f/f7/Kolleru_lake.jpg","map":"https://maps.google.com"},
        {"name":"Eluru Buddha Park","description":"Peaceful park","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"},
        {"name":"Jangareddygudem Hills","description":"Scenic hills","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Kovvur Ghat","description":"Godavari river ghat","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Narasapur Lighthouse","description":"Historic lighthouse","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/d/d7/Lighthouse.jpg","map":"https://maps.google.com"},
        {"name":"Bhimavaram Somaramam Temple","description":"Pancharama temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Palakollu Temple","description":"Ksheera Rama temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Akiveedu Lake","description":"Beautiful lake view","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/f/f7/Kolleru_lake.jpg","map":"https://maps.google.com"},
        {"name":"Attili Temple","description":"Local temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Tanuku Park","description":"Town park","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"},
        {"name":"Pentapadu Temple","description":"Ancient temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Unguturu Temple","description":"Village temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Chintalapudi Hills","description":"Nature hills","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Pedavegi Buddhist Site","description":"Archaeological site","rating:3,"image":"https://upload.wikimedia.org/wikipedia/commons/2/25/Stupa.jpg","map":"https://maps.google.com"},
        {"name":"Eluru Canal Walk","description":"Canal side walk","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Bhimavaram Lake","description":"City lake","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/f/f7/Kolleru_lake.jpg","map":"https://maps.google.com"},
        {"name":"Tadepalligudem Park","description":"Public park","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"},
        {"name":"Ganapavaram Temple","description":"Village temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Veeravasaram Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Nidadavole Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Kovvur Park","description":"Park","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"},
        {"name":"Devarapalli Hills","description":"Hill area","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg","map":"https://maps.google.com"},
        {"name":"Eluru Museum","description":"Museum","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/8/85/Museum.jpg","map":"https://maps.google.com"},
        {"name":"Juvvalapalem Beach","description":"Beach","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg","map":"https://maps.google.com"},
        {"name":"Achanta Temple","description":"Temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Palakoderu Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Undi Lake","description":"Lake","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/f/f7/Kolleru_lake.jpg","map":"https://maps.google.com"},
        {"name":"Bhimavaram Market","description":"Cultural market","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"}
    ],
    "konaseema": [
        {"name":"Antarvedi Temple","description":"Temple near sea","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/35/Antarvedi.jpg","map":"https://maps.google.com"},
        {"name":"Yanam Beach","description":"Scenic beach","rating:4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg","map":"https://maps.google.com"},
        {"name":"Appanapalli Temple","description":"Balaji temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Ryali Temple","description":"Jaganmohini temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Draksharamam Temple","description":"Pancharama temple","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/e/e7/Draksharamam.jpg","map":"https://maps.google.com"},
        {"name":"Konaseema Coconut Farms","description":"Green coconut farms","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Amalapuram Town","description":"Cultural town","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Muramalla Temple","description":"Temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Kotipalli Temple","description":"Temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Mummidivaram Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Ainavilli Temple","description":"Ganesh temple","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Gannavaram Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Kapileswarapuram Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Peddapuram Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Mandapalli Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"P.Gannavaram Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Kothapeta Town","description":"Town tourism","rating:3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Sakhinetipalli Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Malikipuram Temple","description":"Temple","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Allavaram Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Razole Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Ambajipeta Village","description":"Village tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Ravulapalem Town","description":"Town tourism","rating":3,"image":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg","map":"https://maps.google.com"},
        {"name":"Vadapalli Village","description":"Famous temple at Vadapalli where Godavari river meets tributaries","rating":5 ,"image":"https://upload.wikimedia.org/wikipedia/commons/3/3b/Temple.jpg","map":"https://maps.google.com"},
        {"name":"Godavari Boat Ride","description":"River tourism","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Konaseema Backwaters","description":"Backwater scenery","rating":5,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Coconut Lagoons","description":"Beautiful lagoons","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Godavari Sunset View","description":"Sunset point","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Village Boat Tour","description":"Village boat tourism","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg","map":"https://maps.google.com"},
        {"name":"Konaseema Nature Park","description":"Nature park","rating":4,"image":"https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg","map":"https://maps.google.com"}
    ]
}

category_map = {
    "Temple": ["Temple", "Stupa"],
    "Beach": ["Beach"],
    "Riverfront": ["Bridge", "Barrage", "Cruise", "Ghat", "Canal", "River"],
    "Nature": ["Forest", "Hills", "Nurseries", "Sanctuary", "Island", "Waterfalls", "Park", "Lake", "Nature", "Backwaters", "Lagoons"]
}

def get_category(name, desc):
    text = (name + " " + desc).lower()
    for cat, keywords in category_map.items():
        if any(kw.lower() in text for kw in keywords):
            return cat
    return "Heritage"

district_map = {
    "east": ("east-godavari", "East Godavari"),
    "west": ("west-godavari", "West Godavari"),
    "konaseema": ("konaseema", "Konaseema")
}

output_js = """export const districtMeta = {
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
"""

id_counter = 1
for region, places in data.items():
    dist_id, dist_title = district_map[region]
    for place in places:
        category = get_category(place["name"], place["description"])
        location = f"{place['name']}, {dist_title}"
        output_js += f'''  {{
    id: {id_counter},
    name: {json.dumps(place["name"])},
    district: "{dist_id}",
    category: "{category}",
    rating: {place["rating"]},
    shortDescription: {json.dumps(place["description"])},
    location: {json.dumps(location)},
    image: {json.dumps(place["image"])},
    mapsUrl: {json.dumps(place["map"])},
  }},
'''
        id_counter += 1

output_js += "];\n"

with open(r"c:\\Users\\LENOVO\\Desktop\\FINALPROJECT\\frontend\\src\\data\\destinations.js", "w", encoding="utf-8") as f:
    f.write(output_js)
