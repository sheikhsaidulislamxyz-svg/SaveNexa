async function testInstagramParseD1() {
  const shortcode = 'Dd16lAfhIBp';
  console.log(`=== TESTING PARSING INSTAGRAM REEL SHORTCODE: ${shortcode} ===\n`);

  try {
    const res = await fetch(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response length: ${text.length}`);

    // Try parsing as JSON or search for video_url / mp4 / CDN URL
    if (text.startsWith('{')) {
      const data = JSON.parse(text);
      console.log(`JSON parsed successfully! Keys:`, Object.keys(data));
      const media = data?.graphql?.shortcode_media || data?.items?.[0];
      if (media) {
        console.log(`Found shortcode media! Video URL:`, media.video_url || media.video_versions?.[0]?.url);
      }
    } else {
      console.log(`Text is HTML! Searching for embedded JSON or script tags...`);
      const matches = text.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi) ||
                      text.match(/video_url["']:\s*["']([^"']+)["']/gi) ||
                      text.match(/contentUrl["']:\s*["']([^"']+)["']/gi);

      console.log(`Matches found in HTML:`, matches);
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

testInstagramParseD1();
