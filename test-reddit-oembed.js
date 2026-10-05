async function testRedditOembed() {
  const targetUrl = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/';
  console.log(`=== TESTING REDDIT OEMBED ===\n`);

  try {
    const res = await fetch(`https://www.reddit.com/oembed?url=${encodeURIComponent(targetUrl)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`SUCCESS!`, JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditOembed();
