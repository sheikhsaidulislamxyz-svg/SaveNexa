async function testRedditApiDomain() {
  const url = 'https://api.reddit.com/r/whenthe/comments/1woor5z/how_did_everyone_just_forget_that_happened/';
  console.log(`=== TESTING REDDIT API DOMAIN ===\n`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`SUCCESS! JSON Keys:`, Object.keys(data[0] || {}));
      const post = data[0]?.data?.children?.[0]?.data;
      console.log(`Post Title:`, post?.title);
      console.log(`Reddit Video Sec Media:`, post?.secure_media);
    }
  } catch (err) {
    console.log(`Error:`, err.message);
  }
}

testRedditApiDomain();
