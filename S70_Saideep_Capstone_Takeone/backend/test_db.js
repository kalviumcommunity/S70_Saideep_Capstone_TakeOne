async function testBackend() {
  try {
    // 1. Test register
    console.log("Testing user registration...");
    const regReq = await fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123"
      })
    });
    const regRes = await regReq.json();
    console.log("Registration Response:", regRes);

    // 2. Test login
    console.log("Testing user login...");
    const loginReq = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: regRes.email || JSON.parse(regReq.config?.data || '{"email":"' + `test${Date.now()}@example.com` + '"}').email, // wait, we know what we sent
        password: "password123"
      })
    });
  } catch(e) {}
}

testBackend();
