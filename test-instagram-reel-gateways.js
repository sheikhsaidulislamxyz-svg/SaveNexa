async function testInstagramReelGateways() {
  const shortcode = 'Dd16lAfhIBp';
  console.log(`=== TESTING INSTAGRAM GATEWAYS FOR REEL: ${shortcode} ===\n`);

  // Gateway 1: VxInstagram / FxInstagram API
  console.log('1. Testing VxInstagram API...');
  try {
    const res = await fetch(`https://api.vxtwitter.com/Instagram/status/${shortcode}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });
    console.log(`VxInstagram Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`VxInstagram Data:`, JSON.stringify(data).slice(0, 300));
    }
  } catch (err) {
    console.log(`VxInstagram Error: ${err.message}`);
  }

  // Gateway 2: Instagram Embed HTML parsing with Chrome User-Agent
  console.log('\n2. Testing Instagram Embed HTML with Chrome UA...');
  try {
    const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;
    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });
    console.log(`Embed Status: ${res.status}`);
    if (res.ok) {
      const html = await res.text();
      console.log(`Embed HTML length: ${html.length}`);

      // Extract JSON inside Embed HTML
      const jsonMatch = html.match(/window\.__additionalDataLoaded\s*\(\s*['"][^'"]+['"]\s*,\s*(\{[\s\S]*?\})\s*\)\s*;/);
      if (jsonMatch) {
        console.log(`Found __additionalDataLoaded!`);
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          const media = parsed?.graphql?.shortcode_media || parsed?.items?.[0];
          if (media) {
            console.log(`FOUND MEDIA IN EMBED! Video URL:`, media.video_url || media.video_versions?.[0]?.url);
          }
        } catch (e) {
          console.log(`JSON parse error: ${e.message}`);
        }
      } else {
        console.log(`__additionalDataLoaded not found in embed.`);
      }
    }
  } catch (err) {
    console.log(`Embed Error: ${err.message}`);
  }

  // Gateway 3: DDInstagram API
  console.log('\n3. Testing DDInstagram API...');
  try {
    const res = await fetch(`https://api.ddinstagram.com/reel/${shortcode}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });
    console.log(`DDInstagram Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`DDInstagram Data:`, JSON.stringify(data).slice(0, 300));
    }
  } catch (err) {
    console.log(`DDInstagram Error: ${err.message}`);
  }
}

testInstagramReelGateways();
