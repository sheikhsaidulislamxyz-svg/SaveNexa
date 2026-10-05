async function testFbDownload() {
  const pluginUrl = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent('https://www.facebook.com/watch/?v=10153231379946729');
  const res = await fetch(pluginUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html',
    }
  });
  const text = await res.text();
  const hdMatch = text.match(/"hd_src":"([^"]+)"/i) || text.match(/"browser_native_hd_url":"([^"]+)"/i);
  const rawUrl = (hdMatch ? hdMatch[1] : '').replace(/\\u0026/g, '&').replace(/\\/g, '');
  console.log('Clean HD URL:', rawUrl.slice(0, 100));

  const dlRes = await fetch(rawUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.facebook.com/',
    }
  });
  console.log('DL Status:', dlRes.status);
  console.log('Content-Type:', dlRes.headers.get('content-type'));
  console.log('Content-Length:', dlRes.headers.get('content-length'));
}
testFbDownload();
