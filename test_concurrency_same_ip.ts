async function testSameIpConcurrency() {
  const base = 'http://localhost:3000';
  console.log('=== TESTING CONCURRENCY WITH SAME IP (LOCAL OR PROD) ===');

  const urls = [
    'https://www.tiktok.com/@tiktok/video/7106594312292453675',
    'https://www.instagram.com/reel/DdcJGoJod0y/?stkn=MThud',
    'https://x.com/NASA/status/2105677597078126844',
    'https://www.pinterest.com/pin/579908889542843424/',
    'https://www.facebook.com/watch/?v=123456789012345',
    'https://www.reddit.com/r/NatureIsFuckingLit/comments/1example',
  ];

  // Send 16 requests from the SAME IP sequentially or concurrently
  const promises = urls.map(async (url, idx) => {
    const requestStart = Date.now();
    try {
      const res = await fetch(`${base}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No x-forwarded-for set -> defaults to 'client-ip'
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      const elapsed = Date.now() - requestStart;
      console.log(`[Req ${idx + 1}] Status: ${res.status} | Code: ${data.code} | Message: ${data.message} | Elapsed: ${elapsed}ms`);
      return { idx, status: res.status, code: data.code, ok: data.ok };
    } catch (e: any) {
      console.log(`[Req ${idx + 1}] Error: ${e.message}`);
      return { idx, error: e.message };
    }
  });

  const results = await Promise.all(promises);
  console.log('Results:', results);
}

testSameIpConcurrency().catch(console.error);
