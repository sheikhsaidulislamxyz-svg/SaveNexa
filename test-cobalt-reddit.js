async function testCobaltReddit() {
  const targetUrl = 'https://www.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/';
  console.log(`=== TESTING COBALT REDDIT WITH DIFFERENT VARIANTS ===\n`);

  const instances = [
    'https://api.cobalt.tools',
    'https://cobalt.api.scx.ovh',
    'https://cobalt-api.kwi.fi',
    'https://co.wuk.sh',
  ];

  for (const host of instances) {
    console.log(`\n--- Host: ${host} ---`);
    try {
      const payload = {
        url: targetUrl,
        videoQuality: '1080',
      };

      const res = await fetch(host, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(payload),
      });

      console.log(`Status: ${res.status}`);
      const text = await res.text();
      console.log(`Response snippet:`, text.slice(0, 300));
    } catch (err) {
      console.log(`Error:`, err.message);
    }
  }
}

testCobaltReddit();
