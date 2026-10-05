async function testInstagramReelFix() {
  const shortcode = 'Dd16lAfhIBp';
  console.log(`=== TESTING INSTAGRAM REEL FIX FOR: ${shortcode} ===\n`);

  // 1. Instagram Web App GraphQL Query with X-IG-App-ID
  console.log('1. Querying Instagram GraphQL with X-IG-App-ID...');
  try {
    const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=b301662c99320545807c13d7da561212&variables=${encodeURIComponent(JSON.stringify({ shortcode }))}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'X-IG-App-ID': '936619743392459',
        'X-ASBD-ID': '198387',
        'Accept': 'application/json',
      },
    });
    console.log(`GraphQL Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`GraphQL Data:`, JSON.stringify(data).slice(0, 300));
    }
  } catch (err) {
    console.log(`GraphQL Error: ${err.message}`);
  }

  // 2. Querying Instagram Embed with Googlebot
  console.log('\n2. Querying Instagram Embed with Googlebot UA...');
  try {
    const res = await fetch(`https://www.instagram.com/p/${shortcode}/embed/captioned/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html',
      },
    });
    console.log(`Embed Googlebot Status: ${res.status}`);
    const html = await res.text();
    console.log(`Embed HTML length: ${html.length}`);

    // Parse video_url or mp4
    const mp4Matches = html.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi);
    console.log(`MP4 matches count: ${mp4Matches ? mp4Matches.length : 0}`);
    if (mp4Matches) {
      console.log(`Extracted MP4 URL: ${mp4Matches[0]}`);
    }
  } catch (err) {
    console.log(`Embed Googlebot Error: ${err.message}`);
  }

  // 3. Querying Instagram Embed with Facebook External Hit
  console.log('\n3. Querying Instagram Reel Page with Facebook Crawler UA...');
  try {
    const res = await fetch(`https://www.instagram.com/reel/${shortcode}/`, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html',
      },
    });
    console.log(`Reel FB Crawler Status: ${res.status}`);
    const html = await res.text();
    console.log(`Reel FB Crawler HTML length: ${html.length}`);

    const ogVideo = html.match(/<meta property="og:video" content="([^"]+)"/i) || html.match(/<meta property="og:video:secure_url" content="([^"]+)"/i);
    console.log(`og:video match:`, ogVideo ? ogVideo[1] : 'None');

    const videoUrlMatches = html.match(/video_url["']:\s*["']([^"']+)["']/i);
    console.log(`video_url match:`, videoUrlMatches ? videoUrlMatches[1] : 'None');
  } catch (err) {
    console.log(`Reel FB Crawler Error: ${err.message}`);
  }
}

testInstagramReelFix();
