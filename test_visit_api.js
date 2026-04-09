 

async function test() {
  try {
    // 1. login to get token
    const loginRes = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "indumathi@gmail.com", password: "123" }) // using an email from image
    });
    
    // if login fails, try another or create one
    let token = "";
    if (loginRes.ok) {
        const data = await loginRes.json();
        token = data.token;
    } else {
        // let's register a temporary user
        const regRes = await fetch("http://localhost:5001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Test", email: "test_visitor_abc22@gmail.com", password: "123", role: "tourist", phone: "123", district: "some" })
        });
        const d = await regRes.json();
        token = d.token;
    }

    console.log("Got token: ", token.substring(0, 10) + "...");

    const res = await fetch("http://localhost:5001/api/users/visit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ destinationId: 1 })
    });
    
    console.log("Status: ", res.status);
    const text = await res.text();
    console.log("Response text: ", text);

    const res2 = await fetch("http://localhost:5001/api/users/visit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ destinationId: 1, rating: 5 })
    });
    console.log("Response text 2: ", await res2.text());
    
  } catch(e) {
    console.error(e);
  }
}
test();
