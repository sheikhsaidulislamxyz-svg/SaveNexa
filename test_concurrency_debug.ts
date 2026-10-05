async function testConcurrency() {
  const base = 'http://localhost:3000';
  console.log('=== TESTING CONCURRENCY ON /api/analyze ===');

  const urls = [
    'https://www.tiktok.com/@tiktok/video/7106594312292453675',
    'https://www.instagram.com/reel/DdcJGoJod0y/?stkn=MThud',
    'https://x.com/NASA/status/2105677597078126844',
    'https://www.pinterest.com/pin/579908889542843424/',
  ];

  const startTime = Date.now();

  const promises = urls.map(async (url, idx) => {
    const requestStart = Date.now();
    console.log(`[Req ${idx + 1}] Starting analyze for ${url.slice(0, 30)}...`);
    try {
      const res = await fetch(`${base}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `192.168.1.${10 + idx}`,
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      const elapsed = Date.now() - requestStart;
      console.log(`[Req ${idx + 1}] Done in ${elapsed}ms | Status: ${res.status} | OK: ${data.ok} | Title: ${data.title?.slice(0, 25)}`);
      return { idx, elapsed, ok: data.ok, status: res.status };
    } catch (e: any) {
      const elapsed = Date.now() - requestStart;
      console.log(`[Req ${idx + 1}] Failed in ${elapsed}ms | Error: ${e.message}`);
      return { idx, elapsed, ok: false, error: e.message };
    }
  });

  const results = await Promise.all(promises);
  console.log(`\nTotal batch time for ${urls.length} concurrent requests: ${Date.now() - startTime}ms`);
  console.log('Results:', results);
}

testConcurrency().catch(console.error);
