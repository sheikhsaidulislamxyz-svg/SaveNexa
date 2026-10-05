async function inspectEmbedScriptData() {
  const shortcode = 'Dd16lAfhIBp';
  console.log(`=== INSPECTING EMBED SCRIPT DATA FOR: ${shortcode} ===\n`);

  const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;
  const res = await fetch(embedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html',
    },
  });

  const html = await res.text();
  console.log(`Embed HTML length: ${html.length}`);

  // Search for _sharedData
  const sharedDataMatch = html.match(/window\._sharedData\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (sharedDataMatch) {
    console.log(`FOUND window._sharedData!`);
    try {
      const parsed = JSON.parse(sharedDataMatch[1]);
      console.log(`_sharedData parsed successfully! Keys:`, Object.keys(parsed));
      const entryData = parsed.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
      if (entryData) {
        console.log(`FOUND SHORTCODE MEDIA IN SHARED DATA! Video URL:`, entryData.video_url);
      }
    } catch (e) {
      console.log(`_sharedData JSON parse error: ${e.message}`);
    }
  } else {
    console.log(`window._sharedData not found.`);
  }

  // Search for any video element
  const videoMatch = html.match(/<video[^>]*src="([^"]+)"/i) || html.match(/<video[^>]*>([\s\S]*?)<\/video>/i);
  if (videoMatch) {
    console.log(`FOUND VIDEO TAG MATCH:`, videoMatch[0].slice(0, 200));
  } else {
    console.log(`No video tag match found.`);
  }

  // Search for video_url or video_versions string anywhere
  const cleanHtml = html.replace(/\\u0026/g, '&').replace(/\\/g, '');
  const videoUrlMatches = cleanHtml.match(/"video_url":"([^"]+)"/gi) || cleanHtml.match(/video_url["']:\s*["']([^"']+)["']/gi);
  if (videoUrlMatches) {
    console.log(`FOUND VIDEO URL MATCHES IN HTML:`, videoUrlMatches.slice(0, 3));
  } else {
    console.log(`No video_url matches found in HTML.`);
  }
}

inspectEmbedScriptData();
