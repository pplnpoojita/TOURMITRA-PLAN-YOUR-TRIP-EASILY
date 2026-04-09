import re

with open(r'c:\Users\LENOVO\Desktop\FINALPROJECT\frontend\src\data\destinations.js', 'r', encoding='utf-8') as f:
    content = f.read()

images_by_category = {
    "Temple": [
        "https://upload.wikimedia.org/wikipedia/commons/3/3f/Annavaram_temple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e7/Draksharamam.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Dwaraka_Tirumala.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Antarvedi.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Draksharama_temple%2C_Draksharamam.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/CompleteTempleComplex.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/29/SomeswaraSwamy-5.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/East_Gopuram_of_Dwaraka_Tirumala_Temple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Uma-Maheswaraswami_Temple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Draksharama_temple_entrance_02.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/Kovvur_shivalayam_02.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/dd/Subhramanya_Swamy_Temple_in_Biccavole.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Panchaloha_Vasavi_matha_Statue%2C_Penugonda.jpg"
    ],
    "Nature": [
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Maredumilli.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Papikondalu.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Coringa_wildlife.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f7/Kolleru_lake.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Bhupatipalem_reservoir%2C_Rampachodavaram.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Waterfall.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/20/A_bridge_over_Kolleru.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/07/Park.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/Godavari_satellite_view.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Coringa_Wildlife_Sanctuary_1.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Maredumilli.jpg"
    ],
    "Riverfront": [
        "https://upload.wikimedia.org/wikipedia/commons/6/6b/Godavari_bridge.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/80/Dowleswaram_Barrage.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/River.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Sunset_at_Godavri.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Gowthami_river_Godavari.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Dowleswaram_Barrage.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Boat_in_river_Godavari_at_Kapileswarapuram_02.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Bhimavaram_Paddy_Fields.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Godavarighattu.JPG"
    ],
    "Beach": [
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Beach.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Antarvedi_Beach_view_02.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Hope_island.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7f/Antarvedhi.jpg"
    ],
    "Heritage": [
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Village.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/Pithapuram.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Kadiyam_nursery.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Palace.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/25/Stupa.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Museum.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Lighthouse.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0a/Scenic_Greenery_of_Nagullanka_Village_by_Prasad_SVD.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/View_of_Banana_plants_at_Ryali_village_in_East_Godavari_district.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Maingate.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/e5/Amalapuram.jpg"
    ]
}

counts = {k: 0 for k in images_by_category}

def replacer(match):
    prefix = match.group(1)
    category = match.group(2)
    middle = match.group(3)
    
    cat = category if category in images_by_category else "Heritage"
    idx = counts[cat] % len(images_by_category[cat])
    counts[cat] += 1
    new_image = images_by_category[cat][idx]
    
    return f'{prefix}{category}{middle}image: "{new_image}",'

pattern = r'(category:\s*"([^"]+)",[\s\S]*?)(image:\s*"[^"]+",)'
new_content = re.sub(pattern, replacer, content)

with open(r'c:\Users\LENOVO\Desktop\FINALPROJECT\frontend\src\data\destinations.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated images.")
