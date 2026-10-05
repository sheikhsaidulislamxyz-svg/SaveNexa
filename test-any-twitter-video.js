async function testFxTwitterVideo() {
  const videoTweetId = '1781324707172081919';
  console.log(`=== TESTING FXTWITTER VIDEO EXTRACTION FOR: ${videoTweetId} ===\n`);

  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${videoTweetId}`, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    console.log(`Tweet text:`, data.tweet?.text);
    console.log(`Media count:`, data.tweet?.media?.all?.length);

    if (data.tweet?.media?.all) {
      data.tweet.media.all.forEach((m, i) => {
        console.log(`Media ${i}:`, m.type, m.url);
        if (m.type === 'video') {
          console.log(`Video variants:`, m.variants);
        }
      });
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testFxTwitterVideo();
