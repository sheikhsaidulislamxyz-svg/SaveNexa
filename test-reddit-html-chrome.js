async function testRedditHtmlChrome() {
  const url = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/';
  console.log(`=== TESTING REDDIT HTML WITH DESKTOP CHROME USER AGENT ===\n`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response length: ${text.length}`);

    // Look for video URL
    const mp4Matches = text.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi);
    console.log(`mp4 matches count:`, mp4Matches ? mp4Matches.length : 0);
    if (mp4Matches && mp4Matches.length > 0) {
      console.log(`First MP4 match snippet:`, mp4Matches[0].slice(0, 150));
    }

    // Search for fallback_url or secure_media
    const fallbackMatch = text.match(/"fallback_url"\s*:\s*"([^"]+)"/i) || text.match(/"hlsUrl"\s*:\s*"([^"]+)"/i);
    if (fallbackMatch) {
      console.log(`FOUND FALLBACK/HLS URL:`, fallbackMatch[1]);
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditHtmlChrome();
