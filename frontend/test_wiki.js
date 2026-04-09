async function getWikiImage(query) {
  try {
    // Step 1: Search for the most relevant page
    const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + ' Andhra Pradesh')}&utf8=&format=json`);
    const searchData = await searchRes.json();
    
    if (searchData.query.search.length > 0) {
      const bestTitle = searchData.query.search[0].title;
      
      // Step 2: Get image for that specific page
      const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(bestTitle)}`);
      const imgData = await imgRes.json();
      const pages = imgData.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId && pages[pageId].original) {
        return pages[pageId].original.source;
      }
    }
  } catch (e) {
    console.error("Error with", query, e.message);
  }
  return null;
}

async function run() {
  console.log("Pattiseema:", await getWikiImage("Pattiseema"));
  console.log("Draksharamam:", await getWikiImage("Draksharamam Temple"));
  console.log("Coringa:", await getWikiImage("Coringa Wildlife Sanctuary"));
}

run();
