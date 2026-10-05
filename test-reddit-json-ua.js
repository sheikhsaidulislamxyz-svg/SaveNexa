async function testRedditJsonUa() {
  const url = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/.json';
  console.log(`=== TESTING REDDIT JSON WITH CHROME USER AGENT ===\n`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`SUCCESS! JSON Keys:`, Object.keys(data[0] || {}));
      console.log(`Post Title:`, data[0]?.data?.children?.[0]?.data?.title);
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditJsonUa();
