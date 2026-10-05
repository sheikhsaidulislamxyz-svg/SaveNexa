async function testPinterest() {
  const pinUrls = [
    'https://www.pinterest.com/pin/747527238166505677/',
    'https://www.pinterest.com/pin/296533956730689975/',
    'https://www.pinterest.com/pin/687458145100123456/',
  ];

  for (const u of pinUrls) {
    console.log('--- Testing Pin:', u);
    try {
      const res = await fetch(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });
      console.log('Status:', res.status);
      const text = await res.text();
      console.log('HTML Length:', text.length);

      // Search for og:video, v1.pinimg.com, mp4, etc.
      const ogVideo = text.match(/<meta property="og:video(?::secure_url)?" content="([^"]+)"/i);
      console.log('og:video:', ogVideo ? ogVideo[1] : 'null');

      const videoMatches = text.match(/https?:\/\/[^"'\\s]*pinimg\.com\/videos\/[^"'\\s]+/gi) ||
                           text.match(/https?:\/\/[^"'\\s]+\.mp4[^"'\\s]*/gi);
      console.log('Video matches count:', videoMatches ? videoMatches.length : 0);
      if (videoMatches) {
        console.log('Sample video match:', videoMatches[0].slice(0, 120));
      }

      // Check if __PWS_DATA__ has video URLs
      const pwsMatch = text.match(/<script id="__PWS_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
      if (pwsMatch) {
        const pwsText = pwsMatch[1];
        const vPinMatch = pwsText.match(/https?:\/\/[^"'\\s]*pinimg\.com\/videos\/[^"'\\s]+/gi) ||
                          pwsText.match(/https?:\/\/[^"'\\s]+?\.mp4[^"'\\s]*/gi);
        console.log('PWS Video matches:', vPinMatch ? vPinMatch.length : 0);
        if (vPinMatch) {
          console.log('Sample PWS Video match:', vPinMatch[0].replace(/\\/g, '').slice(0, 120));
        }
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
  }
}
testPinterest();
