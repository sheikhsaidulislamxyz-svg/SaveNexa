async function testVxTwitter() {
  const tweetId = '2040565815083225472';
  console.log(`=== TESTING VX-TWITTER API FOR TWEET: ${tweetId} ===\n`);

  const urls = [
    `https://api.vxtwitter.com/NASA/status/${tweetId}`,
    `https://api.vxtwitter.com/status/${tweetId}`,
    `https://api.fxtwitter.com/status/${tweetId}`,
  ];

  for (const url of urls) {
    try {
      console.log(`Testing: ${url}`);
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      console.log(`Status: ${res.status}`);
      if (res.ok) {
        const text = await res.text();
        console.log(`Response length: ${text.length}`);
        console.log(`Response snippet:`, text.slice(0, 400));
        const data = JSON.parse(text);
        if (data.media_extended || data.media_urls) {
          console.log(`FOUND MEDIA URLS!`, data.media_extended || data.media_urls);
        }
      }
    } catch (err) {
      console.log(`Error:`, err.message);
    }
  }
}

testVxTwitter();
