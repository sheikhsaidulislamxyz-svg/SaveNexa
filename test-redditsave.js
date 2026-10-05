async function testRedditSave() {
  const permalink = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/';
  console.log(`=== TESTING REDDITSAVE PUBLIC API ===\n`);

  try {
    const url = `https://redditsave.com/api/info?url=${encodeURIComponent(permalink)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const text = await res.text();
      console.log(`Response snippet:`, text.slice(0, 500));
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditSave();
