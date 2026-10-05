async function testRedditFirefox() {
  const url = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/.json';
  console.log(`=== TESTING REDDIT JSON WITH FIREFOX USER AGENT ===\n`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`SUCCESS! Title:`, data[0]?.data?.children?.[0]?.data?.title);
    } else {
      console.log(`Headers:`, [...res.headers.entries()]);
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditFirefox();
